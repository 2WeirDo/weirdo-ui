<script setup>
import Button from '@/components/Button/Button.vue'
</script>
<template>
<div class="disabled block">
  <Button class="btn" type="primary" disabled> Primary </Button>
  <Button class="btn" type="success" disabled> Success </Button>
  <Button class="btn" type="warning" disabled> Warning </Button>
  <Button class="btn" type="danger" disabled> Danger </Button>
  <Button class="btn" type="info" disabled> Info </Button>
</div>
</template>
<style>
.btn {
  margin-right: 10px;
}
</style>