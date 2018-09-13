// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Xinyi from './components/xinyi'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import 'material-design-icons/iconfont/material-icons.css'

Vue.use(Vuex)
Vue.use(Xinyi);
const shouldUseTransition = !/transition=none/.test(location.href)
const store = new Vuex.Store({
  state: {
    historyNumber: 0,
    isLoading: false,
    direction: null,
    appNavConfig: {
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: '轻餐饮小程序',
      backgroundColor: '#eeeeee',
      backgroundTextStyle: 'light',
      navigationImmerse: false,
      navigationMenus: [],
      navigationBackButton: false
    }
  },
  mutations: {
    historyNumberPush(state, payload) {
      state.historyNumber = state.historyNumber + payload.number
    },
    historyNumberDec(state, payload) {
      state.historyNumber = state.historyNumber - payload.number
    },
    setPageConfig(state, config) {
      state.appNavConfig = Object.assign({}, state.appNavConfig, config)
    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection(state, payload) {
      if (!shouldUseTransition) {
        return
      }
      state.direction = payload.direction
    }
  }
})

Vue.config.productionTip = false;
// 处理路由
let EndTime = Date.now()
document.addEventListener('touchend', () => {
  EndTime = Date.now()
})
// 监听后退按钮
window.addEventListener('popstate', function () {
  store.commit('historyNumberPush', {number: -1})
}, false);
let isPush = false
let methods = ['push', 'go', 'replace', 'forward', 'back']
let Storage = window.sessionStorage
Storage.clear()
let historyCount = Storage.getItem('count') * 1 || 0
Storage.setItem('/', 0)

methods.forEach(key => {
  let method = {
    key: key,
    router: router[key].bind(router)
  }
  console.log('method key', key, method)
  router[key] = function (...args) {
    isPush = true
    if (method.key === 'push') {
      store.commit('historyNumberPush', {number: 1})
    } else if (method.go === 'push') {
      store.commit('historyNumberPush', {number: args[0]})
    }
    // console.log('method', method, args)
    method.router.apply(null, args)
  }
})
// 路由开始
router.beforeEach((to, from, next) => {
  // console.log('beforeEach', to, from)
  // 设置页面开始加载
  store.commit('updateLoadingStatus', {isLoading: true})
  //
  const toIndex = Storage.getItem(to.path)
  const fromIndex = Storage.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - EndTime) < 377) {
        store.commit('updateDirection', {direction: ''})
      } else {
        store.commit('updateDirection', {direction: 'reverse'})
      }
    }
  } else {
    ++historyCount
    Storage.setItem('count', historyCount)
    to.path !== '/' && Storage.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }
  // 更新顶部导航配置
  store.commit('setPageConfig', to.meta.config)
  next()
})
// 路由结束
router.afterEach(function (to) {
  isPush = false
  // 设置页面加载完成
  store.commit('updateLoadingStatus', {isLoading: false})
})
if (process.env.NODE_ENV === 'production') {
  Vue.prototype.$Config = require('./config/production.json')
} else {
  Vue.prototype.$Config = require('./config/development.json')
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
