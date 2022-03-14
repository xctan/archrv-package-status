<template>
  <div class="terminal-view">
    <div class=terminal-loading v-if="isLoading">
      Loading log file...
    </div>
    <div class="terminal-error" v-if="errorMessage">
      Failed to load: {{ errorMessage }}
    </div>
    <div v-html="rendered" class="terminal-content"></div>
  </div>
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
    },
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      raw: '',
      rendered: '',
      isLoading: true,
      errorMessage: null
    }
  },
  mounted () {
    // validate the log path
    if (!this.logUri) { return }

    console.log(this.logUri)
    axios.get(this.logUri)
        .then(response => {
          this.raw = response.data
          const ansi_up = new AnsiUp()
          this.rendered = ansi_up.ansi_to_html(this.raw).replaceAll('\u000f', '')
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
          this.errorMessage = error
        })
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
.terminal-content {
  font-family: monospace;
  white-space: pre;
  text-align: left;
  overflow-x: scroll;
}

.terminal-view {

}

.terminal-loading {

}

.terminal-error {
  color: red;
}
</style>