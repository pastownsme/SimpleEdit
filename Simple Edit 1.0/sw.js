const CACHE = 'simpleedit-v4';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './modules/utils.js',
  './modules/state.js',
  './modules/html.js',
  './modules/css.js',
  './modules/js.js',
  './modules/snippets.js',
  './modules/highlight.js',
  './modules/autocomplete.js',
  './modules/editor.js',
  './modules/files.js',
  './modules/ui.js',
  './modules/preview.js',
  './modules/search.js',
  './modules/extras.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.url.includes('cdnjs.cloudflare.com') || req.url.includes('fonts.googleapis.com') || req.url.includes('fonts.gstatic.com')) {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      if (req.method === 'GET' && resp.ok) {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return resp;
    }))
  );
});