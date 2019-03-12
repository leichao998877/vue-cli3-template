<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created () {
    let baseUrl = process.env.VUE_APP_DEVELOPMENT_BASE_API
    let data = { 'inputUsername': 'cpy01', 'inputPassword': 'MTIzNDU2MjAxOS0wMy0xMiAyMTo1Mjo0MQ==', 'userType': 'B', 'tpl': '/income', 'inputCaptcha': '', 'token': '' }
    axios({
      method: 'post',
      url: baseUrl + '/bwuser/login',
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
