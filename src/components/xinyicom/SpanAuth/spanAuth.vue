<template>
  <span v-if="haveAuth">
    <slot></slot>
  </span>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: 'SpanAuth',
    props: {
      authData: {type: String, default: ''}
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
