import { requestSearchResultList } from '@/api'

const actions = {
    async getSearchResults(context, searchParams) {
        await requestSearchResultList(searchParams).then(result => {
            if (result.status == 200 && result.data.code == 200) {
                context.commit('GET_SEARCHINFO', result.data.data)
            }
        }).catch(err => {

        })
    }
}
const mutations = {
    GET_SEARCHINFO(state, payload) {
        state.searchInfo = payload
    }
}
const state = {
    searchInfo: {}
}
const getters = {
    goodsList(state) {
        return state.searchInfo.goodsList || []
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList || []
    },
    attrList(state) {
        return state.searchInfo.attrsList || []
    },
    pageInfo(state) {
        return {pageNo:state.searchInfo.pageNo, pageSize:state.searchInfo.pageSize, totalPages:state.searchInfo.totalPages, total:state.searchInfo.total}
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}