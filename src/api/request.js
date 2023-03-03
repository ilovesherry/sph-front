// 对axios进行二次封装

// 引入axios
import axios from "axios"
// 引入nprogress
import nprogress from "nprogress"

// 引入仓库
import store from '@/store/index.js'

const req = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn/api',
    timeout: 5000
})

// 请求拦截器
req.interceptors.request.use(function(config) {
    // 在发送请求前做一些事情
    // 在请求头中添加userTempId
    config.headers.userTempId = store.state.detail.userTempId;
    // 在发送请求前开启进度条
    nprogress.start();
    return config;
}, function(error) {
    // 在请求发生错误时做一些事情
    // ...
    return Promise.reject(error)
})

// 响应拦截器
req.interceptors.response.use(function(response) {
    // 任何状态码2xx的都会触发这个函数
    // 可以在这里对返回数据做一些处理
    // 在收到响应后结束进度条
    nprogress.done()
    return response;
}, function(error) {
    // 任何状态吗在2xx以外的都会触发这个函数
    // 处理一些错误
    return Promise.reject(error)
})

export default req
