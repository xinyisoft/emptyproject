<template>
  <div>
    <group-title>ICONS</group-title>
    <grid :cols="4">
      <grid-item :label="item" v-for="(item,index) in icons" :key="index">
        <xy-icon :value="item"></xy-icon>
      </grid-item>
    </grid>
  </div>
</template>

<script>
  export default {
    name: 'iconsView',
    data() {
      return {
        icons: ['more_horiz', 'more_horiz', 'more_horiz', 'more_horiz', 'more_horiz', 'more_horiz', 'more_horiz']
      }
    }
  }
</script>

<style scoped>

</style>
