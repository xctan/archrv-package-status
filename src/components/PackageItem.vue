<template>
  <div class="package-item">
    <span class="package-c1" v-if="pack.pkgref">
      <a :href="pack.pkgref" target="_blank">{{ pack.pkgname }}</a>
    </span>
    <span class="package-c1" v-else>{{ pack.pkgname }}</span>

    <span class="package-c2">{{ pack.user }}</span>

    <span class="package-c3" v-if="pack.stref" >
      <a :href="pack.stref" target="_blank">{{ pack.status }}</a>
    </span>
    <span class="package-c3" v-else>{{ pack.status }}</span>

    <span class="package-c4">
      <span
          v-for="mark in pack.marks"
          :title="mark.more"
          :key="mark.mark"
          class="package-mark"
      >
        {{ mark.mark }}{{ mark.more ? '*' : '' }}
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
  grid-template-columns: minmax(0, 2fr) 1fr 1fr minmax(0, 2fr);

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