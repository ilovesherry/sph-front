// 在本地存储中保存token
export const setToken = token => {
    localStorage.setItem("TOKEN", token);
};

// 从本地存储中获取token
export const getToken = () => {
    return localStorage.getItem("TOKEN");
};

// 清除token
export const removeToken = () => {
    localStorage.removeItem("TOKEN");
};

