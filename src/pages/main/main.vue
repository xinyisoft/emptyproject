<template>
  <div>
    <group>
      <cell-box link="/pages/test/test" is-link>
        跳转到测试
      </cell-box>
      <cell-box link="/pages/testXY/testXY" is-link>
        XY方法测试
      </cell-box>
    </group>
    <grid>
      <grid-item :label="'Grid'+i" v-for="i in 4" :key="i" link="/pages/test/test">
        <img slot="icon" src="../../assets/logo.png">
      </grid-item>
    </grid>
  </div>
</template>
<script>
  import {Grid, GridItem, CellBox, Group} from 'vux'

  export default {
    name: 'mainView',
    components: {
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
