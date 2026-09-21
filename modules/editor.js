// Editor features: auto-close, auto-indent (smart), comment toggle, line ops, snippets, word wrap.
import { $, getCurrentWord, getLanguage } from './utils.js';
import { state, persistSettings } from './state.js';
import { SNIPPETS } from './snippets.js';
import { HTML_TAGS, VOID_TAGS } from './html.js';
import { renderHighlightWithFind, updateLineNumbers } from './highlight.js';

const editor = $("#editor");
const highlightLayer = $("#highlightLayer");
const editorArea = $(".editor-area");
const wrapToggle = $("#wrapToggle");
const wrapStatus = $("#wrapStatus");

const PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
const CLOSERS = new Set([')', ']', '}', '"', "'", '`']);

let highlightRafId = null;
export function scheduleHighlight() {
  if (highlightRafId) return;
  highlightRafId = requestAnimationFrame(() => {
    highlightRafId = null;
    if (!state.activeFile) return;
    highlightLayer.innerHTML = renderHighlightWithFind(editor.value, state.activeFile, state);
    updateLineNumbers(editor.value);
  });
}

// ==================== HELPERS ====================
function indentUnit() {
  return state.useSpaces ? ' '.repeat(state.tabSize) : '\t';
}

function getLineBounds(text, pos) {
  const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
  let lineEnd = text.indexOf('\n', pos);
  if (lineEnd === -1) lineEnd = text.length;
  return { lineStart, lineEnd };
}

// ==================== AUTO-CLOSE ====================
export function handleAutoClose(e) {
  if (!state.autoClose) return;
  const ch = e.data;
  if (!ch || ch.length !== 1) return;

  // ===== Auto-expand block on `{` =====
  // Când userul tastează `{` la finalul unei linii (sau doar spații după),
  // inserează un bloc complet:
  //   {
  //       <cursor aici>
  //   }
  // cu `}` aliniat cu indentarea liniei curente.
  if (ch === '{') {
    const pos = editor.selectionStart;
    const selEnd = editor.selectionEnd;

    if (pos === selEnd) {
      const text = editor.value;
      const lineEnd = text.indexOf('\n', pos);
      const restOfLine = lineEnd === -1 ? text.slice(pos) : text.slice(pos, lineEnd);

      // Expandăm doar dacă nu mai e nimic pe linia curentă după cursor
      if (/^[ \t]*$/.test(restOfLine)) {
        const { lineStart } = getLineBounds(text, pos);
        const lineText = text.slice(lineStart, pos);
        const baseIndent = (lineText.match(/^[\t ]*/) || [''])[0];
        const unit = indentUnit();

        e.preventDefault();
        const insert = '{\n' + baseIndent + unit + '\n' + baseIndent + '}';
        editor.setRangeText(insert, pos, selEnd, 'end');
        // Cursor pe linia din mijloc, după indent
        const cursorPos = pos + 2 + baseIndent.length + unit.length;
        editor.setSelectionRange(cursorPos, cursorPos);
        editor.dispatchEvent(new Event('input'));
        return;
      }
    }
    // Altfel, cade în logica de mai jos (auto-close normal `{}`)
  }

  // ===== Auto-close HTML tag on '>' =====
  if (ch === '>' && state.activeFile && getLanguage(state.activeFile, state.syntaxMode) === 'html') {
    const pos = editor.selectionStart;
    const selEnd = editor.selectionEnd;

    if (pos === selEnd) {
      const before = editor.value.slice(0, pos);
      const m = before.match(/<([a-zA-Z][\w-]*)\b[^<>]*$/);
      if (m) {
        const tagName = m[1].toLowerCase();
        const fullMatch = m[0];
        const isSelfClosing = /\/\s*$/.test(fullMatch);

        if (!isSelfClosing && HTML_TAGS.includes(tagName) && !VOID_TAGS.has(tagName)) {
          const after = editor.value.slice(pos);
          const alreadyClosed = after.startsWith(`</${tagName}>`);

          if (!alreadyClosed) {
            e.preventDefault();
            const insert = '>' + `</${tagName}>`;
            editor.setRangeText(insert, pos, selEnd, 'end');
            editor.setSelectionRange(pos + 1, pos + 1);
            editor.dispatchEvent(new Event('input'));
            return;
          }
        }
      }
    }
  }

  // ===== Auto-skip closing char =====
  if (CLOSERS.has(ch)) {
    const pos = editor.selectionStart;
    if (editor.value[pos] === ch && editor.selectionStart === editor.selectionEnd) {
      e.preventDefault();
      editor.setSelectionRange(pos + 1, pos + 1);
    }
    return;
  }

  // ===== Auto-close brackets & quotes =====
  if (!PAIRS[ch]) return;

  const pos = editor.selectionStart;
  const sel = editor.selectionEnd;
  const before = editor.value[pos - 1] || '';
  const after = editor.value[pos] || '';
  const isQuote = ch === '"' || ch === "'" || ch === '`';
  if (isQuote && /[\w$]/.test(before) && /[\w$]/.test(after)) return;

  e.preventDefault();
  const selected = editor.value.slice(pos, sel);
  if (selected) {
    editor.setRangeText(ch + selected + PAIRS[ch], pos, sel, 'end');
    editor.setSelectionRange(pos + 1, pos + 1 + selected.length);
  } else {
    editor.setRangeText(ch + PAIRS[ch], pos, pos, 'end');
    editor.setSelectionRange(pos + 1, pos + 1);
  }
  editor.dispatchEvent(new Event('input'));
}

