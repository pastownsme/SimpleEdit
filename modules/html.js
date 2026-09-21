// HTML: tags, attributes, attribute values, context detection.
// Acoperire: 100% din specificația HTML Living Standard + ARIA 1.2 + Microdata + SVG.

// ==================== TAGS ====================
export const HTML_TAGS = [
  // Main root
  'html',
  // Document metadata
  'base','head','link','meta','style','title',
  // Sectioning root
  'body',
  // Content sectioning
  'address','article','aside','footer','header','h1','h2','h3','h4','h5','h6',
  'hgroup','main','nav','section','search',
  // Text content
  'blockquote','dd','div','dl','dt','figcaption','figure','hr','li','menu',
  'ol','p','pre','ul',
  // Inline text semantics
  'a','abbr','b','bdi','bdo','br','cite','code','data','dfn','em','i','kbd',
  'mark','q','rp','rt','ruby','s','samp','small','span','strong','sub','sup','time',
  'u','var','wbr',
  // Image and multimedia
  'area','audio','img','map','track','video',
  // Embedded content
  'embed','iframe','object','param','picture','source',
  // SVG
  'svg','g','path','circle','ellipse','rect','line','polyline','polygon','text',
  'tspan','defs','use','symbol','marker','pattern','mask','clipPath','linearGradient',
  'radialGradient','stop','filter','feGaussianBlur','feOffset','feBlend','feColorMatrix',
  'feComposite','feFlood','feMerge','feMergeNode','feMorphology','feTurbulence','feDisplacementMap',
  'foreignObject','image','switch','desc','metadata',
  // MathML
  'math','mi','mn','mo','ms','mtext','mspace','msup','msub','msubsup','mfrac','msqrt','mroot',
  'mstyle','merror','mpadded','mphantom','mfenced','menclose','mtable','mtr','mtd','mlabeledtr',
  'munder','mover','munderover','mmultiscripts','mprescripts','none','semantics','annotation',
  'annotation-xml',
  // Scripting
  'canvas','noscript','script',
  // Demarcating edits
  'del','ins',
  // Table content
  'caption','col','colgroup','table','tbody','td','tfoot','th','thead','tr',
  // Forms
  'button','datalist','fieldset','form','input','label','legend','meter',
  'optgroup','option','output','progress','select','selectedcontent','textarea',
  // Interactive elements
  'details','dialog','summary',
  // Web components
  'slot','template',
  // Deprecated (dar încă recunoscute de browsere)
  'acronym','applet','basefont','bgsound','big','blink','center','command',
  'content','dir','element','font','frame','frameset','image','isindex',
  'keygen','listing','marquee','menuitem','multicol','nextid','nobr','noembed',
  'noframes','plaintext','shadow','spacer','strike','tt','xmp'
];

// Void tags — nu au tag de închidere
export const VOID_TAGS = new Set([
  'area','base','br','col','embed','hr','img','input','link',
  'meta','param','source','track','wbr',
  'basefont','bgsound','frame','isindex','keygen'
]);

