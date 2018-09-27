<template>
  <div>
    <group-title>DEMO</group-title>
    <group>
      <cell-box link="/pages/example/link1" is-link>
        跳转到测试
      </cell-box>
      <cell-box link="/pages/example/testXY" is-link>
        XY方法测试
      </cell-box>
      <cell-box link="/pages/example/icons" is-link>
        图标
      </cell-box>
    </group>
    <group-title>权限</group-title>
    <group>
      <cell-box link="/pages/example/auth" is-link>
        权限包裹标签
      </cell-box>
    </group>
    <group-title>权限</group-title>
    <grid>
      <grid-item label="测试六个字符" v-for="i in 4">
        <img slot="icon" src="../../assets/logo.png">
      </grid-item>
    </grid>
    <grid>
      <grid-item label="测试六个啊字符" v-for="i in 4">
        <img slot="icon" src="../../assets/logo.png">
      </grid-item>
    </grid>
  </div>
</template>
<script>
  export default {
    name: 'mainView',
    methods: {
      test() {

      }
    }
  }
</script>
<style lang="less" scoped>

</style>
