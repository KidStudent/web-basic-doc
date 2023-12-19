---
title: Upload 上传图片
date: 2023-2-18
permalink: /component-library/upload/
---

# 上传图片

用于上传多张图片。本组件基于 [View Design Upload](https://www.iviewui.com/view-ui-plus/component/form/upload) 封装。

## 基础用法
`multipleNum` 为最大上传图片数 `defaultList` 已经上传的照片。
`headers` 设置上传的请求头部 `action` 上传的地址，必填。  
<br>剩余bind属性直接透传到iview组件库的upload组件中
:::demo
upload/basic
:::

## 属性

| 属性名         | 说明       | 类型    | 可选值                    | 默认值                           |
| -------------- | ---------- | ------- | ------------------------- | -------------------------------- |
| multiple-num   | 为最大上传图片数 | number  | ——                        | 3 |
| default-list  | 已经上传的照片   | array  |  ——                               |
| headers | 设置上传的请求头部 | string | ——                        |        可设置token                     |
| action  | 上传的地址，必填   | string  |——  |                  iview上传图片地址            |

## 事件

| 事件名                    | 说明                    | 参数                 |
| ------------------------- | ----------------------- | -------------------- |
| on-choose                 | 上传成功的图片data       | data |
| on-before-upload          | 上传图片之前       | file文件 |
| on-error        | 上传失败的图片       | file文件 |
| on-remove          | 删除文件       | file文件 |

## Expose事件 - 外部调用
| 事件名                    | 说明                    | 参数                 |
| ------------------------- | ----------------------- | -------------------- |
| clear          | 外部清空全部图片       | 无 |
| handleClick    | 外部可直接触发Upload组件的点击事件       | 无 |

## 插槽

| 名称 | 说明                                      |
| ------ | -------------------------------------------------- |
| ——     | 触发上传组件的控件 |
| loadingDom | 上传中，显示的内容 |