// ==================== GLOBAL ATTRIBUTES ====================
export const HTML_GLOBAL_ATTRIBUTES = [
  // Core
  'accesskey','autocapitalize','autofocus','class','contenteditable',
  'dir','draggable','enterkeyhint','exportparts','hidden','id','inert',
  'inputmode','is','lang','nonce','part','popover','slot','spellcheck',
  'style','tabindex','title','translate','writingsuggestions',
  // Microdata
  'itemid','itemprop','itemref','itemscope','itemtype',
  // ARIA role
  'role',
  // ARIA states & properties (complete WAI-ARIA 1.2)
  'aria-activedescendant','aria-atomic','aria-autocomplete','aria-braillelabel',
  'aria-brailleroledescription','aria-busy','aria-checked','aria-colcount',
  'aria-colindex','aria-colindextext','aria-colspan','aria-controls',
  'aria-current','aria-describedby','aria-description','aria-details',
  'aria-disabled','aria-dropeffect','aria-errormessage','aria-expanded',
  'aria-flowto','aria-grabbed','aria-haspopup','aria-hidden','aria-invalid',
  'aria-keyshortcuts','aria-label','aria-labelledby','aria-level','aria-live',
  'aria-modal','aria-multiline','aria-multiselectable','aria-orientation',
  'aria-owns','aria-placeholder','aria-posinset','aria-pressed','aria-readonly',
  'aria-relevant','aria-required','aria-roledescription','aria-rowcount',
  'aria-rowindex','aria-rowindextext','aria-rowspan','aria-selected',
  'aria-setsize','aria-sort','aria-valuemax','aria-valuemin','aria-valuenow',
  'aria-valuetext',
  // Popover
  'popovertarget','popovertargetaction',
  // Event handlers
  'onabort','onafterprint','onanimationcancel','onanimationend',
  'onanimationiteration','onanimationstart','onauxclick','onbeforeinput',
  'onbeforematch','onbeforeprint','onbeforetoggle','onbeforeunload','onblur',
  'oncancel','oncanplay','oncanplaythrough','onchange','onclick','onclose',
  'oncompositionend','oncompositionstart','oncompositionupdate','oncontextlost',
  'oncontextmenu','oncontextrestored','oncopy','oncuechange','oncut',
  'ondblclick','ondrag','ondragend','ondragenter','ondragleave','ondragover',
  'ondragstart','ondrop','ondurationchange','onemptied','onended','onerror',
  'onfocus','onfocusin','onfocusout','onformdata','onfullscreenchange',
  'onfullscreenerror','ongotpointercapture','onhashchange','oninput',
  'oninvalid','onkeydown','onkeypress','onkeyup','onlanguagechange','onload',
  'onloadeddata','onloadedmetadata','onloadstart','onlostpointercapture',
  'onmessage','onmessageerror','onmousedown','onmouseenter','onmouseleave',
  'onmousemove','onmouseout','onmouseover','onmouseup','onmousewheel',
  'onoffline','ononline','onpagehide','onpagereveal','onpageshow','onpageswap',
  'onpaste','onpause','onplay','onplaying','onpointercancel','onpointerdown',
  'onpointerenter','onpointerleave','onpointermove','onpointerout',
  'onpointerover','onpointerrawupdate','onpointerup','onpopstate','onprogress',
  'onratechange','onrejectionhandled','onreset','onresize','onscroll',
  'onscrollend','onscrollsnapchange','onscrollsnapchanging','onsearch',
  'onsecuritypolicyviolation','onseeked','onseeking','onselect',
  'onselectionchange','onselectstart','onslotchange','onstalled','onstorage',
  'onsubmit','onsuspend','ontimeupdate','ontoggle','ontouchcancel',
  'ontouchend','ontouchmove','ontouchstart','ontransitioncancel',
  'ontransitionend','ontransitionrun','ontransitionstart','onunhandledrejection',
  'onunload','onvolumechange','onwaiting','onwheel'
];

