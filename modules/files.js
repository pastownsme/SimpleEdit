// File operations: new, save, open, close, import/export, dialogs.
import { $, getFileExtension, escapeHtml } from './utils.js';
import { state, persistState, restoreSession } from './state.js';
import { render, renderTabs, showToast, updateStorageStatus } from './ui.js';
import { renderHighlightWithFind } from './highlight.js';

const editor = $("#editor");
const fileInput = $("#fileInput");
const folderInput = $("#folderInput");
const newFileDialog = $("#newFileDialog");
const newFileNameInput = $("#newFileName");
const newFileTypeSelect = $("#newFileType");
const newFileDialogTitle = $("#newFileDialogTitle");

let dialogMode = 'new';

export function switchFile(fileName) {
  if (state.contents[fileName] !== undefined) {
    state.activeFile = fileName;
    render();
    editor.focus();
  }
}

export function createNewFile(defaultName) {
  const name = defaultName || `new ${state.newFileCounter}.txt`;
  state.newFileCounter++;
  let finalName = name, suffix = 1;
  while (state.contents[finalName] !== undefined) {
    finalName = `${name.replace(/\.[^/.]+$/, "")} (${suffix}).${getFileExtension(name) || 'txt'}`;
    suffix++;
  }
  state.contents[finalName] = "";
  state.lineEndings[finalName] = '\n';
  state.activeFile = finalName;
  render(); editor.focus();
  persistState();
  showToast(`Created ${finalName}`);
}

export function closeFile(fileName) {
  if (!fileName || state.contents[fileName] === undefined) return;
  if (state.dirty.has(fileName)) {
    if (!confirm(`"${fileName}" has unsaved changes. Close anyway?`)) return;
  }
  const fileNames = Object.keys(state.contents);
  const currentIndex = fileNames.indexOf(fileName);
  delete state.contents[fileName];
  state.dirty.delete(fileName);
  delete state.lineEndings[fileName];
  if (state.mainFile === fileName) state.mainFile = null;
  if (state.activeFile === fileName) {
    const remaining = Object.keys(state.contents);
    state.activeFile = remaining.length > 0 ? remaining[Math.min(currentIndex, remaining.length - 1)] : null;
  }
  render();
  persistState();
  showToast(`Closed ${fileName}`);
}

export function saveFile() {
  if (!state.activeFile) return;
  const content = state.contents[state.activeFile] ?? "";
  const le = state.lineEndings[state.activeFile] || '\n';
  const output = le === '\r\n' ? content.replace(/\r?\n/g, '\r\n') : content;
  const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = state.activeFile;
  document.body.appendChild(link); link.click(); document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  state.dirty.delete(state.activeFile);
  renderTabs(); persistState();
  showToast(`Saved ${state.activeFile}`);
}

export function saveFileAs() {
  if (!state.activeFile) return;
  showNewFileDialog('saveAs', state.activeFile);
}

export function duplicateFile() {
  if (!state.activeFile) return;
  const src = state.activeFile;
  const ext = getFileExtension(src);
  const base = src.replace(/\.[^/.]+$/, "");
  let copyName = `${base} copy.${ext || 'txt'}`;
  let n = 2;
  while (state.contents[copyName] !== undefined) {
    copyName = `${base} copy ${n}.${ext || 'txt'}`; n++;
  }
  state.contents[copyName] = state.contents[src];
  state.lineEndings[copyName] = state.lineEndings[src] || '\n';
  state.activeFile = copyName;
  render(); persistState();
  showToast(`Duplicated as ${copyName}`);
}

export function renameFile(oldName, newName) {
  newName = newName.trim();
  if (!newName || newName === oldName) return;
  if (state.contents[newName] !== undefined) { showToast(`"${newName}" already exists`); return; }
  state.contents[newName] = state.contents[oldName];
  delete state.contents[oldName];
  if (state.dirty.has(oldName)) { state.dirty.delete(oldName); state.dirty.add(newName); }
  if (state.lineEndings[oldName]) { state.lineEndings[newName] = state.lineEndings[oldName]; delete state.lineEndings[oldName]; }
  if (state.activeFile === oldName) state.activeFile = newName;
  if (state.mainFile === oldName) state.mainFile = newName;
  render(); persistState();
  showToast(`Renamed to ${newName}`);
}

export function openFilesFromInput(files) {
  if (!files || files.length === 0) return;
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      state.contents[file.name] = content.replace(/\r\n/g, '\n');
      state.lineEndings[file.name] = content.includes('\r\n') ? '\r\n' : '\n';
      state.dirty.delete(file.name);
      state.activeFile = file.name;
      render(); persistState();
      showToast(`Opened ${file.name}`);
    };
    reader.readAsText(file);
  });
}

