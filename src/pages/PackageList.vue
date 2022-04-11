<template>
  <div class="package-list-container">
    <div v-if="!is_loading" class="package-list" @keydown.enter="searchPackages()">
      <div class="package-list-header" @mouseleave="searchPackages()" >
        <input type="text" v-model="search_string" placeholder="search packages (enter)"/>
        <n-select v-model:value="selected_users" :options="users" multiple />
      </div>
      <package-item v-for="pack in packages" :pack="pack" :key="pack.pkgname" />
      <div v-if="packages.length === 0" style="text-align: center;">
        nothing here!
      </div>
    </div>
    <div v-else>
      <div style="text-align: center;">loading data...</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PackageItem from '@/components/PackageItem'
import { NSelect } from 'naive-ui'

const status_api = "https://archrv.ack.ac/status"

let all_packages = []

let packages = ref([])
let search_string = ref("")
let is_loading = ref(true)
let users = ref([])
let selected_users = ref([])

fetch(status_api)
  .then(res => res.text())
  .then(text => {
    let data = JSON.parse(text)
    if (data.status === 'success') {
      console.log(`Received ${data.packages.length} package(s)`)
      packages.value = data.packages
      all_packages = data.packages
      is_loading.value = false

      let user_set = new Set()
      all_packages.forEach(p => {
        if (p.user) {
          user_set.add(p.user)
        }
      })

      users.value = Array.from(user_set).map(u => {
        return {
          label: u,
          value: u
        }
      })
    }
  })

const searchPackages = () => {
  console.log('search with', search_string.value, selected_users.value)

  if (search_string.value !== '') {
    packages.value = all_packages.filter(p => p.pkgname.includes(search_string.value))
  } else {
    packages.value = all_packages
  }

  console.log('pkgname match:', packages.value.length)

  if (selected_users.value.length !== 0) {
    packages.value = packages.value.filter(p => selected_users.value.includes(p.user))
  }
}

</script>

<style scoped>
div.package-list-container {
  position: relative;
}

div.package-list {
  font-family: Consolas, Ubuntu Mono, Menlo, monospace;
  line-height: 1.5;
}

.package-list-header {
  display: grid;
  grid-template-columns: minmax(0, 2fr) 1fr 1fr minmax(0, 2fr);
  line-height: 2;
  border: solid aliceblue;
  border-width: 0.5px 0 0.5px 0;
}

@media (min-aspect-ratio: 11/10) {
  div.package-list {
    width: 800px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 800px) {
  div.package-list {
    width: 100%;
  }
}

@media (max-width: 650px) {
  div.package-list {
    width: 650px;
  }
}
</style>