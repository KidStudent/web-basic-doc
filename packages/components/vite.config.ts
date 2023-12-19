import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import defineOptions from 'unplugin-vue-define-options/vite';
import { fileURLToPath, URL } from 'node:url';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  build: {
    target: 'modules',
    //打包文件目录
    outDir: 'es',
    //压缩
    minify: false,
    //css分离
    //cssCodeSplit: true,
    rollupOptions: {
      //不将vue代码打包进我们的组件库代码中，如果将vue代码打包进组件库中则会报错
      external: ['vue'],
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].full.mjs',
          exports: 'named',
          //配置打包根目录
          dir: resolve(__dirname, './dist'),
        },
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].mjs',
          exports: 'named',
          //配置打包根目录
          dir: resolve(__dirname, './es'),
        },
        {
          format: 'cjs',
          //不用打包成.cjs
          entryFileNames: '[name].js',
          exports: 'named',
          //配置打包根目录
          dir: resolve(__dirname, './lib'),
        },
        {
          format: 'umd',
          //不用打包成.cjs
          entryFileNames: '[name].full.js',
          exports: 'named',
          //配置打包根目录
          dir: resolve(__dirname, './dist'),
          globals: {
            vue: 'Vue',
          },
        },
      ],
    },
    lib: {
      entry: './index.ts',
      name: 'basic',
    },
  },
  plugins: [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    defineOptions(),
    dts({
      entryRoot: 'src',
      outputDir: [resolve(__dirname, './es/src'), resolve(__dirname, './lib/src')],
      //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: '../../tsconfig.json',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
});
