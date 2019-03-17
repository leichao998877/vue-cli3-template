import http from './http'
function init (Vue, vue) {
  http.initContext(vue)
  Vue.prototype.$http = http
}
export default init
