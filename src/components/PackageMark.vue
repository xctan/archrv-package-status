<template>
  <span>
    <n-popover trigger="hover">
      <template #trigger>
        <with-root :show="hasUrl(mark.more)">
          <a :href="extractUrl(mark.more)">
            <span :class="markToClass(mark)">
              {{ mark.mark }}{{ mark.more ? '*' : '' }}
            </span>
          </a>
        </with-root>
      </template>
      <span>by: {{ mark.by }}</span>
      <hr v-if="mark.more" />
      <div v-if="mark.more" class="package-mark-content">{{ mark.more }}</div>
    </n-popover>
  </span>
</template>

<script setup>
import { defineProps } from 'vue'
import { NPopover } from 'naive-ui'

/* eslint-disable no-unused-vars */
const props = defineProps({
  mark: {
    type: Object,
    required: true
  }
})

const markToClass = mark => {
  let base = 'package-mark '
  switch (mark.mark) {
    case 'failing':
      base += 'package-mark-failing '
      break
    case 'stuck':
      base += 'package-mark-stuck '
      break
    case 'noqemu':
      base += 'package-mark-noqemu '
      break
    case 'dep outdated':
      base += 'package-mark-depood '
      break
    case 'unknown':
      base += 'package-mark-unknown '
      break
    case 'upstreamed':
      base += 'package-mark-upstreamed '
      break
    case 'ready':
      base += 'package-mark-ready '
      break
    default:
  }
  if (mark.more) {
    base += 'package-mark-has-more '
  }
  return base
}

const url_regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gm
const hasUrl = t => t && t.match(url_regex)
const extractUrl = t => {
  if (!t) return ''
  let url = t.match(url_regex)
  if (url) {
    return url[0]
  } else {
    return ''
  }
}
</script>

<style scoped>
.package-mark {
  margin-inline: 4px;
  padding-inline: 5px;
  outline: solid 1px;
  border-radius: 1em;
  white-space: nowrap;
}

.package-mark-failing {
  outline-color: red;
}

.package-mark-noqemu {
  background: orange;
  outline-color: green;
}

.package-mark-depood {
  outline-color: darkviolet;
}

.package-mark-unknown {
  outline-color: gold;
}

.package-mark-stuck {
  outline-color: dimgrey;
}

.package-mark-upstreamed {
  outline-color: darkgreen;
}

.package-mark-ready {
  outline-color: green;
}

.package-mark-content {
  font-family: Consolas, Ubuntu Mono, Menlo, monospace;
  max-width: 500px;
}

.package-mark-has-more {
  /*text-decoration: underline;*/
  text-shadow: 0 0 3px deepskyblue;
}

</style>