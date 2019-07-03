// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import messages from './langs'

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: localStorage.getItem("language") || 'cn',
    messages
})

locale.i18n((key, value) => i18n.t(key, value)) //重点：为了实现element插件的多语言切换

Vue.config.productionTip = false;

// 引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import 'jquery-ui/ui/widgets/draggable'; //拖动弹窗
import "jquery-ui/ui/widgets/resizable"; //拖动缩放

import axios from "axios";
import Qs from "qs";
axios.defaults.transformRequest = [function(data) {
  if(data.toString()=="[object FormData]"){
    return data;
  }else{
    return Qs.stringify(data)
  }
}];
const host =
  process.env.NODE_ENV === "development" ? "/" : "http://serve.futures.jinjifuweng.com/"; // 根据 process.env.NODE_ENV 的值判断当前是什么环境
const instance = axios.create({
  baseURL: host,
  timeout: 10000,
  withCredentials: true
});

// const host = 
//   process.env.NODE_ENV === "development" ? "/" : "http://serve.hngj.hk/"; // 根据 process.env.NODE_ENV 的值判断当前是什么环境
// const instance = axios.create({
//   // headers: {
//   //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",  
//   //   'Accept': 'application/json'
//   // },
//   baseURL: host,
//   // transformRequest: [function (data) {
//   //   data = Qs.stringify(data);
//   //   return data;
//   // }],
//   timeout: 20000, //指定请求超时的毫秒数(0 表示无超时时间)
//   withCredentials: true //表示跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等) 当前请求为跨域类型时是否在请求中协带cookie
// });
// 添加响应拦截器
// instance.interceptors.response.use(
//   function(response) {
//     // 对响应数据做点什么
//     if (response.data.code == 0) {
//       alert(response.data.msg);
//       // this.$message.error(response.data.msg);
//     } else if (response.data.code == 1) {
//       return response;
//     }
//   },
//   function(error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   }
// );
Vue.prototype.$http = instance;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),//vue2.0的写法
  // components: { App }, vue1.0的写法
  template: '<App/>'
})
