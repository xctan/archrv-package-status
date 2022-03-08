<template>
  <div>
    <div v-for="entry in entries" :key="entry.id">
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
      entries: []
    }
  },
  mounted () {
    // validate the log path
    if (!this.logUri) { return }

    console.log(this.logUri)
    axios.get(this.logUri)
        .then(response => {
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
        })
        .catch(error => console.log(error))
  },
  methods: {
    getFilePath (filename) {
      return `${this.name}/${filename}`
    }
  }
}
</script>

<style scoped>

</style>