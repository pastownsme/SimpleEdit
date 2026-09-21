// UI rendering: tabs, file list, cursor, storage status, toast, initUI.
import { $, escapeHtml, getFileIcon, getFileExtension } from './utils.js';
import { state, persistSettings, persistState } from './state.js';
import { renderHighlightWithFind, updateLineNumbers } from './highlight.js';
import { computeFindMatches } from './search.js';

const editor = $("#editor");
const highlightLayer = $("#highlightLayer");
const lineNumbers = $("#lineNumbers");
const editorWrap = $("#editorWrap");
const emptyState = $("#emptyState");
const breadcrumbFile = $("#breadcrumbFile");
const fileTypeBadge = $("#fileType");
const cursorStatus = $("#cursorStatus");
const selectionStatus = $("#selectionStatus");
const lineEndingStatus = $("#lineEndingStatus");
const saveButton = $("#saveButton");
const findButton = $("#findButton");
const wrapToggle = $("#wrapToggle");
const findPanel = $("#findPanel");
const tabbar = $("#tabbar");
const fileList = $("#fileList");
const toast = $("#toast");
const findCount = $("#findCount");

export function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

export function updateStorageStatus() {
  const el = $("#storageStatus");
  if (!el) return;
  const raw = localStorage.getItem('simpleedit:session:v3');
  if (!raw) { el.textContent = 'autosave: —'; return; }
  const snap = JSON.parse(raw);
  const files = Object.keys(snap.contents || {}).length;
  const ago = Math.round((Date.now() - (snap.savedAt || 0)) / 1000);
  el.textContent = `${files}f · ${ago}s`;
}

export function updateFindStatus() {
  if (!state.find.query) { findCount.textContent = "0 results"; return; }
  if (state.find.matches.length === 0) findCount.textContent = "No results";
  else findCount.textContent = `${state.find.currentIndex + 1} of ${state.find.matches.length}`;
}

export function render() {
  const filesList = Object.keys(state.contents);

  if (filesList.length === 0) {
    state.activeFile = null;
    editor.disabled = true; editor.value = "";
    highlightLayer.innerHTML = ""; lineNumbers.innerHTML = "";
    editorWrap.hidden = true; emptyState.hidden = false;
    breadcrumbFile.textContent = "No file"; fileTypeBadge.textContent = "NONE";
    saveButton.disabled = true; findButton.disabled = true; wrapToggle.disabled = true;
    findPanel.hidden = true;
    tabbar.innerHTML = "";
    fileList.innerHTML = `<div style="padding: 10px 8px; color: var(--muted); font-size: 11px;">No open files</div>`;
    updateCursor();
    return;
  }

  editor.disabled = false;
  editorWrap.hidden = false; emptyState.hidden = true;
  saveButton.disabled = false; findButton.disabled = false; wrapToggle.disabled = false;

  if (!state.activeFile || !(state.activeFile in state.contents)) {
    state.activeFile = filesList[0];
  }

  const content = state.contents[state.activeFile] ?? "";
  if (editor.value !== content) editor.value = content;

  import('./state.js').then(m => {
    computeFindMatches();
    updateFindStatus();
  });

  highlightLayer.innerHTML = renderHighlightWithFind(content, state.activeFile, state);
  updateLineNumbers(content);
  breadcrumbFile.textContent = state.activeFile;

  const ext = getFileExtension(state.activeFile);
  fileTypeBadge.textContent = (ext || "TXT").toUpperCase();

  const le = state.lineEndings[state.activeFile] || '\n';
  lineEndingStatus.textContent = le === '\r\n' ? 'CRLF' : 'LF';

  editor.style.tabSize = String(state.tabSize);
  highlightLayer.style.tabSize = String(state.tabSize);

  renderTabs();
  renderFileList();
  updateCursor();

  if (state.previewVisible) {
    import('./preview.js').then(m => {
      m.updateMainFileSelector();
      if (state.mainFile === state.activeFile) m.renderPreview();
    });
  }
}

export function renderTabs() {
  const fileNames = Object.keys(state.contents);
  tabbar.innerHTML = fileNames.map((fileName) => {
    const active = fileName === state.activeFile ? " active" : "";
    const isDirty = state.dirty.has(fileName);
    const meta = getFileIcon(fileName);
    return `
      <div class="tab${active}" data-tab="${escapeHtml(fileName)}" role="button" tabindex="0">
        <span class="tab-icon ${meta.class}">${meta.icon}</span>
        <span class="tab-title" data-tab-title="${escapeHtml(fileName)}">${escapeHtml(fileName)}</span>
        ${isDirty ? '<span class="tab-dirty">•</span>' : ''}
        <button class="close" data-close="${escapeHtml(fileName)}" title="Close file (Ctrl+W)">×</button>
      </div>
    `;
  }).join("");
}

export function renderFileList() {
  const fileNames = Object.keys(state.contents);
  fileList.innerHTML = fileNames.map((fileName) => {
    const active = fileName === state.activeFile ? " active" : "";
    const meta = getFileIcon(fileName);
    return `
      <div class="file-item${active}" data-file="${escapeHtml(fileName)}" title="${escapeHtml(fileName)}" role="button" tabindex="0">
        <span class="file-icon ${meta.class}">${meta.icon}</span>
        <span class="file-name">${escapeHtml(fileName)}</span>
        <button class="file-close" data-close="${escapeHtml(fileName)}" title="Close">×</button>
      </div>
    `;
  }).join("");
}

export function updateCursor() {
  if (!state.activeFile) {
    cursorStatus.textContent = "Ln 0, Col 0"; selectionStatus.textContent = ""; return;
  }
  const before = editor.value.slice(0, editor.selectionStart);
  const row = before.split("\n").length;
  const column = before.length - before.lastIndexOf("\n");
  cursorStatus.textContent = `Ln ${row}, Col ${column}`;
  const sel = Math.abs(editor.selectionEnd - editor.selectionStart);
  selectionStatus.textContent = sel ? `${sel} selected` : "";
}

export function initUI() {
  const tabSizeSelect = $("#tabSizeSelect");
  const autoCloseToggle = $("#autoCloseToggle");
  const autoIndentToggle = $("#autoIndentToggle");
  const bracketMatchToggle = $("#bracketMatchToggle");
  const autoSaveToggle = $("#autoSaveToggle");
  const autoSaveDelay = $("#autoSaveDelay");
  const syntaxRadios = document.querySelectorAll('input[name="syntax"]');

  tabSizeSelect.value = state.useSpaces ? `spaces-${state.tabSize}` : 'tabs';
  autoCloseToggle.checked = state.autoClose;
  autoIndentToggle.checked = state.autoIndent;
  bracketMatchToggle.checked = state.bracketMatch;
  autoSaveToggle.checked = state.autoSave;
  autoSaveDelay.value = String(state.autoSaveDelay);
  syntaxRadios.forEach(r => { if (r.value === state.syntaxMode) r.checked = true; });

  if (state.wordWrap) {
    document.querySelector('.editor-area').classList.add('word-wrap');
    wrapToggle.classList.add('active');
    wrapStatus.textContent = 'Wrap: On';
  }
  editor.style.tabSize = String(state.tabSize);
  highlightLayer.style.tabSize = String(state.tabSize);
}