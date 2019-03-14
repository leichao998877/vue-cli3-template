import Vue from 'vue'
import Vuex from 'vuex'
// vuex数据的持久化
import createPersistedState from 'vuex-persistedstate'
import detail from './modules/detail'
// import login from './modules/login'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    detail
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
