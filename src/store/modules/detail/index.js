import { SAVE_USER_INFO, ADD_COUNT } from './mutation-types'
const detail = {
  state: {
    todos: [{ id: 1, text: '雷超1' }, { id: 3, text: '雷超3' }, { id: 2, text: '雷超2' }],
    userInfo: null,
    count: 0
  },
  getters: {
    doneArr: (state, getters) => {
      return state.todos.filter(todo => todo.id > 1)
    }
  },
  actions: {
    ADD_COUNT ({ commit, state, rootState, getters }, payload) {
      console.log(getters)
      setTimeout(() => {
        commit(ADD_COUNT, payload)
      }, 3000)
    },
    SAVE_USER_INFO ({ commit, state, rootState, getters }, payload) {
      commit(SAVE_USER_INFO, payload)
    }
  },
  mutations: {
    // mutations必须是同步函数
    SAVE_USER_INFO (state, payload) {
      state.userInfo = payload.userInfo
    },
    ADD_COUNT (state, payload) {
      state.count += payload.count
    }
  }
}
export default detail
