const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/user",
    createProxyMiddleware({
      target: "http://13.125.207.144:8080",
      changeOrigin: true,
    })
  );
};
