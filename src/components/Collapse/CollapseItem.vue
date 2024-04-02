<template lang="">
  <div
    class="el-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <!-- 接收 title 和 content -->
    <div class="el-collapse-item-title" @click="handleClick" :id="`item-title-${name}`">
      <slot name="title">{{ title }}</slot>
    </div>
    <!-- content区域 -->
    <div class="el-collapse-item-content" v-show="isActive" :id="`item-content-${name}`">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { inject, computed } from 'vue'
import { collapseContextKey } from './types'
import type { CollapseItemProps } from './types'
defineOptions({
  name: 'ElCollapseItem'
})
const props = defineProps<CollapseItemProps>()
// Inject的数据
const collapseContext = inject(collapseContextKey)
// 使用计算属性判断当前项是否处于展开状态
const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})
// 处理点击事件，展开或折叠当前项的内容
const handleClick = () => {
  // 如果 disabled 属性为 true，则不执行展开操作
  if (props.disabled) return
  collapseContext?.handleItemClick(props.name)
}
</script>
<style lang=""></style>
