---
title: 项目配置
date: 2023-07-25
permalink: /chrome-extension/configuration/
---

# 项目配置

## popup 文件夹修改

可以当作一个正常的 `vue` 项目开发

### popup/App.vue

此文件就是正常的 `vue` 文件，按照平时写 `vue` 项目开发即可

```vue
<template>
  <div class="ivdg-extensions-app">
    <nav-header></nav-header>
    <router-view class="content-box"></router-view>
  </div>
</template>

<script>
export default {
  components: {
    NavHeader: require('@/popup/components/nav-header/index.vue').default,
  },
}
</script>

<style lang="less" scoped>
.ivdg-extensions-app {
  width: 500px;
  height: 600px;
  .content-box {
    height: calc(100% - 54px);
  }
}
</style>

```

### popup/index.html

`popup` 文件夹下的 `index.html` 文件， 因为这个是 `popup` 的入口页面，我们需要按照 `vue create` 生成的 `public` 文件夹中的 `index.html` 文件拷贝过来即可，
顺便把 `favicon` 删除，把 `title` 修改下

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>iVDG 扩展插件</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

### popup/main.js

这个是 `popup` 中 使用 `vue` 的入口文件，按照 `src` 下的 `main.js` 中配置即可，这里我们引入了 `element-ui、vuex、vue-router、axios` 等。

```js
import Vue from 'vue'
import App from './App.vue'
import router from '@/popup/config/router.config'
import store from './store'
import axios from '@/popup/config/http/http'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/popup/style/index.less'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)

const directives = require.context('./directives')
directives.keys().forEach((key) => {
  const directive = directives(key)
  directive.default(Vue)
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

```

## content 文件夹修改

`content` 文件夹下是对应 `chrome` 插件的 `content.js`，这个可以在嵌入页面里面渲染页面，我们也可以用 `vue` 开发

### content/App.vue

正常的 `vue` 开发

```vue
<template>
  <div id="ivdg-extension">
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {}
  },
  created() {},
  methods: {},
  watch: {},
  components: {},
}
</script>
<style lang="less" scoped>
</style>

```

### content/main.js

由于 `content` 页面是当作脚本文件插入到当前页面中的，所以我们需要用js挂载 `vue` 的方式到当前页面中

```js
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'

Vue.use(ElementUI)

joinContent(App)

function joinContent(element) {
  const div = document.createElement('div')
  div.id = 'ivdg-extensions'
  document.body.appendChild(div)
  new Vue({
    render: (h) => h(element),
  }).$mount('#ivdg-extensions')
}

;(function insertElementIcons() {
  let elementIcons = document.createElement('style')
  elementIcons.type = 'text/css'
  elementIcons.textContent = `
    @font-face {
      font-family: "element-icons";
      src: url('${chrome.extension.getURL(
        'fonts/element-icons.woff'
      )}') format('woff'),
      url('${chrome.extension.getURL(
        'fonts/element-icons.ttf'
      )}') format('truetype')
    }`
  document.head.appendChild(elementIcons)
})()
```
1. `joinContent` 挂载 `vue` 实例后将 `dom` 插入当前页面的 `body` 中
2. 由于我们使用了 `element-ui` 且我们是内网不可外部引入 `cdn` 的方式加载 `element-ui`，所以我们要单独
使用 `insertElementIcons` 插入字体图标到当前页面中

::: warning 注意
由于是离线加载的 `element-ui` 并且是挂载到当前页面中，所以不可直接在 `main.js` 引入 `element.css` 需要将 `css` 文件下载到本地，
放入 `assets` 文件夹，并且在 `manifest.json` 中的 `content` 中引入。
`insertElementIcons` 通过手动插入字体图标，所以也需要在  `manifest.json` 中的 `web_accessible_resources` 配置权限引入外部文件。
:::


## background 文件夹

此文件夹对应的是 `background.js` 文件，可以简单的写一个打印日志即可。

## vue.config.js 文件配置

我们需要配置 js 文件夹，css 文件夹，popup.html 文件，background.js 文件，inject.js 文件，content.js 文件，content.css 文件；

### 添加 `copy-webpack-plugin` 模块, 用于复制文件

```shell
npm install copy-webpack-plugin@6.0.2 -D
```

