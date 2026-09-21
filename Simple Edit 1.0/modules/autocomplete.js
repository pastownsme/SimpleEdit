// Autocomplete orchestrator.
import { $, getCurrentWord, getLanguage, filterSuggestions, escapeRegexChars } from './utils.js';
import { state } from './state.js';
import {
  HTML_TAGS, HTML_GLOBAL_ATTRIBUTES, TAG_ATTRIBUTES,
  ATTRIBUTE_VALUES_BY_TAG, GENERIC_ATTRIBUTE_VALUES,
  getHTMLContext, getCurrentTagName, getContextAttributes, getAttributeValues
} from './html.js';
import {
  CSS_PROPERTIES, CSS_VALUES, CSS_VALUE_BY_PROPERTY,
  CSS_PSEUDO_CLASSES, CSS_PSEUDO_ELEMENTS, CSS_AT_RULES,
  CSS_UNITS, CSS_FUNCTIONS, CSS_COLORS,
  getCSSPropertyContext, isColorProperty
} from './css.js';
import { JS_KEYWORDS, JS_OBJECTS, JS_METHODS, JS_BUILTIN, JS_MEMBER_SUGGESTIONS, getLocalSymbols, getObjectLiteralMembers, getMemberContext } from './js.js';
import { SNIPPETS } from './snippets.js';
import { renderHighlightWithFind, updateLineNumbers } from './highlight.js';

const editor = $("#editor");
const highlightLayer = $("#highlightLayer");
const autocompleteMenu = $("#autocompleteMenu");
const autocompleteList = $("#autocompleteList");

function detectHTMLContext(text, cursorPos) {
  const before = text.slice(0, cursorPos);
  const lastStyle = before.lastIndexOf('<style');
  const lastStyleClose = before.lastIndexOf('</style>');
  const lastScript = before.lastIndexOf('<script');
  const lastScriptClose = before.lastIndexOf('</script>');
  if (lastStyle !== -1 && lastStyle > lastStyleClose) return 'css';
  if (lastScript !== -1 && lastScript > lastScriptClose) return 'javascript';
  return 'html';
}

