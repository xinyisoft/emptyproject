<template>
  <div>
    <group-title>DEMO</group-title>
    <group>
      <cell-box link="/pages/test/test" is-link>
        跳转到测试
      </cell-box>
      <cell-box link="/pages/testXY/testXY" is-link>
        XY方法测试
      </cell-box>
    </group>
    <group-title>DEMO</group-title>
  </div>
</template>
<script>
  import {Grid, GridItem, CellBox, Group, GroupTitle} from 'vux'

  export default {
    name: 'mainView',
    components: {
      GroupTitle,
      CellBox,
      Grid,
      Group,
      GridItem
    },
    methods: {
      test() {

      }
    }
  }
</script>
<style lang="less" scoped>

</style>
