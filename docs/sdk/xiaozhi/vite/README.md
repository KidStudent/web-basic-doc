---
title: vite
date: 2024-02-19
permalink: /xiaozhi/vite/
---

# vite 配置

由于我们需要以 `SDK` 的形式呈现，需要更改相关配置，使打包后的文件是 `js` 可以由其他系统引入使用。

`rollupOptions` 中的 `output` 更改了打包之后的文件名称，配置后 `css` 文件名称会由原来打包后的 `style.css`变为 `xiaozhi.css`

`lib` 中入口文件选择 `main.js` 更改打包后 `js` 文件名， 由原来的 `index.js` 变为 `xiaozhi.js`

[vite.config.js](http://192.168.1.123:10080/platform/qsdi/qihui/xiaozhi/-/blob/master/vite.config.js#L19)

```js {19-28}
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env': env,
    },
    build: {
      //压缩
      minify: true,
      rollupOptions: {
        output: {
          assetFileNames: 'xiaozhi.[ext]',
        },
      },
      lib: {
        entry: resolve(__dirname, './src/main.js'),
        name: 'XiaoZhi',
        fileName: 'xiaozhi',
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // 指定组件所在文件夹的位置，默认是src/components
        dirs: [],
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 8080,
      proxy: {},
    },
  }
})

```

打包后的 `dist` 目录如下图：

![xiaozhi-dist](/images/sdk/xiaozhi/dist.png)