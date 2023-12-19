---
title: 目录结构
date: 2022-11-10
permalink: /guide/catalogue/
---

文档目录结构

```
├── .vscode  # IDE 工具推荐配置文件
│   │   ├── extensions.json  # 一键安装平台推荐的 vscode 插件
│   │   ├── settings.json  # 设置扩展程序或 vscode 编辑器的一些属性
│   │   └── vue.code-snippets  # vue3.2 代码片段
├── build  # 构建工具
│   │   ├── plugins.js  # vite 相关插件存放处
├── node_modules  # 模块依赖
├── public  # 静态资源
│   │   ├── logo.png  # favicon
├── src
│   ├── assets  # 字体、图片等静态资源
│   │   ├── configureIcons # 目录字体图标
│   │   ├── font # 项目字体图标
│   │   ├── img # 项目图片，请根据不同模块文件夹放入
│   ├── components  # 自定义通用组件
│   │   ├── author-poptip  # 鉴权弹框
│   │   ├── layout-content  # 主显示页面
│   │   ├── nav-header  # 头部导航栏
│   │   ├── nav-left  # 侧边导航栏
│   │   ├── ui-avater  # 头像组件
│   │   ├── ui-menu  # 菜单组件
│   │   ├── ui-menu-tabs  # 菜单标签页组件
│   │   ├── regisiterGlobComp.js  # 注册全局组件
│   ├── config  # 配置文件
│   │   ├── api  # 接口地址，请根据不同模块放入不同文件中
│   │   ├── http  # axios配置文件
│   ├── hooks  # 公用方法
│   │   ├── component  # 组件公用方法
│   │   ├── event  # 浏览器公用方法
│   │   ├── web  # 页面公用方法
│   ├── router  # 路由配置
│   │   ├── asyncRouter.js  # 组装动态路由
│   │   ├── guard.js  # 路由导航守卫
│   │   ├── index.js  # 路由主页面
│   ├── stores  # pinia 状态管理
│   │   ├── modules  # 根据不同模块区分
│   │   |      ├── common.js # 通用状态
│   │   |      ├── examplesRoutes.js # 组件例子路由
│   │   |      ├── permission.js # 权限路由状态
│   │   |      ├── tabs.js # 菜单标签页
│   │   |      ├── user.js # 用户信息状态
│   │   |      ├── websocket.js # websocket状态
│   │   |      ├── ...
│   │   ├── index.js  # pinia主页面
│   ├── style  # 全局样式
│   │   ├── themes  # 皮肤样式配置文件
│   │   ├── common.scss  # 通用样式文件
│   │   ├── handle.scss  # 处理皮肤样式文件
│   │   ├── index.scss  # 主样式文件
│   │   ├── reset.scss  # 全局重置样式文件
│   │   ├── resetui.scss  # 全局覆盖 iview 库样式文件
│   │   ├── ...
│   ├── utils  # 全局工具方法
│   │   ├── module
│   │   |      ├── common.js # 全局公用方法，深拷贝，树结构数据组装等
│   │   |      ├── doEcharts.js # 全局echarts配置方法
│   │   |      ├── system.js # 全局system公用方法，install等
│   │   ├── index.js  # 引入所有模块js
│   ├── views  # 存放编写业务代码页面
│   ├── App.vue  # 入口页面
│   ├── main.ts  # 入口文件
├── .env.development  # 开发环境变量配置
├── .gitignore  # git 提交忽略文件
├── index.html  # html 主入口
├── package.json  # 依赖包管理以及命令配置
├── pnpm-lock.yaml  # 依赖包版本锁定文件
├── postcss.config.js  # postcss 插件配置
├── README.md  # README
└── vite.config.ts  # vite 配置

```
