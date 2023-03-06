import { requestAuthCode } from '@/api';
import { requestRegisterUser } from '@/api';
import { requestLogin } from '@/api';

const actions = {
    async getAuthCodeByPhone({ commit }, phone) {
        let result = await requestAuthCode(phone);
        // console.log('@user store', result);
        if(result.status == 200 && result.data.code == 200) {
            commit('GET_AUTH_CODE', result.data);
            return "ok";
        } else {
            return Promise.reject(new Error('获取验证码失败！'));
        }
    },
    async register({ commit }, data) {
        let result = await requestRegisterUser(data);
        if(result.status == 200 && result.data.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error(result.data.message));
        }
    },
    async login({ commit }, data) {
        let result = await requestLogin(data);
        if(result.status == 200 && result.data.code == 200) {
            commit('SET_USER_INFO', result.data.data);
            commit('SET_TOKEN', result.data.data.token);
            return "ok";
        } else {
            return Promise.reject(new Error(result.data.message));
        }
    }
};

const mutations = {
    GET_AUTH_CODE(state, data) {
        state.authCode = data.data;
    },
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo;
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    SET_TOKEN(state, token) {
        state.token = userInfo.token;
        localStorage.setItem("TOKEN", state.token);
    }
};

const state = {
    authCode: "",
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    token: localStorage.getItem('TOKEN') || ""
};

const getters = {};

export default {
    actions,
    mutations,
    state,
    getters
}