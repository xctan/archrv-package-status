<template>
  <div class="app-container">
    <n-layout-header class="app-header">
      <n-menu mode="horizontal" :options="headerOptions"></n-menu>
    </n-layout-header>
    <n-layout has-sider class="app-body">
      <n-layout-sider
          bordered
          show-trigger="bar"
          collapse-mode="width"
          :collapsed-width="50"
          :collapsed="collapsed"
          @collapse="collapsed = true"
          @expand="collapsed = false"
      >
        <n-menu :options="menuOptions"></n-menu>
      </n-layout-sider>
      <n-layout style="position: relative;">
        <n-layout position="absolute">
          <router-view :key="$route.fullPath"/>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup>
import { NLayout, NLayoutHeader, NMenu, NIcon, NLayoutSider } from 'naive-ui'
import { h, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { HomeOutline } from '@vicons/ionicons5'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function renderLink(to, text) {
  return () => h(RouterLink, { to }, { default: () => text })
}

const headerOptions = [
  {
    label: 'ArchRV Dashboard',
    key: 'arch-rv'
  }
]

const menuOptions = [
  {
    label: renderLink({ name: 'Home' }, 'Home'),
    key: 'go-home',
    icon: renderIcon(HomeOutline)
  }
]

const collapsed = ref(true)
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
