<template>
  <div id="app">
    <section class="appview" :style="{backgroundColor:appNavConfig.backgroundColor}">
      <section class="xinyi-app-content" :style="{top:contentTop + 'px'}">
        <router-view/>
      </section>
      <section class="xinyi-app-header"
               :style="{backgroundColor:appNavConfig.navigationBarBackgroundColor,color:appNavConfig.navigationBarTextStyle}">
        <div class="xinyi-app-bar-left-button">
          <i class="material-icons">back</i>
        </div>
        <div class="xinyi-app-bar-title">
          {{appNavConfig.navigationBarTitleText}}{{historyNumber}}
        </div>
        <div class="xinyi-app-bar-rght-tools">
          <i class="material-icons">face</i>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
        contentTop: 80
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading,
        direction: state => state.direction,
        appNavConfig: state => state.appNavConfig,
        historyNumber: state => state.historyNumber
      })
    }
    // beforeCreate() {
    //   console.log('beforeCreate', this.$store)
    // },
    // created() {
    //   console.log('created')
    // },
    // beforeMount() {
    //   console.log('beforeMount')
    // },
    // mounted() {
    //   console.log('mounted')
    // },
    // beforeUpdate() {
    //   console.log('beforeUpdate')
    // },
    // updated() {
    //   console.log('updated')
    // },
    // activated() {
    //   console.log('activated')
    // },
    // deactivated() {
    //   console.log('deactivated')
    // },
    // beforeDestroy() {
    //   console.log('beforeDestroy')
    // },
    // destroyed() {
    //   console.log('destroyed')
    // }
  }
</script>
<style lang="less" scoped>
  .appview {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .xinyi-app-header {
      height: 66px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding-top: 20px;
      .xinyi-app-bar-left-button {
        padding: 10px;
      }
      .xinyi-app-bar-title {
        flex: 1;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        line-height: 46px;
        text-align: center;
      }
      .xinyi-app-bar-rght-tools {
        padding: 10px;
      }
    }
    .xinyi-app-content {
      position: absolute;
      top: 66px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
<style lang="less">
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%
  }

  body {
    line-height: 1.6;
    font-family: -apple-system-font, Helvetica Neue, sans-serif;
    background-color: #fbf9fe
  }

  body, html {
    height: 100%;
    width: 100%;
    overflow-x: hidden
  }

  * {
    margin: 0;
    padding: 0
  }

  a img {
    border: 0
  }

  a {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
  }

  ::-webkit-input-placeholder {
    font-family: -apple-system-font, Helvetica Neue, sans-serif
  }

  a {
    -webkit-touch-callout: none
  }
</style>
