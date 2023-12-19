---
title: 开始
date: 2022-12-12
permalink: /doc-document/start/
---

# 开始

## 开发环境

与 [前端框架](/guide/start/#开发环境) 保持一致

## 本地开发

由于`pnpm`工作空间的缘故，引用的组件库文件为本地文件，所以启动项目前需要先[打包组件库](#打包组件库)

::: tip
如果未指定目录，所有命令请在根目录中执行
:::

### 安装依赖

```shell
pnpm install
```

### 打包组件库

进入 `packages/components`目录，执行命令

```shell
pnpm run build
```

### 启动项目

```shell
pnpm run docs:dev
```

## 生产环境部署

### 打包

```shell
pnpm run docs:build
```

打包完成后会在 `docs/.vuepress` 中生成一个 `dist` 文件夹, 将 `dist` 文件夹部署到服务器上即可
