import { defineUserConfig } from 'vuepress';
import { customTheme } from '../../theme';
import { viteBundler } from '@vuepress/bundler-vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineUserConfig({
  lang: 'zh-CN',
  title: '前端框架文档',
  description: '即插即用的框架',
  port: 8889,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/logo.png',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/map/minemap/minemap.css',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/map/minemap/minemap-edit.css',
      },
    ],
    [
      'script',
      {
        type: 'text/javascript',
        src: '/map/minemap/minemap.js',
      },
    ],
    [
      'script',
      {
        type: 'text/javascript',
        src: '/map/minemap/turf.min.js',
      },
    ],
    [
      'script',
      {
        type: 'text/javascript',
        src: '/map/minemap/minemap-util.js',
      },
    ],
    [
      'script',
      {
        type: 'text/javascript',
        src: '/map/minemap/minemap-edit.js',
      },
    ],
  ],
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        dedupe: ['vue'],
      },
      plugins: [vueJsx()],
    },
    vuePluginOptions: {},
  }),
  theme: customTheme(),
});
