import type { PropType } from 'vue'
// 按钮类型
export type ButtonType = 'primary' | 'success' | 'info' | 'warning' | 'danger'
// 按钮尺寸, 额外的尺寸：medium、small、mini，通过设置size属性来配置它们。
export type ButtonSizeType = 'medium' | 'small' | 'mini' | 'large'
// 原生按钮类型
export type NativeType = 'button' | 'submit' | 'reset'

// 包含了按钮组件的各种属性
export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>, // 使用 PropType 的方式，能够让 Vue 3 在运行时进行更严格的类型检查，
    //  确保传入的 prop 类型符合预期。另外，PropType 也提供了更好的类型提示和自动补全功能
    default: 'primary'
  },
  size: {
    type: String as PropType<ButtonSizeType>,
    default: 'medium'
  },
  plain: {
    type: Boolean
  },
  round: {
    type: Boolean
  },
  circle: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
  autofocus: {
    type: Boolean
  },
  loading: {
    type: Boolean
  },
  nativeType: {
    type: String as PropType<NativeType>,
    default: 'button'
  },
  icon: {
    type: String
  }
}
