// 地图编辑器工厂函数
export class EditFactory {
  map;
  edit = null;
  // styleOptions需要默认有属性 "custom_style": 'true' 才可以进行自定义的样式
  styleOptions = {
    custom_style: 'true',
  };

  constructor(map) {
    this.map = map;
    this.init();
  }

  init() {
    this.edit = new edit.init(this.map, {
      boxSelect: true, //地图编辑器是否支持数据框选，使用 shift+click+ drag 进行操作
      drawEnabled: true, //是否启用或关闭图形编辑功能
      touchEnabled: true, //地图编辑器是否支持触摸交互
      displayControlsDefault: true, //是否启用或关闭全部控件
      showButtons: false,
      // 全局默认样式
      userStyles: {
        inactive: {
          fillColor: '#49FBD3',
          fillOutlineColor: '#49FBD3',
          lineColor: '#49FBD3',
          circleColor: '#49FBD3',
          circleBorderColor: '#ffffff',
        },
        active: {
          fillColor: '#f00f0f',
          fillOutlineColor: '#f00f0f',
          lineColor: '#f00f0f',
          circleColor: '#f00f0f',
          circleBorderColor: '#ffffff',
        },
      },
    });
  }

  /**
   * 添加编辑池中的数据
   * @param {*} feature
   * coordinates = [[[center.lng, center.lat], [center.lng, center.lat + 0.003], [center.lng - 0.003, center.lat + 0.003]]]
   */
  addFeatures(
    feature = {
      type: 'Polygon',
      coordinates: [],
    },
  ) {
    if (this.edit) {
      this.edit.draw.add(feature);
    }
  }

  /**
   * 设置编辑池中的数据
   * @param {*} features 
   * features =
   * [{
   *    id: 'xxx',
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'Polygon',
            coordinates: [[[center.lng, center.lat], [center.lng, center.lat + 0.003], [center.lng - 0.003, center.lat + 0.003]]]
      }]
   */
  setFeatures(features) {
    const fc = {
      type: 'FeatureCollection',
      features: features,
    };
    if (this.edit) {
      this.edit.setFeatures(fc);
    }
  }

  getAllFeatures() {
    if (this.edit) {
      return this.edit.draw.getAll();
    }
  }

  /**
   *
   * @param {Array} ids features的id数组
   */
  deleteFeature(ids) {
    if (this.edit) {
      this.edit.draw.delete(ids);
    }
  }

  delAllFeatures() {
    if (this.edit) {
      this.edit.draw.deleteAll();
    }
  }

  //启用所有图形编辑功能
  enableDraw() {
    if (this.edit) {
      this.edit.enableDraw();
    }
  }

  // 禁用所有图形编辑功能
  disableDraw() {
    if (this.edit) {
      this.edit.disableDraw();
    }
  }

  /**
   * 指定图形id编辑功能开关
   * @param {*} featureId 图形id
   * @param {*} isLock 编辑功能开关
   */
  setLockByIds(featureId, isLock = false) {
    // 通过setLockByIds方法指定图层的id来设置是否可以编辑
    this.edit.setLockByIds([featureId], isLock);
  }

  /**
   * 通过id设置图形样式
   * @param {*} featureId 图形id
   * @param {*} styleOptions 图形样式
   * styleOptions = {
        "fillColor": "#090ff3",
        "fillOutlineColor": "#090ff3",
        "lineColor": "#090ff3",
        "circleColor": "#090ff3",
        "circleBorderColor": "#ffffff"
      }
   */
  setFeaturePropertiesByIds(featureId, styleOptions) {
    let option = { ...styleOptions, ...this.styleOptions };
    this.edit.setFeaturePropertiesByIds([featureId], option);
  }

  /**
   * 图形自定义预设样式
   * @param {*} featureType 图形类型 polygon, line, rectangle, triangle
   * @param {*} styleOptions
   */
  ctrlActive(
    featureType,
    styleOptions = {
      fillColor: '#49FBD3',
      fillOpacity: 0.1,
      fillOutlineColor: '#49FBD3',
      fillOutlineWidth: 2,
      isLock: false,
    },
  ) {
    this.edit.onBtnCtrlActive(featureType, { style: styleOptions });
  }
}
