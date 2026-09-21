// JavaScript: keywords, objects, methods, member suggestions.

export const JS_KEYWORDS = [
  'abstract','arguments','async','await','break','case','catch','class','const','continue',
  'debugger','default','delete','do','else','enum','export','extends','false','finally',
  'for','function','if','implements','import','in','instanceof','interface','let','new',
  'null','package','private','protected','public','return','static','super','switch',
  'this','throw','true','try','typeof','undefined','var','void','while','with','yield',
  'of','as','from','get','set'
];

export const JS_OBJECTS = [
  'Array','ArrayBuffer','BigInt','Boolean','Date','Error','Function','Int8Array',
  'Map','Number','Object','Promise','Proxy','RegExp','Set','String','Symbol',
  'WeakMap','WeakSet','JSON','Math','Reflect','Intl','Infinity','NaN','undefined',
  'globalThis','window','document','console','location','history','navigator',
  'screen','performance','crypto','URL','URLSearchParams','Blob','File','FileReader',
  'FormData','Headers','Request','Response','AbortController','AbortSignal',
  'TextEncoder','TextDecoder','WebSocket','Worker','MutationObserver',
  'IntersectionObserver','ResizeObserver','localStorage','sessionStorage',
  'indexedDB','fetch','setTimeout','setInterval','clearTimeout','clearInterval',
  'requestAnimationFrame','cancelAnimationFrame','structuredClone','alert',
  'confirm','prompt'
];

export const JS_METHODS = [
  'at','concat','every','fill','filter','find','findIndex','findLast','flat','flatMap',
  'forEach','includes','indexOf','join','keys','lastIndexOf','map','pop','push',
  'reduce','reduceRight','reverse','shift','slice','some','sort','splice','toReversed',
  'toSorted','toSpliced','unshift','values','with','assign','create','entries','freeze',
  'fromEntries','getOwnPropertyNames','getPrototypeOf','hasOwn','is','isFrozen',
  'charAt','charCodeAt','endsWith','match','matchAll','padEnd','padStart','repeat',
  'replace','replaceAll','search','split','startsWith','substring','substr',
  'toLowerCase','toUpperCase','trim','trimStart','trimEnd','parse','stringify',
  'all','allSettled','any','race','reject','resolve','then','catch','finally',
  'withResolvers','add','clear','delete','get','has','set','exec','test','apply',
  'bind','call','createElement','getElementById','querySelector','querySelectorAll',
  'addEventListener','removeEventListener','appendChild','append','prepend',
  'removeChild','remove','insertBefore','setAttribute','getAttribute','classList',
  'getBoundingClientRect','scrollIntoView','log','error','warn','info','debug',
  'table','dir','time','timeEnd'
];

export const JS_BUILTIN = [
  'console.log','console.error','console.warn','console.info','console.debug',
  'console.table','console.dir','console.trace','console.group','console.groupEnd',
  'console.time','console.timeEnd','console.count','console.assert','console.clear',
  'document.getElementById','document.querySelector','document.querySelectorAll',
  'document.createElement','document.addEventListener','document.body','document.head',
  'window.alert','window.confirm','window.prompt','window.fetch','window.setTimeout',
  'window.setInterval','window.localStorage','window.sessionStorage',
  'fetch','Response.json','Response.text','Response.blob',
  'localStorage.getItem','localStorage.setItem','localStorage.removeItem','localStorage.clear',
  'sessionStorage.getItem','sessionStorage.setItem','sessionStorage.removeItem','sessionStorage.clear',
  'performance.now','crypto.randomUUID','crypto.getRandomValues'
];

