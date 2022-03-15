<template>
  <div>Page Not Found</div>
  <package-item :pack="testItem"></package-item>
  <package-item :pack="testItem"></package-item>
  <package-item :pack="anotherItem"></package-item>
  <package-item :pack="testItem"></package-item>
  <package-item :pack="item3"></package-item>
  <package-item :pack="item4"></package-item>
  <package-item :pack="item5"></package-item>
  <package-item :pack="item6"></package-item>
</template>

<script>
import PackageItem from '@/components/PackageItem'

export default {
  name: 'NotFound',
  components: {
    PackageItem
  },
  data () {
    return {
      testItem: {
        name: 'test',
        user: 'null',
        work: 'working',
        workUrl: null,
        marks: [
          { desc: 'dep outdated', more: 'no more info(' },
          { desc: 'stuck', more: 'no jit support :(' }
        ]
      },
      anotherItem: {
        name: 'AVeryLongNameForABasicPackageItemWithMuchDescriptionAndTag',
        user: 'null',
        work: 'working',
        workUrl: null,
        marks: [
          { desc: 'dep outdated', more: 'no more info(' },
          { desc: 'stuck', more: 'no jit support :(' }
        ]
      },
      item3: {
        name: 'merged',
        user: 'null',
        work: 'merged',
        workUrl: null,
        marks: []
      },
      item4: {
        name: 'stuck',
        user: 'null',
        work: '',
        workUrl: null,
        marks: [
          { desc: 'stuck', more: null }
        ]
      },
      item5: {
        name: 'PullRequested',
        user: '',
        work: 'pull requested',
        workUrl: 'https://github.com/felixonmars/archriscv-packages/pull/970',
        marks: []
      },
      item6: {
        name: 'memcached',
        user: '',
        work: '',
        marks: []
      }
    }
  }
}
</script>

<style scoped>

</style>