export function showAutocomplete() {
  if (!state.activeFile) return;
  const text = editor.value;
  const cursorPos = editor.selectionStart;
  const { word, start: wordStart, end: wordEnd } = getCurrentWord(text, cursorPos);
  let language = getLanguage(state.activeFile, state.syntaxMode);

  if (language === 'html') {
    const ctx = detectHTMLContext(text, cursorPos);
    if (ctx === 'css' || ctx === 'javascript') language = ctx;
  }

  // ==================== JS member access ====================
  if (language === 'javascript') {
    const obj = getMemberContext(text, cursorPos);
    if (obj) {
      const members = JS_MEMBER_SUGGESTIONS[obj] || getObjectLiteralMembers(text, obj);
      if (members) {
        const filtered = filterSuggestions(members, word);
        if (filtered.length === 0) { hideAutocomplete(); return; }
        renderAutocompleteMenu(filtered, 'method', word);
        return;
      }
    }
  }

  // ==================== HTML ====================
  if (language === 'html') {
    const ctx = getHTMLContext(text, cursorPos);

    if (ctx.type === 'attribute-value') {
      const values = getAttributeValues(ctx.tagName, ctx.attrName);
      if (values) {
        const filtered = filterSuggestions(values, ctx.partial);
        if (filtered.length === 0) { hideAutocomplete(); return; }
        const beforeQuote = text.slice(0, cursorPos);
        const quoteIdx = beforeQuote.lastIndexOf(ctx.quote);
        const replaceStart = quoteIdx + 1;
        const replaceEnd = cursorPos;
        renderAutocompleteMenu(filtered, 'value', ctx.partial, replaceStart, replaceEnd);
        return;
      }
      hideAutocomplete();
      return;
    }

    if (ctx.type === 'tag') {
      const filtered = filterSuggestions(HTML_TAGS, ctx.tagName || word);
      if (filtered.length === 0) { hideAutocomplete(); return; }
      renderAutocompleteMenu(filtered, 'tag', word);
      return;
    }

    if (ctx.type === 'attribute') {
      const tagName = ctx.tagName || getCurrentTagName(text, cursorPos);
      const specific = TAG_ATTRIBUTES[tagName] || [];
      const combined = [...new Set([...specific, ...HTML_GLOBAL_ATTRIBUTES])];
      const filtered = filterSuggestions(combined, word);
      if (filtered.length === 0) { hideAutocomplete(); return; }
      renderAutocompleteMenu(filtered, 'attr', word);
      return;
    }

    if (ctx.type === 'closing-tag') {
      hideAutocomplete();
      return;
    }
  }

  // ==================== CSS ====================
  if (language === 'css') {
    const ctx = getCSSPropertyContext(text, cursorPos);

    // Property context
    if (ctx.type === 'property') {
      const filtered = filterSuggestions(CSS_PROPERTIES, word);
      if (filtered.length === 0) { hideAutocomplete(); return; }
      renderAutocompleteMenu(filtered, 'prop', word);
      return;
    }

    // Value context
    if (ctx.type === 'value') {
      const specific = CSS_VALUE_BY_PROPERTY[ctx.property] || [];
      const isColor = isColorProperty(ctx.property);
      const pool = [
        ...specific,
        ...CSS_FUNCTIONS,
        ...CSS_VALUES,
        ...(isColor ? CSS_COLORS : [])
      ];
      // dedup, păstrând ordinea
      const seen = new Set();
      const uniq = [];
      for (const v of pool) { if (!seen.has(v)) { seen.add(v); uniq.push(v); } }
      const filtered = filterSuggestions(uniq, word, 30);
      if (filtered.length === 0) { hideAutocomplete(); return; }
      renderAutocompleteMenu(filtered, 'value', word);
      return;
    }

    // Unit context — sugerăm unități după numere
    if (ctx.type === 'unit') {
      const numMatch = word.match(/^(\d+(?:\.\d+)?)([a-z%]*)$/i);
      if (numMatch) {
        const replaceStart = wordStart + numMatch[1].length;
        const replaceEnd = wordEnd;
        const filtered = filterSuggestions(CSS_UNITS, numMatch[2], 30);
        if (filtered.length === 0) { hideAutocomplete(); return; }
        renderAutocompleteMenu(filtered, 'unit', numMatch[2], replaceStart, replaceEnd);
        return;
      }
      hideAutocomplete();
      return;
    }

    // At-rule context
    if (ctx.type === 'at-rule') {
      // Includem @ în poziția de înlocuire
      let replaceStart = wordStart;
      if (text[replaceStart - 1] === '@') replaceStart -= 1;
      const partial = text.slice(replaceStart, cursorPos);
      const filtered = filterSuggestions(CSS_AT_RULES, partial, 20);
      if (filtered.length === 0) { hideAutocomplete(); return; }
      renderAutocompleteMenu(filtered, 'atrule', partial, replaceStart, wordEnd);
      return;
    }

    // Pseudo-class context
    if (ctx.type === 'pseudo-class') {
      let replaceStart = wordStart;
      // Include : sau :: în înlocuire
      if (text[replaceStart - 1] === ':') {
        replaceStart -= 1;
        if (text[replaceStart - 1] === ':') replaceStart -= 1;
      }
      const partial = text.slice(replaceStart, cursorPos);
      const pool = [...CSS_PSEUDO_CLASSES, ...CSS_PSEUDO_ELEMENTS];
      const filtered = filterSuggestions(pool, partial, 30);
      if (filtered.length === 0) { hideAutocomplete(); return; }
      renderAutocompleteMenu(filtered, 'pseudo', partial, replaceStart, wordEnd);
      return;
    }

    // Pseudo-element context
    if (ctx.type === 'pseudo-element') {
      let replaceStart = wordStart;
      if (text[replaceStart - 1] === ':') {
        replaceStart -= 1;
        if (text[replaceStart - 1] === ':') replaceStart -= 1;
      }
      const partial = text.slice(replaceStart, cursorPos);
      const filtered = filterSuggestions(CSS_PSEUDO_ELEMENTS, partial, 20);
      if (filtered.length === 0) { hideAutocomplete(); return; }
      renderAutocompleteMenu(filtered, 'pseudo', partial, replaceStart, wordEnd);
      return;
    }

    hideAutocomplete();
    return;
  }

  // ==================== JS general ====================
  if (language === 'javascript') {
    const langSnips = SNIPPETS.javascript || {};
    const locals = getLocalSymbols(text);
    const all = [
      ...Object.keys(langSnips),
      ...locals,
      ...JS_KEYWORDS,
      ...JS_OBJECTS,
      ...JS_METHODS,
      ...JS_BUILTIN
    ];
    const filtered = filterSuggestions(all, word);
    if (filtered.length === 0) { hideAutocomplete(); return; }
    renderAutocompleteMenu(filtered, 'keyword', word);
    return;
  }

  // ==================== Markdown ====================
  if (language === 'markdown') {
    const filtered = filterSuggestions(['#','##','###','**','__','-','1.','>','```'], word);
    if (filtered.length === 0) { hideAutocomplete(); return; }
    renderAutocompleteMenu(filtered, 'snippet', word);
    return;
  }
}

