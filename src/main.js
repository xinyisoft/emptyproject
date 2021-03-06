// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Xinyi from './components/xinyi'
import App from './App'
import Vuex from 'vuex'
// import FastClick from 'fastclick'
import router from './router'
import 'material-design-icons/iconfont/material-icons.css'
import XinyiAuth from './components/xinyicom/index.js'
import {TransferDom, AlertPlugin, ConfirmPlugin, ToastPlugin} from 'vux'

Vue.directive('transfer-dom', TransferDom)
Vue.use(Vuex)
Vue.use(Xinyi)
Vue.use(XinyiAuth)

// 注册基本插件
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

const shouldUseTransition = !/transition=none/.test(location.href)
// FastClick.attach(document.body)
const navigationDefault = {
  navigationBarBackgroundColor: '#ffffff',
  navigationBarTextStyle: 'black',
  navigationBarTitleText: '轻餐饮小程序',
  backgroundColor: '#eeeeee',
  backgroundTextStyle: 'light',
  navigationImmerse: false,
  navigationMenus: [],
  navigationBackButton: false
}

const store = new Vuex.Store({
  state: {
    historyNumber: 0,
    isLoading: false,
    direction: null,
    appNavConfig: navigationDefault,
    appConfig: {
      appid: 1000,
      openid: 'OPENID-aksajaskjaslas',
      xinyitoken: 'jajaassaksadlkdas',
      sid: '100'
    },
    navigationTools: [],
    isAdmin: false,
    authPublic: ['/', '/pages/auth/no', '/pages/example/*'],
    authConfig: {}
  },
  mutations: {
    setAdmin(state, paylaod) {
      state.isAdmin = paylaod
    },
    setNavigationTools(state, paylaod) {
      var menus = paylaod.reverse() || [];
      if (menus.length > 2) {
        menus = [];
        console.error('toolsError:顶部工具栏最多只能设置两个，如需更多操作可以通过设置child来扩展更多操作')
      }
      state.navigationTools = menus;
    },
    setAuthConfig(state, payload) {
      state.authConfig = Object.assign({}, payload)
    },
    setAppConfig(state, payload) {
      state.appConfig = Object.assign({}, payload)
    },
    historyNumberPush(state, payload) {
      const numbers = state.historyNumber + payload.number
      state.historyNumber = numbers < 0 ? 0 : numbers
    },
    setPageConfig(state, config) {
      const navconfig = Object.assign({}, navigationDefault, config)
      navconfig.navigationBarTitleText = navconfig.navigationBarTitleText.length > 8 ? navconfig.navigationBarTitleText.substr(0, 8) + '...' : navconfig.navigationBarTitleText
      state.appNavConfig = navconfig;
      try {
        XY.setStatusBarColor({
          color: state.appNavConfig.navigationBarBackgroundColor
        })
      } catch (e) {
      }
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
  router[key] = function (...args) {
    isPush = true
    if (method.key === 'push') {
      if (args[0] !== '/pages/auth/no') {
        store.commit('historyNumberPush', {number: 1})
      }
    } else if (method.go === 'push') {
      store.commit('historyNumberPush', {number: args[0]})
    }
    // console.log('method', method, args)
    method.router.apply(null, args)
  }
})
const loadAppinfo = false

function getAppInfo(callback) {
  if (loadAppinfo) {
    callback();
    return true
  }
  try {
    XY.getUserAuth({
      success(res) {
        if (res.super === true) {
          store.commit('setAdmin', true)
        }
        store.commit('setAuthConfig', res.auth)
        callback();
      },
      fail(e) {
        callback()
      }
    })
  } catch (e) {
    callback();
  }
  try {
    XY.getAppLoginInfo({
      success(res) {
        store.commit('setAppConfig', res)
      },
      fail(e) {
      }
    })
  } catch (e) {
  }
}

// 路由开始
router.beforeEach((to, from, next) => {
  // console.log('beforeEach', to, from)
  getAppInfo(function () {
    // 编译版本检测权限
    if (process.env.NODE_ENV === 'production' && !store.state.isAdmin) {
      if (store.state.authPublic.indexOf(to.path) === -1 && !store.state.authConfig[to.path]) {
        router.push('/pages/auth/no')
        next(false)
        return false
      }
    }
    // 设置页面开始加载
    store.commit('updateLoadingStatus', {isLoading: true})
    store.commit('setNavigationTools', [])
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
})
// 路由结束
router.afterEach(function (to) {
  isPush = false
  // 设置页面加载完成
  store.commit('updateLoadingStatus', {isLoading: false})
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
