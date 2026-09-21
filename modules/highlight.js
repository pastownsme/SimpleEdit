// Syntax highlighting + bracket matching + find decorations.
import { escapeCode, escapeHtml } from './utils.js';

const $ = (s) => document.querySelector(s);

const JS_KEYWORDS = new Set([
  'abstract','arguments','async','await','break','case','catch','class','const',
  'continue','debugger','default','delete','do','else','enum','export','extends',
  'false','finally','for','function','if','implements','import','in','instanceof',
  'interface','let','new','null','package','private','protected','public','return',
  'static','super','switch','this','throw','true','try','typeof','undefined','var',
  'void','while','with','yield','of'
]);

const JS_BUILTINS = new Set([
  'console','window','document','Array','Object','String','Number','Boolean',
  'Date','Math','JSON','Promise','Map','Set','WeakMap','WeakSet','Symbol','Proxy',
  'Reflect','Intl','ArrayBuffer','DataView','Error','TypeError','RangeError',
  'Infinity','NaN','undefined','globalThis'
]);

const CSS_KEYWORDS = new Set([
  'none','auto','inherit','initial','unset','revert','absolute','relative',
  'fixed','sticky','center','flex','grid','inline','block','flex-start',
  'flex-end','bold','italic','normal','uppercase','lowercase','capitalize',
  'transparent','solid','dashed','dotted','hidden','visible','static','pointer',
  'middle','top','bottom','left','right','start','end','space-between',
  'space-around','space-evenly','baseline','stretch','nowrap','wrap','row',
  'column','row-reverse','column-reverse','inline-block','inline-flex',
  'inline-grid','table'
]);

export function highlightSyntax(code, fileName, syntaxMode = 'auto') {
  if (!code) return " ";
  const escaped = escapeCode(code);
  let mode = syntaxMode;
  if (mode === "auto") {
    const ext = (fileName || '').split('.').pop().toLowerCase();
    if (ext === "html" || ext === "htm") mode = "html";
    else if (ext === "css" || ext === "scss" || ext === "less") mode = "css";
    else if (["js","ts","jsx","tsx","json"].includes(ext)) mode = "javascript";
    else if (ext === "md" || ext === "markdown") mode = "markdown";
  }
  if (mode === "html") return highlightHTML(escaped);
  if (mode === "css") return highlightCSS(escaped);
  if (mode === "javascript") return highlightJavaScript(escaped);
  if (mode === "markdown") return highlightMarkdown(escaped);
  return escaped;
}

function highlightHTML(code) {
  let out = '', i = 0;
  while (i < code.length) {
    if (code.startsWith('&lt;!--', i)) {
      const end = code.indexOf('--&gt;', i + 8);
      if (end !== -1) { const e = end + 5; out += `<span class="token-comment">${code.slice(i, e)}</span>`; i = e; continue; }
      out += '&lt;'; i += 4; continue;
    }
    if (code.startsWith('&lt;!', i)) {
      const end = code.indexOf('&gt;', i + 4);
      const nextLt = code.indexOf('&lt;', i + 4);
      if (end !== -1 && (nextLt === -1 || end < nextLt)) {
        const e = end + 4;
        out += `<span class="token-keyword">${code.slice(i, e)}</span>`; i = e; continue;
      }
      out += '&lt;'; i += 4; continue;
    }
    if (code.startsWith('&lt;', i)) {
      const end = code.indexOf('&gt;', i + 4);
      const nextLt = code.indexOf('&lt;', i + 4);
      if (end !== -1 && (nextLt === -1 || end < nextLt)) {
        const e = end + 4;
        out += renderHTMLTag(code.slice(i, e)); i = e; continue;
      }
      out += '&lt;'; i += 4; continue;
    }
    let next = code.indexOf('&lt;', i);
    if (next === -1) next = code.length;
    out += code.slice(i, next);
    i = next;
  }
  return out;
}

function renderHTMLTag(tagStr) {
  const m = tagStr.match(/^(&lt;\/?)([\w-]+)([\s\S]*?)(\/?&gt;)$/);
  if (!m) return tagStr;
  const [, open, name, attrs, close] = m;
  return open + `<span class="token-tag">${name}</span>` + renderHTMLAttrs(attrs) + close;
}

