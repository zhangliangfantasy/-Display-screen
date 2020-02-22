import Req from "@/http";
import API from "@/api";

/**
 * get请求
 * @param {*} url 地址
 * @param {*} params 参数
 * @param {*} opt 配置
 */
export function get(url, params = {}, opt) {
  let config = {
    params: params
  };
  if (opt) {
    config = Object.assign(config, opt);
  }
  return Req.$http.get(API[url] ? API[url] : url, config)
}

/**
 * post请求
 * @param {*} url 地址
 * @param {*} params 参数
 * @param {*} opt 配置
 */
export function post(url, params = {}, opt) {
  if (opt) {
    return Req.$http.post(API[url] ? API[url] : url, params, opt)
  } else {
    return Req.$http.post(API[url] ? API[url] : url, params)
  }
}

export default {
  get, post
}
