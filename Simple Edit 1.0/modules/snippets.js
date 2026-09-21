// Snippets + expansion logic.

export const SNIPPETS = {
  html: {
    '!': { label: 'HTML5 boilerplate', body: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>` },
    'linkcss': { label: 'stylesheet link', body: '<link rel="stylesheet" href="styles.css">' },
    'scriptsrc': { label: 'script src', body: '<script src="app.js"></script>' },
    'meta:vp': { label: 'viewport meta', body: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' }
  },
  javascript: {
    'log': { label: 'console.log()', body: 'console.log()' },
    'fn': { label: 'function', body: 'function name() {\n  \n}' },
    'afn': { label: 'async function', body: 'async function name() {\n  \n}' },
    'arrow': { label: 'arrow function', body: 'const name = () => {\n  \n};' },
    'if': { label: 'if statement', body: 'if (condition) {\n  \n}' },
    'for': { label: 'for loop', body: 'for (let i = 0; i < n; i++) {\n  \n}' },
    'foreach': { label: 'array.forEach', body: 'array.forEach((item) => {\n  \n});' }
  },
  css: {
    'flexc': { label: 'flex center', body: 'display: flex;\njustify-content: center;\nalign-items: center;' },
    'gridc': { label: 'grid center', body: 'display: grid;\nplace-items: center;' },
    'posabs': { label: 'absolute centered', body: 'position: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);' }
  }
};