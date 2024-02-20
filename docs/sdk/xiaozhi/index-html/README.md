---
title: index.html
date: 2024-02-19
permalink: /xiaozhi/index-html/
---

# index.html 配置

由于本系统是 `SDK` 的形式呈现，所以在 `index.html` 中也应该是引入 `dist` 目录中的 `xiaozhi.js` 加载

[index.html](http://192.168.1.123:10080/platform/qsdi/qihui/xiaozhi/-/blob/master/index.html)

```html {4,13}
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="./dist/xiaozhi.css">
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
    />
    <title>小智</title>
  </head>
  <body>
    <script type="module" src="./dist/xiaozhi.js"></script>
  </body>
</html>

```