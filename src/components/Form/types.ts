import type { PropType, InjectionKey, ExtractPropTypes } from 'vue'
// ExtractPropTypes : 从运行时的 props 选项对象中提取 props 类型。提取到的类型是面向内部的，也就是说组件接收到的是解析后的 props
// PropType : 用于在用运行时 props 声明时给一个 prop 标注更复杂的类型定义。
// InjectionKey

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Rules, RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'

// 表单项规则类型
export interface FormItemRule extends RuleItem {
  trigger?: string
}
// 表单规则类型
// Partial : 构造一个类型，并将所有属性Type设置为可选。
// Record: 构造一个对象类型，其属性键为Keys，属性值为Type
export type FormRules = Partial<Record<string, FormItemRule[]>>

// 表单组件的 props
export const formProps = {
  model: {
    // 表单数据对象
    type: Object as PropType<Record<string, any>>
  },
  rules: {
    // 表单验证规则
    type: Object as PropType<FormRules>
  }
}
// 表单项组件的 props
export const formItemProps = {
  label: {  // 表单项的标签文本
    type: String
  },
  prop: {  // 表单项对应的数据字段
    type: String
  },
  showMessage: { // 是否显示验证错误信息
    type: Boolean,
    default: true
  }
}

// 表单项组件的 props 类型
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
// ExtractPropTypes : 从运行时的 props 选项对象中提取 props 类型。提取到的类型是面向内部的，也就是说组件接收到的是解析后的 props
/** 比如
 * const formItemProps = {
  label: {
    type: String
  },
  prop: {
    type: String
  },
  showMessage: {
    type: Boolean,
    default: true
  }
}

type Props = ExtractPropTypes<typeof formItemProps>
// {
//   label?: string,
//   type?: string,
//   showMessage: boolean,
// }
 * 
 */

// 表单组件的 props 类型
export type FormProps = ExtractPropTypes<typeof formProps>

// 表单上下文接口
export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  resetFields: (props?: string[]) => void
  clearValidate: (props?: string[]) => void
  validate: (props?: string[]) => void
}
// 表单项上下文接口
export interface FormItemContext {
  $el: HTMLDivElement | undefined
  resetField(): void
  clearValidate(): void
  prop: string
  validate: (trigger: string) => any
}
// 表单验证失败接口
export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

// 表单上下文的注入键
// InjectionKey 用于创建注入键的类型, 它接受一个泛型参数，用于指定注入的值的类型。
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
// 表单项上下文的注入键
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')