// ==================== SMART AUTO-INDENT (on Enter) ====================
export function handleAutoIndent(e) {
  if (!state.autoIndent) return;
  if (e.key !== 'Enter' || e.shiftKey || state.autocompleteVisible) return;

  const pos = editor.selectionStart;
  const sel = editor.selectionEnd;
  const text = editor.value;

  const selected = text.slice(pos, sel);
  if (selected.includes('\n')) return;

  const before = text.slice(0, pos);
  const lastLine = before.split('\n').pop();
  const baseIndent = (lastLine.match(/^[\t ]*/) || [''])[0];
  const trimmed = lastLine.trim();
  const unit = indentUnit();

  const opensBlock = /[{[(]\s*$/.test(lastLine);
  const isCloserOnly = /^[}\])];?$/.test(trimmed);
  const isMiddleBlock = /^[}\])].*\{$/.test(trimmed);

  let newIndent = baseIndent;

  if (opensBlock) {
    newIndent = baseIndent + unit;
  } else if (isMiddleBlock) {
    newIndent = baseIndent + unit;
  } else if (isCloserOnly) {
    const dedentLen = state.useSpaces ? state.tabSize : 1;
    newIndent = baseIndent.slice(0, Math.max(0, baseIndent.length - dedentLen));
  }

  e.preventDefault();
  editor.setRangeText('\n' + newIndent, pos, sel, 'end');
  editor.dispatchEvent(new Event('input'));
}

// ==================== AUTO-DEDENT (on typing a closer) ====================
export function handleAutoDedent(e) {
  if (!state.autoIndent) return;
  if (e.defaultPrevented) return;
  if (!state.activeFile) return;

  const ch = e.key;
  if (ch !== '}' && ch !== ']' && ch !== ')') return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  const pos = editor.selectionStart;
  if (pos !== editor.selectionEnd) return;

  const text = editor.value;
  const { lineStart } = getLineBounds(text, pos);
  const beforeLine = text.slice(lineStart, pos);
  const afterCursor = text.slice(pos);

  if (!/^[\t ]*$/.test(beforeLine)) return;

  const restOfLine = afterCursor.split('\n')[0];
  if (restOfLine.trim() !== '' && restOfLine.trim() !== ';') return;

  if (lineStart !== pos - beforeLine.length) return;

  e.preventDefault();
  editor.setRangeText(ch, lineStart, pos, 'end');
  const newPos = lineStart + 1;
  editor.setSelectionRange(newPos, newPos);
  editor.dispatchEvent(new Event('input'));
}

