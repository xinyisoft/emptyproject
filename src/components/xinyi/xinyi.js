import axios from './http.js'
import PHP from './php.full.js'
import util from './util.js'
import Vue from 'vue'
import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

const apiurlList = [
  'http://api.xinyisoft.net',
  'http://api.yunshouyin.org',
  'http://api.qcy.cn',
  'http://api.qcytest.cn',
  'http://api.qcynew.cn'
]
const ClientType = 'qingcanyinpc.windows'

const CONFIG = {
  // 本地开发测试环境
  apiurl: 'http://api.qcytest.cn',
  appid: '1',
  secret: '8e1d4c9fedb65656',
  httptimeout: 30000,
  FILEUPLOADURL: 'http://api.xinyisoft.org/Fileupload',
  FILEURL: 'http://f.xinyisoft.org/',
  fileappid: '100', // 应用ID
  fileappsecret: 'ec78d6bcb3b46dab009d9e0b220c8180'
}
const stripscript = util.stripscript
const getFileTypeText = util.getFileTypeText
const getFileExtension = util.getFileExtension
const getFielname = util.getFielname
const FileSignSortBy = util.FileSignSortBy
const func = util.PrvateFunction
const xinyi = {
  getPostData: function (data) {
    if (!data.appid) data.appid = CONFIG.appid
    if (!data.timestamp) data.timestamp = PHP.time()
    if (!data.version) data.version = '1.0'
    data.sign = this.getSign(data)
    delete data.secret
    return data
  },
  getSign: function (data) {
    data.secret = CONFIG.secret
    data = PHP.ksort(data)
    let tmp = []
    for (let i in data) {
      tmp.push(i + '=' + data[i])
    }
    delete data.secret
    return PHP.md5(tmp.join('&'))
  },
  /**
   * 小程序接口请求
   * @param {Object} data
   */
  getAppPostData: function (data) {
    if (!data.appid) data.appid = 100087
    if (!data.secret) data.secret = '926e78668da057684b37f9e3'
    if (!data.timestamp) data.timestamp = PHP.time()
    if (!data.version) data.version = '1.0'
    data.sign = this.getAppSign(data)
    delete data.secret
    return data
  },
  /**
   * 获取小程序和芯易接口通信的签名数据
   * @param {Object} data
   */
  getAppSign: function (data) {
    data = PHP.ksort(data)
    var tmp = []
    for (var i in data) {
      tmp.push(i + '=' + data[i])
    }
    delete data.secret
    return PHP.md5(tmp.join('&'))
  },
  /**
   * nodejs 原生md5值计算
   *
   * @param {Object} data
   */
  md5: function (data) {
    var crypto = require('crypto')
    var md5 = crypto.createHash('md5')
    return md5.update(data).digest('hex')
  },
  /**
   * nodejs原生文件md5值计算
   * @param {Object} filename
   * @param {Object} callback
   */
  fileMd5: function (filename, callback) {
    var fs = require('fs')
    var crypto = require('crypto')
    // 开始计算
    var md5sum = crypto.createHash('md5')
    var stream = fs.createReadStream(filename)
    stream.on('data', function (chunk) {
      md5sum.update(chunk)
    })
    stream.on('end', function () {
      var str = md5sum.digest('hex')
      callback(true, str)
    })
  },
  /**
   * 设置缓存
   */
  Cache: {
    set: function (key, value) {
      key = 'cache_' + PHP.md5(key);
      if (value === null || value == '') {
        //其他情况直接清空
        localStorage.removeItem(key);
      }
      var dataStr = PHP.json_encode({
        data: value
      });
      localStorage.setItem(key, dataStr);
    },
    get: function (key) {
      key = 'cache_' + PHP.md5(key);
      var value = localStorage.getItem(key);
      if (value === null) return null;
      var dataobj = PHP.json_decode(value, true);
      if (dataobj && dataobj.data) {
        return dataobj.data;
      }
      return null;
    },
    del: function (key) {
      key = 'cache_' + PHP.md5(key);
      localStorage.removeItem(key);
    }
  },
  /**
   * 设置配置数据
   * 浏览器关闭后不清空，配置数据为加密存储不建议存储大量数据
   */
  Config: {
    get: function (key) {
      var dataStr = localStorage.getItem('$config');

      if (dataStr === null) {
        return null;
      }
      var dataobj = PHP.json_decode(func.crypto_decode(dataStr), true);
      if (key) {
        return dataobj[key] || null;
      } else {
        return dataobj;
      }
    },
    set: function (key, value) {
      var config = localStorage.getItem('$config');
      if (config === null) {
        config = {};
      } else {
        config = PHP.json_decode(func.crypto_decode(config), true);
      }
      if (!value) value = null;
      if (value === null || value == '') {
        if (config[key]) delete config[key];
      } else {
        config[key] = value;
      }
      var dataStr = func.crypto_encode(PHP.json_encode(config));
      localStorage.setItem('$config', dataStr);
    },

    clear: function () {
      localStorage.removeItem('$config');
    }
  },
  /**
   * 设置临时的缓存，浏览器关闭后自动删除
   */
  Session: {
    set: function (key, value) {
      if (!value) value = null;
      key = 'session_' + PHP.md5(key);
      var dataobj = {};
      if (value === null || value == '') {
        //其他情况直接清空
        sessionStorage.removeItem(key);
      } else {
        dataobj = {
          data: value
        };
      }
      var dataStr = func.crypto_encode(PHP.json_encode(dataobj));
      sessionStorage.setItem(key, dataStr);
    },
    get: function (key) {
      key = 'session_' + PHP.md5(key);
      var dataStr = sessionStorage.getItem(key);
      if (dataStr === null) {
        return null;
      }
      var dataobj = PHP.json_decode(func.crypto_decode(dataStr), true);
      if (dataobj.data) {
        return dataobj.data;
      }
      return null;
    },
    clear: function () {
      sessionStorage.clear();
    }
  },
  showNotice(opt) {
    try {
      Notification.requestPermission(function (permission) {
        if (permission === 'granted') {
          let notification = new Notification(opt.title, {
            dir: 'auto',
            lang: 'zh-CN',
            tag: 'notice',
            icon: '../../src/assets/error.png',
            body: opt.messageText,
            data: {
              url: opt.link
            }
          })
          setTimeout(function() {
            notification.close();
          }, 3000);
          notification.onclick = function() {
            console.log(notification)
          }
        }
      })
    } catch(e) {
      console.log(e)
    }
  },
  showSuccess(messageText) {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        let notification = new Notification('轻餐饮-成功提示', {
          dir: 'auto',
          lang: 'zh-CN',
          tag: 'success',
          icon: '../../static/success.png',
          body: messageText
        })
        setTimeout(function() {
          notification.close();
        }, 3000);
      }
    })
  },
  showError(messageText) {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        let notification = new Notification('轻餐饮-失败提示', {
          dir: 'auto',
          lang: 'zh-CN',
          tag: 'error',
          icon: '../../static/error.png',
          body: messageText
        })
        setTimeout(function() {
          notification.close();
        }, 3000);
      }
    })
  },
  showInfo(messageText) {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        let notification = new Notification('轻餐饮-消息提醒', {
          dir: 'auto',
          lang: 'zh-CN',
          tag: 'info',
          icon: '../../static/info.png',
          body: messageText
        })
        setTimeout(function() {
          notification.close();
        }, 3000);
      }
    })
  },
  XinyiApi(opt) {
    if (!opt.success) {
      opt.success = function () {
      }
    }
    if (!opt.fail) {
      opt.fail = function () {
      }
    }
    opt.method = 'POST'
    opt.url = CONFIG.apiurl + '?ostype=pc&method=' + opt.data.method
    opt.data = this.getPostData(opt.data)
    let success = opt.success
    let querystring = require('querystring')
    let postData = querystring.stringify(opt.data)
    axios.post('/api', postData).then((res) => {
      success(res)
    }, (xhr) => {
      opt.fail(xhr)
    })
  },
  webAppRequest(opt) {
    if (!opt.success) {
      opt.success = function () {
      }
    }
    if (!opt.fail) {
      opt.fail = function () {
      }
    }
    opt.method = 'POST'
    opt.url = CONFIG.apiurl + '?ostype=pc&method=' + opt.data.method
    opt.data = this.getPostData(opt.data)
    let success = opt.success
    let querystring = require('querystring')
    let postData = querystring.stringify(opt.data)
    axios.post('/api', postData).then((res) => {
      success(res)
    }, (xhr) => {
      opt.fail(xhr)
    })
  },
  request(opt) {
    console.warn('当前开发模式暂不支持request请求,请使用调试器进行测试')
  },
  HttpGet(opt) {
    console.warn('当前开发模式暂不支持HttpGet请求,请使用调试器进行测试')
  },
  /**
   * 带用户token的请求
   * @param {Object} opt
   */
  XinyiApiAuth(opt) {
    if (!opt.success) {
      opt.success = function () {
      }
    }
    if (!opt.fail) {
      opt.fail = function () {
      }
    }
    this.getUserToken((usertoken) => {
      if (usertoken) {
        opt.method = 'POST'
        opt.url = CONFIG.apiurl + '?ostype=pc&method=' + opt.data.method
        opt.data.user_token = usertoken
        opt.data = this.getPostData(opt.data)
        let success = opt.success
        let querystring = require('querystring')
        let postData = querystring.stringify(opt.data)
        axios.post('/api', postData).then((res) => {
          success(res)
        }, (xhr) => {
          opt.fail(xhr)
        })
      } else {
        opt.fail('获取user_token失败了')
      }

    })
  },
  /**
   * 普通请求
   * @param {Object} opt
   */
  XinyiApiToken(opt) {
    if (!opt.success) {
      opt.success = function () {
      }
    }
    if (!opt.fail) {
      opt.fail = function () {
      }
    }
    this.getToken((token) => {
      if (token) {
        opt.method = 'POST'
        opt.url = CONFIG.apiurl + '?ostype=pc&method=' + opt.data.method
        opt.data = this.getPostData(opt.data)
        opt.data.version = '1.0'
        let success = opt.success
        let querystring = require('querystring')
        let postData = querystring.stringify(opt.data)
        axios.post('/api', postData).then((res) => {
          success(res)
        }, (xhr) => {
          opt.fail(xhr)
        })
      } else {
        this.XinyiApi(opt);
      }
    })
  },
  XinyiApiAuthToken(opt) {
    if (!opt.success) {
      opt.success = function () {
      }
    }
    if (!opt.fail) {
      opt.fail = function () {
      }
    }
    this.getUserToken((usertoken) => {
      //			console.log(111)
      if (usertoken) {
        //				console.log(11122)
        this.getToken((token) => {
          //					console.log(222, token)
          if (token) {
            //						console.log('XinyiApiAuthToken opt.data2',opt.data);
            opt.method = 'POST';
            opt.url = CONFIG.apiurl + '?access_token=' + token;
            opt.data.user_token = usertoken;
            opt.data.version = '1.0';
            opt.data = this.getPostData(opt.data)
            let success = opt.success
            let querystring = require('querystring')
            let postData = querystring.stringify(opt.data)
            axios.post('/api', postData).then((res) => {
              success(res)
            }, (xhr) => {
              opt.fail(xhr)
            })
          } else {
            //						console.log('XinyiApiToken opt.data2', index, opt.data);
            opt.data.user_token = usertoken;
            this.XinyiApi(opt);
          }
        })
      } else {
        opt.fail('获取user_token失败了')
      }

    })
  },
  getToken(callback) {
    try {
      if (!callback) {
        callback = function (token) {
          console.log(token)
        };
      }
      var token = this.Config.get(CONFIG.apiurl + 'token');
      var times = PHP.time();
      if (token) {
        if (times < token.expires_in) {
          callback(token.access_token);
          return;
        } else if (times < token.refresh_expires_in) {
          this.XinyiApi({
            data: {
              method: 'openapi.Bin.refreshToken',
              refresh_token: token.refresh_token
            },
            success: function (data) {
              if (data.code != '1') {
                this.Config.set(CONFIG.apiurl + 'token', null);
                callback(false, data);
                return;
              } else {
                data.data.expires_in = PHP.time() + data.data.expires_in - 60;
                data.data.refresh_expires_in = PHP.time() + 863000;
                this.Config.set(CONFIG.apiurl + 'token', data.data);
                callback(data.data.access_token);
                return;
              }
            },
            fail: function (xhr) {
              this.Config.set(CONFIG.apiurl + 'token', null);
              callback(false, xhr);
              return;
            }
          })
        }
      } else {
        this.XinyiApi({
          data: {
            method: 'openapi.Bin.token',
          },
          success: (data) => {
            if (data.code != '1') {
              callback(false, data);
              return;
            } else {
              data.data.expires_in = PHP.time() + data.data.expires_in - 60;
              data.data.refresh_expires_in = PHP.time() + 864000;
              this.Config.set(CONFIG.apiurl + 'token', data.data);
              callback(data.data.access_token);
              return;
            }
          },
          fail: (xhr) => {
            this.Config.set(CONFIG.apiurl + 'token', null);
            callback(false, xhr);
            return;
          }
        })
      }

    } catch (e) {
      console.log(e);
      this.Config.set(CONFIG.apiurl + 'token', null);
      callback(false, e)
      return;
    }
  },
  /**
   * 获取当前用户登录的token
   * callback 回调函数
   */
  getUserToken(callback) {
    if (!callback) {
      callback = function () {
      };
    }
    var usertoken = this.Config.get('userkey');
    if (usertoken) {
      if (PHP.time() > usertoken.expires_in) {
        /* 刷新token */
        if (PHP.time() > usertoken.refresh_expires_in) {
          /* 时间过长，重新登陆 */
          this.Config.set('userkey', null);
          callback(false);
        } else {
          this.XinyiApi({
            data: {
              method: 'login.User.refreshusertoken',
              refresh_token: usertoken.refresh_token
            },
            success: (data) => {
              if (data.code === 1) {
                data.data.expires_in = PHP.time() + data.data.expires_in - 60;
                data.data.refresh_expires_in = PHP.time() + 86300000000;
                this.Config.set('userkey', data.data);
                callback(data.data.user_token);
                return;
              } else {
                console.log('getusertoken data ', data);
                this.Config.set('userkey', null);
                callback(false);
                return;
              }
            },
            fail: (xhr) => {
              console.log('getusertoken httperr ', xhr);
              this.Config.set('userkey', null);
              callback(false);
            }
          })
        }
        return;
      }
      callback(usertoken.user_token);
      return;
    } else {
      this.Config.set('userkey', null);
      callback(false);
      return;
    }
  },
  getUserInfo(options) {
    if (typeof options === 'function') {
      var callback = options;
    } else if (typeof options === 'object' && options.success) {
      var callback = options.success
    } else {
      return false;
    }
    var userinfo = this.Session.get('userinfo');
    if (userinfo) {
      userinfo.appid = CONFIG.appid;
      callback(userinfo);
      return;
    }
    this.XinyiApiAuth({
      data: {
        method: 'user.User.getUserInfo'
      },
      success: (data) => {
        if (data.code != 1) {
          callback(false, data);
          return;
        } else {
          data.data.appid = CONFIG.appid;
          this.Session.set('userinfo', data.data);
          callback(data.data);
          return;
        }
      },
      fail: (xhr) => {
        callback(false, xhr);
        return;
      }
    })
  },
  getAppLoginInfo(opt) {
    if (!opt.success) {
      opt.success = function () {
      };
    }
    if (!opt.fail) {
      opt.fail = function () {
      };
    }
    this.getUserInfo((userinfo) => {
      if (userinfo) {
        this.XinyiApi({
          data: {
            method: 'login.User.getAppLoginInfo',
            openid: userinfo.openid,
            sid: 10000,
            newappid: 100087
          },
          success: (rest) => {
            if (rest.code == 1) {
              rest.data.sid = 10355;
              rest.data.appid = 100087;
              opt.success(rest.data);
            } else {
              opt.fail(rest);
            }
          },
          fail: (xhr) => {
            opt.fail(xhr);
          }
        })
      }
    });
  },
  getBusinessInfo(opt) {
    if (!opt.success) {
      opt.success = function () {
      }
    }
    if (!opt.fail) {
      opt.fail = function () {
      }
    }
    opt.success({
      bname: '邱天下雨',
      isadmin: 1,
      isdefault: 0,
      isjoin: 1,
      link: 'http://10355.msetting.qingshouyin.cn/index/basicinfo',
      logo: 'http://f.xinyisoft.org/747f4afb4c3660c8543a89fab75b4d65',
      newmsgnum: 0,
      role: ['超管'],
      sid: 10355,
      status: 1
    })
  },
  getSignData(opt) {
    if (!opt.success) {
      opt.success = function () {
      }
    }
    if (!opt.fail) {
      opt.fail = function () {
      }
    }
    var signData = this.getAppPostData(opt.data);
    if (signData) {
      opt.success({signdata: signData});
    } else {
      opt.fail('获取签名失败');
    }
  },
  getUserAuth(opt) {
    if (!opt.success) {
      opt.success = function () {
      }
    }
    if (!opt.fail) {
      opt.fail = function () {
      }
    }
    opt.success({
      super: true,
      auth: []
    })
  },
  login() {
    this.getUserToken((usertoken) => {
      if (!usertoken) {
        this.XinyiApi({
          data: {
            user: 10296,
            pass: 'a123456',
            method: 'login.User.login',
            type: ClientType
          },
          success: (rest) => {
            console.log(rest, '登录成功')
            if (rest.code !== 1) {
              return false
            }
            rest.data.expires_in = PHP.time() + rest.data.expires_in - 60
            rest.data.refresh_expires_in = PHP.time() + 863000000
            this.Config.set('userkey', rest.data)
          },
          fail: function (xhr) {
            console.log(xhr);
          }
        })
      }
    })
  },
  ClientType() {
    return ClientType;
  },
  uploadFiles(opt) {
    if(!opt.start) opt.start = function(params) {
      console.log('fileupload start ', params);
    };
    if(!opt.success) opt.success = function(params, fileinfo) {
      console.log('fileupload success ', params, fileinfo);
    };
    if(!opt.fail) opt.fail = function(params, errmsg) {
      console.log('fileupload fail ', params, errmsg);
    };
    if(!opt.change) opt.change = function(params, filesize, uploadsize, fileinfo) {
      console.log('fileupload change ', params, filesize, uploadsize, fileinfo);
    };
    if(!opt.params) opt.params = {};
    console.warn('当前开发模式暂不支持文件上传,请使用调试器进行测试')
  },
  chooseImage(opt) {
    if(!opt.success) opt.success = function() {}
    if(!opt.fail) opt.fail = function() {}
    console.warn('当前开发模式暂不支持获取文件路径,请使用调试器进行测试')
  },
  downFile(opt) {
    if(!opt.success) opt.success = function() {}
    if(!opt.fail) opt.fail = function() {}
    console.warn('当前开发模式暂不支持文件下载,请使用调试器进行测试')
  },
  showModal(opt) {
    let options = Object.assign({}, {
      title: 'modal',
      content: 'modal弹窗内容',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        console.log(res)
      }
    }, opt)
    Vue.$vux.confirm.show({
      // 组件除show外的属性
      title: options.title,
      content: options.content,
      confirmText: options.confirmText,
      cancelText: options.cancelText,
      showCancelButton: options.showCancel,
      onCancel () {
        opt.success({
          confirm: false,
          cancel: true
        })
      },
      onConfirm () {
        opt.success({
          confirm: true,
          cancel: false
        })
      }
    })
  },
  getSid(opt) {
    if (!opt.success) {
      opt.success = function () {
      }
    }
    if (!opt.fail) {
      opt.fail = function () {
      }
    }
    opt.success({sid: 10355})
  }
}
xinyi.login()
xinyi.setConfig = xinyi.Config.set
xinyi.getConfig = xinyi.Config.get
xinyi.clearConfig = xinyi.Config.clear
xinyi.setCache = xinyi.Cache.set
xinyi.getCache = xinyi.Cache.get
xinyi.delCache = xinyi.Cache.del
xinyi.setSession = xinyi.Session.set
xinyi.getSession = xinyi.Session.get
xinyi.clearSession = xinyi.Session.clear

export default xinyi
