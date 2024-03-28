<script setup lang="ts">
// import { RouterView } from 'vue-router'
import ElButton from './components/Button/Button.vue'
</script>

<template>
  <!-- <RouterView /> -->
  <div>
    <el-button>按钮</el-button>
    <el-button type="danger" size="small" circle disabled>按钮</el-button>
    <el-button type="info">按钮</el-button>
    <el-button type="warning">按钮</el-button>
    <el-button type="success">按钮</el-button>
  </div>
</template>

<style scoped></style>
