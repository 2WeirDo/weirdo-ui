<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="100">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import ElContainer from '@/components/Container/Container.vue'
import ElHeader from '@/components/Container/Header.vue'
import ElMain from '@/components/Container/Main.vue'
import ElAside from '@/components/Container/Aside.vue'
</script>