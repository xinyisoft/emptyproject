<template>
  <div v-if="haveAuth" :style="{display: display}">
    <slot></slot>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'DivAuth',
    props: {
      authData: {type: String, default: ''},
      display: {type: String, default: 'block'}
    },
    computed: {
      ...mapState({
        authConfig: state => state.authConfig
      }),
      haveAuth() {
        if (this.authData === '') return true
        const auth = this.authData.split(',')
        for (var i in auth) {
          if (typeof this.authConfig[auth[i]] !== 'undefined' && this.authConfig[auth[i]] === true) {
            return true
          }
        }
        return false
      }
    }
  }
</script>

<style scoped>

</style>
