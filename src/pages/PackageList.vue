<template>
  <div class="package-list-container">
    <div v-if="!is_loading" class="package-list" @keydown.enter="searchPackages(search_string)">
      <input type="text" v-model="search_string" placeholder="search packages"/>
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

const status_api = "https://archrv.ack.ac/status"

let all_packages = []

let packages = ref([])
let search_string = ref("")
let is_loading = ref(true)

fetch(status_api)
  .then(res => res.text())
  .then(text => {
    let data = JSON.parse(text)
    if (data.status === 'success') {
      console.log(`Received ${data.packages.length} package(s)`)
      packages.value = data.packages
      all_packages = data.packages
      is_loading.value = false
    }
  })

const searchPackages = text => {
  if (text !== '') {
    packages.value = all_packages.filter(p => p.pkgname.includes(text))
  } else {
    packages.value = all_packages
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