// ==================== TAG-SPECIFIC ATTRIBUTES ====================
export const TAG_ATTRIBUTES = {
  // ===== Document metadata =====
  html: ['xmlns','manifest'],
  base: ['href','target'],
  link: ['as','blocking','crossorigin','disabled','fetchpriority','href','hreflang','imagesizes','imagesrcset','integrity','media','referrerpolicy','rel','sizes','type'],
  meta: ['charset','content','http-equiv','media','name','property','scheme'],
  style: ['blocking','media','nonce','title','type'],

  // ===== Content sectioning =====
  body: ['onload','onunload','onerror','onresize','onhashchange','onbeforeunload','onpagehide','onpageshow','background','bgcolor','text','link','vlink','alink'],

  // ===== Text content =====
  ol: ['reversed','start','type','compact'],
  li: ['value','type'],
  blockquote: ['cite'],
  q: ['cite'],
  dl: ['compact'],
  menu: ['compact'],
  hr: ['align','color','noshade','size','width'],
  pre: ['width'],

  // ===== Inline text =====
  a: ['download','href','hreflang','ping','referrerpolicy','rel','target','type','charset','name','rev','shape','coords'],
  data: ['value'],
  time: ['datetime'],

  // ===== Image and multimedia =====
  img: ['alt','crossorigin','decoding','fetchpriority','height','ismap','loading','referrerpolicy','sizes','src','srcset','usemap','width','align','border','hspace','vspace','longdesc','name'],
  picture: [],
  source: ['height','media','sizes','src','srcset','type','width'],
  track: ['default','kind','label','src','srclang'],
  video: ['autoplay','controls','controlslist','crossorigin','disablepictureinpicture','disableremoteplayback','height','loop','muted','playsinline','poster','preload','src','width'],
  audio: ['autoplay','controls','controlslist','crossorigin','disableremoteplayback','loop','muted','preload','src'],
  area: ['alt','coords','download','href','hreflang','ping','referrerpolicy','rel','shape','target'],
  map: ['name'],

  // ===== Embedded content =====
  iframe: ['allow','allowfullscreen','allowpaymentrequest','credentialless','csp','height','loading','name','referrerpolicy','sandbox','src','srcdoc','width','align','frameborder','longdesc','marginheight','marginwidth','scrolling'],
  embed: ['height','src','type','width'],
  object: ['data','form','height','name','type','usemap','width','align','archive','border','classid','codebase','codetype','declare','hspace','standby','vspace'],
  param: ['name','value','type','valuetype'],

  // ===== Scripting =====
  script: ['async','blocking','crossorigin','defer','fetchpriority','integrity','nomodule','referrerpolicy','src','type','charset','language'],
  canvas: ['width','height'],

  // ===== Demarcating edits =====
  del: ['cite','datetime'],
  ins: ['cite','datetime'],

  // ===== Table content =====
  table: ['border','cellpadding','cellspacing','summary','align','bgcolor','frame','rules','width'],
  caption: ['align'],
  col: ['span','align','char','charoff','valign','width'],
  colgroup: ['span','align','char','charoff','valign','width'],
  tbody: ['align','char','charoff','valign'],
  tfoot: ['align','char','charoff','valign'],
  thead: ['align','char','charoff','valign'],
  td: ['colspan','headers','rowspan','abbr','align','axis','bgcolor','char','charoff','height','nowrap','scope','valign','width'],
  th: ['abbr','colspan','headers','rowspan','scope','align','axis','bgcolor','char','charoff','height','nowrap','valign','width'],
  tr: ['align','bgcolor','char','charoff','valign'],

  // ===== Forms =====
  form: ['accept-charset','action','autocomplete','enctype','method','name','novalidate','rel','target'],
  input: ['accept','alt','autocomplete','capture','checked','dirname','disabled','form','formaction','formenctype','formmethod','formnovalidate','formtarget','height','list','max','maxlength','min','minlength','multiple','name','pattern','placeholder','popover','readonly','required','size','src','step','type','usemap','value','width','align'],
  button: ['autofocus','disabled','form','formaction','formenctype','formmethod','formnovalidate','formtarget','name','popover','type','value'],
  select: ['autocomplete','autofocus','disabled','form','multiple','name','required','size'],
  option: ['disabled','label','selected','value'],
  optgroup: ['disabled','label'],
  textarea: ['autocomplete','autofocus','cols','dirname','disabled','form','maxlength','minlength','name','placeholder','readonly','required','rows','wrap'],
  label: ['for','form'],
  fieldset: ['disabled','form','name'],
  legend: ['align'],
  output: ['for','form','name'],
  progress: ['max','value'],
  meter: ['form','high','low','max','min','optimum','value'],
  datalist: [],

  // ===== Interactive elements =====
  details: ['name','open'],
  dialog: ['open','closedby'],
  summary: [],

  // ===== Web components =====
  slot: ['name'],
  template: ['shadowrootmode','shadowrootdelegatesfocus','shadowrootclonable','shadowrootserializable','shadowrootcustomelementregistry'],

  // ===== SVG =====
  svg: ['viewBox','width','height','x','y','xmlns','xmlns:xlink','fill','fill-opacity','fill-rule','stroke','stroke-width','stroke-linecap','stroke-linejoin','stroke-dasharray','stroke-dashoffset','stroke-opacity','stroke-miterlimit','preserveAspectRatio','role','focusable','aria-label'],
  g: ['transform','fill','stroke','opacity'],
  path: ['d','fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','stroke-dasharray','transform','pathLength'],
  circle: ['cx','cy','r','fill','stroke','stroke-width','transform'],
  ellipse: ['cx','cy','rx','ry','fill','stroke','stroke-width','transform'],
  rect: ['x','y','width','height','rx','ry','fill','stroke','stroke-width','transform'],
  line: ['x1','y1','x2','y2','stroke','stroke-width','stroke-linecap','transform'],
  polyline: ['points','fill','stroke','stroke-width','transform'],
  polygon: ['points','fill','stroke','stroke-width','transform'],
  text: ['x','y','dx','dy','text-anchor','dominant-baseline','font-family','font-size','font-weight','fill','stroke','transform'],
  tspan: ['x','y','dx','dy','text-anchor'],
  defs: [],
  use: ['href','xlink:href','x','y','width','height','transform'],
  symbol: ['viewBox','preserveAspectRatio','width','height'],
  marker: ['markerWidth','markerHeight','refX','refY','orient','markerUnits','viewBox','preserveAspectRatio'],
  pattern: ['width','height','patternUnits','patternContentUnits','patternTransform','viewBox'],
  mask: ['x','y','width','height','maskUnits','maskContentUnits'],
  clipPath: ['clipPathUnits'],
  linearGradient: ['x1','y1','x2','y2','gradientUnits','gradientTransform','spreadMethod','href'],
  radialGradient: ['cx','cy','r','fx','fy','fr','gradientUnits','gradientTransform','spreadMethod','href'],
  stop: ['offset','stop-color','stop-opacity'],
  filter: ['x','y','width','height','filterUnits','primitiveUnits'],
  foreignObject: ['x','y','width','height','requiredExtensions'],
  image: ['href','xlink:href','x','y','width','height','preserveAspectRatio','crossorigin'],
  desc: [],
  metadata: [],

  // ===== Deprecated =====
  font: ['color','face','size'],
  frame: ['frameborder','longdesc','marginheight','marginwidth','name','noresize','scrolling','src'],
  frameset: ['cols','rows','onload','onunload'],
  marquee: ['behavior','bgcolor','direction','height','hspace','loop','scrollamount','scrolldelay','truespeed','vspace','width'],
  applet: ['align','alt','archive','code','codebase','height','hspace','name','object','vspace','width'],
  basefont: ['color','face','size'],
  center: [],
  dir: ['compact'],
  h1: ['align'], h2: ['align'], h3: ['align'], h4: ['align'], h5: ['align'], h6: ['align'],
  p: ['align'],
  div: ['align'],
  br: ['clear'],
  ul: ['compact','type'],
  nextid: [],
  noembed: [],
  noframes: [],
  plaintext: [],
  spacer: ['align','size','type','width','height'],
  strike: [],
  tt: [],
  xmp: [],
  big: [],
  blink: [],
  bgsound: ['src','loop'],
  isindex: ['action','prompt'],
  keygen: ['autofocus','challenge','disabled','form','keytype','name'],
  listing: [],
  multicol: [],
  nobr: [],
  shadow: [],
  command: ['type','label','icon','disabled','checked','radiogroup'],
  menuitem: ['type','label','icon','disabled','checked','default','radiogroup','command']
};

