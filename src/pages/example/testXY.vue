<template>
  <div class="testXY-view">
    <p><button @click="getUserInfo">getUserInfo</button>{{userinfo.openid}}</p>
    <p><button @click="getUserAuth">getUserAuth</button>{{userAuth}}</p>
    <p><button @click="getSid">getSid</button>{{sid}}</p>
    <p><button @click="showSuccess">showSuccess</button></p>
    <div>
      <button @click="getAppLoginInfo">getAppLoginInfo</button>
      <div>xinyitoken: {{appinfo.xinyitoken}}</div>
      <div>openid: {{appinfo.openid}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'testXYView',
    data() {
      return {
        userinfo: {},
        userAuth: {},
        sid: '',
        appinfo: {}
      }
    },
    created() {
    },
    components: {
    },
    methods: {
      getUserInfo () {
        this.$XY.getUserInfo((userinfo) => {
          console.log(userinfo)
          this.userinfo = userinfo
        })
      },
      getUserAuth () {
        this.$XY.getUserAuth({
          key: 'asdf',
          success: res => {
            console.log(res)
            this.userAuth = res
          },
          faild: err => {
            console.log(err)
          }
        })
      },
      getSid () {
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
      showSuccess () {
        this.$XY.showSuccess('测试XYshowSuccess方法')
      },
      getAppLoginInfo () {
        this.$XY.getAppLoginInfo({
          appid: 100087,
          success: res => {
            console.log(res)
            this.appinfo = res
          },
          faild: err => {
            console.log(err)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">

</style>
