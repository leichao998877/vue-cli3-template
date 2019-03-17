let isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: isProduction
    ? '/'
    : '/',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/login': {
        target: 'http://192.168.0.138:8083', // 进项标准化测试服务器地址
        changeOrigin: true,
        pathRewrite: {
          '^/login': '/'
        }
      },
      '/development': {
        target: 'http://192.168.0.138:8083', // 进项标准化测试服务器地址
        changeOrigin: true,
        pathRewrite: {
          '^/development': '/'
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
