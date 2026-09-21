// CSS: properties, values, pseudo-classes/elements, at-rules, units, functions.

// ==================== PROPERTIES (MDN complete) ====================
export const CSS_PROPERTIES = [
  // Layout
  'display','position','top','right','bottom','left','inset','inset-block','inset-block-start',
  'inset-block-end','inset-inline','inset-inline-start','inset-inline-end','float','clear',
  'visibility','overflow','overflow-x','overflow-y','overflow-block','overflow-inline',
  'overflow-wrap','overflow-anchor','overflow-clip-margin','z-index','isolation',
  'object-fit','object-position','box-sizing','aspect-ratio','box-decoration-break',
  // Sizing
  'width','height','min-width','max-width','min-height','max-height',
  'block-size','inline-size','min-block-size','max-block-size','min-inline-size','max-inline-size',
  'contain','contain-intrinsic-size','contain-intrinsic-width','contain-intrinsic-height',
  'contain-intrinsic-block-size','contain-intrinsic-inline-size',
  // Margin & padding
  'margin','margin-top','margin-right','margin-bottom','margin-left',
  'margin-block','margin-block-start','margin-block-end','margin-inline','margin-inline-start',
  'margin-inline-end','margin-trim',
  'padding','padding-top','padding-right','padding-bottom','padding-left',
  'padding-block','padding-block-start','padding-block-end','padding-inline','padding-inline-start',
  'padding-inline-end',
  // Borders
  'border','border-width','border-style','border-color','border-top','border-right','border-bottom','border-left',
  'border-top-width','border-right-width','border-bottom-width','border-left-width',
  'border-top-style','border-right-style','border-bottom-style','border-left-style',
  'border-top-color','border-right-color','border-bottom-color','border-left-color',
  'border-block','border-block-start','border-block-end','border-block-width','border-block-style','border-block-color',
  'border-block-start-width','border-block-start-style','border-block-start-color',
  'border-block-end-width','border-block-end-style','border-block-end-color',
  'border-inline','border-inline-start','border-inline-end','border-inline-width','border-inline-style','border-inline-color',
  'border-inline-start-width','border-inline-start-style','border-inline-start-color',
  'border-inline-end-width','border-inline-end-style','border-inline-end-color',
  'border-radius','border-top-left-radius','border-top-right-radius','border-bottom-left-radius','border-bottom-right-radius',
  'border-start-start-radius','border-start-end-radius','border-end-start-radius','border-end-end-radius',
  'border-image','border-image-source','border-image-slice','border-image-width','border-image-outset','border-image-repeat',
  'border-collapse','border-spacing',
  // Background
  'background','background-color','background-image','background-repeat','background-position',
  'background-position-x','background-position-y','background-size','background-attachment',
  'background-origin','background-clip','background-blend-mode','background-position-block','background-position-inline',
  // Text & fonts
  'color','font','font-family','font-size','font-style','font-weight','font-variant','font-variant-alternates',
  'font-variant-caps','font-variant-east-asian','font-variant-ligatures','font-variant-numeric','font-variant-position',
  'font-stretch','font-size-adjust','font-feature-settings','font-kerning','font-optical-sizing','font-variation-settings',
  'font-synthesis','font-synthesis-weight','font-synthesis-style','font-synthesis-small-caps','font-language-override',
  'font-palette','font-smooth','font-width',
  'line-height','letter-spacing','word-spacing','text-align','text-align-last','text-indent','text-transform',
  'text-decoration','text-decoration-line','text-decoration-style','text-decoration-color','text-decoration-thickness',
  'text-decoration-skip','text-decoration-skip-ink','text-underline-offset','text-underline-position',
  'text-emphasis','text-emphasis-style','text-emphasis-color','text-emphasis-position',
  'text-overflow','text-shadow','text-rendering','text-size-adjust','text-stroke','text-stroke-width','text-stroke-color',
  'text-wrap','text-wrap-mode','text-wrap-style','text-orientation','text-combine-upright','text-justify',
  'white-space','white-space-collapse','word-break','word-wrap','line-break','hyphens','hyphenate-character',
  'tab-size','vertical-align','direction','unicode-bidi','writing-mode','quotes','orphans','widows','hanging-punctuation',
  // Lists
  'list-style','list-style-type','list-style-position','list-style-image','counter-reset','counter-increment','counter-set','content',
  // Tables
  'table-layout','caption-side','empty-cells',
  // Flexbox
  'flex','flex-grow','flex-shrink','flex-basis','flex-direction','flex-wrap','flex-flow',
  'justify-content','justify-items','justify-self','align-items','align-content','align-self',
  'order','gap','row-gap','column-gap',
  // Grid
  'grid','grid-template','grid-template-columns','grid-template-rows','grid-template-areas',
  'grid-auto-columns','grid-auto-rows','grid-auto-flow','grid-column','grid-column-start','grid-column-end',
  'grid-row','grid-row-start','grid-row-end','grid-area','grid-gap','grid-column-gap','grid-row-gap',
  // Transforms
  'transform','transform-origin','transform-style','transform-box',
  'translate','rotate','scale','perspective','perspective-origin','backface-visibility','will-change',
  // Transitions & animations
  'transition','transition-property','transition-duration','transition-timing-function','transition-delay',
  'transition-behavior','animation','animation-name','animation-duration','animation-timing-function','animation-delay',
  'animation-iteration-count','animation-direction','animation-fill-mode','animation-play-state',
  'animation-timeline','animation-range','animation-range-start','animation-range-end','animation-composition',
  // Effects
  'opacity','box-shadow','filter','backdrop-filter','mix-blend-mode','isolation','clip','clip-path','clip-rule',
  'mask','mask-image','mask-mode','mask-repeat','mask-position','mask-clip','mask-origin','mask-size','mask-composite','mask-type',
  'mask-border','mask-border-source','mask-border-mode','mask-border-slice','mask-border-width','mask-border-outset','mask-border-repeat',
  'shape-outside','shape-margin','shape-image-threshold','shape-rendering',
  // Positioning / containers
  'container','container-name','container-type','anchor-name','position-anchor','position-area',
  'position-try','position-try-fallbacks','position-try-order','position-visibility',
  // Scroll
  'scroll-behavior','scroll-margin','scroll-margin-top','scroll-margin-right','scroll-margin-bottom','scroll-margin-left',
  'scroll-margin-block','scroll-margin-block-start','scroll-margin-block-end','scroll-margin-inline','scroll-margin-inline-start','scroll-margin-inline-end',
  'scroll-padding','scroll-padding-top','scroll-padding-right','scroll-padding-bottom','scroll-padding-left',
  'scroll-padding-block','scroll-padding-block-start','scroll-padding-block-end','scroll-padding-inline','scroll-padding-inline-start','scroll-padding-inline-end',
  'scroll-snap-align','scroll-snap-stop','scroll-snap-type','scroll-snap-type-x','scroll-snap-type-y',
  'scroll-timeline','scroll-timeline-axis','scroll-timeline-name','scrollbar-color','scrollbar-gutter','scrollbar-width',
  'overscroll-behavior','overscroll-behavior-x','overscroll-behavior-y','overscroll-behavior-block','overscroll-behavior-inline',
  // View transitions
  'view-transition-name','view-transition-class','view-timeline','view-timeline-axis','view-timeline-inset','view-timeline-name',
  // UI
  'cursor','pointer-events','user-select','touch-action','resize','caret-color','caret-shape','accent-color','appearance',
  'outline','outline-color','outline-style','outline-width','outline-offset',
  'color-scheme','forced-color-adjust','print-color-adjust','field-sizing','overlay',
  // Columns & breaking
  'columns','column-count','column-width','column-gap','column-rule','column-rule-color','column-rule-style','column-rule-width',
  'column-span','column-fill','break-before','break-after','break-inside','page-break-before','page-break-after','page-break-inside',
  // SVG
  'fill','fill-opacity','fill-rule','stroke','stroke-width','stroke-linecap','stroke-linejoin','stroke-dasharray','stroke-dashoffset',
  'stroke-opacity','stroke-miterlimit','stop-color','stop-opacity','flood-color','flood-opacity','lighting-color','color-interpolation',
  'color-interpolation-filters','marker','marker-start','marker-mid','marker-end','paint-order','vector-effect',
  // Misc
  'all','zoom','image-rendering','image-orientation','ime-mode','ruby-align','ruby-position','baseline-shift',
  'offset','offset-path','offset-distance','offset-rotate','offset-anchor','offset-position',
  'speak','voice-family','speak-as','text-anchor','dominant-baseline','alignment-baseline','color-rendering','will-change'
];

