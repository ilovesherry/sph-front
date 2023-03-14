import { requestTradeInfo } from '@/api';

const actions = {
    async getTradeInfo({ commit }) {
        let result = await requestTradeInfo();
        // console.log('@trade store', result);
        if (result.status == 200 && result.data.code == 200) {
            // console.log('success', result.data)
            commit("SET_TRADE_INFO", result.data.data);
            return "ok";
        } else {
            Promise.reject(new Error("fail"));
        }
    },
};

const mutations = {
    SET_TRADE_INFO(state, tradeInfo) {
        // console.log('mutations', tradeInfo);
        state.tradeInfo = tradeInfo;
    }
};

const state = {
    tradeInfo: {}
};

const getters = {
    userAddressList(state) {
        return state.tradeInfo.userAddressList || [];
    },
    detailArrayList(state) {
        return state.tradeInfo.detailArrayList || [];
    },
    totalAmount(state) {
        return state.tradeInfo.totalAmount || 0;
    }
};

export default {
    actions,
    mutations,
    state,
    getters
};