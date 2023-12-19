---
title: 介绍
date: 2023-07-25
permalink: /chrome-extension/introduction/
---

# 介绍

[ivdg-extension](http://192.168.1.123:10080/platform/qsdi/ivdg/ivdg-extensions) 是以 `vue2全家桶`、`element-ui`、 `chrome extension manifest V2` 开发。

## chrome extension 文档

[官方文档](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/) 需要翻墙

[中文文档](https://wizardforcel.gitbooks.io/chrome-doc/content/1.html)

## chrome extension 构成

### popup

在用户点击扩展程序图标时，都可以设置弹出一个popup页面。而这个页面中自然是可以包含运行的js脚本的（比如就叫popup.js）。
它会在每次点击插件图标——popup页面弹出时，重新载入。

![popup](/images/chrome-extension/popup.png)

### content

是会注入到Web页面的JS文件，可以是多个，也可以对注入条件进行设置，也就是满足什么条件，才会将这些js文件注入到当前web页面中。
可以把这些注入的js 文件和网页的个文件看成一个整体，相当于在你网页中，写入了这些js 代码。这样就可以对原来的web页面进行操作了。

在我们的组件中已经插入一个id为 `ivdg-extension` 的dom到当前标签页中

![content](/images/chrome-extension/content.png)

### background

可以是html+js， 也可以是单纯的js
插件启动后就常驻后台，只有一个。这类脚本是运行在浏览器后台的，注意它是与当前浏览页面无关的。

### 综合起来就是如下图所示

![extension](/images/chrome-extension/extension.png)