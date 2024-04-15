import type { App } from 'vue'
import Container from './Container.vue'

// 注册组件

Container.install = function (app: App) {
 // @ts-ignore
  app.component(Container.name, Container)
}
export default Container
export * from './types'
