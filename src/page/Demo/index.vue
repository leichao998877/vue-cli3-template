<template>
  <div class="demo">
  demo
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'demo',
  data () {
    return {
      text: ''
    }
  },
  components: {
  },
  created () {
    let form = { name: '雷超', age: 26 }
    this.$http.formPost('/formDataPost', form, res => {
      console.log(res)
    })
  }
}
</script>
