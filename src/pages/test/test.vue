<template>
  <div>
    <button @click="back">返回上</button>
    <router-link to="/pages/test2/test2">进入测试2</router-link>
  </div>
</template>

<script>
  export default {
    name: 'testView',
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

</style>
