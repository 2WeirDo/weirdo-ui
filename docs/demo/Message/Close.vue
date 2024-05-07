<script setup>
import ElButton from '@/components/Button/Button.vue'
import { createMessage } from '@/components/Message/method'
const open = (type) => {
  createMessage({ 
    message: 'message消息提示',
    showClose: true,
    duration: 0,
    type,
  })
}
</script>
<template>
  <el-button @click="open('warning')"> Info </el-button>
</template>