export function renderAutocompleteMenu(suggestions, icon, word, customStart = null, customEnd = null) {
  autocompleteList.innerHTML = '';
  const { start: wordStart, end: wordEnd } = getCurrentWord(editor.value, editor.selectionStart);
  const start = customStart !== null ? customStart : wordStart;
  const end = customEnd !== null ? customEnd : wordEnd;
  const lang = getLanguage(state.activeFile, state.syntaxMode);
  const langSnips = SNIPPETS[lang] || {};

  suggestions.forEach((suggestion, index) => {
    const li = document.createElement('li');
    li.className = 'autocomplete-item' + (index === 0 ? ' selected' : '');
    li.dataset.index = index;
    li.dataset.suggestion = suggestion;
    li.dataset.replaceStart = start;
    li.dataset.replaceEnd = end;
    li.dataset.context = icon;

    const iconEl = document.createElement('span');
    iconEl.className = `autocomplete-icon ${icon}`;
    iconEl.textContent =
      icon === 'tag' ? '◈' :
      icon === 'attr' ? '@' :
      icon === 'prop' ? 'P' :
      icon === 'method' ? 'ƒ' :
      icon === 'value' ? 'V' :
      icon === 'atrule' ? '@' :
      icon === 'pseudo' ? ':' :
      icon === 'unit' ? '·' :
      icon === 'snippet' ? '✂' : '◆';

    const textEl = document.createElement('span');
    textEl.className = 'autocomplete-text';
    if (word) {
      const escaped = escapeRegexChars(word);
      textEl.innerHTML = suggestion.replace(new RegExp(`(${escaped})`, 'gi'), '<span class="autocomplete-match">$1</span>');
    } else {
      textEl.textContent = suggestion;
    }

    li.appendChild(iconEl);
    li.appendChild(textEl);

    if (langSnips[suggestion]) {
      const detail = document.createElement('span');
      detail.className = 'autocomplete-detail';
      detail.textContent = 'snippet';
      li.appendChild(detail);
    }

    li.addEventListener('click', () => selectAutocomplete(suggestion, start, end));
    li.addEventListener('mouseover', () => setAutocompleteSelection(index));
    autocompleteList.appendChild(li);
  });

  autocompleteMenu.hidden = false;
  positionAutocompleteMenu();
  state.autocompleteIndex = 0;
  state.autocompleteVisible = true;
  state.autocompleteNavigated = false;
}

function positionAutocompleteMenu() {
  const coords = getCaretCoordinates(editor, editor.selectionStart);
  const editorRect = editor.getBoundingClientRect();
  const lineHeight = parseFloat(getComputedStyle(editor).lineHeight) || 21;
  let top = editorRect.top + coords.top - editor.scrollTop + lineHeight;
  let left = editorRect.left + coords.left - editor.scrollLeft;
  const mh = autocompleteMenu.offsetHeight, mw = autocompleteMenu.offsetWidth;
  if (top + mh > window.innerHeight - 8) top = editorRect.top + coords.top - editor.scrollTop - mh;
  if (left + mw > window.innerWidth - 8) left = window.innerWidth - mw - 8;
  autocompleteMenu.style.top = Math.max(8, top) + 'px';
  autocompleteMenu.style.left = Math.max(8, left) + 'px';
}

