<script setup>
import Button from '@/components/Button/Button.vue'
import Icon from '@/components/Icon/Icon.vue'
</script>
<template>
<div class="basic block">
  <Button class="btn" type="primary"> Primary </Button>
  <Button class="btn" type="success"> Success </Button>
  <Button class="btn" type="warning"> Warning </Button>
  <Button class="btn" type="danger"> Danger </Button>
  <Button class="btn" type="info"> Info </Button>
</div>

<div class="plain block">
  <Button class="btn" type="primary" plain> Primary </Button>
  <Button class="btn" type="success" plain> Success </Button>
  <Button class="btn" type="warning" plain> Warning </Button>
  <Button class="btn" type="danger" plain> Danger </Button>
  <Button class="btn" type="info" plain> Info </Button>
</div>

<div class="round block">
  <Button class="btn" type="primary" round> Primary </Button>
  <Button class="btn" type="success" round> Success </Button>
  <Button class="btn" type="warning" round> Warning </Button>
  <Button class="btn" type="danger" round> Danger </Button>
  <Button class="btn" type="info" round> Info </Button>
</div>

<div class="circle block">
  <Button class="btn" type="primary" circle>   <Icon icon="star" /> </Button>
  <Button class="btn" type="success" circle> <Icon icon="star" /> </Button>
  <Button class="btn" type="warning" circle> <Icon icon="star" /> </Button>
  <Button class="btn" type="danger" circle> <Icon icon="star" /> </Button>
  <Button class="btn" type="info" circle> <Icon icon="star" /> </Button>
</div>
</template>
<style>
.block {
  margin-bottom: 10px;
}
.btn {
  margin-right: 10px;
}
</style>