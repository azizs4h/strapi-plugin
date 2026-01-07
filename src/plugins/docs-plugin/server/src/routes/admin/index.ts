export default () => ({
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/docs/(.*)',
      handler: 'controller.serve',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
});
