---
title: map.main
date: 2023-12-04
permalink: /minemap/main/
---

# 地图核心方法

本章介绍 `main.map.js` 中的内容

## constructor

初始化 `map` 类时，传入配置合并到 `minemap` 类中

::: details 点击查看

```javascript

constructor({
  domainUrl,
  dataDomainUrl,
  serverDomainUrl,
  spriteUrl,
  serviceUrl,
  key,
  solution,
  mapDomId,
  style,
  center,
  zoom,
  pitch,
  bearing,
  minZoom,
  maxZoom,
  projection,
}) {
  Object.assign(minemap, {
    domainUrl,
    dataDomainUrl,
    serverDomainUrl,
    spriteUrl,
    serviceUrl,
    key,
    solution,
  });
  if (!mapDomId) {
    console.error('请传入要加载的地图domId');
    return;
  }
  this.mapDomId = mapDomId;
  this.mapStyle = style + solution;
  this.mapCenter = center;
  this.mapZoom = zoom;
  this.mapPitch = pitch;
  this.mapBearing = bearing;
  this.minZoom = minZoom;
  this.maxZoom = maxZoom;
  this.mapProjection = projection;
}

```

:::

## 加载地图

初始化加载地图，在地图载入后，加载图片资源，载入地图编辑器、测距以及面积工具、数据源、图层、围栏到 `map` 类上

::: details 点击查看

```javascript

init(loadCallBack) {
    this.map = new minemap.Map({
      container: this.mapDomId,
      style: this.mapStyle,
      center: this.mapCenter,
      zoom: this.mapZoom,
      pitch: this.mapPitch,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      projection: this.mapProjection,
    });
    this.map.on('load', () => {
      this.ImageFactory = new ImageFactory(this.map);
      this.EditFactory = new EditFactory(this.map);
      /**
       * 测距以及测面积工具
       * @example
       *      (1) new minemaputil.RangingTool(map); // 默认配置
       *      (2) new minemaputil.RangingTool(map,{type:0, color: 'yellow',startLabelText: '起始点'}); // 自定义配置
       * @param {Map} map 地图对象
       * @param {Object} opts 配置对象
       * @param {Number} opts.type 测量种类： 0为测距， 1为测面积
       * @param {String} opts.color 线条颜色
       * @param {String} opts.startLabelText 起始点label
       * @param {String} opts.unit 单位 'km' or 'm' 默认'km'
       * @param {Number} opts.decimals 保留小数 默认为 2
       * @param {String} opts.clearText 清除的显示文本，默认为清除
       */
      this.rangingTool = new minemaputil.RangingTool(this.map, {
        // type: 0, // 默认为 0
        unit: 'km',
        decimals: 2,
      });
      this.ImageFactory.loadImageSuccess(() => {
        this.SourceFactory = new SourceFactory(this.map, this.sources);
        this.LayerFactory = new LayerFactory(this.map, this.layers, this.SourceFactory);
        this.FenceFactory = new FenceFactory(this.map);
        loadCallBack && loadCallBack();
      });
    });
  }

```

:::

## Maker

::: details 点击查看

