
// 主要用于动态渲染传递的虚拟节点。
// 导入 Vue 中的 defineComponent 函数，用于定义 Vue 组件
import { defineComponent } from 'vue'

// 定义一个名为 RenderVnode 的 Vue 组件
const RenderVnode = defineComponent({
  // 定义组件的属性
  props: {
    // 接收一个名为 vNode 的属性
    vNode: {
      // 属性类型可以是字符串或对象
      type: [String, Object],
      // vNode 属性是必需的
      required: true
    }
  },

  // 设置组件的逻辑
  setup(props) {
    // 返回一个函数，这个函数返回传递进来的虚拟节点
    return () => props.vNode
  }
})

// 导出 RenderVnode 组件
export default RenderVnode

/**
 * 这个组件的作用是接收一个虚拟节点（可能是一个 Vue 组件的渲染结果），并将其动态渲染到页面上。
 * 这在需要动态渲染内容的场景中非常有用，特别是在需要将一些动态生成的内容嵌入到组件中时。
 */