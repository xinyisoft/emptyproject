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
        money: 123
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
          faild: err => {
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
      }
    }
  }
</script>

<style scoped lang="less">

</style>
