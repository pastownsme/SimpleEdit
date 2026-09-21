<h1 align="center">Simple Edit</h1>

<p align="center">
  <strong>A lightweight code editor that runs entirely in your browser.</strong><br>
  Pure HTML, CSS and JavaScript. No build step. No Node.js. No dependencies.
</p>

<p align="center">
  <a href="https://pastownsme.github.io/SimpleEdit/"><strong>🚀 Live Demo</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/build-none-brightgreen?style=flat-square" alt="No build">
  <img src="https://img.shields.io/badge/dependencies-1_(JSZip_CDN)-orange?style=flat-square" alt="Dependencies">
  <img src="https://img.shields.io/badge/size-~70KB-blueviolet?style=flat-square" alt="Size">
</p>

---

## What is Simple Edit?

Simple Edit is a **modern, lightweight code editor** that runs 100% in the browser. It's built with **vanilla JavaScript** — no React, no Vue, no build tools, no `node_modules`.

It's designed for **editing HTML, CSS, JavaScript and Markdown** files quickly, with the features you'd expect from a real editor:

- **Multi-file editing** with tabs and a file sidebar
- **Syntax highlighting** for HTML, CSS, JS, Markdown
- **Smart autocomplete** with context awareness
- **Live preview** of HTML and Markdown
- **Find & Replace** across the current file, or search the entire project
- **Command palette** (`Ctrl+P`) to access everything by name
- **Dark / Light theme**
- **Works offline** (PWA) and can be installed as a desktop app

Everything lives in **15 small files**, totalling ~70 KB. You can read the entire source code in an afternoon.

---

## ✨ Features

### Editor

- Multi-file tabs with dirty indicator
- File sidebar with icons per language
- Auto-close for brackets, quotes and HTML tags
- Smart auto-indent and auto-dedent on `}`
- Automatic block expansion on `{`
- Duplicate line (`Ctrl+D`)
- Move line up/down (`Alt+↑` / `Alt+↓`)
- Toggle line comment (`Ctrl+/`)
- Word wrap toggle (`Alt+Z`)
- Line numbers, cursor position, selection count
- CRLF / LF detection and preservation
- Tab size: 2, 4, 8 spaces or real tabs

### Syntax Highlighting

- **HTML** — tags, attributes, strings, comments, DOCTYPE
- **CSS** — selectors, properties, values, at-rules, colors, numbers
- **JavaScript** — keywords, strings, template literals, regex, numbers, comments
- **Markdown** — headings, bold, italic, inline code, links, lists, blockquotes

Highlighting is done with a **hand-written tokenizer** — no external library. It's fast, predictable, and never breaks your code.

### Autocomplete

- **HTML (100% coverage)**
  - All ~230 tags (including SVG, MathML, deprecated)
  - All global attributes + ARIA 1.2 + Microdata + event handlers
  - Tag-specific attributes (`<input>` → `type`, `name`, `value`, `placeholder`, ...)
  - Attribute values (`<input type="|">` → `text`, `email`, `password`, ...)
  - Language codes (`<html lang="|">` → 120 codes)
  - Void tags handled correctly (`<meta>` vs `<div></div>`)

- **CSS (~70% coverage)**
  - ~500 properties
  - ~180 property-specific values
  - Pseudo-classes (`:hover`, `:focus`, `:nth-child()`)
  - Pseudo-elements (`::before`, `::after`)
  - At-rules (`@media`, `@font-face`, `@keyframes`)
  - Units (`px`, `em`, `rem`, `vh`, `%`, `fr`)
  - Functions (`calc()`, `var()`, `linear-gradient()`)
  - 150+ named colors

- **JavaScript (~70% coverage)**
  - Keywords, global objects, methods
  - Member access (`document.` → `querySelector`, `console.` → `log`)
  - Local symbol detection (`const foo = ...` → suggests `foo`)
  - Object literal members (`const config = { debug, port }` → `config.` → suggests)
  - ES2023 methods (`toSorted`, `toReversed`, `with`)

- **Snippets**
  - HTML: `!` → HTML5 boilerplate, `linkcss`, `scriptsrc`, `meta:vp`
  - JS: `log`, `fn`, `afn`, `arrow`, `if`, `for`, `foreach`
  - CSS: `flexc`, `gridc`, `posabs`
  - Tag expansion: `div.cls#id` + Tab → `<div class="cls" id="id"></div>`

### Preview & Utilities

- **Live preview** for HTML (inlines local CSS/JS) and Markdown
- **Find & Replace** in current file (`Ctrl+F` / `Ctrl+H`)
- **Project search** across all open files (`Ctrl+Shift+F`)
- **Command palette** (`Ctrl+P`) with commands + files
- **Diff view** between two files (LCS-based)
- **Import/Export ZIP** of entire projects
- **File System Access API** — open entire folders from disk
- **Autosave** to localStorage
- **Auto-save interval** configurable (10s – 5min)
- **Import/Export** current file

### PWA

- Installable as a desktop or mobile app
- Works offline after first visit
- Uses Cache API + Service Worker
- Auto-disabled on localhost so development isn't cached

---

## 🚀 Quick Start

### Option 1 — Open directly

Just open `index.html` in Chrome, Edge, Firefox, or Safari. That's it.

