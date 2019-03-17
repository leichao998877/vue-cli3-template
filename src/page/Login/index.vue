/**
* Auth: baiwang
* Date: 2019/3/14
* Description: Login
*/
<template>
    <div class="Login">
      Login
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  },
  components: {},
  // mixins: [],
  computed: {},
  props: {},
  watch: {},
  methods: {},
  created () {
    window.sessionStorage.clear()
    this.$http.post('/getUserInfo', {}, res => {
      window.sessionStorage.setItem('isLogin', 'true')
    }, err => {
      console.log(err)
    })
  },
  mounted () {
  },
  beforeDestroy () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
