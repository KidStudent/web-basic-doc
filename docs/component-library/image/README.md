---
title: Image 图片
date: 2023-02-07
permalink: /component-library/image/
---

# 图片加载

图片展示统一加载中，加载错误等显示

## 基础用法

可通过 fit 来设置图片在容器的样式，同原生 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)。

:::demo
image/basic
:::

## 预览

设置属性 `preview` 可以开启图片预览模式，默认已开启，通过属性 `preview-list` 来设置图片列表。

预览时，可以使用 `←`、`→` 切换图片，`↑`、`↓` 缩放图片，`Space` 显示 1:1 图片，`ESC` 退出预览。

:::demo
image/preview
:::

## 属性

| 属性名   | 说明                                                                                  | 类型    | 可选值 | 默认值  |
| -------- | ------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| src      | 图片地址                                                                              | string  | ——     | ——      |
| fit      | 图片适配容器模式包含：`fill`，`contain`，`cover`，`none`，`scale-down`                | string  | ——     | contain |
| preview  | 是否图片预览                                                                          | boolean | ——     | true    |
| url-list | 图片预览列表                                                                          | array   | ——     | []      |
| error-src | 加载错误时，最终显示的图片地址                                                          | string  | ——     | ——      |
| load-src  | 加载中显示的图片地址                                                                   | string  | ——     | ——      |
| 透传属性 | 见 [View Design Image](https://www.iviewui.com/view-ui-plus/component/view/image#API) | ——      | ——     | ——      |