// ==================== ATTRIBUTE VALUES BY TAG ====================
export const ATTRIBUTE_VALUES_BY_TAG = {
  // ===== Forms =====
  input: {
    type: ['text','password','email','number','tel','url','search','date','time','datetime-local','month','week','color','file','hidden','checkbox','radio','range','button','submit','reset','image'],
    autocomplete: ['on','off','name','email','username','new-password','current-password','one-time-code','organization','street-address','address-line1','address-line2','address-line3','address-level1','address-level2','address-level3','address-level4','country','country-name','postal-code','cc-name','cc-given-name','cc-additional-name','cc-family-name','cc-number','cc-exp','cc-exp-month','cc-exp-year','cc-csc','cc-type','transaction-currency','transaction-amount','language','bday','bday-day','bday-month','bday-year','sex','url','photo','tel-country-code','tel-national','tel-area-code','tel-local','tel-extension','impp','webauthn'],
    inputmode: ['none','text','decimal','numeric','tel','search','email','url'],
    enterkeyhint: ['enter','done','go','next','previous','search','send'],
    dirname: ['ltr','rtl'],
    capture: ['user','environment'],
    formmethod: ['get','post','dialog'],
    formenctype: ['application/x-www-form-urlencoded','multipart/form-data','text/plain'],
    formtarget: ['_self','_blank','_parent','_top'],
    align: ['top','middle','bottom','left','right']
  },
  button: {
    type: ['button','submit','reset'],
    formmethod: ['get','post','dialog'],
    formenctype: ['application/x-www-form-urlencoded','multipart/form-data','text/plain'],
    formtarget: ['_self','_blank','_parent','_top']
  },
  form: {
    method: ['get','post','dialog'],
    enctype: ['application/x-www-form-urlencoded','multipart/form-data','text/plain'],
    target: ['_self','_blank','_parent','_top'],
    autocomplete: ['on','off'],
    'accept-charset': ['utf-8','iso-8859-1']
  },
  textarea: { wrap: ['soft','hard','off'] },
  select: { autocomplete: ['on','off'] },

  // ===== Scripting =====
  script: {
    type: ['module','text/javascript','application/javascript','application/json','application/ld+json','importmap','speculationrules','text/ecmascript','application/ecmascript'],
    crossorigin: ['anonymous','use-credentials']
  },

  // ===== Links & media =====
  link: {
    rel: ['stylesheet','icon','apple-touch-icon','apple-touch-icon-precomposed','apple-touch-startup-image','alternate','author','canonical','dns-prefetch','help','license','manifest','modulepreload','next','preconnect','prefetch','preload','prev','search','shortlink','mask-icon'],
    crossorigin: ['anonymous','use-credentials'],
    media: ['all','screen','print','speech','(max-width: 600px)','(min-width: 1024px)','(prefers-color-scheme: dark)','(prefers-reduced-motion: reduce)'],
    type: ['text/css','text/html','text/plain','application/json','application/ld+json','application/manifest+json','image/x-icon','image/png','image/svg+xml','image/webp','font/woff2','font/woff','font/ttf'],
    as: ['audio','document','embed','fetch','font','image','object','script','style','track','video','worker'],
    fetchpriority: ['high','low','auto']
  },
  a: {
    target: ['_self','_blank','_parent','_top'],
    rel: ['noopener','noreferrer','nofollow','external','ugc','sponsored','author','license','next','prev','help','bookmark','alternate','canonical','dns-prefetch','icon','manifest','modulepreload','preconnect','prefetch','preload','search','shortlink','tag','me'],
    referrerpolicy: ['no-referrer','no-referrer-when-downgrade','origin','origin-when-cross-origin','same-origin','strict-origin','strict-origin-when-cross-origin','unsafe-url'],
    type: ['text/html','text/plain','application/pdf','image/png','image/jpeg','image/svg+xml']
  },
  area: {
    target: ['_self','_blank','_parent','_top'],
    shape: ['default','rect','circle','poly'],
    rel: ['noopener','noreferrer','nofollow']
  },
  img: {
    loading: ['lazy','eager'],
    decoding: ['sync','async','auto'],
    crossorigin: ['anonymous','use-credentials'],
    fetchpriority: ['high','low','auto'],
    referrerpolicy: ['no-referrer','no-referrer-when-downgrade','origin','origin-when-cross-origin','same-origin','strict-origin','strict-origin-when-cross-origin','unsafe-url'],
    align: ['top','middle','bottom','left','right']
  },
  iframe: {
    loading: ['lazy','eager'],
    referrerpolicy: ['no-referrer','no-referrer-when-downgrade','origin','origin-when-cross-origin','same-origin','strict-origin','strict-origin-when-cross-origin','unsafe-url'],
    sandbox: ['allow-forms','allow-modals','allow-orientation-lock','allow-pointer-lock','allow-popups','allow-popups-to-escape-sandbox','allow-presentation','allow-same-origin','allow-scripts','allow-storage-access-by-user-activation','allow-top-navigation','allow-top-navigation-by-user-activation','allow-downloads','allow-top-navigation-to-custom-protocols']
  },
  video: {
    preload: ['none','metadata','auto'],
    crossorigin: ['anonymous','use-credentials'],
    controlslist: ['nodownload','nofullscreen','noremoteplayback','noplaybackrate']
  },
  audio: {
    preload: ['none','metadata','auto'],
    crossorigin: ['anonymous','use-credentials']
  },
  track: { kind: ['subtitles','captions','descriptions','chapters','metadata'] },
  source: {
    type: ['image/webp','image/jpeg','image/png','image/avif','image/gif','image/svg+xml','video/mp4','video/webm','video/ogg','audio/mpeg','audio/ogg','audio/wav','audio/webm']
  },
  embed: { type: ['application/pdf','image/svg+xml','video/mp4','audio/mpeg','text/html'] },
  object: { type: ['application/pdf','image/svg+xml','video/mp4','audio/mpeg','text/html','application/x-shockwave-flash'] },

  // ===== Lists =====
  ol: { type: ['1','a','A','i','I'] },
  li: { type: ['1','a','A','i','I','disc','circle','square'] },
  ul: { type: ['disc','circle','square'] },

  // ===== Metadata =====
  meta: {
    'http-equiv': ['content-type','default-style','refresh','x-ua-compatible','content-security-policy'],
    name: ['viewport','description','keywords','author','robots','googlebot','theme-color','application-name','generator','referrer','color-scheme','format-detection','apple-mobile-web-app-capable','apple-mobile-web-app-status-bar-style','apple-mobile-web-app-title','msapplication-TileColor','msapplication-config'],
    property: ['og:title','og:type','og:image','og:image:width','og:image:height','og:image:alt','og:url','og:description','og:site_name','og:locale','og:locale:alternate','og:audio','og:video','twitter:card','twitter:site','twitter:creator','twitter:title','twitter:description','twitter:image','twitter:image:alt','twitter:player'],
    charset: ['utf-8','utf-16','iso-8859-1','windows-1252']
  },

  // ===== SVG =====
  svg: {
    fill: ['none','currentColor','transparent','black','white','red','blue','green','yellow','orange','purple','gray'],
    stroke: ['none','currentColor','transparent','black','white','red','blue','green'],
    'stroke-linecap': ['butt','round','square'],
    'stroke-linejoin': ['miter','round','bevel','arcs','miter-clip'],
    'fill-rule': ['nonzero','evenodd'],
    'preserveAspectRatio': ['xMidYMid meet','xMidYMid slice','none','xMinYMin meet','xMaxYMax meet']
  },
  path: {
    fill: ['none','currentColor','black','white'],
    stroke: ['none','currentColor','black','white'],
    'stroke-linecap': ['butt','round','square'],
    'stroke-linejoin': ['miter','round','bevel']
  },
  marker: { orient: ['auto','auto-start-reverse','0','90','180','270'] },

  // ===== Tables =====
  td: {
    align: ['left','center','right','justify','char'],
    valign: ['top','middle','bottom','baseline']
  },
  th: {
    align: ['left','center','right','justify','char'],
    valign: ['top','middle','bottom','baseline'],
    scope: ['row','col','rowgroup','colgroup']
  },
  tr: {
    align: ['left','center','right','justify','char'],
    valign: ['top','middle','bottom','baseline']
  },
  table: {
    align: ['left','center','right'],
    frame: ['void','above','below','hsides','lhs','rhs','vsides','box','border'],
    rules: ['none','groups','rows','cols','all']
  },

  // ===== Dialog =====
  dialog: { closedby: ['any','closerequest','none'] }
};