function getCaretCoordinates(textarea, pos) {
  const style = window.getComputedStyle(textarea);
  const pt = parseFloat(style.paddingTop) || 0;
  const pl = parseFloat(style.paddingLeft) || 0;
  const lh = parseFloat(style.lineHeight) || 21;
  const text = textarea.value.substring(0, pos);
  const lines = text.split('\n');
  const idx = lines.length - 1;
  const last = lines[idx];
  const span = document.createElement('span');
  Object.assign(span.style, {
    visibility: 'hidden', position: 'absolute', top: '-9999px', left: '-9999px',
    display: 'inline-block', whiteSpace: 'pre',
    font: style.font, fontFamily: style.fontFamily, fontSize: style.fontSize,
    fontWeight: style.fontWeight, letterSpacing: style.letterSpacing,
    tabSize: style.tabSize || '2'
  });
  span.textContent = last;
  document.body.appendChild(span);
  const w = span.getBoundingClientRect().width;
  document.body.removeChild(span);
  return { top: pt + idx * lh, left: pl + w };
}

export function setAutocompleteSelection(index) {
  const items = autocompleteList.querySelectorAll('.autocomplete-item');
  items.forEach((el, i) => el.classList.toggle('selected', i === index));
  state.autocompleteIndex = index;
  const selected = items[index];
  if (!selected) return;
  const menuRect = autocompleteMenu.getBoundingClientRect();
  const itemRect = selected.getBoundingClientRect();
  if (itemRect.top < menuRect.top) autocompleteMenu.scrollTop -= (menuRect.top - itemRect.top);
  else if (itemRect.bottom > menuRect.bottom) autocompleteMenu.scrollTop += (itemRect.bottom - menuRect.bottom);
}

export function selectAutocomplete(suggestion, start, end) {
  const lang = getLanguage(state.activeFile, state.syntaxMode);
  const langSnips = SNIPPETS[lang] || {};
  let insertText = suggestion;
  let cursorOffset = suggestion.length;

  if (langSnips[suggestion]) {
    insertText = langSnips[suggestion].body;
    cursorOffset = insertText.length;
  } else if (lang === 'html') {
    const ctx = getHTMLContext(editor.value, editor.selectionStart);

    if (ctx.type === 'tag') {
      const VOID_TAGS = new Set([
        'area','base','br','col','embed','hr','img','input','link',
        'meta','param','source','track','wbr'
      ]);
      const tag = suggestion.toLowerCase();
      if (VOID_TAGS.has(tag)) {
        insertText = suggestion + '>';
        cursorOffset = suggestion.length;
      } else {
        insertText = suggestion + '></' + suggestion + '>';
        cursorOffset = suggestion.length + 1;
      }
    } else if (ctx.type === 'attribute') {
      const charBefore = editor.value[start - 1] || '';
      const needSpace = charBefore !== '' && !/\s/.test(charBefore);
      insertText = (needSpace ? ' ' : '') + suggestion + '=""';
      cursorOffset = (needSpace ? 1 : 0) + suggestion.length + 2;
    }
  } else if (lang === 'css') {
    const ctx = getCSSPropertyContext(editor.value, editor.selectionStart);

    if (ctx.type === 'property') {
      // `prop: ` cu cursor după spațiu
      insertText = suggestion + ': ';
      cursorOffset = insertText.length;
    } else if (ctx.type === 'value') {
      // Dacă tocmai am terminat `prop:` adăugăm un spațiu
      const before = editor.value.slice(0, start);
      const lastChar = before[before.length - 1];
      const needSpace = lastChar === ':';
      insertText = (needSpace ? ' ' : '') + suggestion;
      cursorOffset = insertText.length;
    } else if (ctx.type === 'at-rule') {
      // După @media adăugăm spațiu
      insertText = suggestion + ' ';
      cursorOffset = insertText.length;
    } else if (ctx.type === 'unit') {
      insertText = suggestion;
      cursorOffset = suggestion.length;
    }
  }

  editor.value = editor.value.substring(0, start) + insertText + editor.value.substring(end);
  const pos = start + cursorOffset;
  editor.setSelectionRange(pos, pos);

  state.contents[state.activeFile] = editor.value;
  state.dirty.add(state.activeFile);
  hideAutocomplete();
  highlightLayer.innerHTML = renderHighlightWithFind(editor.value, state.activeFile, state);
  updateLineNumbers(editor.value);
  import('./ui.js').then(m => m.renderTabs());
}

export function hideAutocomplete() {
  autocompleteMenu.hidden = true;
  state.autocompleteVisible = false;
  state.autocompleteIndex = -1;
  state.autocompleteNavigated = false;
}