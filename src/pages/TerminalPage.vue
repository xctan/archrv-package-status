<template>
  <terminal-view :log-uri="logUri"/>
</template>

<script>
import TerminalView from '@/components/TerminalView'

export default {
  name: 'TerminalPage',
  components: {
    TerminalView
  },
  data () {
    return {
      logUri: null
    }
  },
  created () {
    this.logUri = this.$route.query.log
  }
}
</script>

<style scoped>

</style>