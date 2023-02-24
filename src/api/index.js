import request from './request'
import mockRequest from './mockAjax'

// 请求三级导航菜单数据，获取三级目录接口地址 http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
const requestCatagoryList = () => request.get('/product/getBaseCategoryList')
// 请求商品搜索结果数据
const requestSearchResultList = searchParams => request.post('/list', searchParams)

// 请求banner数据
const requestBannerList = () => mockRequest.get('/banner')
// 请求floor数据
const requestFloorList = () => mockRequest.get('/floor')

export { requestCatagoryList, requestBannerList, requestFloorList,  requestSearchResultList}