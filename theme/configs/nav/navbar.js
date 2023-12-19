export const navbar = [
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
      {
        text: 'http请求',
        link: '/guide/request/',
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
          {
            text: 'RABC权限',
            link: '/guide/RABC/',
          },
          {
            text: '单点登录',
            link: '/guide/sso/',
          },
          {
            text: '函数工具库',
            link: '/guide/utils/',
          },
        ],
      },
      {
        text: '其他',
        children: [
          {
            text: '常见问题',
            link: '/guide/FAQ/',
          },
        ],
      },
    ],
  },
  {
    text: '文档',
    children: [
      {
        text: '介绍',
        link: '/doc-document/introduction/',
      },
      {
        text: '开始',
        link: '/doc-document/start/',
      },
      {
        text: '目录结构',
        link: '/doc-document/catalogue/',
      },
      {
        text: '文档创建',
        link: '/doc-document/create/',
      },
      {
        text: '其他',
        children: [
          {
            text: '常见问题',
            link: '/doc-document/FAQ/',
          },
        ],
      },
    ],
  },
  {
    text: '组件库',
    children: [
      {
        text: '安装',
        link: '/component-library/installation/',
      },
      {
        text: '开始',
        link: '/component-library/start/',
      },
      {
        text: '布局',
        link: '/component-library/layout/',
      },
      {
        text: '数据展示',
        children: [
          {
            text: 'Page 分页',
            link: '/component-library/pagination/',
          },
          {
            text: 'Label 标签',
            link: '/component-library/label/',
          },
          {
            text: 'Table 表格',
            link: '/component-library/table/',
          },
          {
            text: 'Echart 图表',
            link: '/component-library/echarts/',
          },
          {
            text: 'Image 图片',
            link: '/component-library/image/',
          },
          {
            text: 'Upload 图片',
            link: '/component-library/upload/',
          },
        ],
      },
      {
        text: '反馈组件',
        children: [
          {
            text: 'Modal 弹框',
            link: '/component-library/modal/',
          },
          {
            text: 'Confirm 函数式弹框',
            link: '/component-library/confirm/',
          },
        ],
      },
      {
        text: '指令',
        children: [
          {
            text: 'Copy 拷贝',
            link: '/component-library/directives/copy/',
          },
          {
            text: 'Clickoutside 点击其他区域',
            link: '/component-library/directives/clickoutside/',
          },
          {
            text: 'Debounce 防抖',
            link: '/component-library/directives/debounce/',
          },
          {
            text: 'Throttle 节流',
            link: '/component-library/directives/throttle/',
          },
        ],
      },
    ],
  },
  {
    text: 'chrome扩展',
    children: [
      {
        text: '介绍',
        link: '/chrome-extension/introduction/',
      },
      {
        text: '开始',
        link: '/chrome-extension/start/',
      },
      {
        text: 'Manifest',
        link: '/chrome-extension/manifest/',
      },
      {
        text: '在扩展中使用Vue2',
        children: [
          {
            text: '使用vue-cli搭建',
            link: '/chrome-extension/vuewithextension/',
          },
          {
            text: '配置项目',
            link: '/chrome-extension/configuration/',
          },
          {
            text: '目录结构',
            link: '/chrome-extension/catalogue/',
          },
        ],
      },
    ],
  },
  {
    text: '地图',
    children: [
      {
        text: '四维图新',
        link: '/minemap/prepare/',
      },
    ],
  },
];
