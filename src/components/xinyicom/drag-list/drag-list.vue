<template>
  <draggable :class="dropConClass" :options="options" :value="list"
             @input="handleListChange($event)" @end="handleEnd($event)">
    <div class="vux-cell-box weui-cell" :id="itemLeft.id" v-for="(itemLeft, index) in list"
         :key="`drag_list_${index}`">
      <i class="material-icons">swap_vert</i> {{ itemLeft.name }}
    </div>
  </draggable>
</template>
<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'DragList',
    components: {
      draggable
    },
    props: {
      list: {
        type: Array,
        required: true
      },
      dropConClass: {
        type: Array
      }
    },
    data() {
      return {
        options: {group: 'drag_list'}
      }
    },
    methods: {
      handleListChange (value) {
        this.$emit('update:list', value)
      },
      handleEnd(event) {
        this.$emit('on-change', {
          oldIndex: event.oldIndex,
          newIndex: event.newIndex
        })
      }
    }
  }
</script>
<style lang="less">

</style>
