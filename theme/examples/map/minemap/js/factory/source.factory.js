// 点位加工工厂
export class SourceFactory {
  map;
  sources = [];
  sourceOption = {};
  sourceDefaultOption = {
    cluster: false /*是否聚合*/,
    clusterMaxZoom: 15 /* 最大聚合层级 */,
    clusterRadius: 50 /* 聚合半径 */,
  };

  constructor(map, sources) {
    this.map = map;
    this.sources = sources;
  }

  /**重要**
   *               创建出符合图层要求的特征点位
   **************************************************************
   *                  地图点位字段对应为                          *
   * lat 经度 lng 纬度 title 点位名称 kind 点位分类 icon 点位图标  *
   *            icon 的图标必须要在地图初始化时加载到地图中         *
   **************************************************************
   */
  createSourceFeatures(pointList) {
    const sourcePoints = this.createSourcePoints(pointList);
    return sourcePoints.map((point) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [point.lng, point.lat],
        },
        properties: {
          lat: point.lat,
          lng: point.lng,
          title: point.title,
          kind: point.kind,
          icon: point.icon,
        },
      };
    });
  }

  /**重要**
   *                系统点位转换为地图点位
   **************************************************************
   *                  地图点位字段对应为                          *
   * lat 经度 lng 纬度 title 点位名称 kind 点位分类 icon 点位图标  *
   *            icon 的图标必须要在地图初始化时加载到地图中         *
   **************************************************************
   */
  createSourcePoints(pointList) {
    return pointList.map((point) => {
      return {
        lat: point.lat,
        lng: point.lng,
        title: point.title,
        kind: point.kind,
        icon: point.icon,
      };
    });
  }

  // 创建符合geojson的数据
  createGeoJson(pointList) {
    // 通过工厂函数加工系统点位
    const features = this.createSourceFeatures(pointList);
    return {
      type: 'FeatureCollection',
      features: features,
    };
  }

  // 添加source到地图上
  addSources(data, sourceId, sourceOption = {}) {
    this.sourceOption = { ...this.sourceDefaultOption, ...sourceOption };
    if (this.map.getSource(sourceId)) {
      console.error(`已添加过${sourceId}的图层`);
      return;
    }
    let jsonData = null;
    /**
     * 如果传入的是字符串则认为传入的是geojson的链接直接使用
     * 否则则是系统内部点位数据则需要加工之后使用
     */
    if (typeof data === 'string') {
      jsonData = data;
    } else {
      // 生成json数据加载source到地图上
      jsonData = this.createGeoJson(data);
    }

    this.map.addSource(sourceId, {
      type: 'geojson',
      data: jsonData,
      ...this.sourceOption,
    });
    this.sources.push(sourceId);
  }

  /**
   * 添加栅格source
   * @param {*} tiles 瓦片服务地址 Array
   * @param {*} sourceId
   * @param {*} tileSize 瓦片尺寸
   */
  addRasterSources(tiles, sourceId, tileSize = 256) {
    this.map.addSource(sourceId, {
      type: 'raster', //数据源类型：栅格数据源
      tiles: tiles,
      tileSize: tileSize,
    });
    this.sources.push(sourceId);
  }

  removeSource(sourceId) {
    if (this.map.getSource(sourceId)) {
      this.map.removeSource(sourceId);
    }
  }
}
