<template>
  <div class="package-list-container">
    <div v-if="!is_loading" class="package-list">
      <div class="package-list-header">
        <input type="text" v-model="search_string" placeholder="search packages"/>
        <n-select v-model:value="selected_users" :options="users" multiple placeholder="user"/>
        <n-select v-model:value="selected_status" :options="status" multiple placeholder="status"/>
        <n-select v-model:value="selected_marks" :options="marks" multiple placeholder="marks"/>
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
import { ref, computed } from 'vue'
import PackageItem from '@/components/PackageItem'
import { NSelect } from 'naive-ui'

function debounce(func, timeout = 200){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const status_api = "https://archrv.ack.ac/status"

let all_packages = []

let _ss = ref("")
let search_string = computed({
  get: () => _ss.value,
  set: debounce(nv => _ss.value = nv)
})

let is_loading = ref(true)

let users = ref([])
let _su = ref([])
let selected_users = computed({
  get: () => _su.value,
  set: debounce(nv => _su.value = nv)
})

let status = ref([])
let _st = ref([])
let selected_status = computed({
  get: () => _st.value,
  set: debounce(nv => _st.value = nv)
})

let marks = ref([
  'failing', 'noqemu', 'unknown', 'ready', 'stuck', 'dep outdated',
  'upstreamed', 'ignore', 'dep missing', 'outdated'
].map(m => ({ label: m, value: m })))
let _sm = ref([])
let selected_marks = computed({
  get: () => _sm.value,
  set: debounce(nv => _sm.value = nv)
})

fetch(status_api)
  .then(res => res.text())
  .then(text => {
    let data = JSON.parse(text)
    if (data.status === 'success') {
      console.log(`Received ${data.packages.length} package(s)`)
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
      users.value.push({ label: '(empty)', value: '' })

      let status_set = new Set()
      all_packages.forEach(p => {
        if (p.status) {
          status_set.add(p.status)
        }
      })
      status.value = Array.from(status_set).map(u => {
        return {
          label: u,
          value: u
        }
      })
      status.value.push({ label: '(empty)', value: '' })
    }
  })

const packages = computed(() => {
  let filtered_packages

  console.log('search with', search_string.value, selected_users.value)

  if (search_string.value !== '') {
    filtered_packages = all_packages.filter(p => p.pkgname.includes(search_string.value))
  } else {
    filtered_packages = all_packages
  }

  console.log('pkgname match:', filtered_packages.length)

  if (selected_users.value.length !== 0) {
    filtered_packages = filtered_packages.filter(p => selected_users.value.includes(p.user))
  }

  if (selected_status.value.length !== 0) {
    filtered_packages = filtered_packages.filter(p => selected_status.value.includes(p.status))
  }

  if (selected_marks.value.length !== 0) {
    filtered_packages = filtered_packages.filter(
        p => p
            .marks
            .map(m => m.mark)
            .reduce((pre, cur) => pre | selected_marks.value.includes(cur), 0)
    )
  }

  return filtered_packages
})

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