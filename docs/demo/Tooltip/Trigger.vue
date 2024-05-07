<template>
  <ElTooltip 
    content="Content"
    trigger="hover"
  >
    <ElButton> Hover 状态下 Tooltip 显示 </ElButton>
  </ElTooltip>
</template>
<script setup>
import ElTooltip from '@/components/Tooltip/Tooltip.vue'
import ElButton from '@/components/Button/Button.vue'
</script>