```javascript

/**
 * 加载单个点位到地图上
 * 此方法适用于加载单个图标 不适合加载多个图标
 * @param {*} markerDom
 * @param {*} clickFun 此点位的点击事件
 * ***点击事件也可在传入dom之前在组件中自由绑定即可
 */
addMarker(markerDom = {}, markerOption = {}) {
  const defaultMarkerDom = {
    el: document.createElement('div'), //可以将自定义的DOM元素给element字段
    id: 'marker',
    style: {
      backgroundImage:
        'url(//minedata.cn/nce-static/support/demo/js-3d-api/zh/images/park-blue2x.png)',
      backgroundSize: 'cover',
      width: '24px',
      height: '38px',
      borderRadius: '20%',
    }, //marker的样式
    lnglat: this.map.getCenter(),
    clickFun: () => {},
  };

  const dom = { ...defaultMarkerDom, ...markerDom };
  const hasMarker = this.markers.find((marker) => marker._element.id === dom.id);
  if (hasMarker) {
    throw new Error(`已存在id为${dom.id}的marker`);
  }

  dom.el.id = dom.id;
  Object.assign(dom.el.style, dom.style);

  const defaultMarkerOption = {
    offset: [0, 0], //相对于其左上角偏移像素大小
    draggable: false, //可以在初始化的时候决定是否可以拖拽
    anchor: 'top-left', //锚点位置(默认值"top-left")，可选值有`'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`
    color: 'red', //默认marker标记的颜色
    rotation: 0, //marker的旋转角度，以锚点作为旋转中心点，顺时针为正
    pitchAlignment: 'auto', //倾斜对齐参数(默认值是‘auto’)，此值决定marker标记是贴在地图平面上，还是立在地图平面上，当值为`map`时，marker标记贴在地图平面上，当值为`viewport`时，marker标记立在地图平面上，当值为 `auto`时，会根据 `rotationAlignment`参数的值，自动决定.
    rotationAlignment: 'auto', //旋转对齐参数(默认值是‘auto’)，此值决定地图在旋转的时候，marker标记是否跟随旋转，当值为`map` 时，marker标记会固定在地图平面上，不会跟随地图的旋转而旋转；当值为`viewport`时，marker标记会跟随地图的旋转而旋转，保持正向面对观察者；当值为`auto`时，相当于值`viewport`.
    scale: 1, //只有默认标记有这个参数，将默认标记放大1.5倍
  };

  const option = { ...defaultMarkerOption, ...markerOption };

  if (dom.clickFun) {
    dom.el.addEventListener('click', dom.clickFun);
  }

  // Marker构造函数接收两个参数，一个为自定义的DOM元素，一个是Object参数，其中包括偏移量等
  // 调用setLngLat方法指定Marker的坐标位置
  const marker = new minemap.Marker(dom.el, option).setLngLat(dom.lnglat).addTo(this.map);
  this.markers.push(marker);
  console.log(marker, 'marker');
  return marker;
}

removeMarker(markerId) {
  const markerIndex = this.markers.findIndex((marker) => marker._element.id === markerId);
  if (markerIndex !== -1) {
    this.map.removeMarker(this.markers[markerIndex]);
    this.markers.splice(markerIndex, 1);
  } else {
    console.error(`没有找到id为${markerId}的marker`);
  }
}

```

:::


## Popup

::: details 点击查看

```javascript

createPopup(popupId, popupOption = {}, lnglat, popEl) {
  if (!popupId || !(typeof popupId === 'string' || typeof popupId === 'number')) {
    console.error('创建popup必须传入字符串类型的id');
    return;
  }
  const popupDefaultOption = {
    closeButton: false, //如果“true”，则弹出窗口的右上角会出现一个关闭按钮
    closeOnClick: true, //如果“true”，则单击地图时弹出窗口将关闭。
    closeOnMove: true, //如果“true”，则地图移动时弹出窗口将关闭。
    offset: [0, 0], //位置的像素偏移
    className: 'map-popup',
  };
  const option = { ...popupDefaultOption, ...popupOption };
  const popup = new minemap.Popup(option).addTo(this.map);
  if (lnglat) {
    popup.setLngLat(lnglat);
  }
  if (popEl) {
    popup.setDOMContent(popEl);
  }
  this.popups.push({ id: popupId, ...popup });
  return popup;
}

removePopup(popupId) {
  const popupIndex = this.popups.findIndex((popup) => popup.id === popupId);
  if (popupIndex !== -1) {
    this.popups[popupIndex].remove();
    this.popups.splice(popupIndex, 1);
  } else {
    console.error(`没有id为${popupId}的弹框`);
  }
}

popupSetContent(popup, text, lnglat) {
  popup.setText(text).setLngLat(lnglat);
}

popupSetLngLat(popup, lnglat) {
  popup.setLngLat(lnglat);
}

markerSetPopup(marker, popup) {
  marker.setPopup(popup).togglePopup();
}

```

:::

## Layer

::: details 点击查看

```javascript

