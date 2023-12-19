---
title: Throttle 防抖
date: 2023-12-18
permalink: /component-library/directives/throttle/
---

# 自定义指令： 防抖

防止按钮在短时间内被点击多次，使用节流限制规定时间内只能触发一次。默认延时为 `200ms`

## 基础用法

在需要的 `dom` 上，使用 `v-throttle` 自定义指令，需要指定触发的 `click` 事件

:::demo
directives/throttle/basic
:::

## 输入框使用

在需要的 `dom` 上，使用 `v-throttle` 自定义指令，需要指定触发的 `input` 事件

:::demo
directives/throttle/basic-input
:::

## 自定义延迟时间

在需要的 `dom` 上，使用 `v-throttle` 自定义指令，需要指定触发的事件，传入回调的 `fun` 和 延迟时间 `delay` 毫秒

:::demo
directives/throttle/delay
:::