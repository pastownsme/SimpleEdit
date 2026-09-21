// Shared helpers.

export const $ = (s) => document.querySelector(s);
export const $$ = (s) => document.querySelectorAll(s);

export function getFileExtension(filename) {
  if (!filename) return "";
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

export function getFileIcon(filename) {
  const ext = getFileExtension(filename);
  switch (ext) {
    case "html": case "htm": return { icon: "◈", class: "html" };
    case "css": case "scss": case "less": return { icon: "✦", class: "css" };
    case "js": case "ts": case "jsx": case "tsx": case "mjs": return { icon: "◆", class: "js" };
    case "md": case "markdown": return { icon: "▤", class: "md" };
    case "json": return { icon: "{}", class: "js" };
    default: return { icon: "◇", class: "txt" };
  }
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function escapeCode(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

export function escapeRegexChars(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getLanguage(filename, syntaxMode = 'auto') {
  if (syntaxMode !== 'auto') return syntaxMode;
  const ext = getFileExtension(filename);
  if (['html', 'htm'].includes(ext)) return 'html';
  if (['css', 'scss', 'less'].includes(ext)) return 'css';
  if (['js', 'ts', 'jsx', 'tsx', 'json'].includes(ext)) return 'javascript';
  if (['md', 'markdown'].includes(ext)) return 'markdown';
  return 'html';
}

export function getCurrentWord(text, cursorPos) {
  let start = cursorPos, end = cursorPos;
  while (start > 0 && /[a-zA-Z0-9_-]/.test(text[start - 1])) start--;
  while (end < text.length && /[a-zA-Z0-9_-]/.test(text[end])) end++;
  return { word: text.substring(start, end), start, end };
}

export function filterSuggestions(suggestions, word, maxResults = 25) {
  if (!word) return suggestions.slice(0, maxResults);
  const lower = word.toLowerCase();
  const scored = suggestions
    .map(s => {
      const idx = s.toLowerCase().indexOf(lower);
      if (idx === -1) return null;
      const score = idx === 0 ? 1000 - s.length : 500 - idx;
      return { s, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, maxResults).map(x => x.s);
}