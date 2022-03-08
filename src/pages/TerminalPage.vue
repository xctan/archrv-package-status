<template>
  <div v-if="isEmpty">No log specified</div>
  <terminal-view v-if="isLogFile" :log-uri="logUri" :name="name"/>
  <directory-view v-else @reload="update" :log-uri="logUri" :name="name"/>
</template>

<script>
import TerminalView from '@/components/TerminalView'
import DirectoryView from '@/components/DirectoryView'

export default {
  name: 'TerminalPage',
  components: {
    TerminalView,
    DirectoryView
  },
  data () {
    return {
      logUri: null,
      isLogFile: true,
      name: '',
      isEmpty: false
    }
  },
  props: {
    extLogUri: {
      type: String || null,
      default: null
    }
  },
  methods: {
    update () {
      if (this.extLogUri) {
        this.logUri = `https://archrv.ack.ac/buildlog/.status/logs/${this.extLogUri}`
        this.name = this.extLogUri
      } else if (this.$route.query.log) {
        this.logUri = `https://archrv.ack.ac/buildlog/.status/logs/${this.$route.query.log}`
        this.name = this.$route.query.log
      } else if (this.$route.query.logs) {
        // compatible to the path
        this.logUri = `https://archrv.ack.ac/buildlog/.status/logs/${this.$route.query.logs}`
        this.name = this.$route.query.logs
      } else {
        this.logUri = null
        this.name = null
        this.isEmpty = true
        return
      }
      console.log(this.logUri)
      this.isLogFile = this.logUri.endsWith(".log")
      document.title = this.name
    }
  },
  created () {
    this.update()
  }
}
</script>

<style scoped>

</style>