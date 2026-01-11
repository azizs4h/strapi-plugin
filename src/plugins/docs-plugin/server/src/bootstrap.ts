import type { Core } from '@strapi/strapi';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  console.log('=== DOCS PLUGIN BOOTSTRAP ===');
  const plugin = strapi.plugin('docs-plugin');
  console.log('Plugin loaded:', !!plugin);
};

export default bootstrap;
