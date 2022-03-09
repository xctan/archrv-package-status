<template>
  <div class="directory-view">
    <div class="directory-loading" v-if="isLoading">
      Loading directory...
    </div>
    <div class="directory-error" v-if="errorMessage">
      Failed to load: {{ errorMessage }}
    </div>
    <div class="directory-entry" v-for="entry in entries" :key="entry.id">
      <router-link
          :to="{ name:'LogTerminal', params: { extLogUri: getFilePath(entry.name) } }"
      >
        {{ entry.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import cheerio from 'cheerio'
import axios from 'axios'

export default {
  name: 'DirectoryView',
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
      entries: [],
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
          // analyze html from felix build
          const $ = cheerio.load(response.data)
          const ent = $('pre').children()
          const length = ent.length
          for (let i = 0; i < length; i++) {
            const loc = ent.get(i).attribs.href
            if (loc === '../') continue
            this.entries.push({
              name: `${loc}`,
              id: i
            })
            console.log(this.getFilePath(loc))
          }
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
          this.errorMessage = error
        })
  },
  methods: {
    getFilePath (filename) {
      return `${this.name}/${filename}`
    }
  }
}
</script>

<style scoped>
.directory-view {

}

.directory-entry {

}

.directory-loading {

}

.directory-error {
  color: red;
}
</style>