### Option 2 — Local server (recommended, required for ES modules)

```bash
# Python 3
python3 -m http.server 8080

# Node.js
npx serve

# PHP
php -S localhost:8080
Then visit http://localhost:8080

Option 3 — Deploy
Upload the folder to any static host:

GitHub Pages — push to repo, enable Pages in Settings

Netlify — drag and drop the folder

Cloudflare Pages — connect repo

Vercel — import from GitHub

Any FTP — upload the 15 files

No build command needed. No environment variables. No config.

📁 Project Structure
text
simple-edit/
├── index.html              # HTML structure (single page)
├── styles.css              # All styling (light + dark theme)
├── app.js                  # Entry point — wires everything together
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker (offline support)
└── modules/
    ├── utils.js            # Helpers (escape, debounce, getCurrentWord...)
    ├── state.js            # Global state + localStorage persistence
    ├── html.js             # HTML data — tags, attributes, values, contexts
    ├── css.js              # CSS data — properties, values, pseudo, at-rules
    ├── js.js               # JS data — keywords, methods, member suggestions
    ├── snippets.js         # Code snippets per language
    ├── highlight.js        # Syntax highlighting tokenizers + bracket matching
    ├── autocomplete.js     # Autocomplete orchestrator (context detection)
    ├── editor.js           # Editor features (auto-close, indent, snippets)
    ├── files.js            # File operations (new, save, open, ZIP)
    ├── ui.js               # Rendering (tabs, sidebar, status bar, toast)
    ├── preview.js          # Live preview + Markdown rendering
    ├── search.js           # Find / Replace / Project search
    └── extras.js           # Command palette + Diff view
Each module has a single responsibility and is under 500 lines.

⌨️ Keyboard Shortcuts
Shortcut	Action
Ctrl+P	Command Palette
Ctrl+Shift+P	Toggle Preview
Ctrl+S	Save File
Ctrl+Shift+S	Save As
Ctrl+O	Open File
Ctrl+N	New File
Ctrl+W	Close File
Ctrl+F	Find in File
Ctrl+H	Find & Replace
Ctrl+Shift+F	Search in Project
Ctrl+D	Duplicate Line
Ctrl+/	Toggle Comment
Alt+↑	Move Line Up
Alt+↓	Move Line Down
Alt+Z	Toggle Word Wrap
Tab	Expand Snippet / Indent
Ctrl+Space	Force Autocomplete
Enter	Accept Autocomplete / Smart Indent
Escape	Close Dialogs / Autocomplete
🛠️ Tech Stack
Layer	What
UI	Pure HTML + CSS (no framework)
Logic	Vanilla JavaScript (ES2020+)
Modules	Native ES Modules (<script type="module">)
Storage	localStorage for session, Cache API for PWA
Fonts	Google Fonts (DM Sans, Space Mono)
ZIP	JSZip 3.10 (CDN)
Build	None
Total size: ~70 KB (unminified, uncompressed).

🌐 Browser Support
Browser	Support
Chrome 89+	✅ Full
Edge 89+	✅ Full
Firefox 100+	✅ Full (except File System Access)
Safari 15+	✅ Full (except File System Access)
Mobile	⚠️ Usable, not optimized
For file:// usage: everything works except Service Worker (requires http:// or https://).

🎯 Design Principles
No build step — clone, open, done

No dependencies — everything is written from scratch

Small and readable — one afternoon to understand the whole codebase

Progressive enhancement — works in file://, better with a server, best as PWA

No tracking — no analytics, no telemetry, no external requests except fonts and JSZip

📊 Comparison
Feature	Simple Edit	VS Code (web)	CodeMirror 6	Monaco
Size	~70 KB	~50 MB	~250 KB	~5 MB
Load time	< 100 ms	3–10 s	~1 s	1–3 s
Dependencies	0	Electron + Node	npm	npm
Build step	No	Yes	Yes	Yes
Works from file://	Yes (except SW)	No	Partial	Partial
Multi-cursor	❌	✅	✅	✅
Code folding	❌	✅	✅	✅
Type checking (LSP)	❌	✅	Partial	✅
Simple to deploy	Yes	No	Partial	No
Simple Edit is not a replacement for VS Code. It's a replacement for Notepad++ in the browser.

🗺️ Roadmap
□ Virtual scrolling for files > 5,000 lines
□ Code folding for HTML/CSS/JS blocks
□ Multi-cursor editing
□ Minimap
□ More languages (Python, JSON, TypeScript, XML, SQL)
□ Full CSS value completion
□ Better JS type inference
🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first.

Fork the repo

Create your branch: git checkout -b feature/my-feature

Commit: git commit -m "Add my feature"

Push: git push origin feature/my-feature

Open a Pull Request

Please keep the philosophy:

No build step

No npm dependencies

Small, readable code

Vanilla JS only

📄 License
MIT — see LICENSE.

🙏 Acknowledgments
Icons: Feather Icons (SVG paths, inline)

Fonts: DM Sans + Space Mono

ZIP handling: JSZip

Reference: MDN Web Docs for HTML/CSS/JS specs

<p align="center"> Built with ❤️ and <code>&lt;textarea&gt;</code>. </p> ```
