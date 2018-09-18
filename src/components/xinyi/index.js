const xinyi = {
  install(Vue, options) {
    Vue.prototype.$XY = {
      getUserInfo(callback) {
        return XY.getUserInfo(callback)
      },
      request(opt) {
        return XY.request(opt)
      },
      webAppRequest(opt) {
        return XY.webAppRequest(opt)
      },
      showError(messageText) {
        return XY.showError(messageText)
      },
      showSuccess(messageText) {
        return XY.showSuccess(messageText)
      },
      showInfo(messageText) {
        return XY.showInfo(messageText)
      },
      getSid(opt) {
        return XY.getSid(opt);
      },
      getUserAuth(opt) {
        return XY.getUserAuth(opt);
      },
      getAppLoginInfo(opt) {
        return XY.getAppLoginInfo(opt)
      },
      ClientType() {
        return XY.ClientType()
      },
      getBusinessInfo(opt) {
        return XY.getBusinessInfo(opt)
      },
      getSignData(opt) {
        return XY.getSignData(opt)
      },
      uploadFiles(opt) {
        return XY.uploadFiles(opt)
      },
      chooseImage(opt) {
        return XY.chooseImage(opt)
      }
    }
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(xinyi)
}
export default xinyi
