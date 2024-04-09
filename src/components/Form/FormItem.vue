<template>
  <!-- 表单项组件模板 -->
  <div
    class="el-form-item"
    ref="formItemRef"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired
    }"
  >
    <div class="el-form-item__label">
      <slot name="label" :label="label">
        <!--  表单项的标签文本 -->
        {{ label }}
      </slot>
    </div>
    <div class="el-form-item__content">
      <slot :validate="validate" />
      <div
        class="el-form-item__error-msg"
        v-if="validateStatus.state === 'error' && props.showMessage"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入需要的模块
import { inject, reactive, ref, computed, onMounted, onUnmounted, provide } from 'vue'
import AsyncValidator from 'async-validator'
import type { RuleItem } from 'async-validator'
import { isNil } from 'lodash-es'
// isNil : 检查 value 是否是 null 或者 undefined。
import { formItemProps, formContextKey, formItemContextKey } from './types'
import type { FormItemContext, FormValidateFailure } from './types'

// 定义 props
const props = defineProps(formItemProps)

// 设置组件选项
defineOptions({
  name: 'ElFormItem'
})

// 获取表单上下文
// 使用 inject 方法获取了父组件传递的表单上下文，以便在组件中使用表单的一些全局设置和方法。
const formContext = inject(formContextKey)

// 定义验证状态
const validateStatus = reactive({
  state: 'init', // 当前状态
  errorMsg: '',
  loading: false
})

// 表单项的引用
const formItemRef = ref<HTMLDivElement>()

// 计算属性，获取内部值
const innerValue = computed(() => {
  const model = formContext?.model  // 获取到表单数据对象
  // isNil : 检查 value 是否是 null 或者 undefined。
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]  // 返回这个表单项的值(通过键名拿到)
  } else {
    return null
  }
})

// 表单项对象初始值
let initialValue: any = undefined

// 获取表单项规则
const getItemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop] // 获取当前表单项规则  
  } else {
    return []
  }
})

// 是否为必填项的计算属性
const isRequired = computed(() => {
  return getItemRules.value?.some((rule) => rule.required) // 规则中找到了required就是必填
})

// 根据触发时机获取表单项的验证规则。
const getTriggeredRules = (trigger?: string) => {
  const itemRules = getItemRules.value
  if (itemRules) { // 如果有规则对象  
    return (
      itemRules
        .filter((rule) => {
          if (!rule.trigger || !trigger) return true
          return rule.trigger && rule.trigger === trigger
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ trigger, ...rule }): RuleItem => rule)
    )
  } else {
    return []
  }
}

// 验证字段的函数
// 验证表单项的值是否符合规则。
const validate = async (trigger?: string) => {
  const modelName = props.prop  // 获取当前表单项的属性名称
  const triggeredRules = getTriggeredRules(trigger) // 获取根据指定触发时机 trigger 获取的验证规则数组
  if (triggeredRules.length === 0) {
    return true  // 没有符合触发时机的验证规则, 表示验证通过。
  }
  if (modelName) {  // 如果存在需要验证的属性名称 modelName
    const validator = new AsyncValidator({  // 这个实例用于对当前表单项的值进行验证。
      [modelName]: triggeredRules     
    })   
    validateStatus.loading = true
    return validator
      .validate({ [modelName]: innerValue.value }) // modelName: 表单项名称, innerValue : 表单项的值
      .then(() => {
        validateStatus.state = 'success'
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e
        validateStatus.state = 'error'
        validateStatus.errorMsg = errors && errors.length > 0 ? errors[0].message || '' : ''
        return Promise.reject(e)
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}

// 清除表单项的验证状态。
const clearValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}

// 重置表单项的字段值和验证状态
const resetField = () => {
  const model = formContext?.model
  clearValidate()
  if (model && props.prop && model[props.prop]) {
    model[props.prop] = initialValue
  }
}

// 表单项上下文
const context: FormItemContext = reactive({
  $el: formItemRef,
  resetField,
  clearValidate,
  prop: props.prop || '',
  validate
})

// 提供表单项上下文
provide(formItemContextKey, context)

// 组件挂载时执行的钩子函数
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context) // 将当前表单项的上下文 context 添加到表单上下文中
    initialValue = innerValue.value
  }
})

// 组件卸载时执行的钩子函数
onUnmounted(() => {
  formContext?.removeField(context)
})

// 暴露供外部使用的函数和状态
defineExpose({
  /** @description 验证状态 */
  validateStatus,
  /** @description 验证表单项 */
  validate,
  /** @description 清除验证状态 */
  clearValidate,
  /** @description 重置字段值 */
  resetField
})
</script>
