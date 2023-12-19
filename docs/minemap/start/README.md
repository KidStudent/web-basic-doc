---
title: 快速开始
date: 2023-11-20
permalink: /minemap/start/
---

# 快速开始

本章介绍如何基于 MineMap for 3D Ultra API 进行地图应用的开发

## 加载 API 文件

在 index.html 中

```html
<link rel="stylesheet" href="<!--UrlConfig.3dMixApiUrl-->/minemap.css" />
<!-- 地图编辑器 -->
<link rel="stylesheet" href="<!--UrlConfig.3dMixApiUrl-->/minemap-plugins/edit/minemap-edit.css" />
<script src="<!--UrlConfig.3dMixApiUrl-->/minemap.js"></script>
<!-- 地图编辑器 -->
<script src="<!--UrlConfig.3dMixApiUrl-->/minemap-plugins/edit/minemap-edit.js"></script>
<!-- 地图角度距离相关 -->
<script src="<!--UrlConfig.3dMixApiUrl-->/minemap-CDN/turf/turf.min.js"></script>
<!-- 提供了地理位置相关的计算功能 -->
<script src="<!--UrlConfig.3dMixApiUrl-->/minemap-plugins/2d-util/minemap-util.js"></script>
```

## local-config.json 地图相关配置

在 `public/local-config.json` 中配置地图默认全局参数

```json
  "MapConfig": {
    "domainUrl": "https://minemap.minedata.cn", //MineMap根域名地址
    "dataDomainUrl": "https://minemap.minedata.cn", //MineMap矢量数据服务根域名地址
    "serverDomainUrl": "https://sd-data.minedata.cn", //MineMap矢量数据服务新规范根域名地址
    "spriteUrl": "https://minemap.minedata.cn/minemapapi/v3.4.0/sprite/sprite", //MineMap底图雪碧图地址
    "serviceUrl": "https://service.minedata.cn/service", //MineMap后台服务根地址
    "satelliteUrl": "https://services.minedata.cn/service/data/satellite?x={x}&y={y}&z={z}", //矢量图层地址
    "tilesUrl": [
      {
        "name": "osgb1_cennavi",
        "url": "https://minedata.cn/nce-static/support/assets/models/610100/tileset.json"
      }
    ], // 3D倾斜摄影地址
    "key": "5534790da9764e12bb8f6d3e0d815d7b", // 使用须知-前期准备-申请的key
    "solution": 11003, //地图方案
    "style": "https://service.minedata.cn/map/solu/style/", //球面矢量底图样式
    "center": [120.467807, 32.532721], //中心点位
    "zoom": 14, //地图默认缩放等级
    "pitch": 57, //地图俯仰角度
    "maxZoom": 17, //地图最大缩放等级
    "minZoom": 3, //地图最小缩放等级
    "projection": "MERCATOR" //地图坐标系
  }
```

地图的默认参数系统登录之后会初始化到 `pinia` 中，具体见 `stores/modules/common` 中的 `localConfig.MapConfig`