const { createProxyMiddleware } = require("http-proxy-middleware");

const createProxy = app => {
  app.use(
    ["/api"],
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
    })
  );
};

module.exports = createProxy;