// ==================== GENERIC VALUES ====================
export const CSS_VALUES = [
  // Keywords
  'initial','inherit','unset','revert','revert-layer','auto','none','normal','all',
  // Display
  'block','inline','inline-block','flex','inline-flex','grid','inline-grid','table','table-row','table-cell',
  'table-column','table-caption','table-row-group','table-header-group','table-footer-group','flow-root','contents',
  'list-item','ruby','subgrid','inline-table',
  // Position
  'static','relative','absolute','fixed','sticky',
  // Overflow & visibility
  'visible','hidden','scroll','clip','collapse',
  // Flexbox / grid
  'flex-start','flex-end','center','space-between','space-around','space-evenly','stretch','baseline',
  'start','end','self-start','self-end','left','right','row','row-reverse','column','column-reverse',
  'wrap','wrap-reverse','nowrap',
  // Sizing
  'fit-content','min-content','max-content','available','contain','content',
  // Borders
  'solid','dashed','dotted','double','groove','ridge','inset','outset',
  'thin','medium','thick','border-box','padding-box','content-box','text',
  // Background
  'repeat','repeat-x','repeat-y','no-repeat','round','space','cover','contain','local','fixed',
  // Text & fonts
  'serif','sans-serif','monospace','cursive','fantasy','system-ui','ui-serif','ui-sans-serif','ui-monospace',
  'italic','oblique','bold','bolder','lighter','small-caps',
  'uppercase','lowercase','capitalize','full-width','full-size-kana',
  'underline','overline','line-through','blink',
  'pre','pre-wrap','pre-line','break-spaces','break-all','keep-all','anywhere','break-word',
  'ellipsis','clip',
  'ltr','rtl','horizontal-tb','vertical-rl','vertical-lr','sideways-rl','sideways-lr',
  // Transitions / animations
  'linear','ease','ease-in','ease-out','ease-in-out','step-start','step-end',
  'infinite','alternate','alternate-reverse','forwards','backwards','both','running','paused',
  // Transforms
  'preserve-3d','flat','fill-box','stroke-box','view-box','painted',
  // Blend modes
  'multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hard-light','soft-light',
  'difference','exclusion','hue','saturation','color','luminosity',
  // Cursor
  'pointer','default','text','move','wait','help','not-allowed','grab','grabbing','crosshair',
  'zoom-in','zoom-out','col-resize','row-resize','ew-resize','ns-resize','nesw-resize','nwse-resize',
  'all-scroll','cell','copy','alias','context-menu','progress','no-drop','vertical-text','none',
  // Object fit
  'fill','scale-down',
  // Isolation
  'isolate',
  // Text wrap
  'wrap','balance','pretty','stable','avoid',
  // List styles
  'disc','circle','square','decimal','decimal-leading-zero','lower-roman','upper-roman','lower-alpha','upper-alpha',
  'lower-latin','upper-latin','lower-greek','armenian','georgian','hebrew','hiragana','katakana',
  // Table layout
  'table-layout','caption-side','empty-cells','show','hide',
  // Function values
  'calc','clamp','min','max','var','env','attr','url','counter','counters',
  'rgb','rgba','hsl','hsla','hwb','lab','lch','oklab','oklch','color','color-mix',
  'linear-gradient','radial-gradient','conic-gradient',
  'repeating-linear-gradient','repeating-radial-gradient','repeating-conic-gradient',
  'translate','translateX','translateY','translateZ','translate3d',
  'rotate','rotateX','rotateY','rotateZ','rotate3d',
  'scale','scaleX','scaleY','scaleZ','scale3d',
  'skew','skewX','skewY','matrix','matrix3d','perspective',
  'cubic-bezier','steps','linear',
  'blur','brightness','contrast','drop-shadow','grayscale','hue-rotate','invert','opacity','saturate','sepia',
  'circle','ellipse','inset','polygon','path',
  'repeat','minmax',
  'fit-content','abs','sign','sqrt','pow','log','exp','hypot','sin','cos','tan','asin','acos','atan','atan2','mod','rem','round','toggle'
];