export async function openFolder() {
  if (!window.showDirectoryPicker) { folderInput.click(); return; }
  try {
    const dir = await window.showDirectoryPicker();
    await readDirectoryRecursive(dir);
    render(); persistState();
    showToast("Folder loaded");
  } catch (e) {
    if (e.name !== 'AbortError') console.error(e);
  }
}

async function readDirectoryRecursive(dir, prefix = '') {
  const skip = new Set(['node_modules', '.git', '.svn', 'dist', 'build', '.next', '.cache']);
  for await (const entry of dir.values()) {
    if (skip.has(entry.name)) continue;
    if (entry.kind === 'directory') {
      await readDirectoryRecursive(entry, prefix + entry.name + '/');
    } else if (entry.kind === 'file') {
      const ext = entry.name.split('.').pop().toLowerCase();
      if (['png','jpg','jpeg','gif','webp','ico','svg','woff','woff2','ttf','otf','eot','mp3','mp4','pdf','zip','exe','dll'].includes(ext)) continue;
      try {
        const file = await entry.getFile();
        if (file.size > 2 * 1024 * 1024) continue;
        const text = await file.text();
        const path = prefix + entry.name;
        state.contents[path] = text.replace(/\r\n/g, '\n');
        state.lineEndings[path] = text.includes('\r\n') ? '\r\n' : '\n';
      } catch (e) {}
    }
  }
}

export function exportCurrentFile() {
  if (!state.activeFile) { showToast("No active file"); return; }
  const blob = new Blob([state.contents[state.activeFile] ?? ""], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = state.activeFile; a.click();
  URL.revokeObjectURL(url);
  showToast(`Exported ${state.activeFile}`);
}

export async function exportProjectAsZip() {
  if (typeof JSZip === "undefined") { showToast("JSZip unavailable"); return; }
  const files = Object.keys(state.contents);
  if (files.length === 0) { showToast("No files to export"); return; }
  try {
    const zip = new JSZip();
    files.forEach(f => zip.file(f, state.contents[f]));
    const blob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `project-${Date.now()}.zip`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    showToast("Project exported");
  } catch (err) { showToast("Export failed: " + err.message); }
}

export async function importProjectFromFile(file) {
  if (!file || typeof JSZip === "undefined") return;
  if (Object.keys(state.contents).length > 0) {
    if (!confirm("Import will replace all current open files. Continue?")) return;
  }
  try {
    const zip = await JSZip.loadAsync(file);
    state.contents = {}; state.dirty.clear(); state.lineEndings = {};
    state.activeFile = null; state.mainFile = null;
    let count = 0;
    for (const [name, entry] of Object.entries(zip.files)) {
      if (!entry.dir) {
        try {
          const content = await entry.async("string");
          state.contents[name] = content.replace(/\r\n/g, '\n');
          state.lineEndings[name] = content.includes('\r\n') ? '\r\n' : '\n';
          count++;
        } catch (e) {}
      }
    }
    const names = Object.keys(state.contents);
    if (names.length) state.activeFile = names[0];
    render(); persistState();
    showToast(`Imported ${count} file(s)`);
  } catch (e) { showToast("Import failed: " + e.message); }
}

export function openNewFileDialog(mode = 'new', prefill = '') {
  dialogMode = mode;
  newFileDialogTitle.textContent = mode === 'saveAs' ? 'Save As' : 'Create New File';
  newFileNameInput.value = prefill;
  newFileNameInput.focus();
  if (prefill.includes('.')) newFileNameInput.setSelectionRange(0, prefill.lastIndexOf('.'));
  newFileDialog.hidden = false;
}

export function closeNewFileDialog() { newFileDialog.hidden = true; }

export function confirmNewFileDialog() {
  let fileName = newFileNameInput.value.trim();
  if (!fileName) { showToast("Enter a file name"); return; }
  const type = newFileTypeSelect.value;
  if (!fileName.includes(".")) fileName = `${fileName}.${type}`;
  if (dialogMode === 'saveAs') {
    const old = state.activeFile;
    if (state.contents[fileName] !== undefined && fileName !== old) { showToast(`"${fileName}" already exists`); return; }
    if (old) {
      state.contents[fileName] = state.contents[old];
      delete state.contents[old];
      if (state.dirty.has(old)) { state.dirty.delete(old); state.dirty.add(fileName); }
      if (state.lineEndings[old]) { state.lineEndings[fileName] = state.lineEndings[old]; delete state.lineEndings[old]; }
      state.activeFile = fileName;
      render(); persistState();
      showToast(`Saved as ${fileName}`);
    }
  } else {
    createNewFile(fileName);
  }
  closeNewFileDialog();
}

export function clearStoredSession() {
  if (!confirm("Clear the saved session? All unsaved files will be lost.")) return;
  localStorage.removeItem('simpleedit:session:v3');
  updateStorageStatus();
  showToast("Session cleared");
}