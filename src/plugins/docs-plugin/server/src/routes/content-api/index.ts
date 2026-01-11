export default () => ({
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/',
      handler: 'controller.index',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/docs/(.*)',
      handler: 'controller.serve',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
});
