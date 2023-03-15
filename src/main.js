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

// 引入api
import * as API from '@/api';
Vue.prototype.$API = API;

// 引入element-ui
// 方法1
// import Element from 'element-ui';
// Vue.use(Element);
// 方法2
import { Button, MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; //babel中引入插件即可
Vue.component(Button.name, Button);
Vue.component(MessageBox.name, MessageBox);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$message = Message;

// 引入加载图片
import loadingImg from '@/assets/1.jpg';
// 引入图片懒加载插件vue-lazyload
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  loading: loadingImg
});

// 引入测试
// import './test/test.js'
// import request from '@/api/request'
// 获取地址信息
// url: /api/user/userAddress/auth/findUserAddressList method: get
// const requestForAddress = () => request({
//   url: '/user/userAddress/auth/findUserAddressList',
//   method: 'get'
// });
// let promise = requestForAddress();
// promise.then(result => {
//   console.log('@main test', result);
// });

Vue.config.productionTip = false;
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
