const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/user", {
      target: "http://13.125.207.144:8080/",
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        "^/user": "", // 하위 url 초기화
      },
    })
  );
};
