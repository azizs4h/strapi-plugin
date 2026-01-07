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
    strapi.log.info('Serving docs for path:', ctx.params);
    // Base directory of Nuxt SSG output
    const baseDir = resolve(
      process.cwd(),
      'src',
      'plugins',
      'docs-plugin',
      'nuxt-docs',
      '.output',
      'public'
    );

    // Capture the rest of the path from /docs/(.*)
    const rest = ctx.params?.[0] || 'index.html';
    // Prevent directory traversal
    const clean = normalize(rest).replace(/^\.\/+/, '');
    const filePath = join(baseDir, clean);

    // If path is a directory, serve its index.html
    let finalPath = filePath;
    if (!finalPath.endsWith('.html') && !finalPath.includes('.')) {
      finalPath = join(finalPath, 'index.html');
    }

    if (!existsSync(finalPath)) {
      ctx.status = 404;
      ctx.body = 'Not Found';
      return;
    }

    const type = mime.lookup(finalPath) || 'application/octet-stream';
    ctx.type = type as string;
    ctx.body = readFileSync(finalPath);
  },
});

export default controller;
