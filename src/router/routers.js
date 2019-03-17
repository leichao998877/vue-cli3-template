import Login from '../page/Login'
let Home = () => import('../page/Home')
let Demo = () => import('../page/Demo')
export default [
  {
    path: '/',
    name: 'Demo',
    component: Demo
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  // 默认没匹配到跳转到登录页
  {
    path: '*',
    redirect: '/'
  }
]
