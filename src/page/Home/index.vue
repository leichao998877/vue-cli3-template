<template>
  <div class="home">
    {{text}}
    <div v-for="(item, index) in arr" :key="index">{{'state:' + item.text}}</div>
    <p v-for="(item) in doneArr" :key="item.id + item.text">{{'getter:' + item.text}}</p>
  </div>
</template>
<script>
// @ is an alias to /src
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
    // 提交mutations
    this.$store.commit('SAVE_USER_INFO', {
      userInfo: { userName: 'leichao', 'age': 27 }
    })
    // 提交actions
    this.$store.dispatch('ADD_COUNT', {
      count: 3
    })
  }
}
</script>
