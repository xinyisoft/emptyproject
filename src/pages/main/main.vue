<template>
  <div>
    <router-link to="/pages/test/test">跳转到测试</router-link>
    <grid>
      <grid-item label="Grid" v-for="i in 9">
        <img slot="icon" src="../../assets/logo.png">
      </grid-item>
    </grid>
  </div>
</template>
<script>
  import {Grid, GridItem} from 'vux'

  export default {
    name: 'mainView',
    components: {
      Grid,
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