// ==================== VALUES PER PROPERTY ====================
export const CSS_VALUE_BY_PROPERTY = {
  // Display & positioning
  display: ['block','inline','inline-block','flex','inline-flex','grid','inline-grid','none','contents','table','table-row','table-cell','table-column','table-caption','table-row-group','table-header-group','table-footer-group','flow-root','list-item','ruby','subgrid','inline-table'],
  position: ['static','relative','absolute','fixed','sticky'],
  float: ['left','right','none','inline-start','inline-end'],
  clear: ['left','right','both','none','inline-start','inline-end'],
  visibility: ['visible','hidden','collapse'],
  overflow: ['visible','hidden','scroll','auto','clip'],
  'overflow-x': ['visible','hidden','scroll','auto','clip'],
  'overflow-y': ['visible','hidden','scroll','auto','clip'],
  'overflow-wrap': ['normal','break-word','anywhere'],
  'z-index': ['auto','0','1','10','100','1000','-1'],
  isolation: ['auto','isolate'],
  'object-fit': ['fill','contain','cover','none','scale-down'],
  'object-position': ['center','top','bottom','left','right','top left','top right','bottom left','bottom right','50% 50%'],
  'box-sizing': ['content-box','border-box'],
  'aspect-ratio': ['auto','1','1/1','16/9','4/3','21/9','3/2','2/3'],

  // Sizing
  width: ['auto','100%','50%','fit-content','min-content','max-content','100vw','100vh','max-content','min-content'],
  height: ['auto','100%','50%','fit-content','min-content','max-content','100vh','100vw'],
  'min-width': ['auto','0','100%','fit-content'],
  'max-width': ['none','100%','50%','fit-content','max-content'],
  'min-height': ['auto','0','100%','fit-content'],
  'max-height': ['none','100%','50%','fit-content'],

  // Margin & padding
  margin: ['auto','0','0 auto'],
  'margin-top': ['auto','0'],
  'margin-right': ['auto','0'],
  'margin-bottom': ['auto','0'],
  'margin-left': ['auto','0'],

  // Borders
  'border-style': ['none','hidden','dotted','dashed','solid','double','groove','ridge','inset','outset'],
  'border-width': ['thin','medium','thick'],
  'border-collapse': ['collapse','separate'],
  'border-spacing': ['0','2px','0 4px'],

  // Background
  'background-repeat': ['repeat','repeat-x','repeat-y','no-repeat','space','round'],
  'background-size': ['auto','cover','contain','100% auto','100% 100%'],
  'background-attachment': ['scroll','fixed','local'],
  'background-clip': ['border-box','padding-box','content-box','text'],
  'background-origin': ['border-box','padding-box','content-box'],
  'background-position': ['center','top','bottom','left','right','top left','top right','bottom left','bottom right'],
  'background-blend-mode': ['normal','multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'],

  // Text
  'text-align': ['left','right','center','justify','start','end','match-parent'],
  'text-align-last': ['auto','left','right','center','justify','start','end'],
  'text-decoration': ['none','underline','overline','line-through','underline overline'],
  'text-decoration-line': ['none','underline','overline','line-through','blink'],
  'text-decoration-style': ['solid','double','dotted','dashed','wavy'],
  'text-transform': ['none','capitalize','uppercase','lowercase','full-width','full-size-kana'],
  'text-overflow': ['clip','ellipsis'],
  'text-shadow': ['none'],
  'text-rendering': ['auto','optimizeSpeed','optimizeLegibility','geometricPrecision'],
  'text-wrap': ['wrap','nowrap','balance','pretty','stable'],
  'word-break': ['normal','break-all','keep-all','break-word'],
  'white-space': ['normal','nowrap','pre','pre-wrap','pre-line','break-spaces'],
  'white-space-collapse': ['collapse','preserve','preserve-breaks','preserve-spaces','break-spaces'],
  hyphens: ['none','manual','auto'],
  'vertical-align': ['baseline','sub','super','text-top','text-bottom','middle','top','bottom'],
  direction: ['ltr','rtl'],
  'writing-mode': ['horizontal-tb','vertical-rl','vertical-lr','sideways-rl','sideways-lr'],

  // Fonts
  'font-style': ['normal','italic','oblique'],
  'font-weight': ['normal','bold','bolder','lighter','100','200','300','400','500','600','700','800','900'],
  'font-variant': ['normal','small-caps'],
  'font-variant-caps': ['normal','small-caps','all-small-caps','petite-caps','all-petite-caps','unicase','titling-caps'],
  'font-variant-ligatures': ['normal','none','common-ligatures','no-common-ligatures','discretionary-ligatures','no-discretionary-ligatures','historical-ligatures','no-historical-ligatures','contextual','no-contextual'],
  'font-variant-numeric': ['normal','ordinal','slashed-zero','lining-nums','oldstyle-nums','proportional-nums','tabular-nums','diagonal-fractions','stacked-fractions'],
  'font-stretch': ['normal','ultra-condensed','extra-condensed','condensed','semi-condensed','semi-expanded','expanded','extra-expanded','ultra-expanded'],
  'font-size': ['12px','14px','16px','18px','20px','24px','32px','1rem','1.2rem','1.5rem','2rem','small','medium','large','smaller','larger','x-small','x-large','xx-large'],
  'font-family': ['serif','sans-serif','monospace','cursive','fantasy','system-ui','ui-serif','ui-sans-serif','ui-monospace','Arial','Helvetica','Times New Roman','Georgia','Courier New','Verdana','Consolas','Menlo','Monaco'],
  'line-height': ['normal','1','1.2','1.5','2','100%','150%','1.5em'],
  'letter-spacing': ['normal','0','0.5px','1px','-0.5px','0.05em','0.1em'],
  'word-spacing': ['normal','0','0.5px','1px','0.1em'],
  'font-feature-settings': ['normal'],
  'font-variation-settings': ['normal'],

  // Lists
  'list-style': ['none','disc','circle','square','decimal','lower-roman','upper-roman','lower-alpha','upper-alpha','inside','outside'],
  'list-style-type': ['none','disc','circle','square','decimal','decimal-leading-zero','lower-roman','upper-roman','lower-alpha','upper-alpha','lower-greek','lower-latin','upper-latin','armenian','georgian','hebrew','hiragana','katakana','hiragana-iroha','katakana-iroha'],
  'list-style-position': ['inside','outside'],
  'list-style-image': ['none'],

  // Flexbox
  'flex-direction': ['row','row-reverse','column','column-reverse'],
  'flex-wrap': ['nowrap','wrap','wrap-reverse'],
  'flex-grow': ['0','1','2','3'],
  'flex-shrink': ['0','1','2','3'],
  'flex-basis': ['auto','0','100%','fit-content','min-content','max-content'],
  'justify-content': ['flex-start','flex-end','center','space-between','space-around','space-evenly','start','end','left','right','normal','stretch'],
  'justify-items': ['start','end','center','stretch','normal','legacy','left','right','baseline','self-start','self-end'],
  'justify-self': ['auto','start','end','center','stretch','normal','left','right','baseline','self-start','self-end'],
  'align-items': ['flex-start','flex-end','center','baseline','stretch','start','end','self-start','self-end','normal'],
  'align-content': ['flex-start','flex-end','center','space-between','space-around','space-evenly','stretch','start','end','normal','baseline'],
  'align-self': ['auto','flex-start','flex-end','center','baseline','stretch','start','end','self-start','self-end'],
  order: ['0','1','2','-1','-2','9999'],
  gap: ['0','4px','8px','12px','16px','1rem','0.5rem','1em'],
  'row-gap': ['normal','0','4px','8px','12px','16px','1rem','0.5rem','1em'],
  'column-gap': ['normal','0','4px','8px','12px','16px','1rem','0.5rem','1em'],

  // Grid
  'grid-template-columns': ['none','auto','1fr','1fr 1fr','1fr 1fr 1fr','repeat(2, 1fr)','repeat(3, 1fr)','repeat(auto-fit, minmax(200px, 1fr))','minmax(0, 1fr)','min-content','max-content'],
  'grid-template-rows': ['none','auto','1fr','repeat(2, 1fr)','repeat(3, 1fr)','min-content','max-content'],
  'grid-auto-flow': ['row','column','dense','row dense','column dense'],
  'grid-auto-columns': ['auto','min-content','max-content','1fr'],
  'grid-auto-rows': ['auto','min-content','max-content','1fr'],

  // Transform
  'transform-origin': ['center','top','bottom','left','right','top left','top right','bottom left','bottom right','50% 50%','0 0','100% 100%'],
  'transform-style': ['flat','preserve-3d'],
  'backface-visibility': ['visible','hidden'],
  'will-change': ['auto','scroll-position','contents','transform','opacity','filter'],
  perspective: ['none','500px','1000px','1500px'],
  'perspective-origin': ['center','top','bottom','left','right','50% 50%'],

  // Transitions
  'transition-property': ['all','none','transform','opacity','color','background-color','border-color','width','height','box-shadow'],
  'transition-timing-function': ['linear','ease','ease-in','ease-out','ease-in-out','step-start','step-end','steps(4, end)','steps(2, start)','cubic-bezier(0.4, 0, 0.2, 1)','cubic-bezier(0.25, 0.1, 0.25, 1)'],
  'transition-duration': ['0.1s','0.2s','0.3s','0.5s','1s','100ms','200ms','300ms'],
  'transition-delay': ['0s','0.1s','0.2s','0.3s'],
  'transition-behavior': ['normal','allow-discrete'],

  // Animations
  'animation-direction': ['normal','reverse','alternate','alternate-reverse'],
  'animation-fill-mode': ['none','forwards','backwards','both'],
  'animation-play-state': ['running','paused'],
  'animation-iteration-count': ['infinite','1','2','3','5'],
  'animation-timing-function': ['linear','ease','ease-in','ease-out','ease-in-out','step-start','step-end','steps(4, end)','cubic-bezier(0.4, 0, 0.2, 1)'],
  'animation-duration': ['0.1s','0.2s','0.3s','0.5s','1s','2s','3s','100ms','200ms','300ms'],
  'animation-delay': ['0s','0.1s','0.2s','0.3s','0.5s'],

  // Effects
  opacity: ['0','0.1','0.25','0.5','0.75','0.9','1'],
  'box-shadow': ['none'],
  filter: ['none','blur(5px)','brightness(1.2)','contrast(1.5)','grayscale(1)','drop-shadow(0 2px 4px rgba(0,0,0,0.1))','hue-rotate(90deg)','invert(1)','opacity(0.5)','saturate(2)','sepia(1)'],
  'backdrop-filter': ['none','blur(10px)','brightness(0.8)','saturate(1.5)'],
  'mix-blend-mode': ['normal','multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'],
  'clip-path': ['none','circle(50%)','ellipse(25% 40% at 50% 50%)','inset(10px)','inset(10px 20px)','polygon(50% 0, 100% 50%, 50% 100%, 0 50%)'],

  // Cursor & UI
  cursor: ['auto','default','none','context-menu','help','pointer','progress','wait','cell','crosshair','text','vertical-text','alias','copy','move','no-drop','not-allowed','grab','grabbing','all-scroll','col-resize','row-resize','n-resize','e-resize','s-resize','w-resize','ne-resize','nw-resize','se-resize','sw-resize','ew-resize','ns-resize','nesw-resize','nwse-resize','zoom-in','zoom-out'],
  'pointer-events': ['auto','none','all','visiblePainted','visibleFill','visibleStroke','painted','fill','stroke'],
  'user-select': ['auto','text','none','contain','all'],
  'touch-action': ['auto','none','pan-x','pan-y','pan-left','pan-right','pan-up','pan-down','pinch-zoom','manipulation'],
  resize: ['none','both','horizontal','vertical','block','inline'],
  'caret-color': ['auto'],
  'caret-shape': ['auto','bar','block','underscore'],
  'accent-color': ['auto'],
  appearance: ['none','auto','button','textfield','menulist-button','searchfield','textarea','checkbox','radio','menulist','listbox','meter','progress-bar','slider-horizontal','slider-vertical'],

  // Outline
  'outline-style': ['none','auto','dotted','dashed','solid','double','groove','ridge','inset','outset'],
  'outline-width': ['thin','medium','thick'],
  'outline-offset': ['0','1px','2px','4px','-2px'],

  // Scroll
  'scroll-behavior': ['auto','smooth'],
  'scroll-snap-type': ['none','x mandatory','y mandatory','x proximity','y proximity','both mandatory','both proximity'],
  'scroll-snap-align': ['none','start','end','center'],
  'scroll-snap-stop': ['normal','always'],
  'scrollbar-width': ['auto','thin','none'],
  'scrollbar-color': ['auto'],
  'overscroll-behavior': ['auto','contain','none'],
  'overscroll-behavior-x': ['auto','contain','none'],
  'overscroll-behavior-y': ['auto','contain','none'],

  // Tables
  'table-layout': ['auto','fixed'],
  'caption-side': ['top','bottom','block-start','block-end','inline-start','inline-end'],
  'empty-cells': ['show','hide'],

  // Columns
  'column-count': ['auto','1','2','3','4'],
  'column-width': ['auto','100px','200px','250px','300px'],
  'column-rule-style': ['none','solid','dashed','dotted','double'],
  'column-span': ['none','all'],
  'column-fill': ['balance','balance-all','auto'],
  'break-before': ['auto','avoid','always','all','avoid-page','page','left','right','recto','verso','avoid-column','column','avoid-region','region'],
  'break-after': ['auto','avoid','always','all','avoid-page','page','left','right','recto','verso','avoid-column','column','avoid-region','region'],
  'break-inside': ['auto','avoid','avoid-page','avoid-column','avoid-region'],

  // Misc
  'image-rendering': ['auto','crisp-edges','pixelated','smooth','high-quality'],
  'color-scheme': ['normal','light','dark','light dark','only light'],
  'box-decoration-break': ['slice','clone'],
  'tab-size': ['8','4','2','1'],
  'unicode-bidi': ['normal','embed','isolate','bidi-override','isolate-override','plaintext'],
  quotes: ['none','auto'],
  'text-emphasis-style': ['none','filled','open','dot','circle','double-circle','triangle','sesame'],
  'text-emphasis-position': ['over right','under right','over left','under left'],
  'text-underline-offset': ['auto','0','2px','4px','1em'],
  'text-underline-position': ['auto','under','left','right','from-font','under left','under right'],
  'text-indent': ['0','1em','2em','-1em','10px','20px'],
  'word-spacing': ['normal','0','0.5px','1px','0.1em'],
  'ruby-align': ['start','center','space-between','space-around'],
  'ruby-position': ['over','under','alternate','inter-character'],
  all: ['initial','inherit','unset','revert','revert-layer'],
  zoom: ['normal','reset','125%','150%','1.5']
};

