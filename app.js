// Simple Edit — entry point. Wires everything together.
import { state, restoreSession, persistState, persistSettings, scheduleAutoSave, updateStorageStatus } from './modules/state.js';
import { $, debounce, getCurrentWord, getLanguage } from './modules/utils.js';
import { render, renderTabs, renderFileList, updateCursor, showToast, initUI } from './modules/ui.js';
import {
  switchFile, createNewFile, closeFile, saveFile, saveFileAs, duplicateFile, renameFile,
  openFilesFromInput, openFolder, exportCurrentFile, exportProjectAsZip, importProjectFromFile,
  openNewFileDialog, closeNewFileDialog, confirmNewFileDialog
} from './modules/files.js';
import { showAutocomplete, hideAutocomplete, setAutocompleteSelection, selectAutocomplete } from './modules/autocomplete.js';
import {
  computeFindMatches, findNextMatch, findPrevMatch, replaceCurrentMatch, replaceAllMatches,
  openFind, closeFind, openProjectSearch, runProjectSearch, jumpToLine
} from './modules/search.js';
import {
  scheduleHighlight, handleAutoClose, handleAutoIndent, handleAutoDedent, tryExpandSnippet,
  toggleComment, duplicateLine, moveLine, toggleWordWrap
} from './modules/editor.js';
import { togglePreview, renderPreview, updateMainFileSelector, schedulePreview } from './modules/preview.js';
import {
  openCommandPalette, closeCommandPalette, renderCommandResults,
  commandPaletteNavigate, commandPaletteExecute, openDiffDialog, runDiff
} from './modules/extras.js';

// ==================== DOM ====================
const editor = $("#editor");
const highlightLayer = $("#highlightLayer");
const lineNumbers = $("#lineNumbers");
const tabbar = $("#tabbar");
const fileList = $("#fileList");
const editorWrap = $("#editorWrap");
const emptyState = $("#emptyState");
const fileInput = $("#fileInput");
const folderInput = $("#folderInput");
const saveButton = $("#saveButton");
const findButton = $("#findButton");
const wrapToggle = $("#wrapToggle");

const findPanel = $("#findPanel");
const findInput = $("#findInput");
const replaceInput = $("#replaceInput");
const findPrev = $("#findPrev");
const findNext = $("#findNext");
const matchCaseToggle = $("#matchCaseToggle");
const toggleReplaceBar = $("#toggleReplaceBar");
const replaceRow = $("#replaceRow");
const replaceBtn = $("#replaceBtn");
const replaceAllBtn = $("#replaceAllBtn");
const closeFindBtn = $("#closeFind");

const newFileDialog = $("#newFileDialog");
const newFileNameInput = $("#newFileName");
const dialogClose = $("#dialogClose");
const dialogCancel = $("#dialogCancel");
const dialogCreate = $("#dialogCreate");

const settingsButton = $("#settingsButton");
const settingsPanel = $("#settingsPanel");
const closeSettings = $("#closeSettings");
const tabSizeSelect = $("#tabSizeSelect");
const exportProjectButton = $("#exportProjectButton");
const syntaxRadios = document.querySelectorAll('input[name="syntax"]');
const autoCloseToggle = $("#autoCloseToggle");
const autoIndentToggle = $("#autoIndentToggle");
const bracketMatchToggle = $("#bracketMatchToggle");
const autoSaveToggle = $("#autoSaveToggle");
const autoSaveDelay = $("#autoSaveDelay");

const fileMenuButton = $("#fileMenuButton");
const fileMenu = $("#fileMenu");
const newFileMenu = $("#newFileMenu");
const saveFileMenu = $("#saveFileMenu");
const saveFileAsMenu = $("#saveFileAsMenu");
const saveProjectMenu = $("#saveProjectMenu");
const importProjectMenu = $("#importProjectMenu");
const openFolderMenu = $("#openFolderMenu");
const exportFileMenu = $("#exportFileMenu");
const clearStorageMenu = $("#clearStorageMenu");
const importProjectInput = $("#importProjectInput");

const editMenuButton = $("#editMenuButton");
const editMenu = $("#editMenu");
const selectAllMenu = $("#selectAllMenu");
const selectLineMenu = $("#selectLineMenu");
const duplicateLineMenu = $("#duplicateLineMenu");
const toggleCommentMenu = $("#toggleCommentMenu");
const copyMenu = $("#copyMenu");

const previewToggle = $("#previewToggle");
const previewPanel = $("#previewPanel");
const closePreview = $("#closePreview");
const mainFileSelector = $("#mainFileSelector");

