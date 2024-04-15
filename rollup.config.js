// 请先安装 rollup-plugin-esbuild @vitejs/plugin-vue rollup-plugin-scss sass rollup-plugin-terser

import esbuild from 'rollup-plugin-esbuild'
import vue from '@vitejs/plugin-vue'
import scss from 'rollup-plugin-scss'
import dartSass from 'sass'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/lib/index.ts', // 入口文件地址
  output: {
    globals: {
      vue: 'Vue' // 指明global.Vue即是外部依赖vue
    },
    name: 'Weirdo-UI',
    file: 'dist/lib/weirdo-ui.js', // 输出文件
    format: 'umd', // 使用什么样的模块化机制
    plugins: [terser()]
  },
  plugins: [
    scss({ include: /.scss$/, sass: dartSass }),
    vue({
      include: /.vue$/
    }),
    esbuild({
      include: /.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015'
    })
  ]
}
