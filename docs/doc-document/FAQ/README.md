---
title: 常见问题
date: 2022-12-12
permalink: /doc-document/FAQ/
---

# 常见问题

## 项目命令行报错终止运行

正常现象，当代码出现明显错误，或修改配置错误后会导致项目自动停止服务，重新启动服务即可。

## 本地环境调试没有报错，但打包时有错误？

`document is not defined` 、 `sessionStorage is not defined` 、 `window is not defined` 、 `getAttr` 此类报错是因为组件库是在 `node` 环境中打包的此时没有该变量，所以需要将使用到 `dom` 相关变量放到函数或者在 dom 加载之后执行。
