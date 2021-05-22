const { createProxyMiddleware } = require('http-proxy-middleware');

const setup = app => {
  app.use(
    ['/api'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};

module.exports = setup;
