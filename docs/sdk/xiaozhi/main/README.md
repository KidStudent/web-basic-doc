---
title: main.js
date: 2024-02-19
permalink: /xiaozhi/main/
---

# main.js 配置

正常情况下 `vue` 中的 `app` 是直接挂载到 `#app` 的 `dom` 上的

这里需要我们直接加载到 `document.body` 中, 所以在等待 `window.onload` 后插入

[main.js](http://192.168.1.123:10080/platform/qsdi/qihui/xiaozhi/-/blob/master/src/main.js)

```js
import { createApp } from 'vue'
import App from './App.vue'
import axios from '@/config/http/http'
import { setupGlobDirectives } from '@/directives'
import 'element-plus/dist/index.css'
import './style/index.scss'
import useGptConfig from '@/hooks/useGptConfig'

async function joinContent(element) {
  const div = document.createElement('div')
  div.id = 'global-float-banner'
  document.body.appendChild(div)
  const app = createApp(element)
  setupGlobDirectives(app)
  const gptConfig = await useGptConfig(axios)
  app.config.globalProperties.$http = axios
  app.config.globalProperties.$gptConfig = gptConfig
  app.mount(div)
}

window.onload = () => {
  joinContent(App)
}
```