const projectSearchButton = $("#searchProjectButton");
const projectSearchPanel = $("#projectSearchPanel");
const projectSearchInput = $("#projectSearchInput");
const projectSearchResults = $("#projectSearchResults");
const closeProjectSearch = $("#closeProjectSearch");

const commandPaletteButton = $("#commandPaletteButton");
const commandPalette = $("#commandPalette");
const commandInput = $("#commandInput");
const diffButton = $("#diffButton");
const diffDialog = $("#diffDialog");
const diffClose = $("#diffClose");
const diffRun = $("#diffRun");

const autocompleteMenu = $("#autocompleteMenu");
const autocompleteList = $("#autocompleteList");

// ==================== EDITOR EVENTS ====================
editor.addEventListener("input", () => {
  if (!state.activeFile) return;
  state.contents[state.activeFile] = editor.value;
  state.dirty.add(state.activeFile);
  if (state.find.query) computeFindMatches();
  scheduleHighlight();
  renderTabs();
  updateCursor();
  if (state.previewVisible) schedulePreview();
  persistState();

  // Autocomplete trigger
  const text = editor.value;
  const cursorPos = editor.selectionStart;
  const word = getCurrentWord(text, cursorPos).word;
  const lang = getLanguage(state.activeFile, state.syntaxMode);
  const obj = text[cursorPos - 1] === '.' || /[a-zA-Z0-9_$]\.$/.test(text.slice(0, cursorPos));

  let insideTag = false;
  if (lang === 'html') {
    const before = text.slice(0, cursorPos);
    insideTag = before.lastIndexOf('<') > before.lastIndexOf('>');
  }

  if (obj || insideTag || word.length >= 1) showAutocomplete();
  else hideAutocomplete();
});

editor.addEventListener("keyup", updateCursor);
editor.addEventListener("click", updateCursor);
editor.addEventListener("select", () => { updateCursor(); scheduleHighlight(); });

editor.addEventListener("scroll", () => {
  highlightLayer.scrollTop = editor.scrollTop;
  highlightLayer.scrollLeft = editor.scrollLeft;
  lineNumbers.scrollTop = editor.scrollTop;
});

editor.addEventListener("beforeinput", handleAutoClose);
editor.addEventListener("keydown", handleAutoIndent);
editor.addEventListener("keydown", handleAutoDedent);

editor.addEventListener('keydown', (e) => {
  if (!state.autocompleteVisible) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const items = autocompleteList.querySelectorAll('.autocomplete-item');
    if (state.autocompleteIndex < items.length - 1) setAutocompleteSelection(state.autocompleteIndex + 1);
    state.autocompleteNavigated = true;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (state.autocompleteIndex > 0) setAutocompleteSelection(state.autocompleteIndex - 1);
    state.autocompleteNavigated = true;
  } else if (e.key === 'Enter' || e.key === 'Tab') {
    e.preventDefault();
    const sel = autocompleteList.querySelector('.autocomplete-item.selected');
    if (sel) {
      selectAutocomplete(sel.dataset.suggestion, parseInt(sel.dataset.replaceStart), parseInt(sel.dataset.replaceEnd));
    } else {
      hideAutocomplete();
    }
  } else if (e.key === 'Escape') {
    hideAutocomplete();
  }
});

editor.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
    e.preventDefault();
    showAutocomplete();
    state.autocompleteNavigated = true;
  }
});

editor.addEventListener('keydown', (e) => {
  if (e.defaultPrevented) return;
  if (e.key === 'Tab' && !state.autocompleteVisible) {
    if (tryExpandSnippet()) { e.preventDefault(); return; }
  }
});

document.addEventListener('click', (e) => {
  if (e.target !== editor && !autocompleteMenu.contains(e.target)) hideAutocomplete();
});

// ==================== TOOLBAR ====================
saveButton.addEventListener("click", saveFile);
wrapToggle.addEventListener("click", toggleWordWrap);
$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  persistSettings();
});

tabbar.addEventListener("click", (e) => {
  const close = e.target.closest("[data-close]");
  if (close) { e.stopPropagation(); closeFile(close.dataset.close); return; }
  const tab = e.target.closest("[data-tab]");
  if (tab) switchFile(tab.dataset.tab);
});

