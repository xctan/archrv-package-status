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
  props: {
    extLogUri: {
      type: String || null,
      default: null
    }
  },
  created () {
    if (this.extLogUri) {
      this.logUri = `https://archrv.ack.ac/buildlog/.status/logs/${this.extLogUri}`
    } else if (this.$route.query.log) {
      this.logUri = `https://archrv.ack.ac/buildlog/.status/logs/${this.$route.query.log}`
    } else if (this.$route.query.logs) {
      // compatible to the path
      this.logUri = `https://archrv.ack.ac/buildlog/.status/logs/${this.$route.query.logs}`
    } else {
      this.logUri = null
    }
  }
}
</script>

<style scoped>

</style>