// Command palette + diff view.
import { $, escapeHtml } from './utils.js';
import { state } from './state.js';
import { render, showToast } from './ui.js';
import { saveFile, saveFileAs, duplicateFile, exportCurrentFile, exportProjectAsZip, openNewFileDialog, openFolder, clearStoredSession } from './files.js';
import { openFind, openProjectSearch } from './search.js';
import { toggleComment, duplicateLine, toggleWordWrap } from './editor.js';
import { togglePreview } from './preview.js';

const commandPalette = $("#commandPalette");
const commandInput = $("#commandInput");
const commandResults = $("#commandResults");
const importProjectInput = $("#importProjectInput");
const settingsPanel = $("#settingsPanel");

// ==================== COMMAND PALETTE ====================
const COMMANDS = [
  { id: 'new-file', icon: '📄', label: 'New File', hint: 'Ctrl+N', run: () => openNewFileDialog() },
  { id: 'save', icon: '💾', label: 'Save File', hint: 'Ctrl+S', run: saveFile },
  { id: 'save-as', icon: '💾', label: 'Save As…', hint: 'Ctrl+Shift+S', run: saveFileAs },
  { id: 'duplicate-file', icon: '📑', label: 'Duplicate File', hint: '', run: duplicateFile },
  { id: 'save-project', icon: '📦', label: 'Save Project (ZIP)', hint: '', run: exportProjectAsZip },
  { id: 'import-project', icon: '📂', label: 'Import Project…', hint: '', run: () => importProjectInput.click() },
  { id: 'open-folder', icon: '🗂', label: 'Open Folder…', hint: '', run: openFolder },
  { id: 'export-file', icon: '📥', label: 'Export Current File', hint: '', run: exportCurrentFile },
  { id: 'clear-session', icon: '🗑', label: 'Clear Saved Session', hint: '', run: clearStoredSession },
  { id: 'find', icon: '⌕', label: 'Find in File', hint: 'Ctrl+F', run: () => openFind(false) },
  { id: 'replace', icon: '⌕', label: 'Find & Replace', hint: 'Ctrl+H', run: () => openFind(true) },
  { id: 'search-project', icon: '🔎', label: 'Search in Project', hint: 'Ctrl+Shift+F', run: openProjectSearch },
  { id: 'toggle-comment', icon: '💬', label: 'Toggle Comment', hint: 'Ctrl+/', run: toggleComment },
  { id: 'duplicate-line', icon: '📋', label: 'Duplicate Line', hint: 'Ctrl+D', run: duplicateLine },
  { id: 'toggle-wrap', icon: '↵', label: 'Toggle Word Wrap', hint: 'Alt+Z', run: toggleWordWrap },
  { id: 'toggle-preview', icon: '👁', label: 'Toggle Preview', hint: 'Ctrl+Shift+P', run: togglePreview },
  { id: 'compare', icon: '⇆', label: 'Compare Files…', hint: '', run: openDiffDialog },
  { id: 'settings', icon: '⚙', label: 'Open Settings', hint: '', run: () => { settingsPanel.hidden = false; } },
  { id: 'toggle-theme', icon: '☼', label: 'Toggle Dark / Light Theme', hint: '', run: () => document.body.classList.toggle('dark') },
];

export function openCommandPalette() {
  commandPalette.hidden = false;
  commandInput.value = '';
  commandInput.focus();
  renderCommandResults('');
}

export function closeCommandPalette() { commandPalette.hidden = true; }