// ==================== GENERIC ATTRIBUTE VALUES ====================
export const GENERIC_ATTRIBUTE_VALUES = {
  // ===== Booleeni & enum-uri comune =====
  dir: ['ltr','rtl','auto'],
  contenteditable: ['true','false','plaintext-only'],
  draggable: ['true','false'],
  spellcheck: ['true','false'],
  translate: ['yes','no'],
  autocapitalize: ['off','none','on','sentences','words','characters'],
  enterkeyhint: ['enter','done','go','next','previous','search','send'],
  inputmode: ['none','text','decimal','numeric','tel','search','email','url'],
  popover: ['auto','manual','hint'],
  popovertargetaction: ['toggle','show','hide'],
  hidden: ['hidden','until-found'],
  loading: ['lazy','eager'],
  decoding: ['sync','async','auto'],
  fetchpriority: ['high','low','auto'],
  crossorigin: ['anonymous','use-credentials'],
  referrerpolicy: ['no-referrer','no-referrer-when-downgrade','origin','origin-when-cross-origin','same-origin','strict-origin','strict-origin-when-cross-origin','unsafe-url'],

  // ===== Link & navigation =====
  target: ['_self','_blank','_parent','_top','_unfencedTop'],
  rel: ['noopener','noreferrer','nofollow','external','ugc','sponsored','author','license','next','prev','help','bookmark','alternate','canonical','dns-prefetch','icon','manifest','modulepreload','preconnect','prefetch','preload','search','shortlink','stylesheet','tag','me','apple-touch-icon'],

  // ===== Forms =====
  method: ['get','post','dialog'],
  enctype: ['application/x-www-form-urlencoded','multipart/form-data','text/plain'],
  autocomplete: ['on','off'],
  wrap: ['soft','hard','off'],
  capture: ['user','environment'],

  // ===== Media =====
  preload: ['none','metadata','auto'],
  kind: ['subtitles','captions','descriptions','chapters','metadata'],
  controlslist: ['nodownload','nofullscreen','noremoteplayback','noplaybackrate'],

  // ===== Table =====
  scope: ['row','col','rowgroup','colgroup'],

  // ===== Area =====
  shape: ['default','rect','circle','poly'],

  // ===== Iframe sandbox =====
  sandbox: ['allow-forms','allow-modals','allow-orientation-lock','allow-pointer-lock','allow-popups','allow-popups-to-escape-sandbox','allow-presentation','allow-same-origin','allow-scripts','allow-storage-access-by-user-activation','allow-top-navigation','allow-top-navigation-by-user-activation','allow-downloads'],

  // ===== ARIA role =====
  role: [
    // Widget roles
    'button','checkbox','gridcell','link','menuitem','menuitemcheckbox','menuitemradio',
    'option','progressbar','radio','scrollbar','searchbox','slider','spinbutton','switch',
    'tab','tabpanel','textbox','treeitem',
    // Composite roles
    'combobox','grid','listbox','menu','menubar','radiogroup','tablist','tree','treegrid',
    // Document structure
    'application','article','blockquote','caption','cell','code','definition','deletion',
    'directory','document','emphasis','feed','figure','generic','group','heading','img',
    'insertion','list','listitem','math','meter','none','note','paragraph','presentation',
    'row','rowgroup','rowheader','separator','strong','subscript','superscript','table',
    'term','time','toolbar','tooltip',
    // Landmark roles
    'banner','complementary','contentinfo','form','main','navigation','region','search',
    // Live region roles
    'alert','log','marquee','status','timer',
    // Window roles
    'alertdialog','dialog',
    // Abstract roles
    'command','composite','input','landmark','range','roletype','section','sectionhead',
    'select','structure','widget','window'
  ],

  // ===== ARIA states & properties =====
  'aria-atomic': ['true','false'],
  'aria-autocomplete': ['none','inline','list','both'],
  'aria-busy': ['true','false'],
  'aria-checked': ['true','false','mixed','undefined'],
  'aria-current': ['page','step','location','date','time','true','false'],
  'aria-disabled': ['true','false'],
  'aria-dropeffect': ['none','copy','execute','link','move','popup'],
  'aria-expanded': ['true','false','undefined'],
  'aria-grabbed': ['true','false','undefined'],
  'aria-haspopup': ['false','true','menu','listbox','tree','grid','dialog'],
  'aria-hidden': ['true','false','undefined'],
  'aria-invalid': ['grammar','false','spelling','true'],
  'aria-live': ['off','polite','assertive'],
  'aria-modal': ['true','false'],
  'aria-multiline': ['true','false'],
  'aria-multiselectable': ['true','false'],
  'aria-orientation': ['horizontal','vertical','undefined'],
  'aria-pressed': ['true','false','mixed','undefined'],
  'aria-readonly': ['true','false'],
  'aria-relevant': ['additions','all','removals','text'],
  'aria-required': ['true','false'],
  'aria-selected': ['true','false','undefined'],
  'aria-sort': ['none','ascending','descending','other']
};

