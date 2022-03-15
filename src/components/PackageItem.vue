<template>
  <div class="package-item">
    <span class="package-c1">{{ pack.name }}</span>
    <span class="package-c2">{{ pack.user }}</span>
    <span class="package-c3">
      <a v-if="pack.workUrl" :href="pack.workUrl" target="_blank">
        {{ pack.work }}
      </a>
      <span v-else>{{ pack.work }}</span>
    </span>
    <span class="package-c4">
      <span
          v-for="mark in pack.marks"
          :title="mark.more"
          :key="mark.desc"
          class="package-mark"
      >
        {{ mark.desc }}{{ mark.more ? '*' : '' }}
      </span>
    </span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

/* eslint-disable no-unused-vars */
const props = defineProps({
  pack: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.package-item {
  display: grid;
  grid-template-columns: minmax(0, 3fr) 1fr 1fr minmax(0, 4fr);

}

.package-c1 {
  overflow: hidden;
}

.package-c2 {

}

.package-c3 {

}

.package-c4 {

}

.package-mark {
  margin-inline: 4px;
  padding-inline: 5px;
  outline: darkred solid 1px;
  border-radius: 1em;
}
</style>