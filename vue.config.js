const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV);
let env = require('./env');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8000,
        proxy: {
            '/node3333': {
                target: env.proxyUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/node3333': '/'
                }
            },
            '/api': {
                target: `http://127.0.0.1:3333`,
                changeOrigin: true,
                ws: true
                // pathRewrite: {
                //   "^/api": "/"
                // }
            }
        },
        disableHostCheck: true,
        sockHost: 'http://0.0.0.0:8080'
    }
};