tabbar.addEventListener("dblclick", (e) => {
  const title = e.target.closest("[data-tab-title]");
  if (!title) return;
  e.preventDefault();
  const oldName = title.dataset.tabTitle;
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'tab-title-input';
  input.value = oldName;
  title.replaceWith(input);
  input.focus(); input.select();
  const commit = () => {
    const newName = input.value.trim();
    if (newName && newName !== oldName) renameFile(oldName, newName);
    else renderTabs();
  };
  input.addEventListener('blur', commit, { once: true });
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') { ev.preventDefault(); input.blur(); }
    else if (ev.key === 'Escape') { ev.preventDefault(); renderTabs(); }
  });
});

fileList.addEventListener("click", (e) => {
  const close = e.target.closest("[data-close]");
  if (close) { e.stopPropagation(); closeFile(close.dataset.close); return; }
  const item = e.target.closest("[data-file]");
  if (item) switchFile(item.dataset.file);
});

// ==================== FIND BAR ====================
findButton.addEventListener("click", () => {
  if (findPanel.hidden) openFind(false);
  else closeFind();
});
closeFindBtn.addEventListener("click", closeFind);
toggleReplaceBar.addEventListener("click", () => {
  replaceRow.hidden = !replaceRow.hidden;
  toggleReplaceBar.classList.toggle("active", !replaceRow.hidden);
  if (!replaceRow.hidden) replaceInput.focus();
});
matchCaseToggle.addEventListener("click", () => {
  state.find.matchCase = !state.find.matchCase;
  matchCaseToggle.classList.toggle("active", state.find.matchCase);
  computeFindMatches();
});
findInput.addEventListener("input", () => { state.find.query = findInput.value; computeFindMatches(); });
findInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); e.shiftKey ? findPrevMatch() : findNextMatch(); }
  else if (e.key === "Escape") closeFind();
});
replaceInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); replaceCurrentMatch(); }
  else if (e.key === "Escape") closeFind();
});
findNext.addEventListener("click", findNextMatch);
findPrev.addEventListener("click", findPrevMatch);
replaceBtn.addEventListener("click", replaceCurrentMatch);
replaceAllBtn.addEventListener("click", replaceAllMatches);

// ==================== PROJECT SEARCH ====================
projectSearchButton.addEventListener('click', () => {
  if (projectSearchPanel.hidden) openProjectSearch();
  else projectSearchPanel.hidden = true;
});
closeProjectSearch.addEventListener('click', () => { projectSearchPanel.hidden = true; });
projectSearchInput.addEventListener('input', debounce(runProjectSearch, 250));
projectSearchResults.addEventListener('click', (e) => {
  const item = e.target.closest('[data-file]');
  if (item) jumpToLine(item.dataset.file, parseInt(item.dataset.line));
});

// ==================== NEW FILE / OPEN ====================
$("#newFile").addEventListener("click", () => openNewFileDialog());
$("#tabNewFile").addEventListener("click", () => openNewFileDialog());
$("#emptyNewFile").addEventListener("click", () => openNewFileDialog());

function triggerFileInput() { fileInput.value = ""; fileInput.click(); }
$("#openFileButton").addEventListener("click", triggerFileInput);
$("#openFileSidebar").addEventListener("click", triggerFileInput);
$("#emptyOpenFile").addEventListener("click", triggerFileInput);
$("#emptyOpenFolder").addEventListener("click", openFolder);
$("#openFolderSidebar").addEventListener("click", openFolder);
folderInput.addEventListener("change", (e) => openFilesFromInput(e.target.files));
fileInput.addEventListener("change", (e) => openFilesFromInput(e.target.files));

window.addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.dataTransfer && e.dataTransfer.files.length > 0) openFilesFromInput(e.dataTransfer.files);
});

// ==================== SETTINGS ====================
settingsButton.addEventListener("click", (e) => {
  e.stopPropagation();
  settingsPanel.hidden = !settingsPanel.hidden;
  fileMenu.hidden = true; editMenu.hidden = true;
  if (!settingsPanel.hidden) {
    const rect = settingsButton.getBoundingClientRect();
    settingsPanel.style.top = (rect.bottom + 4) + "px";
    settingsPanel.style.right = "auto";
    settingsPanel.style.left = Math.max(8, rect.right - 360) + "px";
  }
});
closeSettings.addEventListener("click", () => settingsPanel.hidden = true);

tabSizeSelect.addEventListener("change", () => {
  const v = tabSizeSelect.value;
  if (v === "tabs") { state.useSpaces = false; showToast("Using tabs"); }
  else { state.useSpaces = true; state.tabSize = parseInt(v.split("-")[1]); showToast(`Tab size: ${state.tabSize}`); }
  editor.style.tabSize = String(state.tabSize);
  highlightLayer.style.tabSize = String(state.tabSize);
  persistSettings();
});