function renderHTMLAttrs(str) {
  let out = '', i = 0;
  while (i < str.length) {
    const wsM = str.slice(i).match(/^\s+/);
    if (wsM) { out += wsM[0]; i += wsM[0].length; continue; }
    const nameM = str.slice(i).match(/^([\w:-]+)/);
    if (nameM) {
      out += `<span class="token-attr">${nameM[1]}</span>`;
      i += nameM[1].length;
      const eqM = str.slice(i).match(/^\s*=\s*/);
      if (eqM) {
        out += eqM[0]; i += eqM[0].length;
        const valM = str.slice(i).match(/^("[^"]*"|'[^']*'|[^\s]+)/);
        if (valM) { out += `<span class="token-string">${valM[0]}</span>`; i += valM[0].length; }
      }
      continue;
    }
    out += str[i]; i++;
  }
  return out;
}

function highlightCSS(code) {
  let out = '', i = 0, inBlock = 0;
  while (i < code.length) {
    if (code.startsWith('/*', i)) {
      const end = code.indexOf('*/', i + 2);
      const e = end === -1 ? code.length : end + 2;
      out += `<span class="token-comment">${code.slice(i, e)}</span>`; i = e; continue;
    }
    if (code.startsWith('//', i)) {
      let end = code.indexOf('\n', i);
      if (end === -1) end = code.length;
      out += `<span class="token-comment">${code.slice(i, end)}</span>`; i = end; continue;
    }
    const ch = code[i];
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === ch) { j++; break; }
        if (code[j] === '\n') break;
        j++;
      }
      out += `<span class="token-string">${code.slice(i, j)}</span>`; i = j; continue;
    }
    if (ch === '{') { inBlock++; out += ch; i++; continue; }
    if (ch === '}') { inBlock = Math.max(0, inBlock - 1); out += ch; i++; continue; }
    if (ch === '@') {
      const m = code.slice(i).match(/^@[\w-]+/);
      if (m) { out += `<span class="token-keyword">${m[0]}</span>`; i += m[0].length; continue; }
    }
    if (inBlock === 0 && (ch === '.' || ch === '#')) {
      const m = code.slice(i).match(/^[.#][\w-]+/);
      if (m) {
        const cls = ch === '.' ? 'token-tag' : 'token-attr';
        out += `<span class="${cls}">${m[0]}</span>`; i += m[0].length; continue;
      }
    }
    if (inBlock > 0 && ch === '#') {
      const m = code.slice(i).match(/^#[0-9a-fA-F]{3,8}\b/);
      if (m) { out += `<span class="token-string">${m[0]}</span>`; i += m[0].length; continue; }
    }
    const numM = code.slice(i).match(/^-?\d+(?:\.\d+)?(?:[a-z%]+)?/i);
    if (numM) { out += `<span class="token-number">${numM[0]}</span>`; i += numM[0].length; continue; }
    const idM = code.slice(i).match(/^[\w-]+/);
    if (idM) {
      const word = idM[0];
      if (inBlock > 0) {
        const after = code.slice(i + word.length);
        if (/^\s*:/.test(after)) out += `<span class="token-attr">${word}</span>`;
        else if (CSS_KEYWORDS.has(word.toLowerCase())) out += `<span class="token-keyword">${word}</span>`;
        else out += word;
      } else out += `<span class="token-tag">${word}</span>`;
      i += word.length; continue;
    }
    out += ch; i++;
  }
  return out;
}

function highlightJavaScript(code) {
  let out = '', i = 0;
  while (i < code.length) {
    if (code.startsWith('//', i)) {
      let end = code.indexOf('\n', i);
      if (end === -1) end = code.length;
      out += `<span class="token-comment">${code.slice(i, end)}</span>`; i = end; continue;
    }
    if (code.startsWith('/*', i)) {
      const end = code.indexOf('*/', i + 2);
      const e = end === -1 ? code.length : end + 2;
      out += `<span class="token-comment">${code.slice(i, e)}</span>`; i = e; continue;
    }
    const ch = code[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === ch) { j++; break; }
        if (code[j] === '\n' && ch !== '`') break;
        j++;
      }
      out += `<span class="token-string">${code.slice(i, j)}</span>`; i = j; continue;
    }
    const numM = code.slice(i).match(/^0[xX][0-9a-fA-F]+n?|^0[bB][01]+n?|^0[oO][0-7]+n?|^\d+n?|^\d+\.\d+(?:[eE][+-]?\d+)?|^\.\d+/);
    if (numM) { out += `<span class="token-number">${numM[0]}</span>`; i += numM[0].length; continue; }
    const idM = code.slice(i).match(/^[a-zA-Z_$][\w$]*/);
    if (idM) {
      const word = idM[0];
      if (JS_KEYWORDS.has(word)) out += `<span class="token-keyword">${word}</span>`;
      else if (JS_BUILTINS.has(word)) out += `<span class="token-attr">${word}</span>`;
      else {
        const after = code.slice(i + word.length);
        if (/^\s*\(/.test(after)) out += `<span class="token-function">${word}</span>`;
        else out += word;
      }
      i += word.length; continue;
    }
    out += ch; i++;
  }
  return out;
}