// ==================== PSEUDO-CLASSES ====================
export const CSS_PSEUDO_CLASSES = [
  // Interacțiune
  ':hover',':active',':focus',':focus-visible',':focus-within',':target',':target-within',
  // Stare link
  ':link',':visited',':any-link',':local-link',
  // Structurale
  ':root',':empty',':blank',':first-child',':last-child',':only-child',
  ':first-of-type',':last-of-type',':only-of-type',
  ':nth-child()',':nth-last-child()',':nth-of-type()',':nth-last-of-type()',
  ':nth-col()',':nth-last-col()',
  // Formulare
  ':checked',':default',':disabled',':enabled',':indeterminate',':in-range',':out-of-range',
  ':invalid',':valid',':optional',':required',':placeholder-shown',':read-only',':read-write',
  ':user-invalid',':user-valid',':autofill',
  // Media / elemente speciale
  ':fullscreen',':modal',':picture-in-picture',':paused',':playing',':seeking',':stalled',':volume-locked',
  ':defined',':host',':host()',':host-context()',':is()',':not()',':where()',':has()',
  ':scope',':current',':past',':future',':dir()',':lang()',':popover-open'
];

// ==================== PSEUDO-ELEMENTS ====================
export const CSS_PSEUDO_ELEMENTS = [
  '::after','::before','::backdrop','::cue','::cue-region','::details-content',
  '::file-selector-button','::first-letter','::first-line','::grammar-error','::highlight()',
  '::marker','::part()','::placeholder','::selection','::slotted()','::spelling-error',
  '::target-text','::view-transition','::view-transition-group()','::view-transition-image-pair()',
  '::view-transition-new()','::view-transition-old()'
];

