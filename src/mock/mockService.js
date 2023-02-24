// 引入Mock对象
import MOCK from 'mockjs'
// 引入模拟数据
// 引入banner数据
import banner from './banner.json'
// 引入floor数据
import floor from './floor.json'

// 将资源请求路径与模拟数据进行映射
// MOCK.mock('/api/mock/banner', {code:200, data:banner})
MOCK.mock('/mock/banner', function(options) {
    // console.log(options)
    return {code:200, data:banner}
})
MOCK.mock('/mock/floor', {code:200, data:floor})