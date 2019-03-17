import http from './http'
import Vue from 'vue'
function init (vue) {
  http.initContext(vue)
  Vue.prototype.$http = http
}
export default init
