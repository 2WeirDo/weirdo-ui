<template lang="">
  <div class="el-rate" :style="{ color: voidColor }">
    <span
      v-for="num in max"
      class="iconfont icon-star"
      :key="num"
      :class="{ active: num <= rateNum, [`el-rate--${size}`]: true }"
      :style="{
        color: num <= rateNum ? color : voidColor
      }"
      @click="setRateNum(num)"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { type RateProps, type RateEmits } from './types'
import { useRate } from './useRate'
// import { computed } from 'vue';
const props = withDefaults(defineProps<RateProps>(), {
  nums: 3, // 默认星星数量为3
  size: 'default', // 默认大小为'default'
  max: 5 // 最大分数为5
})
const emits = defineEmits<RateEmits>()

defineOptions({
  name: 'ElRate'
})

const [rateNum, setRateNum] = useRate(props.nums, () => {
  // 触发改变评分数量事件
  // 当评分数量发生变化时，通过 emits 方法触发 changeRateNums 事件，将最新的评分数量传递给父组件。
  emits('changeRateNums', rateNum.value)
})
</script>
