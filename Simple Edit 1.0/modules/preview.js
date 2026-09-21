// Preview panel + markdown rendering.
import { $, getFileExtension } from './utils.js';
import { state } from './state.js';

const previewPanel = $("#previewPanel");
const previewFrame = $("#previewFrame");
const previewToggle = $("#previewToggle");
const mainFileSelector = $("#mainFileSelector");

let previewTimer = null;
export function schedulePreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(() => {
    if (state.previewVisible && state.mainFile === state.activeFile) renderPreview();
  }, 300);
}

export function updateMainFileSelector() {
  const candidates = Object.keys(state.contents).filter(f => /\.(html?|md|markdown)$/i.test(f));
  mainFileSelector.innerHTML = '<option value="">Select file…</option>';
  candidates.forEach(file => {
    const option = document.createElement('option');
    option.value = file; option.textContent = file;
    if (file === state.mainFile) option.selected = true;
    mainFileSelector.appendChild(option);
  });
}

function renderMarkdown(md) {
  let html = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => `<pre><code class="language-${lang}">${code}</code></pre>`);
  html = html.replace(/^###### (.*)$/gm, '<h6>$1</h6>')
             .replace(/^##### (.*)$/gm, '<h5>$1</h5>')
             .replace(/^#### (.*)$/gm, '<h4>$1</h4>')
             .replace(/^### (.*)$/gm, '<h3>$1</h3>')
             .replace(/^## (.*)$/gm, '<h2>$1</h2>')
             .replace(/^# (.*)$/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
             .replace(/\*([^*]+)\*/g, '<em>$1</em>')
             .replace(/__([^_]+)__/g, '<strong>$1</strong>')
             .replace(/_([^_]+)_/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
             .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  html = html.replace(/^&gt; (.*)$/gm, '<blockquote>$1</blockquote>');
  html = html.replace(/^\s*[-*+] (.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)(?!\s*<li>)/g, '<ul>$1</ul>');
  html = html.replace(/^\s*\d+\. (.*)$/gm, '<li>$1</li>');
  html = html.replace(/^---+$/gm, '<hr>');
  html = html.replace(/^(?!<[a-z])(.+)$/gm, '<p>$1</p>');
  return html;
}

export function renderPreview() {
  if (!state.mainFile || !state.contents[state.mainFile]) {
    previewFrame.srcdoc = '<html><body style="display:flex;align-items:center;justify-content:center;height:100vh;color:#999;font-family:sans-serif;"><p>Select a file to preview</p></body></html>';
    return;
  }
  const ext = getFileExtension(state.mainFile);
  if (ext === 'md' || ext === 'markdown') {
    const body = renderMarkdown(state.contents[state.mainFile]);
    previewFrame.srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;max-width:780px;margin:40px auto;padding:0 20px;line-height:1.6;color:#222;}
        h1,h2,h3,h4{font-weight:600;} h1{border-bottom:1px solid #eee;padding-bottom:.3em;} h2{border-bottom:1px solid #eee;padding-bottom:.3em;}
        code{background:#f4f4f4;padding:.15em .35em;border-radius:3px;font-family:ui-monospace,monospace;font-size:.9em;}
        pre{background:#f6f8fa;padding:14px;border-radius:6px;overflow:auto;}
        pre code{background:transparent;padding:0;}
        blockquote{border-left:4px solid #ddd;margin:0;padding:0 16px;color:#666;}
        a{color:#0366d6;}
        img{max-width:100%;}
      </style></head><body>${body}</body></html>`;
    return;
  }
  let html = state.contents[state.mainFile];
  const cssPattern = /<link[^>]+href=["']([^"']+\.css)["'][^>]*>/gi;
  html = html.replace(cssPattern, (match, filename) => {
    const key = Object.keys(state.contents).find(k => k.endsWith(filename) || k === filename);
    return key ? `<style>\n${state.contents[key]}\n</style>` : match;
  });
  const jsPattern = /<script[^>]+src=["']([^"']+\.js)["'][^>]*><\/script>/gi;
  html = html.replace(jsPattern, (match, filename) => {
    const key = Object.keys(state.contents).find(k => k.endsWith(filename) || k === filename);
    return key ? `<script>\n${state.contents[key]}\n<\/script>` : match;
  });
  previewFrame.srcdoc = html;
}

export function togglePreview() {
  state.previewVisible = !state.previewVisible;
  previewPanel.hidden = !state.previewVisible;
  previewToggle.classList.toggle('active', state.previewVisible);
  if (state.previewVisible) {
    updateMainFileSelector();
    if (!state.mainFile) {
      const cand = Object.keys(state.contents).find(f => /\.(html?|md)$/i.test(f));
      if (cand) { state.mainFile = cand; mainFileSelector.value = cand; }
    }
    renderPreview();
  }
}