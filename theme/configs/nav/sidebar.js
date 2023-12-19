export const sidebar = {
  '/guide/': [
    {
      text: '指南',
      children: [
        {
          text: '介绍',
          link: '/guide/introduction/',
        },
        {
          text: '开始',
          link: '/guide/start/',
        },
        {
          text: '目录结构',
          link: '/guide/catalogue/',
        },
        {
          text: '项目配置',
          link: '/guide/config/',
        },
        {
          text: '路由和菜单',
          link: '/guide/router-menu/',
        },
        {
          text: 'git 相关',
          link: '/guide/git/',
        },
        '/guide/request/',
      ],
    },
    {
      text: '进阶',
      children: [
        {
          text: '图标',
          link: '/guide/icon/',
        },
        {
          text: '换肤',
          link: '/guide/theme/',
        },
        '/guide/RABC/',
        '/guide/sso/',
        '/guide/utils/',
      ],
    },
    {
      text: '其他问题',
      children: ['/guide/FAQ/'],
    },
  ],
  '/doc-document/': [
    {
      text: '文档',
      children: [
        '/doc-document/introduction/',
        '/doc-document/start/',
        '/doc-document/catalogue/',
        '/doc-document/create/',
      ],
    },
    {
      text: '其他',
      children: ['/doc-document/FAQ/'],
    },
  ],
  '/component-library/': [
    {
      text: '指南',
      children: [
        '/component-library/installation/',
        '/component-library/start/',
        '/component-library/layout/',
      ],
    },
    {
      text: '数据展示',
      children: [
        '/component-library/pagination/',
        '/component-library/label/',
        '/component-library/table/',
        '/component-library/echarts/',
        '/component-library/image/',
        '/component-library/upload/',
      ],
    },
    {
      text: '反馈组件',
      children: ['/component-library/modal/', '/component-library/confirm/'],
    },
    {
      text: '指令',
      children: [
        '/component-library/directives/copy/',
        '/component-library/directives/clickoutside/',
        '/component-library/directives/debounce/',
        '/component-library/directives/throttle/',
      ],
    },
  ],
  '/chrome-extension': [
    {
      text: '指南',
      children: [
        '/chrome-extension/introduction/',
        '/chrome-extension/start/',
        '/chrome-extension/manifest/',
      ],
    },
    {
      text: '在扩展中使用Vue2',
      children: [
        '/chrome-extension/vuewithextension/',
        '/chrome-extension/configuration/',
        '/chrome-extension/catalogue/',
      ],
    },
  ],
  '/minemap': [
    {
      text: '入门',
      children: ['/minemap/prepare/', '/minemap/start/', '/minemap/term/', '/minemap/catalogue/'],
    },
    {
      text: '海安项目',
      children: ['/minemap/layer-load/', '/minemap/normal-filter/', '/minemap/build-filter'],
    },
    {
      text: '地图核心',
      children: [
        '/minemap/main/',
        '/minemap/image/',
        '/minemap/source/',
        '/minemap/layer/',
        '/minemap/edit/',
        '/minemap/fence/',
      ],
    },
  ],
};
