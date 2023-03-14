<template>
  <div>
    <!-- <h1>我是Home组件！</h1> -->
    <type-nav></type-nav>
    <list-container></list-container>
    <recommend></recommend>
    <rank></rank>
    <like></like>
    <floor v-for="(floor) in floorList" :key="floor.id" :floorInfo="floor"></floor>
  </div>
</template>

<script>
// 三级导航组件是全局组件

// 引入ListContainer组件
import ListContainer from "@/views/Home/ListContainer/ListContainer.vue";
// 引入Recommend组件
import Recommend from "@/views/Home/Recommend/Recommend.vue";
// 引入Rank组件
import Rank from "@/views/Home/Rank/Rank.vue";
// 引入Like组件
import Like from "@/views/Home/Like/Like.vue";
// 引入Floor组件
import Floor from "@/views/Home/Floor/Floor.vue";

// 引入mapState
import {mapState} from 'vuex'

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  mounted() {
    // 向服务器请求轮播图信息，这里用mockjs拦截请求
    this.$store.dispatch("getBannerList");
    // 向服务器请求floor信息，这里floor数据使用mockjs模拟
    this.$store.dispatch("getFloorList");
    // // 向服务器请求用户信息
    // this.$store.dispatch("getUserInfo");
  },
};
</script>

<style>
</style>