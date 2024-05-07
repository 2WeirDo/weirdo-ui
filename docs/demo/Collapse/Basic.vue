<script setup>
import { ref } from 'vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import Item from '@/components/Collapse/CollapseItem.vue'
const openedValue = ref(['a'])
</script>
<template>
<div class="basic block">
  <Collapse v-model="openedValue">
    <Item name="a" title="Title A">
      <span>headline title</span>
      <h5> this is content a aaa </h5>
    </Item>
    <Item name="b" title="Title B">
      <div> this is bbbbb test </div>
    </Item>
    <Item name="c" title="Disabled Title" disabled>
      <div> this is cccc test </div>
    </Item>
  </Collapse>
</div>
</template>