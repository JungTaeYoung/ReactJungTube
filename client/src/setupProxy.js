const { createProxyMiddleware } = require('http-proxy-middleware');
const config = './config/hostConfig';
const HOST = config.REACT_APP_WWW_HOST
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000/',
            changeOrigin: true,
        })
    );
};