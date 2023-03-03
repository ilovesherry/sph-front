import Vue from 'vue'
import App from './App.vue'
// 引入路由器配置
import router from '@/router/index.js'

// 引入vuex状态管理器
import store from '@/store'

// 引入mock数据
import './mock/mockService.js'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 引入全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import ShopTest from '@/components/ShopTest/ShopTest'
import Pagination from '@/components/Pagination/Pagination.vue'

// 注册全局组件
Vue.component("TypeNav", TypeNav)
Vue.component("ShopTest", ShopTest)
Vue.component(Pagination.name, Pagination)

// 引入测试
// import './test/test.js'

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册vuex实例
  store,
  beforeCreate() {
    // 注册全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')
