---
title: Confirm 函数式弹框
date: 2022-12-23
permalink: /component-library/confirm/
---

# 函数式弹框

实例以隐式创建 Vue 组件的方式在全局创建一个对话框。基于 [UiModal](/component-library/modal/) 封装。

## 基础用法

通过 `proxy` 调用。`$UiConfirm` 本身是一个 `promise` 函数，当点击确定按钮时会 `resolve`, 当点击取消按钮时会 `reject`。可传入 `content` 显示内容，传入 `title` 显示弹框标题。

:::demo
confirm/basic
:::

## 自定义显示内容

通过传入 `render` 显示自定义内容。

:::demo
confirm/render
:::

## 属性

| 属性名  | 说明           | 类型     | 可选值 | 默认值          |
| ------- | -------------- | -------- | ------ | --------------- |
| content | 弹框显示内容   | string   | ——     | 您确定要删除吗? |
| title   | 弹框标题       | string   | ——     | 提示            |
| okText  | 确定按钮文字   | string   | ——     | 确 定           |
| render  | 自定义加载内容 | function | ——     | ——              |
