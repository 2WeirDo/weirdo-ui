<template>
  <div
    class="el-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdownShow"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <el-tooltip
      placement="bottom-start"
      manual
      ref="tooltipRef"
      :popper-options="popperOptions"
      @click-outside="changeDropdownShow(false)"
    >
      <!-- changeDropdownShow(false) : 关闭下拉提示框 -->
      <!-- 筛选框 -->
      <el-input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        :readonly="!filterable"
        @input="debounceOnFilter"
      >
        <!-- :readonly="!filterable": 如果 filterable 属性为 false，则将输入框设置为只读。 -->
        <!-- @input="debounceOnFilter": 当输入框输入内容时，调用 debounceOnFilter 方法。这个方法其实就是生成表单选项 -->

        <!-- 插槽 : 用于显示清除按钮或下拉图标。 -->
        <template #suffix>
          <el-icon
            class="el-input-clear"
            v-if="showClearIcon"
            icon="circle-xmark"
            @click.stop="onClear"
          >
          </el-icon>
          <el-icon
            v-else
            icon="angle-down"
            class="el-select-icon"
            :class="{
              'is-active': isDropdownShow
            }"
          ></el-icon>
        </template>
      </el-input>

      <!--  选项 -->
      <template #content>
        <!-- loading -->
        <div class="el-select-loading" v-if="states.loading"></div>
        <!-- No Data -->
        <div class="el-select-nodata" v-if="filterable && filterOptions.length === 0"></div>
        <ul class="el-select-menu" v-else>
          <template v-for="(option, index) in filterOptions" :key="index">
            <li
              class="el-select-menu-item"
              :class="{
                'is-disabled': option.disabled,
                'is-selected': states.selectOption?.value === option.value
              }"
              :id="`el-select-menu-item-${option.value}`"
              @click.stop="itemSelect(option)"
            >
              <RenderVnode :vNode="renderLabel ? renderLabel(option) : option.label" />
              <!-- 难点: RenderVnode 组件在其 setup 函数中接收 vNode 属性，并通过返回一个函数来动态渲染该属性。
                这样，每次 vNode 属性发生变化时，RenderVnode 组件会重新渲染并更新页面上的内容。 -->
            </li>
          </template>
        </ul>
      </template>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
import type {
  SelectProps,
  SelectEmits,
  SelectOptions,
  SelectStates,
  RenderLabelFunc
} from './types'
import ElInput from '../Input/Input.vue'
import ElTooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'
// import { offset } from '@popperjs/core'
import ElIcon from '../Icon/Icon.vue'
import RenderVnode from '../Common/RenderVnode'
import { isFunction, debounce } from 'lodash-es'
defineOptions({
  name: 'ElSelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  clearable: false,
  // 设置数组默认值
  options: () => []
})
const emits = defineEmits<SelectEmits>()
const timeout = computed(() => (props.remote ? 300 : 0))
// 查找对应的option
const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value)
  return option ? option : null
}
const initialOption = findOption(props.modelValue)
// const inputValue = ref(initialOption ? initialOption.label : '')
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '', // 输入框的值
  selectOption: initialOption, // 当前选中选项
  mouseHover: false, // 鼠标是否悬停
  loading: false
})
const tooltipRef = ref() as Ref<TooltipInstance>
const popperOptions: any = {
  // 配置了 Popper.js 的选项，用于设置弹出框的样式。
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    }
  ]
}
const filterOptions = ref(props.options) // 用于存储过滤后的选项列表。
watch(
  () => props.options,
  (newOptions) => {
    filterOptions.value = newOptions
  }
)
// 根据你输入的值生成默认选项
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return
  // 如果有自定义过滤方法
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filterOptions.value = props.filterMethod(searchValue)

    // 或者远程请求数据
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true
    try {
      // 远程请求支持防抖
      filterOptions.value = await props.remoteMethod(searchValue)
    } catch (e) {
      console.error(e)
      filterOptions.value = []
    } finally {
      states.loading = false
    }
  } else {
    // 默认过滤规则
    filterOptions.value = props.options.filter((option) => option.label.includes(searchValue))
  }
}
const onFilter = () => {
  generateFilterOptions(states.inputValue)
}

// 当输入框输入内容时，调用 debounceOnFilter 方法。
const debounceOnFilter = debounce(() => {
  onFilter()
}, timeout.value)

const isDropdownShow = ref(false) // 存储下拉框显示状态
const inputRef = ref()

// 改变下拉框的显示状态，并根据状态进行相应的操作，如显示/隐藏 tooltip、清空输入框内容等。
// 传入true就展示下拉框
const changeDropdownShow = (show: boolean) => {
  if (show) {
    // 如果是filter并且之前有值
    if (props.filterable && states.selectOption) {
      states.inputValue = ''
    }
    if (props.filterable) {
      // 默认选项的生成
      generateFilterOptions(states.inputValue)
    }
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
    if (props.clearable) {
      states.inputValue = states.selectOption ? states.selectOption.label : ''
    }
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}
const toggleDropdownShow = () => {
  // 切换下拉框显示状态
  if (props.disabled) return
  if (isDropdownShow.value) {
    changeDropdownShow(false)
  } else {
    changeDropdownShow(true)
  }
}
const itemSelect = (e: SelectOptions) => {
  // 选项被点击触发事件
  if (e.disabled) return
  // inputValue.value = e.label
  states.inputValue = e.label
  states.selectOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  changeDropdownShow(false)
  // inputRef.value.ref.focus()
}

// 是否显示清除按钮的逻辑。
const showClearIcon = computed(() => {
  // hover clearable inputValue
  return (
    props.clearable && states.mouseHover && states.selectOption && states.inputValue.trim() !== ''
  )
})

// 根据 filteredPlaceholder 属性动态设置输入框的占位符。
const filteredPlaceholder = computed(() => {
  if (props.filterable && states.selectOption && isDropdownShow.value) {
    return states.selectOption.label
  } else {
    return props.placeholder
  }
})
const onClear = () => {
  states.inputValue = ''
  states.selectOption = null
  emits('clear')
  emits('change', '')
  emits('update:modelValue', '')
}
</script>
