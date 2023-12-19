// 围栏几何体

export class FenceFactory {
  map;

  constructor(map) {
    this.map = map;
  }

  /**
   *
   * @param {Array:.<Vector3:>} fencePositions 构建围栏的点的Vector3数组
   * @param {Number} fenceMaximumHeight 构建围栏的最小高度值
   * @returns
   */
  createFenceGeometry(fencePositions = [], fenceMaximumHeight = 30) {
    return minemap.Geometries.FenceGeometry.fromConstantHeights({
      positions: minemap.Math.Vector3.fromDegreesArray(fencePositions),
      maximumHeight: fenceMaximumHeight,
    });
  }

  /**
   *
   * @param {String} imgUrl 图片的url路径
   * @param {Object} textureOption 流动纹理配置
   */
  createFenceMaterial(imgUrl, textureOption = {}) {
    const textureDefaultOption = {
      speed: 10, // 速度,取值范围：1-10
      direction: 'up', // 纹理流动方向，取值：left,right,up,down,
      rotation: 0, // 纹理旋转角度，取值范围：0-360
      texRepeat: [0, 0], // 纹理重复次数，第一个值为横向重复次数，第二个值为纵向重复次数，取值大于0
    };

    // 图片载入用户接口类
    const fenceTexture = new minemap.TextureLoader().load({
      map: this.map,
      texUrl: imgUrl, //图片的url路径
    });

    // 标准材质
    const fenceMaterial = minemap.StandardMaterial.fromType('Texture', {
      baseColorTexture: fenceTexture, //通过TextureLoader().load载入的纹理对象
      opacity: 1.0, //不透明度
      lightingModel: minemap.LightingModelType.None,
      doubleSided: true, //是否双面渲染
    });

    const option = { ...textureDefaultOption, ...textureOption };

    // 设置流动纹理效果
    fenceMaterial.flowTexture(option);

    return fenceMaterial;
  }

  /**
   *
   * @param {*} fenceGeometry Geometry实例
   * @param {*} fenceMaterial Material实例
   * @param {Boolean} allowPick 是否允许拾取
   */
  createPrimitive(id, fenceGeometry, fenceMaterial, allowPick = true) {
    const fencePrimitive = new minemap.Primitive({
      id: id,
      geometry: fenceGeometry,
      material: fenceMaterial,
      allowPick: allowPick,
    });
    this.map.addPrimitive(fencePrimitive);
  }

  removePrimitiveById(id) {
    this.map.removePrimitiveById(id);
  }
}
