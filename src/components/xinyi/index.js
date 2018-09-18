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
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.setAttribute('multiple', 'multiple')
        input.addEventListener('change', function (e) {
          const files = e.path[0].files
          const tempFilePaths = []
          const len = opt.count ? opt.count > files.length ? files.length : opt.count : files.length
          for (let i = 0; i < len; i++) {
            tempFilePaths.push(files[i].path)
          }
          opt.success({ tempFilePaths })
        }, false)
        input.click()
      }
    }
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(xinyi)
}
export default xinyi