export function renderCommandResults(query) {
  const q = query.toLowerCase().trim();
  const items = [];
  for (const f of Object.keys(state.contents)) {
    if (!q || f.toLowerCase().includes(q)) {
      items.push({ icon: '📄', label: f, detail: 'file', action: () => import('./files.js').then(m => m.switchFile(f)) });
    }
  }
  for (const c of COMMANDS) {
    if (!q || c.label.toLowerCase().includes(q) || c.id.includes(q)) {
      items.push({ icon: c.icon, label: c.label, detail: c.hint || 'command', action: c.run });
    }
  }
  const limited = items.slice(0, 30);
  if (limited.length === 0) {
    commandResults.innerHTML = '<li style="color:var(--muted)">No results</li>';
    return;
  }
  commandResults.innerHTML = limited.map((it, i) =>
    `<li data-idx="${i}" class="${i === 0 ? 'selected' : ''}">
      <span class="cmd-icon">${it.icon}</span>
      <span>${escapeHtml(it.label)}</span>
      <span class="cmd-detail">${escapeHtml(it.detail)}</span>
    </li>`
  ).join('');
  commandResults.querySelectorAll('li[data-idx]').forEach(li => {
    li.addEventListener('click', () => {
      const idx = parseInt(li.dataset.idx);
      closeCommandPalette();
      limited[idx].action();
    });
  });
  commandResults._items = limited;
  commandResults._selected = 0;
}

export function commandPaletteNavigate(dir) {
  const items = commandResults.querySelectorAll('li[data-idx]');
  if (items.length === 0) return;
  commandResults._selected = Math.max(0, Math.min(items.length - 1, (commandResults._selected || 0) + dir));
  items.forEach((el, i) => el.classList.toggle('selected', i === commandResults._selected));
  items[commandResults._selected]?.scrollIntoView({ block: 'nearest' });
}

export function commandPaletteExecute() {
  const items = commandResults._items;
  if (!items || items.length === 0) return;
  const it = items[commandResults._selected || 0];
  if (it) { closeCommandPalette(); it.action(); }
}

// ==================== DIFF ====================
const diffDialog = $("#diffDialog");
const diffLeftSelect = $("#diffLeftSelect");
const diffRightSelect = $("#diffRightSelect");
const diffView = $("#diffView");

export function openDiffDialog() {
  const fileNames = Object.keys(state.contents);
  if (fileNames.length < 2) { showToast("Need at least 2 files"); return; }
  const options = fileNames.map(f => `<option value="${escapeHtml(f)}">${escapeHtml(f)}</option>`).join('');
  diffLeftSelect.innerHTML = options;
  diffRightSelect.innerHTML = options;
  diffLeftSelect.value = state.activeFile && fileNames.includes(state.activeFile) ? state.activeFile : fileNames[0];
  diffRightSelect.value = fileNames.find(f => f !== diffLeftSelect.value) || fileNames[1];
  diffView.innerHTML = '<div style="padding:20px;color:var(--muted)">Select two files and click Compare.</div>';
  diffDialog.hidden = false;
}

function computeLCSDiff(a, b) {
  const A = a.split('\n'), B = b.split('\n');
  const m = A.length, n = B.length;
  const dp = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (A[i - 1] === B[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const result = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (A[i - 1] === B[j - 1]) { result.unshift({ type: 'same', left: A[i - 1], right: B[j - 1], leftLn: i, rightLn: j }); i--; j--; }
    else if (dp[i - 1][j] >= dp[i][j - 1]) { result.unshift({ type: 'del', left: A[i - 1], right: '', leftLn: i, rightLn: '' }); i--; }
    else { result.unshift({ type: 'add', left: '', right: B[j - 1], leftLn: '', rightLn: j }); j--; }
  }
  while (i > 0) { result.unshift({ type: 'del', left: A[i - 1], right: '', leftLn: i, rightLn: '' }); i--; }
  while (j > 0) { result.unshift({ type: 'add', left: '', right: B[j - 1], leftLn: '', rightLn: j }); j--; }
  return result;
}

export function runDiff() {
  const left = state.contents[diffLeftSelect.value] || '';
  const right = state.contents[diffRightSelect.value] || '';
  const diff = computeLCSDiff(left, right);
  diffView.innerHTML = diff.map(d => {
    const cls = d.type === 'add' ? 'add' : d.type === 'del' ? 'del' : '';
    return `<div class="diff-line ${cls}">
      <span class="diff-ln">${d.leftLn || ''}</span>
      <span class="diff-ln">${d.rightLn || ''}</span>
      <span class="diff-code">${escapeHtml(d.left)}</span>
      <span class="diff-code">${escapeHtml(d.right)}</span>
    </div>`;
  }).join('');
}