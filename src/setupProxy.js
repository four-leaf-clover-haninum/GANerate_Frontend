const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      //target: "http://localhost:8080",
      target: "http://3.35.255.4",
      changeOrigin: true,
    })
  );
};