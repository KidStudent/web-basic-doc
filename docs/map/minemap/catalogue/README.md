---
title: 目录结构
date: 2023-11-20
permalink: /minemap/catalogue/
---

# 目录结构

```
├── public
│    ├── local.config.json  # 包含地图全局参数配置的文件
│    │
├── src
│    │
│    ├── components
│    │    ├── minemap  # minemap 组件目录
│    │    │   ├── popup  # minemap 地图弹框组件目录
│    │    │   │   ├── message-popup  # minemap 地图普通信息弹框组件
│    │    │   │   ├── warning-popup  # minemap 地图报警弹框组件
│    │    │   │   │
│    │    │   ├── tool  # minemap 地图工具框选组件
│    │    │   │   │
│    │    │   ├── index  # minemap 地图主组件  
│    │    │   │   │
│    ├── map
│    │    ├── minemap  # minemap 主目录
│    │    │   ├── factory  # minemap 工厂函数
│    │    │   │   │   ├── edit.factory  # 地图编辑器工厂
│    │    │   │   │   ├── fence.factory  # 围栏几何体工厂
│    │    │   │   │   ├── image.factory  # 地图图片加载工厂
│    │    │   │   │   ├── layer.factory  # 图层工厂
│    │    │   │   │   ├── source.factory  # 点位工厂
│    │    |   |   |   |
│    │    │   ├── util  # minemap 扩展
│    │    │   │   ├── layerUtil  # minemap 图层默认配置参数
│    │    │   │   ├── staticUtil  # minemap 静态资源引入
│    │    │   │   │
│    │    │   ├── map.main  # minemap 主方法
```
