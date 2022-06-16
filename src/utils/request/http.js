import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000,
  withCredentials: false, // 当前请求为跨域类型时是否在请求中协带cookie
})

//请求拦截
http.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)
//响应拦截
http.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    return Promise.reject(err.response)
  }
)
export default http
