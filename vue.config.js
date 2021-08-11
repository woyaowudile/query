const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV);
// let env = require("./env");

module.exports = {
    //   lintOnSave: false,
    //   assetsDir: "assets",
    //   productionSourceMap: false,
    //   pages: {
    //     index: {
    //       entry: `src/main.js`,
    //       publicPath: "/",
    //       title: "云监控查看"
    //       // cdn: isProduction ? cdn : {},
    //     }
    //   },
    devServer: {
        host: '0.0.0.0',
        port: 8000,
        proxy: {
            '/api': {
                // target: `http://192.168.2.68:3333`,
                target: `http://192.168.43.158:3333`,
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
