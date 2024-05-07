---
title: Input
description: Input组件文档
---

# Input输入框

通过鼠标或键盘输入字符
:::warning
Input 为受控组件，它总会显示 Vue 绑定值。

在正常情况下，input 的输入事件应该被正常响应。 它的处理程序应该更新组件的绑定值 (或使用 v-model)。 否则，输入框的值将不会改变。

不支持 v-model 修饰符。
:::

## 基础用法

基础按钮，使用 type属性来定义不同类型的按钮。

<preview path="../demo/Input/Basic.vue" ></preview>

## Disabled

<preview path="../demo/Input/Disabled.vue" ></preview>

### Size

<preview path="../demo/Input/Size.vue"  ></preview>

### 密码框切换

<preview path="../demo/Input/Password.vue" ></preview>

### Icon

<preview path="../demo/Input/Icon.vue" ></preview>

### Prefix

<preview path="../demo/Input/Prefix.vue"  ></preview>
