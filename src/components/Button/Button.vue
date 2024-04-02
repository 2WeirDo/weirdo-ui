<template>
  <button
    class="el-button"
    ref="_ref"
    :class="computedClass"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <!-- 单独的disabled属性是为了便于禁用绑定到button上的事件，比如：点击事件 -->
    <!-- class里的is-disabled是为了给按钮添加禁用的样式。 -->
    <!-- 如果按钮处于加载中 -->
    <el-icon icon="spinner" v-if="loading" spin />
    <!-- 如果按钮传递图标 -->
    <el-icon :icon="icon" v-if="icon" />
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { buttonProps } from './types'
import { computed, ref } from 'vue'
import ElIcon from '../Icon/Icon.vue'

// 定义组件名称
defineOptions({
  name: 'ElButton'
})

// 接收props
const props = defineProps(buttonProps)

// 定义组件实例
const _ref = ref<HTMLButtonElement>()

// defineExpose暴露实例
defineExpose({
  ref: _ref
})

// 计算button的样式类
const computedClass = computed(() => {
  // 通过props属性，从父组件接收到
  const { type, size, round, loading, circle, disabled, plain } = props
  return [
    type ? 'el-button--' + type : '',
    size ? 'el-button--' + size : '',
    {
      'is-round': round,
      'is-loading': loading,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-plain': plain
    }
  ]
})
</script>

<style scoped></style>
