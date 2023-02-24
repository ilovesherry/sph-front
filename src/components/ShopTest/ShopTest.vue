<template>
  <div>
    <h1>{{count}}</h1>
    <button type="button" @click="increment">点击按钮加1</button>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data() {
        return {
            // count: 0
        }
    },
    computed: {
        // 第一种：计算属性中使用this.$store获取
        count() {
            // console.log('@@', this.$store)
            return this.$store.state.home.count
            // return this.$store.state.count
        }
        // 第二种：使用mapState加对象展开
        // ...mapState(['count'])
    },
    methods: {
        increment() {
            // this.$store.dispatch('increment', 1)
        }
    }

}
</script>

<style>

</style>