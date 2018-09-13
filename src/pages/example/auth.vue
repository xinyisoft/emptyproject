<template>
  <div>

    <div>
      <div-auth auth-data="/pages/index/index,/pages/test/test" display="inline">
        div-auth display 标签
      </div-auth>
      <span-auth auth-data="/pages/index/index">
        Span 权限验证
      </span-auth>
    </div>
    <group-title>权限</group-title>
    <div-auth auth-data="/pages/index/index,/pages/test/test">
      <group>
        <cell-box link="/pages/test/test" is-link>
          跳转到测试
        </cell-box>
        <cell-box link="/pages/testXY/testXY" is-link>
          XY方法测试
        </cell-box>
      </group>
    </div-auth>
  </div>
</template>

<script>
  import {Grid, GridItem, CellBox, Group, GroupTitle} from 'vux'

  export default {
    name: 'exampleView',
    comments: {
      Grid, GridItem, CellBox, Group, GroupTitle
    }
  }
</script>

<style scoped>

</style>
