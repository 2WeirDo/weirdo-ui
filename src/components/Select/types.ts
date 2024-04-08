import type { VNode } from 'vue'
export interface SelectOptions {
  label: string
  value: string
  disabled?: boolean
}
export type RenderLabelFunc = (option: SelectOptions) => VNode
export type CustomFilterFunc = (value: string) => SelectOptions[]
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOptions[]>
// Select组件所需要的Props
export interface SelectProps {
  modelValue: string // 选中项绑定值
  options?: SelectOptions[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  renderLabel?: RenderLabelFunc
  filterable?: boolean  // Select 组件是否可筛选
  filterMethod?: CustomFilterFunc // 自定义筛选方法
  remote?: boolean // 是否开启 remote 功能 其中的选项是否从服务器远程加载
  remoteMethod?: CustomFilterFunc // 自定义远程搜索方法
}
export interface SelectStates {
  inputValue: string
  selectOption: null | SelectOptions
  mouseHover: boolean
  loading: boolean
}

export interface SelectEmits {
  (e: 'change', value: string): void  // 选中值发生变化时触发
  (e: 'visible-change', value: boolean): void  // 下拉框出现/隐藏时触发
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void  // 可清空的单选模式下用户点击清空按钮时触发
}
