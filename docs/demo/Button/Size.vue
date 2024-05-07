<script setup>
import Button from '@/components/Button/Button.vue'
</script>
<template>
<div class="size block">
  <Button class="btn"  size="large"> Large </Button>
  <Button class="btn" type="primary"> 默认 </Button>
  <Button class="btn" type="success" size="small"> Small </Button>
</div>
</template>
<style>
.btn {
  margin-right: 10px;
}
</style>