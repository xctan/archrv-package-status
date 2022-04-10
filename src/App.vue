<template>
  <div class="app-container">
    <div class="app-header">
      <n-menu mode="horizontal" :options="headerOptions"></n-menu>
    </div>
    <div class="app-body" style="position: relative;">
      <router-view :key="$route.fullPath" position="absolute"/>
    </div>
  </div>
</template>

<script setup>
import { NMenu } from 'naive-ui'
import { RouterView } from 'vue-router'

const headerOptions = [
  {
    label: 'ArchRV Dashboard',
    key: 'arch-rv'
  }
]
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

.app-header {
  grid-row: 1 / 2;
}

.app-body {
  grid-row: 2 / 3;
}
</style>
