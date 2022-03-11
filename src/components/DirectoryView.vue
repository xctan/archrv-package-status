<template>
  <n-data-table
      :columns="columns"
      :data="data"
      :bordered="false"
      :loading="loading"
      :row-props="rowProps"
  />
</template>

<script setup>
import axios from 'axios'
import { h, ref, onMounted, defineProps } from 'vue'
// import { RouterLink } from 'vue-router'
import { NDataTable, NTime } from 'naive-ui'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useRouter } from 'vue-router'

dayjs.extend(customParseFormat)

const props = defineProps({
  logUri: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const loading = ref(true)

function getFilePath (filename) {
  return `${props.name}/${filename}`
}

const nameColumn = {
  title: 'Name',
  key: 'name',
  sorter: 'default',
  // render (row) {
  //   return h(RouterLink, {
  //     to: {
  //       name: 'LogTerminal',
  //       params: {
  //         extLogUri: getFilePath(row.name)
  //       }
  //     },
  //     innerHTML: row.name
  //   })
  // }
}

const timeColumn = {
  title: 'Time',
  key: 'time',
  sorter: (r1, r2) => r1.time > r2.time,
  render (row) {
    return h(NTime, { time: row.time.toDate() })
  }
}

const sizeColumn = {
  title: 'Size',
  key: 'size',
  sorter: 'default'
}

const columns = [nameColumn, timeColumn, sizeColumn]

const data = ref([])

onMounted(() => {
  axios.get(props.logUri)
      .then(response => {
        // analyze html from felix build
        try {
          let pre = response.data.match(/<pre>([^]+)<\/pre>/gm)[0]
          // console.log(pre)
          const re = />(\S+)<\/a> +(\d+-\w+-\d+ \d{2}:\d{2}) +(\d+)/gm
          for (let arr = re.exec(pre); arr !== null; arr = re.exec(pre)) {
            const logDate = dayjs(arr[2], 'DD-MMM-YYYY HH:mm')
            data.value.push({
              name: arr[1],
              time: logDate,
              size: arr[3]
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          console.log('success')
          loading.value = false
        }
      })
      .catch(error => {
        console.log(error)
        loading.value = false
      })
})

const router = useRouter()

const rowProps = (row) => {
  return {
    onClick (e) {
      e.preventDefault()
      router.push({
        name: 'LogTerminal',
        params: {
          extLogUri: getFilePath(row.name)
        }
      })
    }
  }
}

</script>

<style scoped>

</style>