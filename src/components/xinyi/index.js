import base from './xinyi.js'
const xinyi = {
  install(Vue, options) {
    Vue.prototype.$XY = {
      getXinyiSDKMethod() {
        return process.env.NODE_ENV !== 'production' ? base : XY
      },
      getUserInfo(callback) {
        const XY = this.getXinyiSDKMethod()
        try {
          return XY.getUserInfo(callback)
        } catch (e) {}
      },
      request(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.request(opt) } catch (e) {}
      },
      HttpGet(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.HttpGet(opt) } catch (e) {}
      },
      webAppRequest(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.webAppRequest(opt) } catch (e) {}
      },
      showError(messageText) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.showError(messageText) } catch (e) {}
      },
      showSuccess(messageText) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.showSuccess(messageText) } catch (e) {}
      },
      showInfo(messageText) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.showInfo(messageText) } catch (e) {}
      },
      showNotice(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.showNotice(opt) } catch (e) {}
      },
      getSid(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.getSid(opt); } catch (e) {}
      },
      getUserAuth(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.getUserAuth(opt); } catch (e) {}
      },
      getAppLoginInfo(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.getAppLoginInfo(opt) } catch (e) {}
      },
      ClientType() {
        const XY = this.getXinyiSDKMethod()
        try { return XY.ClientType() } catch (e) {}
      },
      getBusinessInfo(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.getBusinessInfo(opt) } catch (e) {}
      },
      getSignData(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.getSignData(opt) } catch (e) {}
      },
      uploadFiles(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.uploadFiles(opt) } catch (e) {}
      },
      chooseImage(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.chooseImage(opt) } catch (e) {}
      },
      getCache(key) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.getCache(key) } catch (e) {}
      },
      setCache(key, value) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.setCache(key, value) } catch (e) {}
      },
      delCache(key) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.delCache(key) } catch (e) {}
      },
      getSession(key) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.getSession(key) } catch (e) {}
      },
      setSession(key, value) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.setSession(key, value) } catch (e) {}
      },
      clearSession(key) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.clearSession(key) } catch (e) {}
      },
      getConfig(key) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.getConfig(key) } catch (e) {}
      },
      setConfig(key, value) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.setConfig(key, value) } catch (e) {}
      },
      clearConfig(key) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.clearConfig(key) } catch (e) {}
      },
      showModal(opt) {
      	const XY = this.getXinyiSDKMethod()
        try { return XY.showModal(opt) } catch (e) {}
      },
      downFile(opt) {
        const XY = this.getXinyiSDKMethod()
        try { return XY.downFile(opt) } catch (e) {}
      }
    };
  }
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(xinyi)
}
export default xinyi