// ==================== AT-RULES ====================
export const CSS_AT_RULES = [
  '@charset','@color-profile','@container','@counter-style','@document',
  '@font-face','@font-feature-values','@font-palette-values','@import',
  '@keyframes','@layer','@media','@namespace','@page','@position-try',
  '@property','@scope','@starting-style','@supports','@view-transition',
  '@-webkit-keyframes','@-moz-keyframes'
];

// ==================== UNITS ====================
export const CSS_UNITS = [
  // Length absolute
  'px','cm','mm','Q','in','pt','pc',
  // Length relative
  'em','rem','ex','ch','cap','ic','lh','rlh',
  'vw','vh','vi','vb','vmin','vmax','svw','svh','lvw','lvh','dvw','dvh',
  // Percentage
  '%',
  // Grid
  'fr',
  // Angle
  'deg','grad','rad','turn',
  // Time
  's','ms',
  // Frequency
  'Hz','kHz',
  // Resolution
  'dpi','dpcm','dppx','x',
  // Flex (legacy)
  'flex'
];

// ==================== FUNCTIONS ====================
export const CSS_FUNCTIONS = [
  // Math
  'calc()','min()','max()','clamp()','round()','mod()','rem()','abs()','sign()',
  'sqrt()','pow()','log()','exp()','hypot()','sin()','cos()','tan()','asin()','acos()','atan()','atan2()',
  // Variables
  'var()','env()','attr()',
  // Colors
  'rgb()','rgba()','hsl()','hsla()','hwb()','lab()','lch()','oklab()','oklch()','color()','color-mix()','light-dark()',
  // Gradients
  'linear-gradient()','radial-gradient()','conic-gradient()',
  'repeating-linear-gradient()','repeating-radial-gradient()','repeating-conic-gradient()',
  // Images
  'url()','image()','image-set()','cross-fade()','element()','paint()',
  // Transforms
  'translate()','translateX()','translateY()','translateZ()','translate3d()',
  'rotate()','rotateX()','rotateY()','rotateZ()','rotate3d()',
  'scale()','scaleX()','scaleY()','scaleZ()','scale3d()',
  'skew()','skewX()','skewY()','matrix()','matrix3d()','perspective()',
  // Timing
  'cubic-bezier()','steps()','linear()',
  // Filters
  'blur()','brightness()','contrast()','drop-shadow()','grayscale()','hue-rotate()','invert()','opacity()','saturate()','sepia()',
  // Shapes
  'circle()','ellipse()','inset()','polygon()','path()',
  // Grid
  'repeat()','minmax()','fit-content()',
  // Counter
  'counter()','counters()','symbols()',
  // Font
  'format()','local()','tech()'
];

