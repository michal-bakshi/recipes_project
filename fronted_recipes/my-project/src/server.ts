import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import bootstrap from './main.server';

// Log uncaught errors so Docker logs show the real failure (not minified bundle dump)
process.on('uncaughtException', (err) => {
  console.error('FATAL uncaughtException:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('FATAL unhandledRejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Use cwd + known build output paths so paths are correct when run from project root or Docker /app
const appDistRoot = resolve(process.cwd(), 'dist/my-project');
const serverDistFolder = resolve(appDistRoot, 'server');
const browserDistFolder = resolve(appDistRoot, 'browser');
const indexHtml = join(browserDistFolder, 'index.html');
const commonEngine = new CommonEngine();

const app = express();

// Proxy /api to the backend (so same-origin /api/Recipe returns JSON, not HTML)
const apiTarget = process.env['API_PROXY_TARGET'] || 'http://localhost:5244';
app.use('/api', express.json({ type: () => true }), (req, res, next) => {
  const url = `${apiTarget}${req.originalUrl}`;
  const headers: Record<string, string> = {};
  const forwardHeaders = ['accept', 'content-type', 'authorization'];
  for (const k of forwardHeaders) {
    const v = req.headers[k];
    if (v) headers[k] = Array.isArray(v) ? v[0] : v;
  }
  headers['host'] = new URL(apiTarget).host;
  const opts: RequestInit = { method: req.method, headers };
  if (req.method !== 'GET' && req.method !== 'HEAD' && req.body !== undefined) {
    opts.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  }
  fetch(url, opts)
    .then((backRes) => {
      res.status(backRes.status);
      backRes.headers.forEach((v, k) => res.setHeader(k, v));
      return backRes.text();
    })
    .then((body) => res.send(body))
    .catch((err) => {
      console.error('API proxy error', url, err);
      next(err);
    });
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application (SSR with CommonEngine).
 * CommonEngine works with the legacy browser+server build; AngularNodeAppEngine requires @angular/build:application.
 * Skip SSR for non-page requests (e.g. .well-known for Chrome DevTools, or static-like paths).
 */
app.use('/**', (req, res, next) => {
  const path = req.path || req.url?.split('?')[0] || '';
  if (path.startsWith('/.well-known/') || path.endsWith('.json')) {
    return next();
  }
  const { protocol, originalUrl, baseUrl, headers } = req;
  const url = `${protocol}://${headers.host || 'localhost'}${originalUrl}`;
  const baseHref = baseUrl || '/';
  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseHref }],
    })
    .then((html) => res.send(html))
    .catch((err) => {
      console.error('SSR Error for', url, err);
      if (err?.stack) console.error(err.stack);
      next(err);
    });
});

// 404 for non-page requests we skipped (e.g. .well-known) or unknown paths
app.use((_req, res) => res.status(404).send('Not Found'));

// Express error handler (must have 4 args)
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const msg = err instanceof Error ? err.message : String(err);
  const stack = err instanceof Error ? err.stack : undefined;
  if (process.env['NODE_ENV'] !== 'production' && stack) {
    res.status(500).setHeader('Content-Type', 'text/plain').send(`Internal Server Error\n\n${msg}\n\n${stack}`);
  } else {
    res.status(500).send('Internal Server Error');
  }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 * Bind to 0.0.0.0 so the server is reachable from outside the container (e.g. Docker).
 */
const port = Number(process.env['PORT']) || 4000;
if (!existsSync(browserDistFolder)) {
  console.error('FATAL: Browser dist folder not found:', browserDistFolder);
  process.exit(1);
}
if (!existsSync(indexHtml)) {
  console.error('FATAL: index.html not found at:', indexHtml);
  process.exit(1);
}
app.listen(port, '0.0.0.0', () => {
  console.log(`Node Express server listening on http://0.0.0.0:${port}`);
});

