const xinyi = {
  install(Vue, options) {
    Vue.prototype.$XY = {
      getUserInfo: function (callback) {
        return XY.getUserInfo(callback)
      },
      request: function (opt) {
        return XY.request(opt)
      },
      webAppRequest: function (opt) {
        return XY.webAppRequest(opt)
      },
      showError: function (messageText) {
        return XY.showError(messageText)
      },
      showSuccess: function (messageText) {
        return XY.showSuccess(messageText)
      },
      showInfo: function (messageText) {
        return XY.showInfo(messageText)
      },
      getSid: function (opt) {
        return XY.getSid(opt);
      },
      getUserAuth: function (opt) {
        return XY.getUserAuth(opt);
      },
      getAppLoginInfo: function (opt) {
        return XY.getAppLoginInfo(opt)
      },
      ClientType: function () {
        return XY.ClientType()
      }
    }
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(xinyi)
}
export default xinyi
