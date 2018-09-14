<template>
  <div>
    <div v-for="item in iconsDefault.categories">
      <group-title>{{item.name}}</group-title>
      <group>
        <grid :cols="3">
          <grid-item :label="item.id" v-for="(item,index) in item.icons" :key="index">
            <xy-icon slot="icon" :value="item.id" color="#999"></xy-icon>
          </grid-item>
        </grid>
      </group>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'iconsView',
    data() {
      return {
        icons: ['more_horiz', 'more_horiz', 'more_horiz', 'more_horiz', 'more_horiz', 'more_horiz', 'more_horiz'],
        disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
        iconsDefault: require('./data/icons.json')
      }
    }
  }
</script>

<style scoped>

</style>