function highlightMarkdown(code) {
  let out = '';
  for (const line of code.split('\n')) {
    if (/^#{1,6}\s/.test(line)) { out += `<span class="token-heading">${line}</span>\n`; continue; }
    if (/^\s*[-*+]\s/.test(line) || /^\s*\d+\.\s/.test(line)) { out += `<span class="token-keyword">${line}</span>\n`; continue; }
    if (/^\s*&gt;/.test(line)) { out += `<span class="token-comment">${line}</span>\n`; continue; }
    let l = line
      .replace(/`([^`]+)`/g, '<span class="token-string">`$1`</span>')
      .replace(/\*\*([^*]+)\*\*/g, '<span class="token-keyword">**$1**</span>')
      .replace(/\*([^*]+)\*/g, '<span class="token-attr">*$1*</span>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="token-function">[$1]</span>(<span class="token-string">$2</span>)');
    out += l + '\n';
  }
  return out.replace(/\n$/, '');
}

export function findBracketPair(text, pos, enabled = true) {
  if (!enabled) return null;
  const openers = { '(': ')', '[': ']', '{': '}' };
  const closers = { ')': '(', ']': '[', '}': '{' };
  const candidates = [pos, pos - 1].filter(p => p >= 0 && p < text.length);
  for (const p of candidates) {
    const ch = text[p];
    if (openers[ch]) {
      let depth = 1;
      for (let i = p + 1; i < text.length; i++) {
        if (text[i] === ch) depth++;
        else if (text[i] === openers[ch]) { depth--; if (depth === 0) return [{ start: p, end: p + 1 }, { start: i, end: i + 1 }]; }
      }
      return null;
    }
    if (closers[ch]) {
      let depth = 1;
      for (let i = p - 1; i >= 0; i--) {
        if (text[i] === ch) depth++;
        else if (text[i] === closers[ch]) { depth--; if (depth === 0) return [{ start: i, end: i + 1 }, { start: p, end: p + 1 }]; }
      }
      return null;
    }
  }
  return null;
}

export function renderHighlightWithFind(code, fileName, state) {
  if (!code) return " ";
  const editor = $("#editor");
  const query = state.find.query;
  const matches = state.find.matches;

  const ranges = [];
  if (query && matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      ranges.push({ ...matches[i], cls: i === state.find.currentIndex ? 'find-match current' : 'find-match' });
    }
  }
  const brackets = findBracketPair(code, editor.selectionStart, state.bracketMatch);
  if (brackets) {
    ranges.push({ ...brackets[0], cls: 'bracket-match' });
    ranges.push({ ...brackets[1], cls: 'bracket-match' });
  }

  if (ranges.length === 0) return highlightSyntax(code, fileName, state.syntaxMode);

  ranges.sort((a, b) => a.start - b.start);
  const clean = [];
  let last = 0;
  for (const r of ranges) { if (r.start >= last) { clean.push(r); last = r.end; } }

  let html = "", cursor = 0;
  for (const r of clean) {
    if (r.start > cursor) html += highlightSyntax(code.slice(cursor, r.start), fileName, state.syntaxMode);
    html += `<mark class="${r.cls}">${escapeHtml(code.slice(r.start, r.end))}</mark>`;
    cursor = r.end;
  }
  if (cursor < code.length) html += highlightSyntax(code.slice(cursor), fileName, state.syntaxMode);
  return html || " ";
}

export function updateLineNumbers(text) {
  const lineNumbers = $("#lineNumbers");
  const count = (text || "").split("\n").length;
  let html = "";
  for (let i = 1; i <= count; i++) html += `<div>${i}</div>`;
  lineNumbers.innerHTML = html;
}