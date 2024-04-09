import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// 引入styles样式
import './styles/index.css'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' // 引入图标
/* add icons to the library */
library.add(fas)

const app = createApp(App)

// app.use(createPinia())
app.use(router)

app.mount('#app')
