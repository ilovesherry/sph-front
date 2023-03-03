// 引入查询商品详细信息api
import { requestDetail } from '@/api/index.js'
// 引入修改购物车，添加商品api
import { requestAddToCart } from '@/api/index.js'
// 引入获取uuid工具
import { getUUID } from '@/utils/uuid_token.js'
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let result = await requestDetail(skuId);
        // console.log('@DetailStore', result.data)
        if (result.status == 200 && result.data.code == 200) {
            commit('GET_GOODSINFO', result.data.data)
        } else {
            // 处理异常
            console.log('error')
        }
    },
    async addToCartShop({ commit }, cartChangeObj) {
        let result = await requestAddToCart(cartChangeObj.skuId, cartChangeObj.skuNum)
        if (result.data.code == 200) {
            return "true"
        } else {
            return Promise.reject(new Error('Add cart failed, please try again!'))
        }
    }
}

const mutations = {
    GET_GOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}

const state = {
    // 商品信息
    goodsInfo: {},
    // 游客临时id
    userTempId: getUUID()
}

const getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    price(state) {
        return state.goodsInfo.price || 0
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}