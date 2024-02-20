---
title: 图标
date: 2022-11-14
permalink: /guide/icon/
---

# 图标
采用 `iconfont`图标库 和 [scss](https://sass.bootcss.com/) 预编译器

## iconfont 的引入

### 存放目录

如下图, 分别有两个文件夹分别为 `iconfont` 和 `configureIcons`

![namespace-warning](/images/guide/icon/iconfont-path.png)

`iconfont` 是本系统中所使用的图标库 `configureIcons` 是菜单所使用的图标库

`iconfont` 中 `resetfont.scss` 是用来公用的修改某些图标的默认样式

### 在系统中引入

在 `src/style/index.scss` 中引入

## vue中使用

### scss文件中使用

`font-family` 使用 `iconfont`文件夹 中的 `iconfont.css` 中 `font-family` 的字段

`content` 使用 `iconfont.css` 中的 `content`
```scss
.ivu-icon-ios-close-circle:before {
  font-family: icon-font;
  color: #56789C;
  content: "\e791";
  font-size: 16px;
}
```

`class`中 `icon-font 或 iconfontconfigure` 使用本系统图标库或菜单图标库

`icon-xxx` 为具体使用的图标类

```vue
<i
  class="iconfontconfigure mr-sm"
  :class="`icon-xxx`"
></i>
```

## 在 scss 中 iconfont 的引入

### 引入文件

`@import` 和 `@use` 都可 这里推荐使用 [@use](https://sass.bootcss.com/documentation/at-rules/use)

![use](/images/guide/icon/scss-import-use.png)

#### [命名空间](https://sass.bootcss.com/documentation/at-rules/use#choosing-a-namespace)
::: tip
当两个文件使用同一个文件名后缀时注意需要使用命名空间
:::

##### 错误示例
```scss
@use './iconfont';
@use '../configureIcons/iconfont';
```

##### 此时会有一个警告
![namespace-warning](/images/guide/icon/namespace-warninig.png)

##### 正确示例
```scss
@use './iconfont';
@use '../configureIcons/iconfont' as configureIcons;
```

#### iconfont.css 引入文件
`iconfont.css` 中引入文件需要绝对路径 `scss-loader` 最新版本不支持路径重写

##### 错误示例
```scss
@font-face {
  font-family: "icon-font";
  src: url('iconfont.woff2?t=1666146148983') format('woff2'),
       url('iconfont.woff?t=1666146148983') format('woff'),
       url('iconfont.ttf?t=1666146148983') format('truetype');
}
```

##### 此时会有一个错误
![iconfont-css-error](/images/guide/icon/iconfont-css-error.png)

##### 正确示例
```scss
@font-face {
  font-family: "icon-font";
  src: url('/src/assets/font/iconfont.woff2?t=1666146148983') format('woff2'),
       url('/src/assets/font/iconfont.woff?t=1666146148983') format('woff'),
       url('/src/assets/font/iconfont.ttf?t=1666146148983') format('truetype');
}
```