const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/probit',
        createProxyMiddleware({
            target: 'https://api.probit.kr',
            changeOrigin: true,
            pathRewrite: {
                '^/probit/': '/',
            }
        })
    );
    app.use(
        '/cashierest',
        createProxyMiddleware({
            target: 'https://api.cashierest.com/V2/PbV12',
            changeOrigin: true,
            pathRewrite: {
                '^/cashierest/': '/',
            }
        })
    );
    app.use(
        '/bittrex',
        createProxyMiddleware({
            target: 'https://api.bittrex.com/v3',
            changeOrigin: true,
            pathRewrite: {
                '^/bittrex/': '/',
            }
        })
    );
    app.use(
        '/bibox',
        createProxyMiddleware({
            target: 'https://api.bibox.com/v3/mdata',
            changeOrigin: true,
            pathRewrite: {
                '^/bibox/': '/',
            }
        })
    );
};