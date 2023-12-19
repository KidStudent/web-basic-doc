---
title: 开始
date: 2022-12-08
permalink: /component-library/start/
---

# 开始

## 用法

### 完整引入

```javascript
// main.js
import { createApp } from 'vue'
import BasicComponents from '@web-basic-doc/components'
import '@web-basic-doc/theme-chalk/src/index.scss'
import App from './App.vue'

const app = createApp(App)

app.use(BasicComponents)
app.mount('#app')
```

### 按需引入

> App.vue

```vue
<script setup>
import { UiPage } from '@web-basic-doc/components'
const pageData = {
  totalCount: 10000,
  pageNum: 1,
  pageSize: 20,
}
</script>

<template>
  <div>
    <UiPage :page-data="pageData"></UiPage>
  </div>
</template>
```
