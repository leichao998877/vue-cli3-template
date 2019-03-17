import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import init from './utils/init.js'

// console.log(process.env.NODE_ENV)
Vue.config.productionTip = false

let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
init(vue)
