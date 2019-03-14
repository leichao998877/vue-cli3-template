let isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: isProduction
    ? '/production-sub-path/'
    : '/',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/login': {
        target: 'http://10.100.2.46:8788', // 进项标准化测试服务器地址
        changeOrigin: true,
        pathRewrite: {
          '^/login': '/'
        }
      }
    },
    before (app) {
      if (!isProduction) {
        let mockPlugin = require('./mock-plugin')
        app.use(mockPlugin({
          mockConf: './mock/mock-conf.js'
        }))
      }
    }
  }
}
