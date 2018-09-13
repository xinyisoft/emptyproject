const xinyi = {
  install(Vue, options) {
    Vue.prototype.$XY = {
      test: function () {
        return '1111'
      }
    }
  }
}
export default xinyi
