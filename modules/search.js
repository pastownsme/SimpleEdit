// Find / Replace / Project Search.
import { $, escapeHtml, debounce } from './utils.js';
import { state } from './state.js';
import { render, updateFindStatus, showToast } from './ui.js';
import { switchFile } from './files.js';
import { renderHighlightWithFind, updateLineNumbers } from './highlight.js';

const editor = $("#editor");
const highlightLayer = $("#highlightLayer");
const findPanel = $("#findPanel");
const findInput = $("#findInput");
const replaceInput = $("#replaceInput");
const replaceRow = $("#replaceRow");
const toggleReplaceBar = $("#toggleReplaceBar");
const projectSearchPanel = $("#projectSearchPanel");
const projectSearchInput = $("#projectSearchInput");
const projectSearchCount = $("#projectSearchCount");
const projectSearchResults = $("#projectSearchResults");

export function computeFindMatches() {
  const query = state.find.query;
  if (!query || !state.activeFile) {
    state.find.matches = []; state.find.currentIndex = -1; return;
  }
  const content = state.contents[state.activeFile] || "";
  const matches = [];
  const flags = state.find.matchCase ? "g" : "gi";
  const regexSafe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(regexSafe, flags);
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push({ start: match.index, end: match.index + match[0].length });
    if (regex.lastIndex === match.index) regex.lastIndex++;
  }
  state.find.matches = matches;
  if (matches.length > 0) {
    if (state.find.currentIndex < 0 || state.find.currentIndex >= matches.length) state.find.currentIndex = 0;
  } else state.find.currentIndex = -1;
}

function scrollToMatch(match, focusEditor = false) {
  if (!match) return;
  if (focusEditor) {
    editor.focus();
    editor.setSelectionRange(match.start, match.end);
  }
  const linesBefore = editor.value.slice(0, match.start).split("\n").length;
  const lineHeight = 21.45;
  const target = Math.max(0, (linesBefore - 4) * lineHeight);
  if (editor.scrollTop > target || editor.scrollTop + editor.clientHeight < target) {
    editor.scrollTop = target;
  }
}

function jumpToCurrentMatch(shouldFocus = false) {
  if (state.find.matches.length === 0 || state.find.currentIndex < 0) return;
  scrollToMatch(state.find.matches[state.find.currentIndex], shouldFocus);
  if (state.activeFile) highlightLayer.innerHTML = renderHighlightWithFind(state.contents[state.activeFile], state.activeFile, state);
  updateFindStatus();
}

export function findNextMatch() {
  if (state.find.matches.length === 0) return;
  state.find.currentIndex = (state.find.currentIndex + 1) % state.find.matches.length;
  jumpToCurrentMatch(true);
}

export function findPrevMatch() {
  if (state.find.matches.length === 0) return;
  state.find.currentIndex = (state.find.currentIndex - 1 + state.find.matches.length) % state.find.matches.length;
  jumpToCurrentMatch(true);
}

export function replaceCurrentMatch() {
  if (state.find.matches.length === 0 || state.find.currentIndex < 0 || !state.activeFile) return;
  const match = state.find.matches[state.find.currentIndex];
  const replacement = replaceInput.value;
  const content = state.contents[state.activeFile];
  const newContent = content.slice(0, match.start) + replacement + content.slice(match.end);
  state.contents[state.activeFile] = newContent;
  editor.value = newContent;
  state.dirty.add(state.activeFile);
  computeFindMatches();
  jumpToCurrentMatch(false);
  import('./ui.js').then(m => { m.renderTabs(); m.updateCursor(); });
  highlightLayer.innerHTML = renderHighlightWithFind(editor.value, state.activeFile, state);
  updateLineNumbers(editor.value);
  showToast("Replaced 1 match");
}

export function replaceAllMatches() {
  const query = state.find.query;
  if (!query || !state.activeFile) return;
  const content = state.contents[state.activeFile];
  const replacement = replaceInput.value;
  const flags = state.find.matchCase ? "g" : "gi";
  const regexSafe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(regexSafe, flags);
  const count = (content.match(regex) || []).length;
  if (count === 0) { showToast("No matches to replace"); return; }
  state.contents[state.activeFile] = content.replace(regex, replacement);
  state.dirty.add(state.activeFile);
  render();
  showToast(`Replaced ${count} occurrence${count === 1 ? '' : 's'}`);
}

export function openFind(withReplace = false) {
  if (!state.activeFile) return;
  findPanel.hidden = false;
  if (withReplace) { replaceRow.hidden = false; toggleReplaceBar.classList.add("active"); }
  findInput.focus(); findInput.select();
  state.find.query = findInput.value;
  computeFindMatches();
  jumpToCurrentMatch(false);
}

export function closeFind() {
  findPanel.hidden = true; state.find.query = ""; computeFindMatches();
  if (state.activeFile) highlightLayer.innerHTML = renderHighlightWithFind(state.contents[state.activeFile] || "", state.activeFile, state);
  editor.focus();
}

export function openProjectSearch() {
  if (Object.keys(state.contents).length === 0) { showToast("No files to search"); return; }
  projectSearchPanel.hidden = false;
  projectSearchInput.focus();
  projectSearchInput.select();
  runProjectSearch();
}

export function runProjectSearch() {
  const q = projectSearchInput.value;
  if (!q || q.length < 2) {
    projectSearchResults.innerHTML = '';
    projectSearchCount.textContent = '—';
    return;
  }
  const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'gi');
  const results = [];
  let total = 0;
  for (const [file, content] of Object.entries(state.contents)) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (regex.test(line)) { results.push({ file, line: i + 1, text: line }); total++; if (total > 500) break; }
      regex.lastIndex = 0;
    }
    if (total > 500) break;
  }
  projectSearchCount.textContent = total === 0 ? 'no results' : `${total} in ${new Set(results.map(r => r.file)).size} file(s)`;
  if (results.length === 0) { projectSearchResults.innerHTML = ''; return; }
  projectSearchResults.innerHTML = results.slice(0, 200).map(r => {
    const highlighted = escapeHtml(r.text).replace(regex, m => `<span class="psr-match">${m}</span>`);
    return `<div class="project-search-result" data-file="${escapeHtml(r.file)}" data-line="${r.line}">
      <span class="psr-file">${escapeHtml(r.file)}:${r.line}</span>
      <span class="psr-line">${highlighted}</span>
    </div>`;
  }).join('');
}

export function jumpToLine(file, line) {
  switchFile(file);
  const content = state.contents[file];
  const lines = content.split('\n');
  let pos = 0;
  for (let i = 0; i < line - 1; i++) pos += lines[i].length + 1;
  editor.focus();
  editor.setSelectionRange(pos, pos + (lines[line - 1]?.length || 0));
  const lineHeight = 21.45;
  editor.scrollTop = Math.max(0, (line - 5) * lineHeight);
}

export const debouncedProjectSearch = debounce(runProjectSearch, 250);