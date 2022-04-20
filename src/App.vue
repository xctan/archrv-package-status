<template>
  <n-config-provider :theme="colorScheme">
    <div class="app-container">
      <div class="app-header">
        <n-menu mode="horizontal" :options="headerOptions"></n-menu>
      </div>
      <div class="app-body" style="position: relative;">
        <router-view :key="$route.fullPath" position="absolute"/>
      </div>
    </div>
  </n-config-provider>
</template>

<script setup>
import { NMenu, NConfigProvider, darkTheme, lightTheme } from 'naive-ui'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const headerOptions = [
  {
    label: 'ArchRV Package Status',
    key: 'arch-rv'
  }
]

let colorScheme = ref({})

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  colorScheme.value = darkTheme;
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  colorScheme.value = event.matches ? darkTheme : lightTheme;
});
</script>

<style>
.app-container {
  display: grid;
  grid-template-rows: 42px auto;
  grid-template-columns: 1fr;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
}

@media (prefers-color-scheme: dark) {
  .app-container {
    background: #333;
    color: white;
  }
}

.app-header {
  grid-row: 1 / 2;
}

.app-body {
  grid-row: 2 / 3;
}
</style>
