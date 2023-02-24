<template>
  <div id="app">
    <shop-header></shop-header>
    <router-view></router-view>
    <shop-footer></shop-footer>

    <!-- 测试区域 -->
    <!-- <shop-test></shop-test> -->
  </div>
</template>

<script>
// 引入Header组件
import ShopHeader from "@/components/ShopHeader/ShopHeader.vue";
// 引入Footer组件
import ShopFooter from "@/components/ShopFooter/ShopFooter.vue";

export default {
  name: "App",
  components: {
    ShopHeader,
    ShopFooter,
  },
  mounted() {
    // 向服务器请求三级菜单数据
    this.$store.dispatch("getCatagoryList");
  },
};
</script>
