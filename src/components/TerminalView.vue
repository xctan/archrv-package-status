<template>
  <div v-html="rendered" class="log-view"></div>
</template>

<script>
import AnsiUp from 'ansi_up'
import axios from 'axios'

export default {
  name: 'TerminalView',
  props: {
    logUri: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      raw: '',
      rendered: ''
    }
  },
  mounted () {
    console.log(this.logUri)
    axios.get(this.logUri)
        .then(response => {
          this.raw = response.data
          const ansi_up = new AnsiUp()
          this.rendered = ansi_up.ansi_to_html(this.raw).replaceAll('\u000f', '')
        })
        .catch(error => console.log(error))
  },
  methods: {
    // loadLog () {
    //   axios.get(this.logUri)
    //       .then(response => {
    //         this.raw = response.data
    //         const ansi_up = new AnsiUp()
    //         this.rendered = ansi_up.ansi_to_html(this.raw)
    //       })
    //       .catch(error => console.log(error))
    // }
  }
}
</script>

<style scoped>
.log-view {
  font-family: monospace;
  white-space: pre-wrap;
  text-align: left;
}
</style>