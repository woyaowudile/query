const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV);
let env = require('./env');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8000,
        proxy: {
            '/node3333': {
                target: env.proxyUrl3,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/node3333': '/'
                }
            },
            '/node3334': {
                target: env.proxyUrl4,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/node3334': '/'
                }
            },
            '/api': {
                target: `http://127.0.0.1:3334`,
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
