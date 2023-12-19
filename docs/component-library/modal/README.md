---
title: Modal 弹框
date: 2022-12-20
permalink: /component-library/modal/
---

# 弹框

在浮层中显示一个对话框。本组件基于 [View Design Modal](https://www.iviewui.com/view-ui-plus/component/view/modal) 封装。

## 基础用法

需要设置 `model-value` / `v-model` 属性， 它接受 `Boolean`，当为 `true` 时显示 Modal。Modal 分为两个部分：`body` 和 `footer`， `footer` 需要具名为 `footer` 的 `slot`。 `title` 属性用于定义标题，它是可选的，默认值为空。

:::demo
modal/basic
:::

## 自定义头部，页脚

`header` 可用于自定义显示标题的区域。`footer` 可用于自定义显示页脚区域。

:::demo
modal/customization-slot
:::

## 可拖拽

设置 `draggable` 属性为 `true` 以做到拖拽

:::demo
modal/drag
:::

## 属性

| 属性名                | 说明                                                                                  | 类型     | 可选值 | 默认值 |
| --------------------- | ------------------------------------------------------------------------------------- | -------- | ------ | ------ |
| model-value / v-model | 是否显示                                                                              | boolean  | ——     | ——     |
| title                 | 弹框的标题 也可以通过具名 slot（见下表）传入                                          | string   | ——     | ——     |
| footer-hide           | 隐藏底部                                                                              | booblean | ——     | false  |
| loading               | 点击确定按钮时，确定按钮是否显示 loading 状态                                         | boolean  | ——     | false  |
| class-custom          | 自定义 class                                                                          | string   | ——     | ——     |
| 透传属性              | 见 [View Design Modal](https://www.iviewui.com/view-ui-plus/component/view/modal#API) | ——       | ——     | ——     |

## 事件

| 事件名   | 说明                                                                                  | 参数 |
| -------- | ------------------------------------------------------------------------------------- | ---- |
| onCancel | 点击取消的回调                                                                        | ——   |
| query    | 点击确定的回调                                                                        | ——   |
| 透传事件 | 见 [View Design Modal](https://www.iviewui.com/view-ui-plus/component/view/modal#API) | ——   |

## 插槽

| 名称   | 说明                                               |
| ------ | -------------------------------------------------- |
| ——     | 弹框的内容                                         |
| header | 弹框标题的内容; 会替换标题部分，但不会移除关闭按钮 |
| footer | 自定义页脚内容                                     |