// ==================== COLOR VALUES ====================
export const CSS_COLORS = [
  // Basic
  'black','silver','gray','white','maroon','red','purple','fuchsia','green','lime','olive','yellow',
  'navy','blue','teal','aqua','orange',
  // Extended named colors
  'aliceblue','antiquewhite','aquamarine','azure','beige','bisque','blanchedalmond','blueviolet',
  'brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk',
  'crimson','cyan','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkgrey',
  'darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon',
  'darkseagreen','darkslateblue','darkslategray','darkslategrey','darkturquoise','darkviolet',
  'deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen',
  'gainsboro','ghostwhite','gold','goldenrod','greenyellow','grey','honeydew','hotpink','indianred',
  'indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue',
  'lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen','lightgrey','lightpink',
  'lightsalmon','lightseagreen','lightskyblue','lightslategray','lightslategrey','lightsteelblue',
  'lightyellow','limegreen','linen','magenta','mediumaquamarine','mediumblue','mediumorchid',
  'mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise',
  'mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','oldlace',
  'olivedrab','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred',
  'papayawhip','peachpuff','peru','pink','plum','powderblue','rebeccapurple','rosybrown','royalblue',
  'saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','skyblue','slateblue',
  'slategray','slategrey','snow','springgreen','steelblue','tan','thistle','tomato','turquoise',
  'violet','wheat','whitesmoke','yellowgreen',
  // Special
  'transparent','currentColor','inherit','initial'
];

