<template>
  <div class="home">
    {{text}}
    <div v-for="(item, index) in arr" :key="index">{{'state:' + item.text}}</div>
    <p v-for="(item) in doneArr" :key="item.id + item.text">{{'getter:' + item.text}}</p>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      text: ''
    }
  },
  components: {
  },
  computed: {
    localComputed () {
      return [{ text: '雷超6', id: 6 }]
    },
    ...mapState({
      arr (state) {
        // console.log('state:', state)
        return state.detail.todos.concat(this.localComputed)
      }
    }),
    ...mapGetters([
      'doneArr'
    ])
  },
  created () {
    debugger
    this.text = process.env.NODE_ENV === 'production' ? 'production' : 'development'
    console.log('env:' + process.env.NODE_ENV)
    let data = { 'inputUsername': 'cpy01', 'inputPassword': 'MTIzNDU2MjAxOS0wMy0xMiAyMTo1Mjo0MQ==', 'userType': 'B', 'tpl': '/income', 'inputCaptcha': '', 'token': '' }
    axios({
      method: 'post',
      url: '/login/sso/bwuser/login',
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(res => {
      // 提交mutations
      this.$store.commit('SAVE_USER_INFO', {
        userInfo: res.data.data
      })
      // 提交actions
      this.$store.dispatch('ADD_COUNT', {
        count: 3
      })
      // console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