// ==================== OTHER FEATURES ====================
export function toggleComment() {
  if (!state.activeFile) return;
  const lang = getLanguage(state.activeFile, state.syntaxMode);
  let open = '// ', close = '';
  if (lang === 'html') { open = '<!-- '; close = ' -->'; }
  else if (lang === 'css') { open = '/* '; close = ' */'; }

  const start = editor.selectionStart, end = editor.selectionEnd;
  const val = editor.value;
  const lineStart = val.lastIndexOf('\n', start - 1) + 1;
  const lineEndIdx = val.indexOf('\n', end);
  const lineEnd = lineEndIdx === -1 ? val.length : lineEndIdx;
  const block = val.slice(lineStart, lineEnd);
  const lines = block.split('\n');

  const allCommented = lines.every(l => l.trim().startsWith(open.trim()) || l.trim() === '');
  const newLines = lines.map(l => {
    if (l.trim() === '') return l;
    if (allCommented) {
      let x = l;
      const trimIdx = l.search(/\S/);
      if (trimIdx >= 0 && l.slice(trimIdx).startsWith(open.trim())) {
        x = l.slice(0, trimIdx) + l.slice(trimIdx + open.trim().length).replace(/^\s/, '');
        if (close) x = x.replace(new RegExp('\\s*' + close.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$'), '');
      }
      return x;
    } else {
      const trimIdx = l.search(/\S/);
      const prefix = trimIdx >= 0 ? l.slice(0, trimIdx) : '';
      const rest = trimIdx >= 0 ? l.slice(trimIdx) : l;
      return prefix + open + rest + close;
    }
  }).join('\n');
  editor.setRangeText(newLines, lineStart, lineEnd, 'select');
  editor.dispatchEvent(new Event('input'));
}

export function duplicateLine() {
  if (!state.activeFile) return;
  const pos = editor.selectionStart;
  const val = editor.value;
  const ls = val.lastIndexOf('\n', pos - 1) + 1;
  let le = val.indexOf('\n', pos);
  if (le === -1) le = val.length;
  const line = val.slice(ls, le);
  editor.setRangeText('\n' + line, le, le, 'end');
  editor.dispatchEvent(new Event('input'));
}

export function moveLine(dir) {
  if (!state.activeFile) return;
  const pos = editor.selectionStart;
  const val = editor.value;
  const ls = val.lastIndexOf('\n', pos - 1) + 1;
  let le = val.indexOf('\n', pos);
  const atEnd = le === -1;
  if (atEnd) le = val.length;
  const line = val.slice(ls, le);
  if (dir === 'up' && ls === 0) return;
  if (dir === 'down' && le >= val.length) return;

  if (dir === 'up') {
    const prevLineStart = val.lastIndexOf('\n', ls - 2) + 1;
    const prevLine = val.slice(prevLineStart, ls - 1);
    const newBlock = line + '\n' + prevLine;
    editor.setRangeText(newBlock, prevLineStart, le, 'end');
    const newPos = prevLineStart + line.length + 1 + (pos - ls);
    editor.setSelectionRange(newPos, newPos);
  } else {
    const nextLineEndIdx = val.indexOf('\n', le + 1);
    const nextEnd = nextLineEndIdx === -1 ? val.length : nextLineEndIdx;
    const nextLine = val.slice(le + 1, nextEnd);
    const newBlock = nextLine + '\n' + line;
    editor.setRangeText(newBlock, ls, nextEnd, 'end');
    const newPos = ls + nextLine.length + 1 + (pos - ls);
    editor.setSelectionRange(newPos, newPos);
  }
  editor.dispatchEvent(new Event('input'));
}

export function tryExpandSnippet() {
  if (!state.activeFile) return false;
  const lang = getLanguage(state.activeFile, state.syntaxMode);
  const data = SNIPPETS[lang];
  if (!data) return false;

  const { word, start, end } = getCurrentWord(editor.value, editor.selectionStart);

  if (start > 0 && editor.value[start - 1] === '<') return false;

  if (data[word]) {
    const snip = data[word];
    editor.setRangeText(snip.body, start, end, 'end');
    editor.dispatchEvent(new Event('input'));
    import('./ui.js').then(m => m.showToast(`Snippet: ${snip.label}`));
    return true;
  }

  if (lang === 'html') {
    const m = word.match(/^([a-z][a-z0-9]*)((?:[.#][\w-]+)*)$/i);
    if (m) {
      const [, tag, mods] = m;
      if (HTML_TAGS.includes(tag.toLowerCase())) {
        let cls = '', id = '';
        const modRe = /([.#])([\w-]+)/g;
        let mm;
        while ((mm = modRe.exec(mods)) !== null) {
          if (mm[1] === '.') cls += (cls ? ' ' : '') + mm[2];
          else id = mm[2];
        }
        let attrs = '';
        if (id) attrs += ` id="${id}"`;
        if (cls) attrs += ` class="${cls}"`;
        const isVoid = VOID_TAGS.has(tag.toLowerCase());
        const body = isVoid ? `<${tag}${attrs}>` : `<${tag}${attrs}></${tag}>`;
        const pos = start;
        editor.setRangeText(body, start, end, 'end');
        if (!isVoid) {
          const cursorBack = body.indexOf('></') + 1;
          editor.setSelectionRange(pos + cursorBack, pos + cursorBack);
        } else {
          editor.setSelectionRange(pos + body.length, pos + body.length);
        }
        editor.dispatchEvent(new Event('input'));
        return true;
      }
    }
  }
  return false;
}

export function toggleWordWrap() {
  state.wordWrap = !state.wordWrap;
  editorArea.classList.toggle("word-wrap", state.wordWrap);
  wrapToggle.classList.toggle("active", state.wordWrap);
  wrapStatus.textContent = state.wordWrap ? "Wrap: On" : "No Wrap";
  persistSettings();
  import('./ui.js').then(m => m.showToast(state.wordWrap ? "Word Wrap Enabled" : "Word Wrap Disabled"));
}