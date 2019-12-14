/*
 * @Author: isboyjc
 * @Date: 2019-12-13 14:06:53
 * @LastEditors: isboyjc
 * @LastEditTime: 2019-12-14 13:45:54
 * @Description: axios request封装
 */
import axios from 'axios'
import querystring from 'query-string'

// 请求拦截回调
const requestInterceptors = function(config) {
  if (config.method.toLocaleUpperCase() === 'POST') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.data = querystring.stringify(config.data)
  }
  return config
}

// 响应拦截回调
const responseInterceptors = function(response) {
  let { data } = response
  // ..
  return Promise.resolve(data)
}

// 响应拦截错误回调
const responseErrorInterceptors = function (error) {
  try {
    let { status } = error.response
    window.console.log(status)
  } catch(err) {
    window.console.error(JSON.stringify(err))
  }

  return Promise.reject(error)
}

const instance = axios.create()

instance.defaults.withCredentials = true

instance.interceptors.request.use(requestInterceptors)

instance.interceptors.response.use(responseInterceptors, responseErrorInterceptors)

export default instance
