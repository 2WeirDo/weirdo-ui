import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'

// 导入消息组件销毁消息函数
import MessageConstructor from './Message.vue'
import useZIndex from '../../hooks/useZIndex'

// 计数器，用于生成唯一的消息 id
let seed = 1

// 存储消息实例的数组，使用 shallowReactive 创建响应式数组
// reactive() 的浅层作用形式。 一个浅层响应式对象里只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了
const instances: MessageContext[] = shallowReactive([])

// 创建消息函数
/**
 * 当调用createMessage函数时，会生成一个唯一的消息id，创建一个消息容器，并将消息组件渲染到该容器中。
 */
export const createMessage = (props: CreateMessageProps) => {
  // 获取下一个可用的 z-index
  const { nextZIndex } = useZIndex()

  // 生成消息 id
  const id = `message_${seed++}`

  // 创建消息容器
  const container = document.createElement('div')

  // 销毁消息函数
  const destory = () => {
    // 从实例数组中找到并删除当前消息实例
    const idx = instances.findIndex((instance) => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1) //删除
    // 渲染 null 来清空消息容器
    // render函数 用于将 VNode 渲染为真实 DOM , 它接受一个 VNode 作为参数, 并将其渲染到一个容器元素中。
    render(null, container)
  }

  // 手动销毁消息函数
  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      // vm组件实例有很多vue封装的方法
      // exposed: 可供公开的属性和方法。
      instance.vm.exposed!.visible.value = false
    }
  }

  // 合并新的 props
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(), // 设置 z-index, 每个消息组件都有一个独立的z-index，确保它们在页面上正确地叠加显示。
    onClose: destory // 设置销毁函数
  }

  // 通过 h 函数 创建消息vNode
  // h函数用于创建虚拟DOM元素（VNode), 接受三个参数：要创建的元素标签名、元素的属性对象（如类名、样式、事件等）、子元素（可以是文本内容或其他 VNode）。
  const vnode = h(MessageConstructor, newProps)

  // 渲染消息 vnode 到容器中
  // render函数 用于将 VNode 渲染为真实 DOM , 它接受一个 VNode 作为参数, 并将其渲染到一个容器元素中。
  render(vnode, container)

  // 将容器中的第一个元素添加到 body 中
  document.body.appendChild(container.firstElementChild!)

  // 获取组件实例
  const vm = vnode.component!

  // 创建消息实例对象
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destory: manualDestroy // 手动销毁函数
  }

  // 将消息实例对象添加到实例数组中
  instances.push(instance)

  return instance
}

// 获取最后一个消息实例
export const getLastInstance = () => {
  return instances[instances.length - 1]
}

// 获取上一个实例的底部偏移量
export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}

// 关闭所有消息
export const closeAll = () => {
  instances.forEach((instance) => {
    instance.destory()
  })
  instances.length = 0
}
