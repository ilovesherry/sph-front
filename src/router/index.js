// 引入Vue
import Vue from 'vue'
// 引入vue-router插件
import VueRouter from 'vue-router'
// 使用vue-router插件
Vue.use(VueRouter)



//路由导航冗余报错（路由重复）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  // console.log('$$', location)
  resolve = resolve ? resolve : () => {
    // console.log('^^', 'success')
  }
  reject = reject ? reject : err => {
    // console.log(err)
  }
  return originalPush.call(this, location, resolve, reject)

  // 第二种方法，在query中加时间戳
  // let q = location.query
  // if(location.query) {
  //   delete location.query.t
  //   location.query.t = new Date().getTime()
  // } else {
  //   location.query = {t: new Date().getTime()}
  // }
  // console.log('@push', location)
  // return originalPush.call(this, location)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, resolve, reject) {
  resolve = resolve ? resolve : () => { }
  reject = reject ? reject : (err) => { console.log(err) }
  return originalReplace.call(this, location, resolve, reject)
}

import routes from './routes.js'

let router = new VueRouter({
  routes: routes,
  // 滚动行为
  scrollBehavior(to, from, savedPoint) {
    // console.log('@scrollBehavior', to, from, savedPoint);
    return {
      x: 0,
      y: 0
    }
  }
});

// 路由守卫
import store from '@/store';

router.beforeEach(async (to, from, next) => {
  // 获得token信息
  let token = store.state.user.token;
  // 获取用户信息
  let name = store.state.user.userInfo.name;

  if(token) {
    if(to.path === '/login' || to.path === '/register') {
      console.log('你已经登录了，就不要再去登录或者注册页面了')
      next('/home');
    } else {
      if(name) { // 如果已经有用户信息
        next();
      } else { // 如果没有用户信息
        try {
          // 向服务器发请求获取用户信息
          await store.dispatch('getUserInfo');
          next();
        } catch(error) {
          console.log('@router', '登录token已过期');
          // 用户token已过期，需重新登录
          let promise = store.dispatch('logout');
          promise.then(() => {
            router.replace('/login');
          }).catch(err => {
            alert(err.message);
          })
        }
      }
    }
  } else {
    let flag = to.meta.requireToken;
    console.log('requireToken', flag);
    if(flag) {
      next({path:'/login', query:{redirect:to.path}});
    } else {
      next();
    }
  }
});

export default router;