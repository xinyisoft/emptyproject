<template>
  <div class="xinyi-error-page">
    <div class="xinyi-error-content">
      <div>
        <h4>404</h4>
        <h5>这里是404站台，找不到你要找的页面。</h5>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'defaultView',
    beforeCreate() {
      // 实例开始初始化
    },
    created() {
      // 实例初始化完成
    },
    beforeMount() {
      // 开始加载实例
    },
    mounted() {
      // 实例加载完成 vm.开始可用
    },
    beforeUpdate() {
      // 实例发生更新
    },
    updated() {
      // 实例更新完成，DOM更新后渲染完成
    },
    activated() {
      // keep-alive 组件激活时调用
    },
    deactivated() {
      // keep-alive 组件停用时调用
    },
    beforeDestroy() {
      // 实例销毁之前调用。在这一步，实例仍然完全可用。
    },
    destroyed() {
      // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
    }
  }
</script>

<style lang="less">
  .xinyi-error-page{
    background: #ffffff;
    text-align: center;
    height: 100%;
    width: 100%;
    .xinyi-error-content{
      position: absolute;
      top: calc(50% - 150px);
      left:0;
      right:0;
    }
    h4{
      font-size: 6rem;
      color:#5cadff;
    }
    h5{
      color:#808695;
      font-size: 1rem;
    }
  }

</style>
