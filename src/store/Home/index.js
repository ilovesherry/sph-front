import { requestCatagoryList, requestBannerList, requestFloorList } from '@/api'
const actions = {
    async getCatagoryList(context) {
        let list = await requestCatagoryList()
        // console.log('@@actions', ' requestCatagoryList', list)
        if (list.status === 200 && list.data.code === 200) {
            context.commit('SET_CATAGORYLIST', list.data.data)
        } else {
            //...
        }
    },
    async getBannerList(context) {
        let promise = await requestBannerList()
        if (promise.status === 200 && promise.data.code === 200) {
            context.commit('SET_BANNERLIST', promise.data.data)
        } else {
            // 异常处理
        }
    },
    async getFloorList({ commit }) {
        await requestFloorList().then(({data}) => {
            // console.log(data)
            if(data.code == 200) {
                commit("SET_FLOORLIST", data.data)
            }
        })
    }
}

const mutations = {
    SET_CATAGORYLIST(state, payload) {
        // console.log('@@mutations', ' CATAGORYLIST', state, payload)
        state.catagoryList = payload
    },
    SET_BANNERLIST(state, payload) {
        state.bannerList = payload
    },
    SET_FLOORLIST(state, payload) {
        state.floorList = payload
    }
}

const state = {
    // 三级列表菜单数据
    catagoryList: [],
    // banner轮播图数据
    bannerList: [],
    // floor数据
    floorList: []
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}