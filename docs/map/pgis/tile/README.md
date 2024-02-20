---
title: 瓦片地址更改
date: 2023-12-04
permalink: /pgis/tile/
---

# 瓦片地址更改

接入其他厂商的瓦片地址

由于我们地图图层不是最新或不够详细需要换成其他第三方地图厂商提供的瓦片地址，举个 :chestnut:

需要换成的地址为 `http://56.65.8.70:7783/arctiler/rest/services/mapserver/gaode-road/{z}/{x}/{y}`

由于我们地图的正常请求 `图片类型` 切片地址为 `http://192.168.1.120:7777/netposa/NPGIS/services/china/MapServer/getGaodeVectorTile?&L=7&Z=7&Y=52&X=100&imgCache=false`

和第三方的区别为 `地址不同`、`请求参数不同` 所以要修改 `请求地址` 以及 `发送的参数`

## 更改 mapConfig.json

服务器上 `html/json/mapConfig.json` 文件中更改配置项

![map-config](/images/branch-differences/ivdg/zaozhuang-mapConfig.png)

### 原始json

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

### 修改之后

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
      "layerType": "NPMapLib.Layers.NPLayer", // *普通图层
      "layerOpt": {
        "url": "http://56.65.8.70:7783/arctiler/rest/services/mapserver/gaode-road", // *第三方地图提供的瓦片地址
        "isBaseLayer": true, // *基础图层
        "isVectorTile": true, // *栅格瓦片
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
          "type": "png", // *图片类型
          "zoomLevelSequence": "2"
        }
      }
    }
  ],
  "sattilateLayer": []
}

```
:::

## Init.js

地图 `sdk` 修改 `public/js/npgis/1.0.4.0/Init.js`

![map-init](/images/branch-differences/ivdg/zaozhuang-init.png)

### 修改调用地址传入参数

`OpenLayers.Layer.gaode = OpenLayers.Class(OpenLayers.Layer.TMS` 搜索此段代码

1) 第一步 修改拼写参数的 `?` 为 `/`

![map-init](/images/branch-differences/ivdg/zaozhuang-init-1.png)

1) 第二步 修改 `?&L=7&Z=7&Y=52&X=100&imgCache=false` 为 `/{z}/{x}/{y}`

![map-init](/images/branch-differences/ivdg/zaozhuang-init-2.png)

3) 第三步 删除请求地址中拼接的 `/getTile?`

![map-init](/images/branch-differences/ivdg/zaozhuang-init-3.png)

4) 第四步 删除移动时请求地址拼接的参数

![map-init](/images/branch-differences/ivdg/zaozhuang-init-4.png)