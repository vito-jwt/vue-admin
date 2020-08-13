import axios from 'axios';
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = window.sessionStorage.getItem("Kele-Admin-Token")
    if (token) {
        config.headers['Kele-Admin-Token'] = Token; 
    }else{
        config.headers['Kele-Admin-Token'] = "temp_password_policy";
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const GetThash24H = params => { return axios.get(`${base}/admin/v1/getthash24h`, { params: params }); };

export const GetThashs24H = params => { return axios.get(`${base}/admin/v1/getthashs24h`, { params: params }); };

export const GetMainAccountStatistics = params => { return axios.get(`${base}/admin/v1/getmainaccountstatistics`, { params: params }); };

export const GetMainAccountStatisticsCount = params => { return axios.get(`${base}/admin/v1/getmainaccountstatisticscount`, { params: params }); };