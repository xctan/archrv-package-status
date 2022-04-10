<template>
  <div class="package-list-container">
    <div v-if="packages.length" class="package-list">
      <package-item v-for="pack in packages" :pack="pack" :key="pack.pkgname" />
    </div>
    <div v-else>
      loading data...
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PackageItem from '@/components/PackageItem'

const status_api = "https://archrv.ack.ac/status"

let packages = ref([])

fetch(status_api)
  .then(res => res.text())
  .then(text => {
    let data = JSON.parse(text)
    if (data.status === 'success') {
      console.log(`Received ${data.packages.length} package(s)`)
      packages.value = data.packages
    }
  })

</script>

<style scoped>
div.package-list-container {
  position: relative;
}

div.package-list {
  font-family: Consolas,Ubuntu Mono,Menlo,monospace;
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