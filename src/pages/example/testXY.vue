<template>
  <div class="testXY-view">
    <group>
      <cell title="getUserInfo(对象传参)" @click.native="getUserInfoObj" is-link/>
      <cell title="getUserAuth" @click.native="getUserAuth" is-link/>
      <cell title="getSid" @click.native="getSid" is-link/>
      <cell title="request" @click.native="request" is-link/>
      <cell title="showSuccess" @click.native="showSuccess" is-link/>
      <cell title="showError" @click.native="showError" is-link/>
      <cell title="showInfo" @click.native="showInfo" is-link/>
      <cell title="showNotice" @click.native="showNotice" is-link/>
      <cell title="getAppLoginInfo" @click.native="getAppLoginInfo" is-link/>
      <cell title="ClientType" @click.native="ClientType" is-link/>
      <cell title="getBusinessInfo" @click.native="getBusinessInfo" is-link/>
      <cell title="getSignData" @click.native="getSignData" is-link/>
      <cell title="setCache" @click.native="setCache" is-link/>
      <cell title="getCache" @click.native="getCache" is-link/>
      <cell title="delCache" @click.native="delCache" is-link/>
      <cell title="showModal" @click.native="showModal" is-link/>
    </group>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <p class="weui-uploader__title">图片上传</p>
          </div>
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files" id="uploaderFiles" v-if="imgList.length > 0">
              <li class="weui-uploader__file" v-for="(img, index) in imgList" :key="index"
                  :style="'backgroundImage:url(' + img + ')'"></li>
            </ul>
            <div class="weui-uploader__input-box">
              <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" @change="uploadFiles"
                     multiple="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <p class="weui-uploader__title">选择图片</p>
          </div>
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files" v-if="chooseImageList.length > 0">
              <li class="weui-uploader__file" v-for="(img, index) in chooseImageList" :key="index"
                  :style="'backgroundImage:url(' + img + ')'"></li>
            </ul>
            <div class="weui-uploader__input-box" @click="chooseImage"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Group, Cell} from 'vux'
  export default {
    name: 'testXYView',
    data() {
      return {
        userinfo: {},
        userAuth: {},
        sid: '',
        appinfo: {},
        money: 123,
        imgList: [],
        chooseImageList: []
      }
    },
    components: {
      Group, Cell
    },
    methods: {
      getUserInfoObj() {
        this.$XY.getUserInfo({
          success: (userinfo) => {
            console.log(userinfo)
            this.userinfo = userinfo
          }
        })
      },
      getUserAuth() {
        this.$XY.getUserAuth({
          success: res => {
            console.log(res)
            this.userAuth = res
          },
          faild: err => {
            console.log(err)
          }
        })
      },
      getSid() {
        this.$XY.getSid({
          success: res => {
            console.log(res)
            this.sid = res.sid
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      request() {
        this.$XY.request({
          url: '',
          success: res => {
            console.log(res)
            this.sid = res.sid
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      showSuccess() {
        this.$XY.showSuccess('测试XY.showSuccess方法')
      },
      showError() {
        this.$XY.showError('测试XY.showError方法')
      },
      showInfo() {
        this.$XY.showInfo('测试XY.showInfo方法')
      },
      showNotice() {
        this.$XY.showNotice({
          title: '标题',
          messageText: '内容',
          link: 'http://www.xinyisoft.cn'
        })
      },
      getAppLoginInfo() {
        this.$XY.getAppLoginInfo({
          success: res => {
            console.log(res)
            this.appinfo = res
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      ClientType() {
        console.log(this.$XY.ClientType())
      },
      getBusinessInfo() {
        this.$XY.getBusinessInfo({
          success: res => {
            console.log(res)
          },
          fail: err => {
            // 获取失败
            console.log(err)
          }
        })
      },
      getSignData() {
        this.$XY.getSignData({
          data: {
            'method': 'xxx.xxx.xxxx',
            'sid': '123',
            'openid': 'OPENID-WERTYUUIIOI',
            'appid': '100087',
            'secret': '926e78668da057684b37f9e3'
          },
          success: res => {
            console.log(res)
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      uploadFiles(e) {
        this.$XY.uploadFiles({
          url: 'http://api.xinyisoft.org/Fileupload',
          filePath: e.target.files[0].path,
          start: () => {
            console.log('开始上传')
          },
          change: (obj) => {
            console.log(obj)
          },
          success: (res) => {
            console.log(res)
            this.imgList.push('http://f.xinyisoft.org/' + res.data.filekey)
          },
          fail: (obj) => {
            console.log(obj)
          }
        })
      },
      chooseImage() {
        this.$XY.chooseImage({
          count: 3,
          success: res => {
            console.log(res)
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      getCache() {
        console.log(this.$XY.getCache('bus'))
      },
      setCache() {
        this.$XY.setCache('bus', [{a: 123}])
      },
      delCache() {
        this.$XY.delCache('bus')
      },
      showModal() {
        this.$XY.showModal({
          title: '提示',
          content: '这是一个模态弹窗',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  ul, li {
    list-style: none;
  }

  .weui-cell {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    background-color: #fff;
    margin-top: 10px;
  }

  .weui-cell__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }

  .weui-uploader__hd {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding-bottom: 10px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .weui-uploader__title {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }

  .weui-uploader__bd {
    margin-bottom: -4px;
    margin-right: -9px;
    overflow: hidden;
  }

  .weui-uploader__file {
    float: left;
    margin-right: 9px;
    margin-bottom: 9px;
    width: 79px;
    height: 79px;
    background: no-repeat center center;
    background-size: cover;
  }

  .weui-uploader__input-box {
    float: left;
    position: relative;
    margin-right: 9px;
    margin-bottom: 9px;
    width: 77px;
    height: 77px;
    border: 1px solid #D9D9D9;
    &:before, &:after {
      width: 2px;
      height: 39.5px;
      content: " ";
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      background-color: #D9D9D9;
    }
    &:after {
      width: 39.5px;
      height: 2px;
    }
    input {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .weui-uploader__input {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }

  .weui-uploader__input-box:before, .weui-uploader__input-box:after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #D9D9D9;
  }
</style>
