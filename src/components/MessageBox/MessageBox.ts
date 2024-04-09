/**
 * MessageBox也是通过函数调用动态的创建和挂载，从而实现灵活的弹窗和消息框功能。
  该函数接受一个配置对象 options，使用 Vue 3 的 createApp 函数创建一个新的 MessageBox 组件实例，
  利用 mount 方法将其挂载到文档碎片中。然后将文档碎片添加到页面中显示，并在必要的时候调用组件的unmount 方法来卸载消息框组件。
 */

import MessageBoxComponent from './MessageBox.vue'
import { createApp, watch } from 'vue'
import { type MessageBoxOptions } from './types'
/**
 * MessageBox - 创建MessageBox
 * @param {MessageBoxOptions} options - 弹窗的配置选项
 * @returns {Promise<void>} - 返回一个 Promise 对象，表示弹窗的结果
 */
const MessageBox = (options: MessageBoxOptions): Promise<void> => {
  // 创建一个 Vue 应用实例，将弹窗组件和配置选项传入
  const messageBoxApp = createApp(MessageBoxComponent, options)
  // 返回一个 Promise，用于异步处理弹窗结果
  return new Promise((resolve, reject) => {
    // 显示弹窗
    showMessageBox(messageBoxApp, { resolve, reject })
  })
}

/**
 * MessageBox['confirm'] 和 MessageBox['alert'] 是给 MessageBox 函数添加了额外的静态方法，
 * 使得调用 MessageBox.confirm() 和 MessageBox.alert() 时能够创建带有不同功能的弹窗。
 */
/**
 * MessageBox 的 confirm 静态方法 - 创建带有确认按钮的弹窗
 * @param {MessageBoxOptions} options - 弹窗的配置选项
 * @returns {Promise<void>} - 返回一个 Promise 对象，表示弹窗的结果
 */
MessageBox['confirm'] = (options: MessageBoxOptions): Promise<void> => {
  // 设置额外字段，标识弹窗类型为确认对话框
  options.field = 'confirm'
  // 调用 MessageBox 函数创建并返回 Promise
  return MessageBox(options)
}

/**
 * MessageBox 的 alert 静态方法 - 创建带有警告按钮的弹窗
 * @param {MessageBoxOptions} options - 弹窗的配置选项
 * @returns {Promise<void>} - 返回一个 Promise 对象，表示弹窗的结果
 */
MessageBox['alert'] = (options: MessageBoxOptions): Promise<void> => {
  // 设置额外字段，标识弹窗类型为警告框
  options.field = 'alert'
  // 调用 MessageBox 函数创建并返回 Promise
  return MessageBox(options)
}

/**
 * 显示弹窗的函数
 * @param {object} app - Vue 应用实例
 * @param {object} callbacks - 包含 resolve 和 reject 回调的对象
 */
const showMessageBox = (
  app: any,
  { resolve, reject }: { resolve: () => void; reject: () => void }
): void => {
  // 创建文档碎片
  const oFragment = document.createDocumentFragment()
  // 将弹窗组件挂载到文档碎片中
  // app.mount() : 将应用实例挂载在一个容器元素中。
  const vm = app.mount(oFragment) // 将vue弹窗实例挂载到文档碎片中
  // 将文档碎片添加到 body 中，显示弹窗
  document.body.appendChild(oFragment)
  // 设置弹窗可见
  vm.setVisible(true)

  // 使用 watch 监听弹窗状态变化
  watch(vm.state, (state) => {
    if (!state.visible) {
      // 根据弹窗状态执行相应的回调
      switch (state.type) {
        case 'cancel':
          reject() // 用户取消操作
          break
        case 'confirm':
          resolve() // 用户确认操作
          break
        default:
          break
      }
      // 隐藏并销毁弹窗
      hideMessageBox(app)
    }
  })
}

/**
 * 隐藏并销毁弹窗的函数
 * @param {object} app - Vue 应用实例
 */
const hideMessageBox = (app: any): void => {
  // 使用 Vue实例 的 unmount 方法卸载组件
  app.unmount()
}

// 导出 MessageBox 函数
export default MessageBox
