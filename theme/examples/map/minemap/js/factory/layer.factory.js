import {
  outerColors,
  layerDefaultOption,
  layerHeatDefaultOption,
  layerRasterDefaultOption,
  layerExtrusionDefaultOption,
} from '../util/layerUtil';

// 图层加工工厂
export class LayerFactory {
  map;
  layers = [];
  SourceFactory; /*源头点位加工工厂*/
  layerOption = {};

  constructor(map, layers, SourceFactory) {
    this.map = map;
    this.layers = layers;
    this.SourceFactory = SourceFactory;
    this.outerColors = outerColors;
  }

  /**
   *
   * @param {*} data Array
   * @param {*} layerOption 图层配置
   */
  addLayer(data, layerOption = {}) {
    this.layerOption = { ...layerDefaultOption, ...layerOption };
    if (this.map.getLayer(this.layerOption.id)) {
      console.error(`已添加过id为${this.layerOption.id}的图层`);
      return;
    }
    // 先把点位生成source加载到地图上 可以传入不同的sourceName聚合不同类型的点位
    this.SourceFactory.addSources(data, this.layerOption.source, {
      cluster: this.layerOption.cluster,
    });
    if (this.layerOption.cluster) {
      this.addClusterLayer();
    } else {
      this.map.addLayer(this.layerOption);
    }
    this.layers.push(this.layerOption);
  }

  getLayer(layerId) {
    return this.map.getLayer(layerId);
  }

  addHeatLayer(data, layerOption = {}) {
    const layerHeatOption = { ...layerHeatDefaultOption, ...layerOption };
    if (this.map.getLayer(layerHeatOption.id)) {
      console.error(`已添加过id为${layerHeatOption.id}的图层`);
      return;
    }
    this.SourceFactory.addSources(data, layerHeatDefaultOption.source);
    this.map.addLayer(layerHeatOption);
    this.layers.push(layerHeatOption);
  }

  // 添加栅格图层
  addRasterLayer(tiles = [], layerOption) {
    const layerRasterOption = { ...layerRasterDefaultOption, ...layerOption };
    if (this.map.getLayer(layerRasterOption.id)) {
      console.error(`已添加过id为${layerRasterOption.id}的图层`);
      return;
    }

    this.SourceFactory.addRasterSources(tiles, layerRasterOption.source);

    this.map.addLayer(layerRasterOption);
    this.layers.push(layerRasterOption);
  }

  // 添加建筑图层
  addExtrusionLayer(data, layerOption) {
    const layerExtrusionOption = { ...layerExtrusionDefaultOption, ...layerOption };
    if (this.map.getLayer(layerExtrusionOption.id)) {
      console.error(`已添加过id为${layerExtrusionOption.id}的图层`);
      return;
    }
    this.SourceFactory.addSources(data, layerExtrusionOption.source, {
      tileUsage: 'sphere', // 瓦片用途
    });
    this.map.addLayer(layerExtrusionOption);
    this.layers.push(layerExtrusionOption);
  }

  addClusterLayer() {
    // 先把所有点位添加一个非聚合图层
    this.map.addLayer({
      id: `${this.layerOption.id}-unclustered`,
      type: this.layerOption.type,
      source: this.layerOption.source,
      filter: ['!has', `point_count`],
      layout: this.layerOption.layout,
      paint: {
        'icon-color': '#ff0000',
        'text-color': '#fff',
      },
    });
    this.layers.push({
      id: `${this.layerOption.id}-unclustered`,
      type: this.layerOption.type,
      source: this.layerOption.source,
      filter: ['!has', `point_count`],
      layout: this.layerOption.layout,
      paint: {
        'icon-color': '#ff0000',
        'text-color': '#fff',
      },
    });

    // 添加聚合颜色图层
    const clusterLayerList = this.createClusterLayer(this.outerColors);
    clusterLayerList.forEach((layerOption) => {
      this.map.addLayer(layerOption);
      this.layers.push(layerOption);
    });

    //添加聚合数量图层
    this.map.addLayer({
      id: `${this.layerOption.id}-cluster-count`,
      type: 'symbol',
      source: this.layerOption.source,
      layout: {
        'text-field': '{point_count}',
        'text-size': 10,
      },
      paint: {
        'text-color': 'rgba(0,0,0,.75)',
      },
      filter: ['has', `point_count`],
    });
    this.layers.push({
      id: `${this.layerOption.id}-cluster-count`,
      type: 'symbol',
      source: this.layerOption.source,
      layout: {
        'text-field': '{point_count}',
        'text-size': 10,
      },
      paint: {
        'text-color': 'rgba(0,0,0,.75)',
      },
      filter: ['has', `point_count`],
    });
  }

  // 创建聚合图层
  createClusterLayer(clusterColorList) {
    return clusterColorList.map((color, i) => {
      return {
        id: `${this.layerOption.id}-cluster-${i}`,
        type: 'circle',
        source: this.layerOption.source,
        paint: {
          'circle-color': color[1],
          'circle-radius': 20,
        },
        filter:
          i === 0
            ? ['>=', `point_count`, color[0]]
            : [
                'all',
                ['>=', `point_count`, color[0]],
                ['<', `point_count`, this.outerColors[i - 1][0]],
              ],
      };
    });
  }

  /**
   * 根据id更改图层的数据
   * @param {*} layerId 创建图层的id
   * @param {*} pointData 点位集合
   * 拿到图层中的source更改其sourceData
   */
  changeLayerByData(layerId, pointData) {
    if (this.map.getLayer(layerId)) {
      const layer = this.map.getLayer(layerId);
      const source = this.map.getSource(layer.source);
      const sourceData = this.SourceFactory.createGeoJson(pointData);
      source.setData(sourceData);
    } else if (this.map.getLayer(`${layerId}-unclustered`)) {
      const layer = this.map.getLayer(`${layerId}-unclustered`);
      const source = this.map.getSource(layer.source);
      const sourceData = this.SourceFactory.createGeoJson(pointData);
      source.setData(sourceData);
    }
  }

  showLayer(layerId) {
    if (this.map.getLayer(layerId)) {
      this.map.setLayoutProperty(layerId, 'visibility', 'visible');
    }
  }

  hideLayer(layerId) {
    if (this.map.getLayer(layerId)) {
      this.map.setLayoutProperty(layerId, 'visibility', 'none');
    }
  }

  removeLayer(layerId) {
    if (this.map.getLayer(layerId)) {
      this.map.removeLayer(layerId);
    }
  }
}