### 文件内容

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

// 复制文件到指定目录
const copyFiles = [
  {
    from: resolve('src/plugins/manifest.json'),
    to: `${resolve('dist')}/manifest.json`,
  },
  {
    from: resolve('src/assets'),
    to: resolve('dist/assets'),
  },
  {
    from: resolve('src/plugins/inject.js'),
    to: resolve('dist/js'),
  },
  {
    from: resolve('src/background/main.js'),
    to: `${resolve('dist')}/js/background.js`,
  },
]

// 复制插件
const plugins = [
  new CopyWebpackPlugin({
    patterns: copyFiles,
  }),
]

// 页面文件
const pages = {}
// 配置 popup.html 页面
const chromeName = ['popup']

chromeName.forEach((name) => {
  pages[name] = {
    entry: `src/${name}/main.js`,
    template: `src/${name}/index.html`,
    filename: `${name}.html`,
  }
})

module.exports = {
  pages,
  productionSourceMap: false,
  // 配置 content.js
  configureWebpack: {
    entry: {
      content: './src/content/main.js',
    },
    output: {
      filename: 'js/[name].js',
    },
    plugins,
  },
  // 配置 content.css
  css: {
    extract: {
      filename: 'css/[name].css',
    },
  },
  // 增加chainWebpack配置
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename('js/[name].js').end()
      config.output.chunkFilename('js/[name].js').end()
    }
    // 配置字体图标
    const fontsRule = config.module.rule('fonts')

    fontsRule.uses.clear()
    fontsRule
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url')
      .loader('url-loader')
      .options({ limit: 1000, name: 'fonts/[name].[ext]' })
    config.resolve.alias.set('@', resolve('src'))
  },
}
```

1. `pages` 是为了设置 `popup`的入口文件
2. `copyFiles` 是为了把配置文件 `manifest.json、inject.js` 和 `background、assets` 文件夹复制到打包之后的 `dist` 中
3. `configureWebpack` 是为了把 `content` 文件夹中的js 输出到 `dist` 中
4. `css` 配置 `content.css` 文件
5. `chainWebpack` 中由于打包后产生的 `chunk-vendors.xxx.js` 是随机数字拼接的 我们需要把他输出为固定的js文件，
由于我们使用了 `element-ui` 所以我们需要引入字体图标，配置 `fontsRule`

### 执行 `npm run build` 之后的 `dist` 目录

```text
├── assets
│   ├── css
|   │    └── element-ui.css
│   ├── font
│   └── img
├── css
|   ├── chunk-vendors.xxx.css
|   ├── content.css
│   └── popup.css
├── fonts
|   ├── element-icons.ttf
|   └── element-icons.woff
├── img
├── js
|   ├── background.js
|   ├── chunk-vendors.js
|   ├── content.js
|   ├── inject.js
│   └── popup.js
├── index.html
├── manifest.json
└── popup.html
```



## plugins/manifest.json 文件配置

```json
{
  "manifest_version": 2,
  "name": "问题反馈插件",
  "description": "方便快捷地反馈在任何系统发现的数据质量问题，并查看问题处理结果。",
  "version": "1.0.0",
  "browser_action": {
    "default_title": "问题反馈插件",
    "default_icon": "assets/img/logo.png",
    "default_popup": "popup.html"
  },
  "permissions": [
    "contextMenus",
    "tabs",
    "notifications",
    "activeTab",
    "webRequest",
    "webRequestBlocking",
    "storage",
    "http://*/*",
    "https://*/*"
  ],
  "background": {
    "scripts": ["js/chunk-vendors.js", "js/background.js"]
  },
  "icons": {
    "48": "assets/img/logo.png"
  },
  "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "css": ["css/content.css", "assets/css/element-ui.css"],
    "js": ["js/chunk-vendors.js", "js/content.js"],
    "run_at": "document_idle"
  }],
  "web_accessible_resources": ["js/inject.js", "fonts/*"],
}
```

1. `content_scripts` 需要配置 `css` 一个是 `content` 文件中写的样式，一个是手动引入本地的 `element-ui.css` 样式
2. `web_accessible_resources` 需要配置打包之后的 `fonts` 允许 `css` 引入图标