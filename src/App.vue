<template>
  <div id="app">
    <section class="appview" :style="{backgroundColor:appNavConfig.backgroundColor}">
      <section class="xinyi-app-content" id="xinyi-view-box" :style="{top:contentTop + 'px'}">
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
        <div class="xinyi-app-bar-title" :style="{marginLeft:titlePadding}">
          {{appNavConfig.navigationBarTitleText}}
        </div>
        <div class="xinyi-app-bar-rght-tools">
          <div v-for="(item,index) in navigationTools" v-bind:key="index">
            <i v-if="item.child" @click="havChildToolsClick(item.child)" class="material-icons">more_horiz</i>
            <i v-else class="material-icons" @click="item.click">{{item.icon}}</i>
          </div>
        </div>
      </section>
    </section>
    <actionsheet v-model="showTools" :menus="toolsMenus" show-cancel @on-click-menu="toolsClick"></actionsheet>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
        showTools: false,
        toolsMenus: [],
        toolsMenusClick: {},
        contentTop: 46
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading,
        direction: state => state.direction,
        appNavConfig: state => state.appNavConfig,
        historyNumber: state => state.historyNumber,
        transitionName: state => state.transitionName,
        navigationTools: state => state.navigationTools
      }),
      titlePadding() {
        return (this.navigationTools.length * 46) - (this.historyNumber > 0 ? 88 : 44) + 'px';
      },
      transitionName() {
        if (!this.direction) return ''
        return (this.direction === 'forward' ? 'slide-left' : 'slide-right')
      }
    },
    methods: {
      goback() {
        this.$router.back()
      },
      toolsClick(menuIndex, menuItem) {
        this.toolsMenusClick[menuItem].call();
      },
      havChildToolsClick(child) {
        this.showTools = true;
        const toolsMenu = [];
        const toolMenuClick = {};
        child.forEach(function (item) {
          toolsMenu.push(item.title)
          toolMenuClick[item.title] = item.click;
        })
        this.toolsMenus = toolsMenu;
        this.toolsMenusClick = toolMenuClick;
      },
      closeApp() {
        try {
          XY.windowClose();
        } catch (e) {
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  ::-webkit-scrollbar {
    display: none;
  }

  .appview {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .xinyi-app-header {
      height: 46px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      /*padding-top: 10px;*/
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
        div {
          width: 46px;
          height: 46px;
          float: right;
        }
        i {
          width: 46px;
          height: 46px;
          line-height: 46px;
          text-align: center;
        }
      }
    }
    .xinyi-app-content {
      position: absolute;
      top: 46px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
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

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 250ms;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    backface-visibility: hidden;
    will-change: transform;
  }

  .slide-left-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translateX(-100%);
  }

  .slide-right-enter {
    opacity: 0;
    transform: translateX(-100%);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translateX(100%);
  }

  .weui-grids {
    background-color: #fff;
    .weui-grid__label {
      font-size: 12px;
    }
    .weui-grid__icon + .weui-grid__label {
      margin-top: 8px;
    }
  }

  .el-tree-node__content {
    height: 44px;
    line-height: 44px;
    .el-tree-node__label {
      font-size: 17px;
    }
  }
</style>
