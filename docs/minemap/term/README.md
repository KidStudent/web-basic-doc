---
title: 术语说明
date: 2023-11-17
permalink: /minemap/term/
---

# 术语说明

## MineMap for 3D Ultra API 的基本要素

使用 MineMap for 3D Ultra API 创建的地图的[基本要素](https://minedata.cn/nce-support/webDev/MineMap-3D-Ultra?type=term)有：

### 地图容器 Container

即在准备阶段所创建的指定了 id 的 div 对象，这个 div 将作为承载地图显示、地图控件的容器。

### 矢量图层 vectorLayer

矢量图层是指能够在视觉上覆盖一定地图范围，用来描述部分区域内的地图要素的可视化渲染，一幅地图通常由一个或者多个图层组成。

MineMap for 3D Ultra API 在 3.0 的基础上还提供了三维建筑物、热力图、动态粒子等图层渲染接口，基于矢量地图数据就能绘制完整的全国一张图。

### 栅格图层 rasterLayer

MineMap for 3D Ultra API 提供了栅格图层渲染接口，可以绘制卫星影像、山体阴影图、自己开发的瓦片图、DEM 等。

### 数据源 Source

MineMap for 3D Ultra API 将数据供给和图层渲染做了解耦，数据源用于定义底层数据的数据格式和加载方式，基于数据源请求的数据内容，不同的图层将其中全部或部分数据进行可视化渲染，以此完成整张地图的绘制。

### 3D 模型 3d-model

MineMap for 3D Ultra API 实现了各种三维模型的加载，支持三维模型的室内室外一体化渲染以及相关自定义操作。

### 3D 瓦片 3d-tiles

MineMap for 3D Ultra API 实现了大规模三维场景的按需加载，支持大数据量的 3dtiles 模型的高性能加载。

### 点标记 Marker

点标记是用来标示某个位置点信息的一种地图要素，覆盖于图层之上，其在屏幕上的位置会随着地图的缩放和中心变化而发生改变，但是会与图层内的要素保持相对静止。

MineMap for 3D Ultra API 中的 Marker 最终的呈现形式是 DOM 元素，支持将自定义 DOM 元素作为展示内容，支持 Marker 内部元素的自定义事件绑定，而且还支持 Marker 与信息窗体的绑定。

### 信息窗体 Popup

信息窗体是用来描述某个位置点详细信息的一种地图要素，覆盖于图层之上，支持位置点的偏移调整和信息的屏幕显示方向调整。

MineMap for 3D Ultra API 中的 Popup 最终的呈现形式是 DOM 元素，支持将自定义 DOM 元素作为展示内容，支持 Popup 内部元素的自定义事件绑定。

### 地图控件 Controls

地图控件浮在所有图层和地图要素之上，用于满足一定的交互或提示功能，最终的呈现形式是 DOM 元素，一般相对于地图容器静止，不随着地图缩放和中心变化而发生位置的变化。

MineMap for 3D Ultra API 提供了很多常用的地图控件，如比例尺控件、地图缩放控件。

## 常用术语

### 地图级别 ZoomLevel

级别与地图的比例尺成正比，每增大一级，地图的比例尺也增大一倍，地图显示的越详细。MineMap 地图的最小级别为 1 级，最大级别默认为 19 级。

### 经纬度 LngLat

坐标通常指经纬度坐标，MineMap 地图的坐标范围大致为：东西经 180 度（-180——180，西半球为负，东半球为正），南北纬 85 度（-85——85，北半球为正，南半球为负）。

### 底图样式 Style

MineMap 底图样式为通过 MineMap 操作台配置好的地图，MineMap 内置了很多不同风格的底图模板，基于底图模板可以快速进行地图的创建。

MineMap 底图样式的最终形态为一套样式文件，以服务的形式提供，如：

```text
//mineservice.minedata.cn/service/solu/style/id/12877
```

### 地图要素 Feature

严格意义的地图要素指的是展示在地图上的地理要素，包括道路、区域面、建筑、POI 标注、路名等。开发者自定义的 geojson 数据也可以看做是一种地图要素。

### 投影 Projection

地图投影指的是将地球球面的经纬度坐标映射到地图平面坐标的变换和映射关系，MineMap 地图使用 Web 墨卡托投影，也支持经纬度投影。

### 三维模型

glTF：Graphics Language Transmission Format（图形语言传输格式），为通用的三维数据格式，包含场景、节点、材质、二进制数据等内容。
glb：GLB 文件格式是 glTF 的二进制形式，它包含纹理，而不是将它们作为外部图像引用。GLB 是作为 GLTF1.0 的扩展引入的，并直接并入 GLTF2.0。