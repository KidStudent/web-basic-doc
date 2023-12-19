---
title: 新建文档
date: 2022-12-12
permalink: /doc-document/create/
---

# 新建文档

::: warning
菜单具体链接路由必须以 `/` 开头和结尾
:::

## 新建目录

在 `docs/theme/configs/nav` 中的 `navbar.js` 和 `sidebar.js` 分别创建目录

| 属性名 | 描述         |
| ------ | ------------ |
| text   | 中文名称     |
| link   | 具体链接路由 |

### 一级菜单

在 `navbar.js` 中 `navbar` 数组中添加，举个 :chestnut:

::: details 点击查看

```js
export const navbar = [
  {
    text: '指南',
    link: '/guide/'
  }
```

:::

在 `sidebar.js` 中 `sidebar` 对象中添加，举个 :chestnut:

::: details 点击查看

```js
export const sidebar = {
  '/guide/'
}
```

:::

`key` 为 `navbar` 数组中声明的 `link`的值

### 子菜单

在 `navbar.js` 中 `navbar` 数组中找到对应的父级菜单，在 `children` 中添加如一级菜单中的对象，举个 :chestnut:

::: details 点击查看

```js
export const navbar = [
  {
    text: '指南',
    children: [
      {
        text: '介绍',
        link: '/guide/introduction/',
      },
    ],
  },
]
```

:::

在 `sidebar.js` 中 `sidebar` 对象中找到对应的父级菜单，有两种方式

#### 方法一

在其 `children` 添加如一级菜单中的对象，举个 :chestnut:

::: details 点击查看

```js
export const sidebar = {
  '/guide/': [
    {
      text: '指南',
      children: [
        {
          text: '介绍',
          link: '/guide/introduction/',
        },
      ],
    },
  ],
}
```

:::

#### 方法二

在其 `children` 中添加 `navbar` 数组中声明的 `link`的值，举个 :chestnut:

::: details 点击查看

```js
export const sidebar = {
  '/guide/': [
    {
      text: '指南',
      children: ['/guide/request/'],
    },
  ],
}
```

:::

此两种方法的区别为：

[方法一](/doc-document/create/#方法一)： 中已经写了中文名和具体路由，所以中文名字将为其声明的 `text`，举个 :chestnut:

`docs/doc-document/introduction/README.md`

::: details 点击查看

```md
# 介绍

组件库 doc 是以 vuepress v2.0.0-beta.53 + vue3 + iview-ui-plus 生成的文档库。
```

:::

[方法二](/doc-document/create/#方法二)： 由于只写了匹配的文件路径，中文名字将匹配 `navbar.js` 中的 `text`， 如果 `README.md` 文件中写了 [Frontmatter](https://v2.vuepress.vuejs.org/zh/guide/page.html#frontmatter) 则使用 `Frontmatter` 中的 `title` ，举个 :chestnut:

`docs/doc-document/catalogue/README.md`

::: details 点击查看

```md
---
title: 目录结构
date: 2022-11-10
permalink: /doc-document/catalogue/
---

# 目录结构
```

:::

## 如何展示 demo

已经封装了 `md` 的命令 在 [theme/configs/plugins](http://192.168.1.123:10080/platform/qsdi/web-basic-doc/-/blob/packages/theme/configs/plugins.js#L19) 中的 `mdPlugin`

举个 :chestnut:

::: details 点击查看

```
:::demo
label/basic
::：(这里：替换为:，文档中写三个:会有问题)
```

:::

其中 `:::demo` 是已经封装的语法，`label/basic` 是文件夹 `theme/examples` 中对应的文件路径
