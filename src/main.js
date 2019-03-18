import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import init from './utils/init.js'
import VueBus from 'vue-bus'
// 解决兄弟间通信，而不是全局共享的全局变量
// 用法参考链接: https://github.com/yangmingshan/vue-bus
Vue.use(VueBus)

Vue.config.productionTip = false
let vue = new Vue({
  router,
  store,
  render: h => h(App)
})
init(Vue, vue)
vue.$mount('#app')