autoCloseToggle.addEventListener('change', () => { state.autoClose = autoCloseToggle.checked; persistSettings(); });
autoIndentToggle.addEventListener('change', () => { state.autoIndent = autoIndentToggle.checked; persistSettings(); });
bracketMatchToggle.addEventListener('change', () => { state.bracketMatch = bracketMatchToggle.checked; persistSettings(); scheduleHighlight(); });
autoSaveToggle.addEventListener('change', () => { state.autoSave = autoSaveToggle.checked; persistSettings(); if (state.autoSave) persistState(); });
autoSaveDelay.addEventListener('change', () => { state.autoSaveDelay = parseInt(autoSaveDelay.value); persistSettings(); scheduleAutoSave(); });
exportProjectButton.addEventListener("click", () => { exportProjectAsZip(); settingsPanel.hidden = true; });

syntaxRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    state.syntaxMode = radio.value;
    persistSettings();
    scheduleHighlight();
    showToast(`Syntax: ${state.syntaxMode}`);
  });
});

// ==================== MENUS ====================
function positionMenu(btn, menu) {
  const rect = btn.getBoundingClientRect();
  menu.style.top = (rect.bottom + 4) + "px";
  menu.style.left = rect.left + "px";
}
fileMenuButton.addEventListener("click", (e) => {
  e.stopPropagation();
  fileMenu.hidden = !fileMenu.hidden;
  editMenu.hidden = true; settingsPanel.hidden = true;
  if (!fileMenu.hidden) positionMenu(fileMenuButton, fileMenu);
});
editMenuButton.addEventListener("click", (e) => {
  e.stopPropagation();
  editMenu.hidden = !editMenu.hidden;
  fileMenu.hidden = true; settingsPanel.hidden = true;
  if (!editMenu.hidden) positionMenu(editMenuButton, editMenu);
});

newFileMenu.addEventListener("click", () => { openNewFileDialog(); fileMenu.hidden = true; });
saveFileMenu.addEventListener("click", () => { saveFile(); fileMenu.hidden = true; });
saveFileAsMenu.addEventListener("click", () => { saveFileAs(); fileMenu.hidden = true; });
saveProjectMenu.addEventListener("click", () => { exportProjectAsZip(); fileMenu.hidden = true; });
importProjectMenu.addEventListener("click", () => { importProjectInput.click(); fileMenu.hidden = true; });
openFolderMenu.addEventListener("click", () => { openFolder(); fileMenu.hidden = true; });
exportFileMenu.addEventListener("click", () => { exportCurrentFile(); fileMenu.hidden = true; });
clearStorageMenu.addEventListener("click", () => {
  import('./modules/files.js').then(m => { m.clearStoredSession(); fileMenu.hidden = true; });
});

selectAllMenu.addEventListener("click", () => { editor.select(); editor.focus(); editMenu.hidden = true; });
selectLineMenu.addEventListener("click", () => {
  const pos = editor.selectionStart, text = editor.value;
  let ls = pos, le = pos;
  while (ls > 0 && text[ls - 1] !== "\n") ls--;
  while (le < text.length && text[le] !== "\n") le++;
  editor.setSelectionRange(ls, le); editor.focus(); editMenu.hidden = true;
});
duplicateLineMenu.addEventListener("click", () => { duplicateLine(); editMenu.hidden = true; });
toggleCommentMenu.addEventListener("click", () => { toggleComment(); editMenu.hidden = true; });
copyMenu.addEventListener("click", () => {
  if (editor.selectionStart !== editor.selectionEnd) { document.execCommand("copy"); showToast("Copied"); }
  else showToast("Select text first");
  editMenu.hidden = true;
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("#fileMenuButton") && !e.target.closest(".dropdown-menu")) fileMenu.hidden = true;
  if (!e.target.closest("#editMenuButton") && !e.target.closest(".dropdown-menu")) editMenu.hidden = true;
  if (!e.target.closest("#settingsButton") && !e.target.closest(".settings-panel")) settingsPanel.hidden = true;
});

importProjectInput.addEventListener("change", (e) => {
  if (e.target.files.length > 0) { importProjectFromFile(e.target.files[0]); e.target.value = ""; }
});

