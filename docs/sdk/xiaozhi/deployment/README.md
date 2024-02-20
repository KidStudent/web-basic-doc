---
title: 部署
date: 2024-02-19
permalink: /xiaozhi/deployment/
---

# 部署

## 静态页面

一、创建一个 `index.html`，引入打包后 `dist` 目录中的 `xiaozhi.css` 和 `xiaozhi.umd.cjs`

::: tip 提示
`dist` 目录中的 `xiaozhi.js` 是 `js` 的 `module` 模式下运行的，`xiaozhi.umd.cjs` 是在正常静态引入 `js` 运行的

`xiaozhi.umd.cjs` 可以手动更名为 `xiaozhi.js`
:::

::: details 点击查看

```html {4,13}
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="./xiaozhi.css?v=10">
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
    />
    <title>小智</title>
  </head>
  <body>
    <script src="./xiaozhi.js?v=10"></script>
  </body>
</html>

```

:::

二、启动一个 `nginx` 服务器，将第一步中创建的 `index.html` 映射到对应的地址上，并且放入 `dist` 目录中的文件，如下图：

![xiaozhi-deployment](/images/sdk/xiaozhi/deployment.png)

## 其他系统引入

### vue

在 `index.html` 文件中引入 `dist` 目录中的 `xiaozhi.css` 和 `xiaozhi.umd.cjs` 即可