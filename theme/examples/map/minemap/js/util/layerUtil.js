// 聚合图层颜色配置
const outerColors = [
  [1000, 'rgba(253, 156, 115, 0.6)'],
  [100, 'rgba(241, 211, 87, 0.6)'],
  [0, 'rgba(181, 226, 140, 0.6)'],
];

const innerColors = [
  [1000, 'rgba(241, 128, 23, 0.6)'],
  [100, 'rgba(240, 194, 12, 0.6)'],
  [0, 'rgba(110, 204, 57, 0.6)'],
];

// 图层默认配置
const layerDefaultOption = {
  id: 'layerId',
  type: 'symbol',
  /**
   * fill球面面图层，line球面线图层，symbol球面图标图层，circle球面圆图层，heatmap热力图图层，
      extrusion建筑物图层，tracking历史实时轨迹图层，raster球面栅格图层，
      sprite球面动态路况粒子图层，
      symtracking车辆跟踪图层，histogram柱状图图层，3d-model三维模型图层，3d-tiles三维金字塔模型图层，
      background背景图层
   */
  source: 'pointSource', //数据源的唯一标识
  layout: {
    'text-field': '{title}',
    'text-size': 14,
    'text-pitch-alignment': 'viewport',
    'icon-image': '{icon}',
    'icon-pitch-alignment': 'viewport',
    'icon-anchor': 'bottom',
    'icon-size': 0.4,
    visibility: 'visible', //值为“visible”表示该图层显示，为“none”表示隐藏该图层
  },
  paint: {
    'icon-color': '#ff0000',
    'text-color': '#fff',
  },
  minzoom: 1,
  maxzoom: 17.5,
  cluster: false, //是否是聚合图层
  filter: ['!has', 'point_count'],
  /**
   * fliter表示从所有图层过滤出特定特征的图层，有以下几种过滤形式：
      a)	存在过滤：
      计算形式：[way, key]
      存在过滤主要有“has”、“!has”两种形式。
      例：
      ["has", "count"]，表示过滤出存在属性"count"的所有的图层。
      ["has","count"]，表示过滤出不存在属性"count"的所有的图层。
      b)	比较过滤
      计算形式：[way, key, value]
      比较过滤主要有等于“= =”、大于“>”、小于“<”、不等于“!=”、大于等于“>=”、小于等于“<=”几种形式。
      例：
      ["==", "count", "1000"]，表示过滤出属性"count"值为1000的图层显示。
      c)	成员过滤：
      计算形式：[way, key, v0,v1，…，vn]
      成员过滤主要有等于"in"、"!in"两种形式。
      例：
      ["in", "name", "point", "fill", "line"]，表示过滤出属性" name "值为"point", "fill", "line"其中任一一个的图层。
   */
  outerColors: [], //聚合图层外圈颜色
  innerColors: [], //聚合图层内圈颜色
};

const layerHeatDefaultOption = {
  id: 'heatmapLayer',
  type: 'heatmap',
  source: 'heatmapSource',
  layout: {
    visibility: 'visible',
  },
  paint: {
    // 一个热力图数据点的模糊范围，单位是像素，默认值30；要求：值大于等于1，可根据zoom level进行插值设置
    'heatmap-radius': 30,
    //一个热力图单个数据点的热力程度，默认值为1；要求：值大于等于0，支持使用property中某个的热力值
    'heatmap-weight': {
      property: '1',
      stops: [
        [0, 0],
        [10, 1],
      ],
    },
    // 用于统一控制热力值的强度，默认值1；要求：值大于等于0，可根据zoom level进行插值设置
    'heatmap-intensity': 10,
    // 表示热力图颜色阶梯，阶梯的值域范围为0-1，默认值为["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"]
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(0, 0, 255, 0)',
      0.1,
      'royalblue',
      0.3,
      'cyan',
      0.5,
      'lime',
      0.7,
      'yellow',
      1,
      'red',
    ],
    // 表示热力图的不透明度，默认值1；值域范围0-1，可根据zoom level进行插值设置
    'heatmap-opacity': 1,
  },
};

// 栅格图层默认配置
const layerRasterDefaultOption = {
  id: 'IMAGERY',
  type: 'raster', //图层类型为"raster"
  source: 'IMAGERY_SOURCE',
  minzoom: 1,
  maxzoom: 23,
  paint: {
    'raster-opacity': 1,
  },
};

// 建筑图层默认配置
const layerExtrusionDefaultOption = {
  id: 'ROUGHBUILDING',
  type: 'extrusion', //图层类型为"extrusion"
  source: 'ROUGHBUILDING_SOURCE',
  minzoom: 1,
  maxzoom: 22,
  layout: {
    visibility: 'visible',
  },
  paint: {
    'extrusion-pattern': 'Provincial_15_3', //纹理,如果需要贴图，加入此行参数
    'extrusion-height': { property: 'levels', type: 'identity' }, //高度
    'extrusion-color': '#0c3b70', //颜色
    'extrusion-base': 0, //基础高度
    'extrusion-opacity': 0.8, //基础高度
    'extrusion-translate-anchor': 'viewport', //建筑物偏移锚点：值域map-正北，viewport--视野
    'extrusion-translate': [0, 0], //建筑物偏移
  },
};

export {
  outerColors,
  innerColors,
  layerDefaultOption,
  layerHeatDefaultOption,
  layerRasterDefaultOption,
  layerExtrusionDefaultOption,
};
