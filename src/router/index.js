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

export default new VueRouter({
  routes: routes
})