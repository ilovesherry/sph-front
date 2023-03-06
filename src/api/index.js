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
// 请求商品详情数据 
// url:/api/item/{ skuId } method:get  参数：
// 1.skuId string 必须 商品ID
const requestDetail = skuId => request({
    url: `/item/${skuId}`,
    method: 'get'
})
// 向购物车添加商品
// method:post url:/api/cart/addToCart/{ skuId }/{ skuNum }
// skuId：商品ID skuNum：商品增加或减少的数量，负数减少
const requestAddToCart = (skuId, skuNum) => request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
});

// 获取购物车列表
// /api/cart/cartList
const requestShopCartList = () => request({
    url: '/cart/cartList',
    method: 'get'
});

// 删除购物车商品
// url: /api/cart/deleteCart/{skuId} method: DELETE
const requestDeleteItemById = skuId => request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
});

// 修改商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked} method: GET
const requestUpdateCheckedStatus = (skuId, isChecked) => request({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'GET'
});

// 获取注册验证码
// /api/user/passport/sendCode/phone method: GET
// 参数phone必须携带的参数，表示注册手机号
const requestAuthCode = phone => request({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
});

// 注册用户
// url: /api/user/passport/register method: post
const requestRegisterUser = data => request({
    url: '/user/passport/register',
    method: 'post',
    data
});

// 登录
// url: /api/user/passport/login method: post
// 参数 phone password
const requestLogin = data => request({
    url: '/user/passport/login',
    method: 'post',
    data
});

export {
    requestCatagoryList,
    requestBannerList,
    requestFloorList,
    requestSearchResultList,
    requestDetail,
    requestAddToCart,
    requestShopCartList,
    requestDeleteItemById,
    requestUpdateCheckedStatus,
    requestAuthCode,
    requestRegisterUser,
    requestLogin
}