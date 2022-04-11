<template>
  <div :class="marksEffectClass(pack.marks, pack.status)">
    <span class="package-c1">
      <with-root :show="pack.pkgref" :class="rmEffectClass(pack.status)">
        <a :href="pack.pkgref" target="_blank">
          {{ pack.pkgname }}
        </a>
      </with-root>
      <span>&nbsp;</span>
      <span v-if="pack.tag" :class="tagToClass(pack.tag)">[{{ pack.tag }}]</span>
    </span>

    <span class="package-c2">{{ pack.user }}</span>

    <span class="package-c3" v-if="pack.stref" >
      <a :href="pack.stref" target="_blank">{{ shortenStatus(pack.status) }}</a>
    </span>
    <span class="package-c3" v-else>{{ shortenStatus(pack.status) }}</span>

    <span class="package-c4">
      <package-mark
          v-for="mark in pack.marks"
          :key="mark.mark"
          :mark="mark"
      />
    </span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import PackageMark from '@/components/PackageMark'

/* eslint-disable no-unused-vars */
const props = defineProps({
  pack: {
    type: Object,
    required: true
  }
})

const tagToClass = tag => {
  switch (tag) {
    case 'rotten': return 'package-tag-rotten'
    case 'leaf': return 'package-tag-leaf'
    default: return ''
  }
}

const rmEffectClass = s => {
  if (s === 'rm requested') return 'package-tag-rm'
  return ''
}

const marksEffectClass = (marks, status) => {
  let base = 'package-item '
  marks.forEach(m => {
    switch (m.mark) {
      case 'ready':
        base += 'package-effect-ready '
        break
      case 'noqemu':
        base += 'package-effect-ready '
        break
      case 'unknown':
        base += 'package-effect-unknown '
        break
      default:
    }
  })
  switch (status) {
    case 'merged':
      base += 'package-effect-ready '
      break
    case 'working':
      base += 'package-effect-working '
      break
    case 'pull requested':
      base += 'package-effect-pending'
      break
    case 'rm requested':
      base += 'package-effect-pending'
      break
    default:
  }
  return base
}

const shortenStatus = s => {
  switch(s) {
    case 'pull requested': return 'pull req'
    case 'rm requested': return 'rm req'
    default: return s
  }
}
</script>

<style scoped>
.package-item {
  display: grid;
  grid-template-columns: minmax(0, 2fr) 1fr 1fr minmax(0, 2fr);
  line-height: 2;
  border: solid aliceblue;
  border-width: 0.5px 0 0.5px 0;
}

.package-c1 {
  overflow: hidden;
  padding-left: 4.8px;
}

.package-c2 {

}

.package-c3 {

}

.package-c4 {
  overflow: scroll;
}

::-webkit-scrollbar {
  height: 1px;
  width: 0;  /* Remove scrollbar space */
  background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #000000;
}

.package-effect-working {
  background: lightpink;
}

.package-effect-ready {
  background: lightgreen;
}

.package-effect-pending {
  background: lightblue;
}

.package-effect-unknown {
  background: yellow;
}

.package-tag-rotten {
  background: darkred;
  color: white;
}

.package-tag-leaf {
  background: grey;
  color: white;
}

.package-tag-rm {
  text-decoration: line-through red 2px;
}
</style>