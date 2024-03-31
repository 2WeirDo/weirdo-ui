import type { Ref, InjectionKey } from 'vue'
// 定义组件接收的props: Name类型
export type CollapseActiveName = string | number

// CollapseItem组件接收的props: name标识/title标题/disabled是否禁用
// title和disabled是非必选值
export interface CollapseItemProps {
  name: CollapseActiveName
  title?: string
  disabled?: boolean
}

// 接收Inject数据类型
export interface CollapseContext {
  activeNames: Ref<CollapseActiveName[]>
  handleItemClick: (name: CollapseActiveName) => void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')

export interface CollapseProps {
  modelValue: CollapseActiveName[] // 当前展开的折叠项的标识符数组
  accordion?: boolean // 是否开启手风琴模式，即同时只能展开一个折叠项，可选属性
}
// export const UPDATE_MODEL_EVENT = 'update:modelValue'
// export const CHANGE_EVENT = 'change'
// export const INPUT_EVENT = 'input'
export interface CollapseEmits {
  // 更新了绑定值时，会自动触发
  (e: 'update:modelValue', value: CollapseActiveName[]): void
  // 用户展开或折叠某个面板时触发change事件
  (e: 'change', values: CollapseActiveName[]): void
}
