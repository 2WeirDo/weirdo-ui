<template>
  <header class="el-header" :style="headerHeight">
    <slot>Header</slot>
  </header>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import type { HeightProps } from './types'
defineOptions({
  name: 'ElHeader'
})
const props = defineProps<HeightProps>()
const headerHeight = computed(() => {
  // 由于直接通过 :style 设置的样式，所以这里传入高度的时候一定要携带单位。
  return {
    height: (props.height || 60) + 'px'
  }
})
</script>
<style lang=""></style>
