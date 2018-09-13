<template>
  <div>
    <router-link to="/pages/test2/test2">进入测试2</router-link>
    <div>
      direction:{{direction}}
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'testView',
    computed: {
      ...mapState({
        isLoading: state => state.isLoading,
        direction: state => state.direction,
        appNavConfig: state => state.appNavConfig,
        historyNumber: state => state.historyNumber,
        transitionName: state => state.transitionName
      })
    }
  }
</script>

<style scoped>

</style>
