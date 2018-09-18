<template>
  <div class="testXY-view">
    <group>
      <cell title="getUserInfo" @click.native="getUserInfo" is-link/>
      <cell title="getUserAuth" @click.native="getUserAuth" is-link/>
      <cell title="getSid" @click.native="getSid" is-link/>
      <cell title="showSuccess" @click.native="showSuccess" is-link/>
      <cell title="getAppLoginInfo" @click.native="getAppLoginInfo" is-link/>
      <cell title="ClientType" @click.native="ClientType" is-link/>
      <cell title="getBusinessInfo" @click.native="getBusinessInfo" is-link/>
      <cell title="getSignData" @click.native="getSignData" is-link/>
    </group>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <p class="weui-uploader__title">图片上传</p>
          </div>
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files" id="uploaderFiles" v-if="imgList.length > 0">
              <li class="weui-uploader__file" v-for="(img, index) in imgList" :key="index" :style="'backgroundImage:url(' + img + ')'"></li>
            </ul>
            <div class="weui-uploader__input-box">
              <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" @change="uploadFiles" multiple="">
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
              <li class="weui-uploader__file" v-for="(img, index) in chooseImageList" :key="index" :style="'backgroundImage:url(' + img + ')'"></li>
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
      getUserInfo() {
        this.$XY.getUserInfo((userinfo) => {
          console.log(userinfo)
          this.userinfo = userinfo
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
          faild: err => {
            console.log(err)
          }
        })
      },
      showSuccess() {
        this.$XY.showSuccess('测试XYshowSuccess方法')
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
            'xxxx': 'xxxxxxxxxx'
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
        console.log(e.target.files[0])
        this.$XY.uploadFiles({
          url: 'http://api.xinyisoft.org/Fileupload',
          filePath: e.target.files[0].path,
          start: () => {
            console('开始上传')
          },
          change: (obj) => {
            console.log(obj)
          },
          success: (fileinfo) => {
            console.log(fileinfo)
            this.imgList.push('http://f.xinyisoft.org/' + fileinfo.filekey)
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
      }
    }
  }
</script>

<style scoped lang="less">
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
