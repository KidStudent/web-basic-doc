---
title: Echarts 图表
date: 2022-12-23
permalink: /component-library/echarts/
---

# 图表

用于图表展示数据，基于 [echarts](https://echarts.apache.org/zh/index.html) 封装的。

## 基础用法

:::demo
echarts/basic
:::

## 属性

| 属性名         | 说明       | 类型    | 可选值                    | 默认值                           |
| -------------- | ---------- | ------- | ------------------------- | -------------------------------- |
| echart-style   | 图表的样式 | object  | ——                        | {height: '200px', width: '100%'} |
| echart-option  | 图表配置   | object  | 见 echarts 官网各图表配置 | ——                               |
| echart-loading | 图表加载中 | boolean | ——                        | false                            |

## 事件

| 事件名                    | 说明                    | 参数                 |
| ------------------------- | ----------------------- | -------------------- |
| echartClick               | 点击 echarts 的回调     | echarts 配置中的参数 |
| echartMouseover           | 鼠标移入 echarts 的回调 | echarts 配置中的参数 |
| echartMouseout            | 鼠标移出 echarts 的回调 | echarts 配置中的参数 |
| echartLegendselectchanged | 点击图例的回调          | echarts 配置中的参数 |
