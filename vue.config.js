module.exports = {
    // 选项...
    publicPath: "./",
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // 全局引入主题变量
                data: `@import "~@/styles/index.scss";`
            }
        }
    },
    devServer: {
        port: 9001,
        proxy: {
            '/api': {
                target: 'http://192.168.148.99:8680/',
                pathRewrite: {
                    '^/api': ''
                },
                ws: true,
                changeOrigin: true,
                secure: false
            }
        }
    }
}