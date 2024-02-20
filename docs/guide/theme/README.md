---
title: 换肤
date: 2022-11-20
permalink: /guide/theme/
---

# 换肤

换肤是基于 `scss` 实现的，通过 `documentElement` 中的 `data-skin` 来切换不同的主题

## 目录结构

```

├──  theme # 存储皮肤的文件夹
│      ├── index.scss # 引入皮肤以及全局公用变量
│      ├── dark.scss # 深色系皮肤
│      ├── light.scss # 浅色系皮肤
│      └── ...
└── handle.scss # 用来处理换肤

```

### handle.scss 如何处理

通过使用 `scss` 的语法 `@mixin` 和 `@function` 完成 css 的处理

```scss
/**
*   在_themes.scss里面定义好自己需要的东西在该文件夹下面进行遍历和定义
**/
@import './themes/index.scss';

//遍历主题map
@mixin themeify {
  @each $theme-name, $theme-map in $themes {
    //!global 把局部变量强升为全局变量
    $theme-map: $theme-map !global;
    //判断html的data-skin的属性值  #{}是sass的插值表达式
    //& sass嵌套里的父容器标识   @content是混合器插槽，像vue的slot
    [data-skin='#{$theme-name}'] & {
      @content;
    }
  }
}

//获取background-color背景颜色
@mixin background($color) {
  @include themeify {
    background: themed($color) !important;
  }
}
```

## 系统中是如何使用皮肤

### 在 document 中创建皮肤变量

在 `App.vue` 中

```vue
<script setup>
function getTheme() {
  //  获取localStorage中存进去的type
  console.log(localStorage.getItem('type'))
  /**
   *  判断 localStorage 中的 type 是否为空，如果为空的话，就给默认的颜色（页面初始化的颜色），如
   *  果不为空的话就将对应获取到的值给到 data-skin
   **/
  if (localStorage.getItem('type') !== null) {
    window.document.documentElement.setAttribute(
      'data-skin',
      localStorage.getItem('type')
    )
  } else {
    window.document.documentElement.setAttribute('data-skin', 'dark')
  }
}

onMounted(() => {
  getTheme()
})
</script>
```

这时在 dom 中可以看到如下图所示

![dataskin-create](/images/guide/theme/dataskin-create.png)

### 全局引入皮肤变量

在 `vite.config.js` 中 通过 css 的配置使皮肤变量全局可用

```javascript
import { defineConfig } from 'vite'
export default defineConfig(() => {
  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/style/handle.scss';`,
        },
      },
    },
  }
})
```

## 如何创建一个新的皮肤

在 theme 中创建一个需要的皮肤文件，例如 `dark.scss`，之后在 `index.scss` 中引入该文件并且在 `index.scss` 中的 `$themes` 中使用该变量就完成了该皮肤在系统中的配置

```scss
@import './dark.scss';
$themes: (
  dark: $dark,
);
```

### dark.scss 填写

声明各个颜色的变量
<br>
`命名规范： 功能名称(btnPrimary) + 样式名称(Bg) + 样式状态(Hover) 采用驼峰式命名`

```scss
$dark: (
  btnPrimaryBg: linear-gradient(180deg, #2b84e2 0%, #083a78 100%),
);
```

### 在 scss 中皮肤变量的使用

这里以更改 `iview` 中的组件 `button` 为例

```scss
.ivu-btn-primary {
  padding: 0 22px;
  height: 34px;
  line-height: 34px;
  @include background('btnPrimaryBg');
  opacity: 1;
  border-radius: 4px;
  border: none;
}
```
