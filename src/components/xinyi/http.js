import axios from 'axios'

// axios 配置
axios.defaults.timeout = 5000

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(response => {
  if (response && response.data.code === 1) {
    return response.data
  }
  // if (response && response.data.type === 'FeatureCollection') {
  //   return response.data
  // }
  if (response.data.code === 8009) {
    // router.replace({
    //   path: '/login',
    //   query: {redirect: router.currentRoute.fullPath}
    // })
    console.log('XinyiApiToken 8009 ', response.data)
  }

  if (response && response.data.code !== 1) {
    return Promise.reject(response.data)
  }
}, error => {
  if (error.response && error.response.status === 401) {
    // 401 清除token信息并跳转到登录页面
    // router.replace({
    //   path: '/login',
    //   query: {redirect: router.currentRoute.fullPath}
    // })
  }
  return Promise.resolve(error.response)
})

export default axios
