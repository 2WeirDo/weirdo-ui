<template>
  <!-- DropDown的模板结构以Tooltip作为基础，菜单选项作为插槽传入，遍历菜单项，
    如果传入的菜单项为divided情况下，生成分隔线，然后渲染item.label，即菜单项。 -->

  <div class="el-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot />
      <template #content>
        <ul class="el-dropdown__menu">
          <!-- 功能：滑入后有菜单项显示，基于Tooltip组件进行二次开发
                Props: 传入menuOptions数组作为props, 每一个菜单项包含以下内容
                label: 显示内容、字符串或者VNode 
                key: 键值
                disabled: 是否禁用
                divided: 是否有分隔符 
              -->
          <template v-for="item in menuOptions" :key="item.key">
            <!-- divided情况下 添加分隔线 -->
            <li v-if="item.divided" role="separator" class="divided-placeholder" />
            <!-- 点击 菜单项，emit select事件 -->
            <li
              class="el-dropdown__item"
              @click="itemClick(item)"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              :id="`dropdown-item-${item.key}`"
            >
              <!-- 渲染 label 字符串 或者 VNode -->
              <!-- {{  item.label }} -->
              <RenderVnode :vNode="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
/**
 * 但是直接使用插值表达式只能渲染字符串形式的label, 不支持传入更复杂的虚拟DOM,
 * 这里我们将之定义成一个组件RenderVnode
 */
import RenderVnode from '../Common/RenderVnode'
import type { TooltipInstance } from '../Tooltip/types'
defineOptions({
  name: 'ElDropdown'
})
const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref<TooltipInstance | null>(null)
const visibleChange = (e: boolean) => {
  // 控制菜单项是否显示
  emits('visible-change', e)
}
// 点击 菜单项
const itemClick = (e: MenuOption) => {
  // 处理禁用状态下的菜单项
  if (e.disabled) {
    return
  }
  // emit select事件 选择菜单项
  emits('select', e)
  // 点击之后是否隐藏
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>
