---
title: 枣庄分支
date: 2024-01-24
permalink: /branch-differences/ivdg/zaozhuang
---

# 枣庄分支 

枣庄分支项目差异 `master-zaozhuang`

## 地图差异

### mapConfig.json

服务器上 `html/json/mapConfig.json` 文件中更改了配置项

![map-config](/images/branch-differences/ivdg/zaozhuang-mapConfig.png)

#### 原始json

::: details 点击查看

```json
{
  "mapOpts": {
    "minZoom": 5,
    "defaultZoom": 5,
    "maxZoom": 11,
    "centerPoint": [1.1713879905785e7, 4339220.81197592],
    "restrictedExtent": [
      5513366.366431, 396293.14491343, 1.7914393445139e7, 8282148.4790384
    ],
    "projection": "EPSG:900913"
  },
  "vectorLayer": [
    {
      "layerName": "chinaGaodeVectorDemo",
      "layerType": "NPMapLib.Layers.GaoDeLayer",
      "layerOpt": {
        "url": [
          "/netposa/NPGIS/services/chinaGaodeVectorDemo/MapServer/getGaodeVectorTile"
        ],
        "isBaseLayer": true
      }
    },
    {
      "layerName": "chinaGaodeVectorDemoLabel",
      "layerType": "NPMapLib.Layers.GaoDeLayer",
      "layerOpt": {
        "labelUrl": [
          "/netposa/NPGIS/services/chinaGaodeVectorDemo/MapServer/getGaodeVectorTileLabel"
        ],
        "isBaseLayer": false,
        "isVectorTile": false,
        "isVectorLayer": true,
        "layerInfo": {
          "centerPoint": [1.1713879905785e7, 4339220.81197592],
          "defaultZoom": 5,
          "fullExtent": [
            -2.003750834e7, -2.003750834e7, 2.003750834e7, 2.003750834e7
          ],
          "layerType": "gaodeVector",
          "maxZoom": 11,
          "minZoom": 5,
          "projection": "900913",
          "restrictedExtent": [
            5513366.366431, 396293.14491343, 1.7914393445139e7, 8282148.4790384
          ],
          "type": "json",
          "zoomLevelSequence": "2"
        }
      }
    }
  ],
  "sattilateLayer": []
}

```

:::

#### 修改之后

::: details 点击查看

``` json {13-40}

{
  "mapOpts": {
    "minZoom": 5,
    "defaultZoom": 5,
    "maxZoom": 17,
    "centerPoint": [117.135354, 36.192084],
    "restrictedExtent": [
      5513366.366431, 396293.14491343, 1.7914393445139e7, 8282148.4790384
    ],
    "projection": "EPSG:900913"
  },
  "vectorLayer": [
    {
      "layerName": "china",
      "layerType": "NPMapLib.Layers.NPLayer",
      "layerOpt": {
        "url": "http://56.65.8.70:7783/arctiler/rest/services/mapserver/gaode-road",
        "isBaseLayer": true,
        "isVectorTile": true,
        "isVectorLayer": true,
        "layerInfo": {
          "centerPoint": [1.1713879905785e7, 4339220.81197592],
          "defaultZoom": 5,
          "fullExtent": [
            -2.003750834e7, -2.003750834e7, 2.003750834e7, 2.003750834e7
          ],
          "layerType": "gaode",
          "maxZoom": 17,
          "minZoom": 5,
          "projection": "900913",
          "restrictedExtent": [
            5513366.366431, 396293.14491343, 1.7914393445139e7, 8282148.4790384
          ],
          "type": "png",
          "zoomLevelSequence": "2"
        }
      }
    }
  ],
  "sattilateLayer": []
}

```
:::

### Init.js

地图 `sdk` 差异，修改 `public/js/npgis/1.0.4.0/Init.js`

![map-init](/images/branch-differences/ivdg/zaozhuang-init.png)

#### 修改调用地址传入参数

`OpenLayers.Layer.gaode = OpenLayers.Class(OpenLayers.Layer.TMS` 搜索此段代码

1) 第一处差异

![map-init](/images/branch-differences/ivdg/zaozhuang-init-1.png)

2) 第二处差异

![map-init](/images/branch-differences/ivdg/zaozhuang-init-2.png)

3) 第三处差异

![map-init](/images/branch-differences/ivdg/zaozhuang-init-3.png)

4) 第四处差异

![map-init](/images/branch-differences/ivdg/zaozhuang-init-4.png)