export const JS_MEMBER_SUGGESTIONS = {
  console: ['log','error','warn','info','debug','table','dir','dirxml','trace','group','groupEnd','groupCollapsed','time','timeEnd','timeLog','count','countReset','assert','clear'],
  document: ['getElementById','querySelector','querySelectorAll','getElementsByClassName','getElementsByTagName','getElementsByName','createElement','createElementNS','createTextNode','createComment','createDocumentFragment','createRange','createTreeWalker','createNodeIterator','addEventListener','removeEventListener','dispatchEvent','importNode','adoptNode','write','writeln','open','close','hasFocus','elementFromPoint','body','head','documentElement','title','URL','domain','referrer','cookie','readyState','activeElement','children','forms','images','links','scripts','styleSheets','location'],
  window: ['alert','confirm','prompt','open','close','setTimeout','setInterval','clearTimeout','clearInterval','requestAnimationFrame','cancelAnimationFrame','requestIdleCallback','fetch','matchMedia','getComputedStyle','scrollTo','scrollBy','print','focus','blur','innerWidth','innerHeight','outerWidth','outerHeight','scrollX','scrollY','devicePixelRatio','location','history','navigator','screen','document','localStorage','sessionStorage','crypto','performance','console','name','closed','opener','parent','top','self','frames'],
  Math: ['abs','acos','acosh','asin','asinh','atan','atan2','atanh','cbrt','ceil','clz32','cos','cosh','exp','expm1','floor','fround','hypot','imul','log','log10','log1p','log2','max','min','pow','random','round','sign','sin','sinh','sqrt','tan','tanh','trunc','PI','E','LN2','LN10','LOG2E','LOG10E','SQRT2','SQRT1_2'],
  JSON: ['parse','stringify'],
  Object: ['assign','create','defineProperties','defineProperty','entries','freeze','fromEntries','getOwnPropertyDescriptor','getOwnPropertyDescriptors','getOwnPropertyNames','getOwnPropertySymbols','getPrototypeOf','groupBy','hasOwn','is','isExtensible','isFrozen','isSealed','keys','preventExtensions','seal','setPrototypeOf','values'],
  Array: ['isArray','from','fromAsync','of'],
  String: ['fromCharCode','fromCodePoint','raw'],
  Number: ['isFinite','isInteger','isNaN','isSafeInteger','parseFloat','parseInt','EPSILON','MAX_SAFE_INTEGER','MAX_VALUE','MIN_SAFE_INTEGER','MIN_VALUE','NEGATIVE_INFINITY','POSITIVE_INFINITY'],
  Promise: ['all','allSettled','any','race','reject','resolve','withResolvers'],
  Date: ['now','parse','UTC'],
  RegExp: ['escape'],
  Map: ['groupBy'],
  localStorage: ['getItem','setItem','removeItem','clear','key','length'],
  sessionStorage: ['getItem','setItem','removeItem','clear','key','length'],
  location: ['href','pathname','search','hash','host','hostname','port','protocol','origin','reload','assign','replace','toString'],
  history: ['pushState','replaceState','back','forward','go','length','state','scrollRestoration'],
  navigator: ['userAgent','language','languages','clipboard','geolocation','onLine','serviceWorker','mediaDevices','platform','cookieEnabled','hardwareConcurrency','maxTouchPoints'],
  performance: ['now','mark','measure','clearMarks','clearMeasures','getEntries','getEntriesByName','getEntriesByType','timeOrigin','memory'],
  crypto: ['randomUUID','getRandomValues','subtle'],
  screen: ['width','height','availWidth','availHeight','colorDepth','pixelDepth','orientation'],
  globalThis: ['alert','confirm','prompt','fetch','setTimeout','setInterval','clearTimeout','clearInterval','console','document','window','navigator','location','history','localStorage','sessionStorage','Math','JSON','Object','Array','String','Number','Boolean','Promise','Map','Set','Date','RegExp','Error','parseInt','parseFloat','isNaN','isFinite','structuredClone','queueMicrotask']
};

export function getLocalSymbols(text) {
  const symbols = new Set();
  let m;
  const varRe = /\b(?:const|let|var)\s+([a-zA-Z_$][\w$]*)/g;
  while ((m = varRe.exec(text)) !== null) symbols.add(m[1]);
  const funcRe = /\b(?:async\s+)?function\s*\*?\s*([a-zA-Z_$][\w$]*)/g;
  while ((m = funcRe.exec(text)) !== null) symbols.add(m[1]);
  const classRe = /\bclass\s+([a-zA-Z_$][\w$]*)/g;
  while ((m = classRe.exec(text)) !== null) symbols.add(m[1]);
  return [...symbols];
}

export function getObjectLiteralMembers(text, objName) {
  const esc = objName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\b(?:const|let|var)\\s+${esc}\\s*=\\s*\\{`);
  const m = re.exec(text);
  if (!m) return null;
  let depth = 0, start = m.index + m[0].length - 1, end = -1, inStr = null;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (inStr) { if (c === '\\') i++; else if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end === -1) return null;
  const body = text.slice(start + 1, end);
  const members = [];
  const keyRe = /(?:^|[,{\s])([a-zA-Z_$][\w$]*)\s*:/g;
  let km;
  while ((km = keyRe.exec(body)) !== null) members.push(km[1]);
  return members.length > 0 ? members : null;
}

export function getMemberContext(text, cursorPos) {
  const { start } = (function () {
    let s = cursorPos, e = cursorPos;
    while (s > 0 && /[a-zA-Z0-9_-]/.test(text[s - 1])) s--;
    while (e < text.length && /[a-zA-Z0-9_-]/.test(text[e])) e++;
    return { start: s, end: e };
  })();
  if (start === 0 || text[start - 1] !== '.') return null;
  let end = start - 1, s = end;
  while (s > 0 && /[a-zA-Z0-9_$]/.test(text[s - 1])) s--;
  const obj = text.slice(s, end);
  return obj || null;
}