import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
Vue.use(Router)
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 在这里我默认判断除了登录之外都需要登录才能访问，当然如果你有些页面，需要进过另一个页面才能进入到另一个页面，你也可以编写额外的逻辑来控制
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
})
export default router
