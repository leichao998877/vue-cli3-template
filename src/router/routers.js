import Login from '../page/Login'
let Home = () => import('../page/Home')
let Demo = () => import('../page/Demo')
export default [
  {
    path: '/Demo',
    name: 'Demo',
    component: Demo,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  // 默认没匹配到跳转到登录页
  {
    path: '*',
    redirect: '/Login'
  }
]
