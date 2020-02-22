import axios from 'axios'

let $http = axios.create()
// 超时默认值2.5秒
$http.defaults.timeout = 2500;
// 添加请求拦截器
$http.interceptors.request.use(function (config) {
  // 在发送请求之前处理
  return config;
}, function (error) {
  // 对请求错误处理
  return Promise.reject(error);
});

// 添加响应拦截器
$http.interceptors.response.use(function (response) {
  // 对响应数据处理
  let res = {
    data: response.data,
    status: response.status
  }
  return res;
}, function (error) {
  // 对响应错误处理
  return Promise.reject(error);
});

export default {
  $http,
  install: function (Vue) {
    // 添加实例方法
    Object.defineProperty(Vue.prototype, "$http", { value: $http })
  }
}
