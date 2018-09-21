<template>
  <i class="material-icons" :style="{fontSize:size + 'px',color: color}">{{value}}</i>
</template>
<script>
  export default {
    name: 'XyIcon',
    props: {
      size: {type: Number, default: 24},
      value: {type: String},
      color: ''
    }
  }
</script>
