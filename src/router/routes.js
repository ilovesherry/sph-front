// 引入Home组件
import Home from "@/views/Home/Home.vue"
// 引入Serch组件
import Search from "@/views/Search/Search.vue"
// 引入Login组件
import Login from "@/views/Login/Login.vue"
// 引入Register组件
import Register from "@/views/Register/Register"

export default [
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