---
title: 地图图层加载
date: 2023-11-20
permalink: /minemap/layer-load/
---

# 地图图层加载

本章介绍地图组件中各种图层的加载。

## 基础用法

:::demo
map/minemap/init
:::

## 加载普通点位

加载普通图标到地图上

`point-normal-list` 是传入的普通点位列表，`title` 代表鼠标移入需要显示的名称，`icon` 为需要展示的图标

:::warning 注意
加载到地图上的 `icon` 首先需要在 `staticUtil` 文件中引入载入地图中
:::

`move-call-back` 是传入的鼠标移动触发的方法需要配合 `add-event-layer` 一起使用

`add-event-layer` 是传入的需要添加事件的具体图层

`@createNormalPopup` 是地图组件中创建普通信息弹框后抛出的事件，配合鼠标移入时展示信息使用

:::demo
map/minemap/normal
:::

## 加载区域范围的点位

地图组件内部使用 `message-pupup.vue` 组件来加载点位信息弹框

`pointBuildList` 是传入的标记范围的点位列表，`title` 是要展示的信息的头部

`icon` 是点位颜色包含 `redPoint`、`bluePoint` 和 `greenPoint` 三种已经内置到地图组件中

`getMessagePopupBg` 是信息弹框背景色一般来说和 `icon` 的颜色保持一致

可以通过点位的某个字段来规定颜色，同样已经内置到地图组件中。共三种 `red`、`blue` 和 `green`

:::demo
map/minemap/building
:::

## 加载地图围栏

`map2D3D` 为地图俯视角度，当为 `2D` 时展示的是 [edit](https://minedata.cn/nce-support/demoCenter?activePath=page-data-add)，当为 `3D` 时展示的是 [fence](https://minedata.cn/nce-support/demoCenter-3D-Ultra?activePath=page-fence-geometry)

`map-edit-data` 是传入的加载区域范围的点位列表，`geometry` 是需要展示的范围的坐标区域，`type` 是区域类型默认为 `Feature`

`properties` 为 `2D` 模式时区域范围的边框颜色，填充色，可否编辑等，一般来说颜色与 `fenceImgUrl` 保持一致

`fenceImgUrl` 为 `3D` 模式时围栏的颜色取值

:::demo
map/minemap/fence
:::

## 加载报警点位

地图组件内部使用 `warning-popup.vue` 组件来加载点位报警信息弹框

`alarm-point-list` 为报警点位列表，`messageType` 是用来区分人脸和车辆报警信息

`@closeWarningPopup` 为关闭报警后所需要处理的方法
 
:::demo
map/minemap/alarm
:::