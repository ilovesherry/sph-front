// 引入请求购物车数据api
import { requestShopCartList } from '@/api/index'
// 引入删除购物车商品api
import { requestDeleteItemById } from '@/api/index'
// 引入修改商品选中状态api
import { requestUpdateCheckedStatus } from '@/api/index'

const actions = {
    async getShopCartList({ commit }) {
        let result = await requestShopCartList();
        // console.log('@ShopCart Store', result)
        if (result.status == 200 && result.data.code == 200) {
            commit('GET_SHOPCARTLIST', result.data.data);
        } else {
            alert('请求购物车数据失败，请刷新')
        }
    },
    async deleteItemBySkuId({ commit }, skuId) {
        let result = await requestDeleteItemById(skuId);
        if(result.status == 200 && result.data.code == 200) {
            return "OK";
        } else {
            return Promise.reject(new Error("删除失败！"));
        }
    },
    updateCheckedStatusBySkuId({ commit }, skuCheckedInfo) {
        return requestUpdateCheckedStatus(skuCheckedInfo.skuId, skuCheckedInfo.isChecked);
        // console.log('@Shopcart Store updateCheckedStatusBySkuId', result)
    },
    updateAllCheckedStatus(context, isAllChecked) {
        // console.log("context: ", context);
        // 获取所有sku信息
        let cartListArray = context.getters.cartListObj.cartInfoList;
        // 创建一个数组，用于存放所有的Promise对象
        let promiseAllArray = [];
        // 遍历所有的sku项，并发送状态修改请求
        cartListArray.forEach(item => {
            let skuId = item.skuId;
            let isChecked = isAllChecked? "1": "0";
            let promise = context.dispatch('updateCheckedStatusBySkuId', {skuId, isChecked});
            promiseAllArray.push(promise);
        });
        return Promise.all(promiseAllArray);
    },
    // deleteAllChecked({state, dispatch}) {
    //     // 遍历
    // }
};

const mutations = {
    GET_SHOPCARTLIST(state, payload) {
        state.cartListResponse = payload
    }
};

const state = {
    cartListResponse: []
};

const getters = {
    cartListObj(state) {
        return state.cartListResponse[0] || {}
    },
};

export default {
    actions,
    mutations,
    state,
    getters
};

