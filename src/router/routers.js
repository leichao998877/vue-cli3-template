import Login from '../page/Login'
let Home = () => import('../page/Home')
export default [
  {
    path: '/',
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