addLayer(data = [], layerOption = {}) {
  if (data.length === 0) {
    console.error('请传入要加载的点位列表');
    return;
  }
  this.LayerFactory.addLayer(data, layerOption);
}

getLayer(layerId) {
  return this.LayerFactory.getLayer(layerId);
}

// 根据数据加载图层
changeLayerByData(layerId, pointData) {
  this.LayerFactory.changeLayerByData(layerId, pointData);
}

// 添加热力图层
addHeatLayer(data = [], layerHeatOption = {}) {
  this.LayerFactory.addHeatLayer(data, layerHeatOption);
}

// 添加栅格图层
addRasterLayer(tiles, layerRasterOption = {}) {
  this.LayerFactory.addRasterLayer(tiles, layerRasterOption);
}

// 添加建筑图层
addExtrusionLayer(data = [], layerExtrusionOption = {}) {
  this.LayerFactory.addExtrusionLayer(data, layerExtrusionOption);
}

removeSource(sourceId) {
  this.SourceFactory.removeSource(sourceId);
  const index = this.sources.findIndex((id) => id === sourceId);
  if (index !== -1) {
    this.sources.splice(index, 1);
  }
}

removeLayer(layerId) {
  this.LayerFactory.removeLayer(layerId);
  const index = this.layers.findIndex((layer) => layer.id === layerId);
  if (index !== -1) {
    this.layers.splice(index, 1);
  }
}

showLayer(layerId) {
  this.LayerFactory.showLayer(layerId);
}

hideLayer(layerId) {
  this.LayerFactory.hideLayer(layerId);
}

```

:::

## Edit

::: details 点击查看

```javascript

// 添加编辑池中的数据
addFeatures(feature) {
  this.EditFactory.addFeatures(feature);
}

// 设置编辑池中的数据
setFeatures(features) {
  this.EditFactory.setFeatures(features);
}

getAllFeatures() {
  return this.EditFactory.getAllFeatures();
}

deleteFeature(ids) {
  this.EditFactory.deleteFeature(ids);
}

// 删除编辑池中的所有数据
delAllFeatures() {
  this.EditFactory.delAllFeatures();
}

// 指定图形id编辑功能开关
setLockByIds(featureId, isLock = false) {
  this.EditFactory.setLockByIds(featureId, isLock);
}

// 图形自定义预设样式
ctrlActive(featureType, styleOptions) {
  this.EditFactory.ctrlActive(featureType, styleOptions);
}

```

:::

## Fence

::: details 点击查看

```javascript

addFence(
  fenceParmas = {
    id: 'fenceId',
    fencePositions: [
      120.465828, 32.533069, 120.468515, 32.534381, 120.46998, 32.532282, 120.467324, 32.530908,
      120.465828, 32.533069,
    ],
    fenceMaximumHeight: 30,
    imgUrl: '',
    textureOption: {},
    allowPick: true,
  },
) {
  const createFenceGeometry = this.FenceFactory.createFenceGeometry(
    fenceParmas.fencePositions,
    fenceParmas.fenceMaximumHeight,
  );
  const createFenceMaterial = this.FenceFactory.createFenceMaterial(
    fenceParmas.imgUrl,
    fenceParmas.textureOption,
  );
  this.FenceFactory.createPrimitive(
    fenceParmas.id,
    createFenceGeometry,
    createFenceMaterial,
    fenceParmas.allowPick,
  );
  this.primitives.push(fenceParmas.id);
}

removePrimitiveById(id) {
  this.FenceFactory.removePrimitiveById(id);
}

```

:::

## 3DTiles

::: details 点击查看

```javascript

// 3DTiles 摄影加载
addSceneTilesComponent({ id, urls, minZoom, maxZoom, sourceLoaded }) {
  this.map.addSceneComponent({
    id: id,
    type: '3d-tiles',
    urls: urls, // 要加载的数据
    // translation: new minemap.Math.Vector3(0, 0, 0),
    // show: true,
    // skipLevelOfDetail: true, //跨层调度
    // maximumScreenSpaceError: 8,
    // useMipmap: true, //提升模型渲染质量，损失性能，3d-tiles 默认为 false
    // opacity: 0.9, // 透明度 0-1
    minzoom: minZoom,
    maxzoom: maxZoom,
    sourceLoaded: (config) => {
      console.log(config, '倾斜摄影加载成功-config');
      sourceLoaded && sourceLoaded();
    },
  });
}

