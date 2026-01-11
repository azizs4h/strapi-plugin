import type { Core } from '@strapi/strapi';
import { resolve, join, normalize } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import mime from 'mime-types';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    console.log('Docs plugin controller index called');
    ctx.body = strapi
      .plugin('docs-plugin')
      // the name of the service file & the method.
      .service('service')
      .getWelcomeMessage();
  },

  serve(ctx) {
    console.log('=== DOCS SERVE CALLED ===');
    console.log('ctx.params:', ctx.params);
    console.log('ctx.path:', ctx.path);
    console.log('ctx.url:', ctx.url);

    strapi.log.info('Serving docs for path:', ctx.params);
    // Base directory of Nuxt SSG output
    const baseDir = resolve(
      process.cwd(),
      'src',
      'plugins',
      'docs-plugin',
      'nuxt',
      '.output',
      'public'
    );

    console.log('baseDir:', baseDir);

    // Capture the rest of the path from /docs/(.*)
    let rest = ctx.params?.[0] || 'index.html';

    // Remove the api/docs-plugin/docs prefix if it exists
    rest = rest.replace(/^api\/docs-plugin\/docs\/?/, '');

    // If empty, default to index.html
    if (!rest || rest === '') {
      rest = 'index.html';
    }

    console.log('rest:', rest);
    // Prevent directory traversal
    const clean = normalize(rest).replace(/^\.\/+/, '');
    const filePath = join(baseDir, clean);
    console.log('filePath:', filePath);

    // If path is a directory, serve its index.html
    let finalPath = filePath;
    if (!finalPath.endsWith('.html') && !finalPath.includes('.')) {
      finalPath = join(finalPath, 'index.html');
    }
    console.log('finalPath:', finalPath);
    console.log('exists:', existsSync(finalPath));

    if (!existsSync(finalPath)) {
      ctx.status = 404;
      ctx.body = 'Not Found';
      return;
    }

    const type = mime.lookup(finalPath) || 'application/octet-stream';
    ctx.type = type as string;

    // Disable CSP for docs route - it's static content behind authentication
    ctx.remove('Content-Security-Policy');

    ctx.body = readFileSync(finalPath);
  },
});

export default controller;
