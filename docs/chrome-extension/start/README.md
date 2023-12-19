---
title: 开始
date: 2023-07-25
permalink: /chrome-extension/start/
---

# 开始

## 开发环境

与 [前端框架](/guide/start/#开发环境) 保持一致

## 本地开发

### 安装依赖

```shell
npm install
```

### 打包项目

```shell
npm run build
```

### 浏览器中安装 

需要在 `chrome`、`edge`、`sarfari` 等 `webkit` 内核的浏览器中安装

这里以chrome浏览器安装为例

#### 打开chrome浏览器中的扩展程序

![step1](/images/chrome-extension/step1.png)

#### 开启开发者模式

![step2](/images/chrome-extension/step2.png)

#### 加载已解压的扩展程序-也就是我们打包出来的dist

![step3](/images/chrome-extension/step3.png)

#### 此时我们的插件就安装完成了

![step4](/images/chrome-extension/step4.png)

#### 固定插件到快捷栏方便使用

![step5](/images/chrome-extension/step5.png)

#### 可以开始调试了

![step6](/images/chrome-extension/step6.png)

### 更新程序

每次更新需要重新执行打包

::: warning 注意
打包完成后 `popup` 弹框重新打开会自动更新为最新的包，但 `content` 中向当前html注入的脚本需要在 `扩展程序` 中重新加载扩展程序，
并且需要在注入的页面刷新后才可正常运转
:::