//删除sceneComponent对象
removeSceneComponent(id) {
  this.map.removeSceneComponent(id);
}

```

:::

## 地图方法

::: details 点击查看

```javascript

turnOn(callback) {
  if (this.rangingTool) {
    // 开启测距
    this.rangingTool.turnOn();
    // 结束测距回调
    this.rangingTool.end = (res) => {
      console.log(res);
      callback && callback();
    };
  }
}

turnOff() {
  if (this.rangingTool) {
    this.rangingTool.turnOff();
  }
}

/**
 *
 * @param {String} eventName
 * @param {Function} eventFun
 */
addEvent(eventName, eventFun) {
  this.map.on(eventName, eventFun);
}

/**
 * 查询地图上渲染的矢量要素和三维模型要素 用来处理图层的点击事件，鼠标移入事件等
 * @param {*} point
 * @param {*} option { layers: [string] }
 */
queryRenderedFeatures(point, option) {
  return this.map.queryRenderedFeatures(point, option);
}

// 得到地图的canvas元素 用来处理鼠标样式
getCanvas() {
  return this.map.getCanvas();
}

clearAllPopup() {
  this.popups.forEach((popup) => {
    popup.remove();
  });
  this.popups.length = 0;
}

clear() {
  this.markers.forEach((marker) => {
    marker.remove();
  });
  this.markers.length = 0;
  this.popups.forEach((popup) => {
    popup.remove();
  });
  this.popups.length = 0;
  this.layers.forEach((layer) => {
    this.LayerFactory.removeLayer(layer.id);
  });
  this.layers.length = 0;
  // source必须在layer移除之后否则会有警告
  this.sources.forEach((sourceId) => {
    this.SourceFactory.removeSource(sourceId);
  });
  this.sources.length = 0;
  this.primitives.forEach((primitiveId) => {
    this.FenceFactory.removePrimitiveById(primitiveId);
  });
  this.primitives.length = 0;
  this.delAllFeatures();
}

getCenter() {
  return this.map.getCenter();
}

setCenter(lnglat = []) {
  this.map.setCenter(lnglat);
}

setZoom(zoom) {
  this.map.setZoom(zoom);
}

setStyle(style) {
  this.map.setStyle(style);
}

getPitch() {
  return this.map.getPitch();
}

/**
 * * flyTo方法，采用立即变换的形式进行中心点、缩放级别、旋转角、倾角的改变
 *
 * 参数项说明：
 * center：表示飞行结束后的地图中心坐标值；
 * zoom：表示飞行结束后的地图缩放等级；
 * bearing：表示飞行结束后的地图旋转等级；
 * pitch：表示飞行结束后的地图倾斜等级；
 * duration：表示飞行时长，单位为毫秒；
 * @param {*} options
 */
flyTo(options) {
  this.map.flyTo(options);
}

destoryMap() {
  if (this.map) {
    this.map.remove();
    this.map = null;
  }
}

/**
 * 计算两个点位之间的 kilometers/miles/radians/degrees
 * @param {*} coord1
 * @param {*} coord2
 * @param {*} units units的参数为kilometers/miles/radians/degrees，默认为kilometers
 * @returns
 */
calculationResult(coord1, coord2, units = 'kilometers') {
  const options = { units: units }; //units的参数为kilometers/miles/radians/degrees，默认为kilometers
  const distance = turf.distance(turf.point(coord1), turf.point(coord2), options);
  return distance;
}

/**
 * 从北向南的方位角（十进制度数），范围在 -180 到 180 度之间（顺时针方向）
 * @param {*} coord1
 * @param {*} coord2
 * @returns
 */
bearingResult(coord1, coord2) {
  const bearing = turf.rhumbBearing(coord1, coord2);
  return bearing;
}

// 计算中心点
centroid(feature) {
  const point = turf.centroid(feature);
  return point;
}

```

:::