// ==================== DIALOG ====================
dialogClose.addEventListener("click", closeNewFileDialog);
dialogCancel.addEventListener("click", closeNewFileDialog);
dialogCreate.addEventListener("click", confirmNewFileDialog);
newFileNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") confirmNewFileDialog();
  else if (e.key === "Escape") closeNewFileDialog();
});
newFileDialog.addEventListener("click", (e) => { if (e.target === newFileDialog) closeNewFileDialog(); });

// ==================== COMMAND PALETTE ====================
commandPaletteButton.addEventListener('click', openCommandPalette);
commandInput.addEventListener('input', () => renderCommandResults(commandInput.value));
commandInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); commandPaletteNavigate(1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); commandPaletteNavigate(-1); }
  else if (e.key === 'Enter') { e.preventDefault(); commandPaletteExecute(); }
  else if (e.key === 'Escape') { closeCommandPalette(); }
});
commandPalette.addEventListener('click', (e) => { if (e.target === commandPalette) closeCommandPalette(); });

// ==================== DIFF ====================
diffButton.addEventListener('click', openDiffDialog);
diffClose.addEventListener('click', () => { diffDialog.hidden = true; });
diffRun.addEventListener('click', runDiff);
diffDialog.addEventListener('click', (e) => { if (e.target === diffDialog) diffDialog.hidden = true; });

// ==================== PREVIEW ====================
mainFileSelector.addEventListener("change", (e) => { state.mainFile = e.target.value || null; renderPreview(); });
closePreview.addEventListener("click", togglePreview);
previewToggle.addEventListener("click", togglePreview);

// ==================== GLOBAL KEYBOARD ====================
document.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) return;
  const modifier = event.metaKey || event.ctrlKey;
  const key = event.key.toLowerCase();

  if (modifier && !event.shiftKey && key === 'p') { event.preventDefault(); openCommandPalette(); return; }
  if (modifier && event.shiftKey && key === 'p') { event.preventDefault(); togglePreview(); return; }
  if (modifier && event.shiftKey && key === 'f') { event.preventDefault(); openProjectSearch(); return; }

  if (modifier && key === "s" && !event.shiftKey) { event.preventDefault(); saveFile(); return; }
  if (modifier && event.shiftKey && key === "s") { event.preventDefault(); saveFileAs(); return; }
  if (modifier && key === "o") { event.preventDefault(); triggerFileInput(); return; }
  if (modifier && key === "n") { event.preventDefault(); openNewFileDialog(); return; }
  if (modifier && key === "w") { event.preventDefault(); if (state.activeFile) closeFile(state.activeFile); return; }
  if (modifier && key === "f") { event.preventDefault(); openFind(false); return; }
  if (modifier && key === "h") { event.preventDefault(); openFind(true); return; }
  if (modifier && key === "d") { event.preventDefault(); duplicateLine(); return; }
  if (modifier && event.key === "/") { event.preventDefault(); toggleComment(); return; }
  if (event.altKey && key === "z") { event.preventDefault(); toggleWordWrap(); return; }
  if (event.altKey && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
    event.preventDefault();
    moveLine(event.key === "ArrowUp" ? 'up' : 'down');
    return;
  }

  if (event.key === "Escape") {
    if (!commandPalette.hidden) { closeCommandPalette(); return; }
    if (!diffDialog.hidden) { diffDialog.hidden = true; return; }
  }

  if (event.key === "Tab" && document.activeElement === editor && !state.autocompleteVisible) {
    if (tryExpandSnippet()) { event.preventDefault(); return; }
    event.preventDefault();
    const start = editor.selectionStart, end = editor.selectionEnd;
    const indent = state.useSpaces ? " ".repeat(state.tabSize) : "\t";
    const val = editor.value;
    if (start !== end && val.slice(start, end).includes("\n")) {
      const ls = val.lastIndexOf("\n", start - 1) + 1;
      const le = val.indexOf("\n", end);
      const endPos = le === -1 ? val.length : le;
      const block = val.slice(ls, endPos);
      editor.setRangeText(block.split("\n").map(l => indent + l).join("\n"), ls, endPos, "select");
    } else {
      editor.setRangeText(indent, start, end, "end");
    }
    editor.dispatchEvent(new Event("input"));
  }
});

// ==================== SERVICE WORKER ====================
const isDev = location.hostname === 'localhost'
           || location.hostname === '127.0.0.1'
           || location.hostname === '0.0.0.0'
           || location.protocol === 'file:';

if ('serviceWorker' in navigator && !isDev) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

// ==================== INIT ====================
restoreSession();
initUI();
scheduleAutoSave();
render();
updateStorageStatus();
if (state.activeFile) setTimeout(() => editor.focus(), 100);