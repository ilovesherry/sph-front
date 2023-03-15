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
import ShopCart from '@/views/ShopCart/ShopCart.vue';
// 引入Trade组件
import Trade from '@/views/Trade/Trade.vue'
// 引入支付组件
import Pay from '@/views/Pay/Pay.vue'
// 引入支付成功组件
import PaySuccess from '@/views/PaySuccess/PaySuccess.vue';
// 引入个人中心组件
import Center from '@/views/Center/Center.vue';
// 引入个人订单组件
import MyOrder from '@/views/Center/MyOrder/MyOrder.vue';
// 引入团购订单组件
import GroupOrder from '@/views/Center/GroupOrder/GroupOrder.vue';

export default [
  {
    path: "/center",
    component: Center,
    meta: {
      showFooter: true,
      requireToken: true
    },
    children: [
      {
        path: '',
        component: MyOrder,
        meta: {
          requireToken: true
        }
      },
      {
        path: 'myorder',
        component: MyOrder,
        meta: {
          requireToken: true
        }
      },
      {
        path: 'grouporder',
        component: GroupOrder,
        meta: {
          requireToken: true
        }
      }
    ]
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: {
      showFooter: true,
      requireToken: true
    }
  },
  {
    path: "/pay",
    component: Pay,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 只有从交易页面才能到
      if(from.path == '/trade') {
        next();
      } else {
        next(false);
      }
    },
    meta: {
      showFooter: true,
      requireToken: true
    }
  },
  {
    path: "/trade",
    component: Trade,
    beforeEnter: (to, from, next) => {
      if(from.path == '/shopcart') {
        next();
      } else {
        next(false);
      }
    },
    meta: {
      showFooter: true,
      requireToken: true
    }
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: {
      showFooter: true,
      requireToken: false
    }
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
    meta: {
      showFooter: true,
      requireToken: false
    }
  },
  {
    path: "/detail/:skuId",
    component: Detail,
    meta: {
      showFooter: true,
      requireToken: false
    }
  },
  {
    path: "/home",
    component: Home,
    meta: {
      showFooter: true,
      requireToken: false
    }
  },
  {
    path: "/search/:keyword?",
    component: Search,
    meta: {
      showFooter: true,
      requireToken: false
    },
    name: "search",
    // props: true
  },
  {
    path: "/login",
    component: Login,
    meta: {
      showFooter: false,
      requireToken: false
    }
  },
  {
    path: "/register",
    component: Register,
    meta: {
      showFooter: false,
      requireToken: false
    }
  },
  {
    path: "*",
    redirect: "/home"
  },
]