// ==================== CONTEXT DETECTION ====================
export function getCSSPropertyContext(text, cursorPos) {
  const before = text.slice(0, cursorPos);
  const lastBrace = before.lastIndexOf('{');
  const lastClose = before.lastIndexOf('}');

  // ===== În afara unui block — context selector / at-rule / pseudo =====
  if (lastBrace <= lastClose) {
    // Detectare at-rule: suntem imediat după @ sau într-un identificator de at-rule
    const lastAt = before.lastIndexOf('@');
    const lastSemicolon = before.lastIndexOf(';');
    const lastNewline = before.lastIndexOf('\n');
    if (lastAt > lastClose && lastAt > lastSemicolon && lastAt > lastNewline) {
      const afterAt = before.slice(lastAt);
      // Nu suntem deja într-un block de at-rule (fără { după @)
      if (!afterAt.includes('{')) {
        return { type: 'at-rule' };
      }
    }

    // Detectare pseudo-class / pseudo-element
    const lineStart = before.lastIndexOf('\n') + 1;
    const lineBefore = before.slice(lineStart);
    const pseudoMatch = lineBefore.match(/(::?)([a-zA-Z-]*)$/);
    if (pseudoMatch) {
      if (pseudoMatch[1] === '::') {
        return { type: 'pseudo-element' };
      }
      return { type: 'pseudo-class' };
    }

    return { type: 'selector' };
  }

  // ===== În interiorul unui block — context declarație =====
  const content = before.slice(lastBrace + 1);
  const lastSemi = content.lastIndexOf(';');
  const currentDecl = content.slice(lastSemi + 1);

  const colonIdx = currentDecl.indexOf(':');

  // Nu avem : încă → sugerăm proprietăți
  if (colonIdx === -1) {
    return { type: 'property' };
  }

  const prop = currentDecl.slice(0, colonIdx).trim().toLowerCase();
  const valueText = currentDecl.slice(colonIdx + 1);

  // Verificăm dacă suntem într-o funcție (paranteze deschise neînchise)
  const openParens = (valueText.match(/\(/g) || []).length;
  const closeParens = (valueText.match(/\)/g) || []).length;
  if (openParens > closeParens) {
    return { type: 'value', property: prop, inFunction: true };
  }

  // Verificăm dacă tocmai am terminat un număr → sugerăm unități
  // Match la finalul valorii: secvență de cifre (opțional zecimale)
  const trimmed = valueText.trimEnd();
  if (/\d+(\.\d+)?$/.test(trimmed) && !/[a-z%]$/i.test(trimmed.slice(-1))) {
    return { type: 'unit', property: prop };
  }

  return { type: 'value', property: prop, valueText };
}

// Verifică dacă o proprietate e legată de culoare
export function isColorProperty(prop) {
  const colorProps = [
    'color','background','background-color','border','border-color',
    'border-top-color','border-right-color','border-bottom-color','border-left-color',
    'border-block-color','border-block-start-color','border-block-end-color',
    'border-inline-color','border-inline-start-color','border-inline-end-color',
    'outline','outline-color','text-decoration','text-decoration-color','text-emphasis-color',
    'caret-color','accent-color','column-rule-color','box-shadow','text-shadow',
    'fill','stroke','stop-color','flood-color','lighting-color','background-image'
  ];
  return colorProps.includes(prop);
}