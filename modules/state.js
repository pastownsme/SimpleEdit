// Global state + persistence.

export const STORAGE_KEY = 'simpleedit:session:v3';
export const STORAGE_SETTINGS = 'simpleedit:settings:v3';

export const state = {
  activeFile: null,
  contents: {},
  dirty: new Set(),
  lineEndings: {},
  newFileCounter: 1,
  wordWrap: false,
  tabSize: 4,
  useSpaces: true,
  syntaxMode: "auto",
  previewVisible: false,
  mainFile: null,
  autocompleteVisible: false,
  autocompleteIndex: -1,
  autocompleteNavigated: false,
  autoClose: true,
  autoIndent: true,
  bracketMatch: true,
  autoSave: true,
  autoSaveDelay: 30,
  find: {
    query: "", replace: "", matchCase: false,
    matches: [], currentIndex: -1
  }
};

import { debounce, $ } from './utils.js';

export const persistState = debounce(() => {
  if (!state.autoSave) return;
  try {
    const snapshot = {
      contents: state.contents,
      activeFile: state.activeFile,
      dirty: [...state.dirty],
      lineEndings: state.lineEndings,
      newFileCounter: state.newFileCounter,
      savedAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    updateStorageStatus();
  } catch (e) {
    console.warn('persist failed:', e);
  }
}, 400);

export function persistSettings() {
  try {
    const s = {
      tabSize: state.tabSize, useSpaces: state.useSpaces,
      syntaxMode: state.syntaxMode, wordWrap: state.wordWrap,
      autoClose: state.autoClose, autoIndent: state.autoIndent,
      bracketMatch: state.bracketMatch, autoSave: state.autoSave,
      autoSaveDelay: state.autoSaveDelay
    };
    localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(s));
  } catch (e) {}
}

export function restoreSession() {
  try {
    const s = localStorage.getItem(STORAGE_SETTINGS);
    if (s) {
      const st = JSON.parse(s);
      state.tabSize = st.tabSize ?? 4;
      state.useSpaces = st.useSpaces ?? true;
      state.syntaxMode = st.syntaxMode ?? 'auto';
      state.wordWrap = st.wordWrap ?? false;
      state.autoClose = st.autoClose ?? true;
      state.autoIndent = st.autoIndent ?? true;
      state.bracketMatch = st.bracketMatch ?? true;
      state.autoSave = st.autoSave ?? true;
      state.autoSaveDelay = st.autoSaveDelay ?? 30;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const snap = JSON.parse(raw);
      state.contents = snap.contents || {};
      state.activeFile = snap.activeFile || null;
      state.dirty = new Set(snap.dirty || []);
      state.lineEndings = snap.lineEndings || {};
      state.newFileCounter = snap.newFileCounter || 1;
    }
  } catch (e) {
    console.warn('restore failed:', e);
  }
}

export function updateStorageStatus() {
  const el = $("#storageStatus");
  if (!el) return;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) { el.textContent = 'autosave: —'; return; }
  const snap = JSON.parse(raw);
  const files = Object.keys(snap.contents || {}).length;
  const ago = Math.round((Date.now() - (snap.savedAt || 0)) / 1000);
  el.textContent = `${files}f · ${ago}s`;
}

export function clearStoredSession() {
  if (!confirm("Clear the saved session? All unsaved files will be lost.")) return;
  localStorage.removeItem(STORAGE_KEY);
  updateStorageStatus();
  import('./ui.js').then(m => m.showToast("Session cleared"));
}

let autoSaveTimer = null;
export function scheduleAutoSave() {
  clearInterval(autoSaveTimer);
  autoSaveTimer = setInterval(() => {
    if (state.autoSave) { persistState(); updateStorageStatus(); }
  }, state.autoSaveDelay * 1000);
}