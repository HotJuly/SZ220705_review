import axios from 'axios';
import store from '@/store';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

const CancelToken = axios.CancelToken;

request.interceptors.request.use((config)=>{
    // 通过config.url可以得知当前发出去的是哪个请求地址
    const url = config.url;

    // 给每个请求都添加上唯一标识
    // CancelToken接收的回调函数,会被立即执行
    config.cancelToken = new CancelToken((cb)=>{
        // 如果此处的cb被调用了,那么当前请求就会被取消
        store.commit('ADD_FN',{url,cb})
    });
    return config
})

request.interceptors.response.use((response)=>{
    // console.log(response)
    const url = response.config.url;
    store.commit('REMOVE_FN',url);
    return response.data;
})

export default request