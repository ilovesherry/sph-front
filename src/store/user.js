import { requestAuthCode } from '@/api';
import { requestRegisterUser } from '@/api';
import { requestLogin } from '@/api';
import { requestUserInfo } from '@/api';
import { requestLogout } from '@/api'

// 引入在本地存储操作token的api
import { setToken, getToken, removeToken} from '@/utils/token'

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
            commit('SET_TOKEN', result.data.data.token);
            return "ok";
        } else {
            return Promise.reject(new Error(result.data.message));
        }
    },
    // 向服务器请求用户信息
    async getUserInfo({ commit }) {
        let result = await requestUserInfo();
        console.log('@GetUserInfo', result);
        if(result.status === 200 && result.data.code === 200) {
            commit('SET_USER_INFO', result.data.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.data.data.message));
        }
    },
    async logout({ commit }) {
        let result = await requestLogout();
        if(result.data.code == 200) {
            commit('CLEAR')
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
    SET_TOKEN(state, token) {
        state.token = token;
        setToken(token);
    },
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
      state.userInfo = {};
      state.token = "";
      removeToken();
    }
};

const state = {
    authCode: "",
    userInfo: {},
    token: getToken()
};

const getters = {};

export default {
    actions,
    mutations,
    state,
    getters
}