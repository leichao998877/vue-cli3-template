import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import init from './utils/init.js'

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    let isLogin = sessionStorage.getItem('isLogin')
    if (isLogin) {
      next()
    } else {
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
  // 在这里我默认判断除了登录之外都需要登录才能访问，当然如果你有些页面，需要进过另一个页面才能进入到另一个页面，你也可以编写额外的逻辑来控制
})
let vue = new Vue({
  router,
  store,
  render: h => h(App)
})
init(Vue, vue)
vue.$mount('#app')
