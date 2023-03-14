// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 使用Vuex插件
Vue.use(Vuex)

// 引入模块
import home from '@/store/Home'
import search from '@/store/Search'
import detail from '@/store/Detail'
import shopcart from '@/store/ShopCart'
import user from '@/store/user';
import trade from '@/store/trade'

// 创建store实例并暴露
const store = new Vuex.Store({
    modules: {
        user,
        trade
    }
})

store.registerModule('home', home)
store.registerModule('search', search)
store.registerModule('detail', detail)
store.registerModule('shopcart', shopcart)
// store.registerModule('user', user)

export default store




