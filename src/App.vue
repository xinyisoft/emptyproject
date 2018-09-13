<template>
  <div id="app">
    <section class="appview" :style="{backgroundColor:appNavConfig.backgroundColor}">
      <section class="xinyi-app-content" :style="{top:contentTop + 'px'}">
        <div v-if="isLoading">加载中</div>
        <transition :name="transitionName">
          <router-view/>
        </transition>
      </section>
      <section class="xinyi-app-header"
               :style="{backgroundColor:appNavConfig.navigationBarBackgroundColor,color:appNavConfig.navigationBarTextStyle}">
        <div class="xinyi-app-bar-left-button">
          <div class="nav-icon" v-if="historyNumber > 0" @click="goback"><i class="material-icons">chevron_left</i>
          </div>
          <div class="nav-icon" @click="closeApp"><i class="material-icons">close</i></div>
        </div>
        <div class="xinyi-app-bar-title">
          {{appNavConfig.navigationBarTitleText}}
        </div>
        <div class="xinyi-app-bar-rght-tools">
          <i class="material-icons">more_horiz</i>
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
        contentTop: 68
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading,
        direction: state => state.direction,
        appNavConfig: state => state.appNavConfig,
        historyNumber: state => state.historyNumber,
        transitionName: state => state.transitionName
      }),
      transitionName() {
        if (!this.direction) return ''
        return (this.direction === 'forward' ? 'slide-left' : 'slide-right')
      }
    },
    methods: {
      goback() {
        this.$router.back()
      },
      closeApp() {
        try {
          XY.close();
        } catch (e) {

        }
      }
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
        display: flex;
        .nav-icon {
          flex: 1;
          padding: 10px;
        }
      }
      .xinyi-app-bar-title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
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
  @import "assets/app";
</style>
