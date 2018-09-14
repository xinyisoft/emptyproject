<template>
  <div>
    <group>
      <cell-box is-link>
        <a href="https://material.io/icons/" target="_blank">查看所有图标</a>
      </cell-box>
    </group>
    <div v-for="(item,index) in iconsDefault.categories">
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
        iconsDefault: require('./data/icons.json')
      }
    }
  }
</script>

<style scoped>

</style>