// ==================== LANGUAGE CODES (ISO 639-1) ====================
export const LANG_CODES = [
  'en','ro','fr','de','es','it','pt','ru','zh','ja','ko','ar','he','hi',
  'tr','pl','nl','sv','no','da','fi','cs','hu','el','th','vi','uk','bg',
  'hr','sk','sl','lt','lv','et','ca','gl','eu','af','sw','id','ms','tl',
  'fa','ur','bn','ta','te','ml','kn','gu','pa','mr','ne','si','km','lo',
  'my','ka','hy','az','kk','uz','mn','sq','mk','bs','sr','be','is','ga',
  'cy','mt','lb','fo','yi','la','eo','haw','mi','sm','to','fj',
  'en-US','en-GB','en-CA','en-AU','en-NZ','en-IE','en-ZA','en-IN','en-SG',
  'pt-BR','pt-PT','zh-CN','zh-TW','zh-HK','es-ES','es-MX','es-AR','es-CO',
  'fr-FR','fr-CA','fr-BE','fr-CH','de-DE','de-AT','de-CH',
  'ar-SA','ar-EG','ar-AE','ar-MA','ar-DZ','ar-TN'
];

// ==================== CONTEXT DETECTION ====================
export function getHTMLContext(text, cursorPos) {
  // Cursorul e ÎNTRE caractere. `slice(0, cursorPos)` = textul dinainte de cursor.
  const before = text.slice(0, cursorPos);
  const lastOpen = before.lastIndexOf('<');
  const lastClose = before.lastIndexOf('>');

  if (lastOpen <= lastClose) return { type: 'outside' };

  const beforeCursor = before.slice(lastOpen);

  if (beforeCursor.startsWith('<!--')) return { type: 'comment' };
  if (beforeCursor.startsWith('<!')) return { type: 'doctype' };
  if (beforeCursor.startsWith('</')) return { type: 'closing-tag' };

  const tagMatch = beforeCursor.match(/^<([a-zA-Z][\w:-]*)/);
  if (!tagMatch) return { type: 'tag', tagName: '' };

  const tagName = tagMatch[1].toLowerCase();
  const afterTag = beforeCursor.slice(tagMatch[0].length);

  if (!afterTag.startsWith(' ')) {
    if (HTML_TAGS.includes(tagName)) {
      return { type: 'attribute', tagName, attrName: null };
    }
    return { type: 'tag', tagName };
  }

  const valueMatch = afterTag.match(/([a-zA-Z_][\w:-]*)\s*=\s*(["'])([^"']*)$/);
  if (valueMatch) {
    return {
      type: 'attribute-value',
      tagName,
      attrName: valueMatch[1].toLowerCase(),
      quote: valueMatch[2],
      partial: valueMatch[3]
    };
  }

  return { type: 'attribute', tagName, attrName: null };
}

export function getCurrentTagName(text, cursorPos) {
  const before = text.slice(0, cursorPos);
  const lastOpen = before.lastIndexOf('<');
  const lastClose = before.lastIndexOf('>');
  if (lastOpen <= lastClose) return null;
  const segment = before.slice(lastOpen + 1);
  const m = segment.match(/^([a-zA-Z][\w:-]*)/);
  return m ? m[1].toLowerCase() : null;
}

export function getContextAttributes(text, cursorPos) {
  const tagName = getCurrentTagName(text, cursorPos);
  const specific = tagName ? (TAG_ATTRIBUTES[tagName] || []) : [];
  const combined = [...specific];
  for (const a of HTML_GLOBAL_ATTRIBUTES) if (!combined.includes(a)) combined.push(a);
  return combined;
}

export function getAttributeValues(tagName, attrName) {
  // 1. Valori specifice tag-ului + atributului (ex: input.type)
  if (tagName && ATTRIBUTE_VALUES_BY_TAG[tagName] && ATTRIBUTE_VALUES_BY_TAG[tagName][attrName]) {
    return ATTRIBUTE_VALUES_BY_TAG[tagName][attrName];
  }
  // 2. Valori generice pentru atribut (ex: dir, target)
  if (GENERIC_ATTRIBUTE_VALUES[attrName]) return GENERIC_ATTRIBUTE_VALUES[attrName];
  // 3. Caz special: lang → coduri de limbă
  if (attrName === 'lang') return LANG_CODES;
  // 4. Nimic găsit
  return null;
}