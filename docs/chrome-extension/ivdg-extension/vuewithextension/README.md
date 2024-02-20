---
title: 使用vue-cli搭建
date: 2023-07-25
permalink: /ivdg-extension/vuewithextension/
---

# 使用vue-cli搭建

## 一、创建 Vue 项目

使用 `vue-cli` 创建 `vue2.x` 版本的 `vue` 项目 `vue-create-xxx`

创建完成之后的目录结构为

```text
├── README.md
├── babel.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   └── main.js
```

## 二、修改项目目录

因为我们要开发 `chrome` 扩展项目，而这种生成的 `vue` 项目里面的文件夹和文件很多我们不需要，所以我们需要处理下：

1. 在根目录中创建 `vue.config.js` 的 `vue` 配置文件;
2. 在 `src` 文件夹下面的 `app.vue、components` 删除;
3. 删除根目录中的`public`文件夹;
4. 在 `src` 文件夹下创建 `background、content、plugins、popup` 文件夹;
5. 在 `background` 文件夹下创建 `main.js`;
6. 在 `content` 文件夹下创建 `components` 文件夹 `App.vue、main.js` 文件;
7. 在 `plugins` 文件夹下创建 `inject.js、manifest.json` 文件;
8. 在 `popup` 文件夹下创建 `App.vue、main.js、index.html` 文件， `components`等文件夹;

此时的文件目录应该为

```text
├── README.md
├── babel.config.js
├── package.json
├── src
│   ├── assets
│   │   └── logo.png
│   ├── background
│   │   └── main.js
│   ├── content
|   |   ├── components
|   |   ├── App.vue
│   │   └── main.js
│   ├── plugins
|   |   ├── inject
│   │   └── maifest.json
│   ├── popup
|   |   ├── components
|   |   ...
|   |   ├── App.vue
|   |   ├── index.html
│   │   └── main.js
```