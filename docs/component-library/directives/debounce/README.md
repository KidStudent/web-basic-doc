---
title: Debounce 防抖
date: 2023-12-18
permalink: /component-library/directives/debounce/
---

# 自定义指令： 防抖

多次点击按钮、输入框中输入文字搜索，会多次调用后端接口，防止多次触发。默认延时为 `200ms`

## 基础用法

在需要的 `dom` 上，使用 `v-debounce` 自定义指令，需要指定触发的 `click` 事件

:::demo
directives/debounce/basic
:::

## 输入框使用

在需要的 `dom` 上，使用 `v-debounce` 自定义指令，需要指定触发的 `input` 事件

:::demo
directives/debounce/basic-input
:::

## 自定义延迟时间

在需要的 `dom` 上，使用 `v-debounce` 自定义指令，需要指定触发的事件，传入回调的 `fun` 和 延迟时间 `delay` 毫秒

:::demo
directives/debounce/delay
:::