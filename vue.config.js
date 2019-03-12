module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
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
      if (process.env.NODE_ENV !== 'production') {
        let mockPlugin = require('./mock-plugin')
        app.use(mockPlugin({
          mockConf: './mock/mock-conf.js'
        }))
      }
    }
  }
}
