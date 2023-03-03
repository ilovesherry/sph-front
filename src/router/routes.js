// 引入Home组件
import Home from "@/views/Home/Home.vue"
// 引入Serch组件
import Search from "@/views/Search/Search.vue"
// 引入Login组件
import Login from "@/views/Login/Login.vue"
// 引入Register组件
import Register from "@/views/Register/Register"
// 引入Detail组件
import Detail from '@/views/Detail/Detail.vue'
// 引入成功添加到购物车组件
import AddCartSuccess from '@/views/AddCartSuccess/AddCartSuccess.vue'
// 引入购物车组件
import ShopCart from '@/views/ShopCart/ShopCart.vue'

export default [
  {
    path: "/shopcart",
    component: ShopCart,
    meta: {
      showFooter: true
    }
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
    meta: {
      showFooter: true
    }
  },
  {
    path: "/detail/:skuId",
    component: Detail,
    meta: {
      showFooter: true
    }
  },
    {
      path: "/home",
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: "/search/:keyword?",
      component: Search,
      meta: {
        showFooter: true
      },
      name: "search",
      // props: true
    },
    {
      path: "/login",
      component: Login,
      meta: {
        showFooter: false
      }
    },
    {
      path: "/register",
      component: Register,
      meta: {
        showFooter: false
      }
    },
    {
      path: "*",
      redirect: "/home"
    },
  ]