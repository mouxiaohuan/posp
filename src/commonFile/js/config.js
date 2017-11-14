import axios from 'axios';
let base = 'http://172.17.9.13:3001/api';
let menuUrl='http://172.16.5.198:8250';
export let token='1111'
export const setToken=value=>{ token= value };

/* 获取菜单 */
export const getMenu = params => {
    axios.head()
    return axios.post(`${menuUrl}/menus`, params)
};//获取收款列表

