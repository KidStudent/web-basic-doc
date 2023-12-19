<template>
  <div :id="mapDomId" class="map-box" />
  <warning-popup
    v-show="loadMap"
    v-for="(point, index) in alarmPointList"
    :key="index"
    :ref="setWarningPopupRef"
    :point="point"
    @closeWarningPopup="closeWarningPopup"
  />
  <message-popup
    v-for="(point, index) in pointBuildList"
    :key="index"
    :title="point.title"
    :ref="setMessagePopupRef"
    :type="getMessagePopupBg(point)"
  >
    <slot name="messagePopup" :point="point" />
  </message-popup>
  <video-popup ref="videoPopupRef" :point="videoPopupPoint" @closeVideoPopup="closeVideoPopup" />
</template>

<script setup>
  import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
  import { mapMain } from '../js/map.main.js';
  import warningPopup from './popup/warning-popup.vue';
  import messagePopup from './popup/message-popup.vue';
  import videoPopup from './popup/video-popup.vue';
  import warningPosition from '/images/map/minemap/warning-position.png';

  const props = defineProps({
    mapDomId: {
      type: String,
      default: 'map',
    },
    map2D3D: {
      type: String,
      default: '3D',
    },
    // 区域范围数据
    mapEditData: {
      type: Array,
      default: () => [],
    },
    // 正常加载的点位列表
    pointNormalList: {
      type: Array,
      default: () => [],
    },
    // 建筑列表
    pointBuildList: {
      type: Array,
      default: () => [],
    },
    // 报警列表
    alarmPointList: {
      type: Array,
      default: () => [],
    },
    // 需要添加鼠标事件的图层id
    addEventLayer: {
      type: Array,
      default: () => ['buildingLayer'],
    },
    // 需要地图点击回调的方法
    clickCallBack: {
      type: Function,
      default: () => {},
    },
    // 需要地图鼠标移入回调的方法
    moveCallBack: {
      type: Function,
      default: () => {},
    },
    // 通过方法过滤出信息弹框的背景色，包含3中颜色 blue red green
    getMessagePopupBg: {
      type: Function,
      default: (point) => {
        return point.kind === 'regionManors' ? 'blue' : point.kind === 'places' ? 'red' : 'green';
      },
    },
  });

  const emit = defineEmits(['closeWarningPopup', 'createNormalPopup', 'createVideoPopup']);

  const localMapConfig = {
    domainUrl: 'https://minemap.minedata.cn',
    dataDomainUrl: 'https://minemap.minedata.cn',
    serverDomainUrl: 'https://sd-data.minedata.cn',
    spriteUrl: 'https://minemap.minedata.cn/minemapapi/v4.0.0/sprite/sprite',
    serviceUrl: 'https://service.minedata.cn/service',
    satelliteUrl: 'https://services.minedata.cn/service/data/satellite?x={x}&y={y}&z={z}',
    tilesUrl: [
      {
        name: 'osgb1_cennavi',
        url: 'https://minedata.cn/nce-static/support/assets/models/610100/tileset.json',
      },
    ],
    key: '5534790da9764e12bb8f6d3e0d815d7b',
    solution: 11003,
    style: 'https://service.minedata.cn/map/solu/style/',
    center: [120.467807, 32.532721],
    zoom: 14,
    pitch: 57,
    maxZoom: 17,
    minZoom: 3,
    projection: 'MERCATOR',
  };
  // const satelliteUrl = localMapConfig.satelliteUrl;
  // const tilesUrl = localMapConfig.tilesUrl;
  let mineMap = null;

  let loadMap = ref(false);

  // const satelliteStyle = {
  //   source: 'rasterSource',
  //   id: 'rasterLayer',
  // };

  const warningPopupRef = [];
  const setWarningPopupRef = (el) => {
    if (el) {
      warningPopupRef.push(el);
    }
  };
  const messagePopupRef = [];
  const setMessagePopupRef = (el) => {
    if (el) {
      messagePopupRef.push(el);
    }
  };

  const videoPopupRef = ref(null);
  const videoPopupPoint = ref({});
  let mapVideoPopup = ref(null);

  onMounted(() => {
    setTimeout(() => {
      initMap();
    }, 1000);
  });

  const initMap = () => {
    mineMap = new mapMain({ mapDomId: props.mapDomId, ...localMapConfig });
    mineMap.init(() => {
      addEvent();
      switchMap(props.map2D3D);
      loadMap.value = true;
      console.info('地图加载完成回调');
    });
  };

  // const satelliteMap = () => {
  //   mineMap.addRasterLayer([satelliteUrl], {
  //     id: satelliteStyle.id,
  //     source: satelliteStyle.source,
  //   });
  // };
  // 加载三维倾斜摄影
  // const addSceneTilesComponent = () => {
  //   mineMap.addSceneTilesComponent({
  //     id: 'sceneTiles',
  //     urls: tilesUrl,
  //     minZoom: 13,
  //     maxZoom: 19,
  //   });
  // };

  // const removeSceneComponent = (id) => {
  //   mineMap.removeSceneComponent(id);
  // };
  const initEditToMap = () => {
    if (props.mapEditData.length) {
      mineMap.setFeatures(props.mapEditData);
    }
  };

  const addBuildingLayer = (pointList) => {
    mineMap.addLayer(pointList, {
      id: 'buildingLayer',
      source: 'buildingSource',
      layout: {
        visibility: 'visible',
        'icon-image': '{icon}',
        'icon-pitch-alignment': 'viewport',
        'icon-anchor': 'bottom',
        'icon-size': 0.4,
      },
    });
  };

  const createMessagePopup = (pointList) => {
    pointList.forEach((point, index) => {
      const el = messagePopupRef[index].popupRef;
      mineMap.createPopup(
        point.id,
        {
          closeButton: false,
          closeOnClick: false,
          closeOnMove: false,
          offset: [0, -100],
        },
        [point.lng, point.lat],
        el,
      );
    });
  };

  const addFence = (editData) => {
    editData.forEach((edit) => {
      const id = `${edit.id}-fence`;
      let coordList = [];
      const fencePositions = [];
      if (edit.geometry.type !== 'Polygon') {
        coordList = edit.geometry.coordinates;
      } else {
        coordList = edit.geometry.coordinates[0];
      }
      coordList.forEach((coord) => {
        fencePositions.push(coord[0], coord[1]);
      });

      const fenceMaximumHeight = 100;
      mineMap.addFence({ id, fencePositions, fenceMaximumHeight, imgUrl: edit.fenceImgUrl });
    });
  };

  const removePrimitiveById = (id) => {
    mineMap.removePrimitiveById(`${id}-fence`);
  };

  const addNormalLayer = (pointList) => {
    /**
     * 可以传入不同的source聚合不同类型的点位
     * json也可传入一个在线的geojson的链接
     */
    mineMap.addLayer(pointList, {
      id: 'normalLayer',
      source: 'normalSource',
      cluster: false,
      layout: {
        visibility: 'visible',
        'icon-image': '{icon}',
        'icon-pitch-alignment': 'viewport',
        'icon-anchor': 'bottom',
        'icon-size': 0.4,
      },
    });
  };

  const createNormalPopup = () => {
    const normalPopup = mineMap.createPopup('normalPopup', {
      closeButton: false,
      closeOnClick: false,
      closeOnMove: false,
      offset: [0, -40],
      className: 'normal-popup',
    });
    emit('createNormalPopup', normalPopup, popupSetContent);
  };

  const createVideoPopup = () => {
    mapVideoPopup.value = mineMap.createPopup(
      'videoPopup',
      {
        closeButton: false,
        closeOnClick: false,
        closeOnMove: false,
        offset: [0, -40],
        className: 'map-popup video-popup',
      },
      null,
      videoPopupRef.value.popupRef,
    );

    emit('createVideoPopup', mapVideoPopup.value, popupSetLngLat);
  };

  const popupSetContent = (popup, point) => {
    mineMap.popupSetContent(popup, point.title, [point.lng, point.lat]);
  };

  const popupSetLngLat = (popup, point) => {
    videoPopupPoint.value = point;
    mineMap.popupSetLngLat(popup, [point.lng, point.lat]);
  };

  const addAlarmMarker = (alarmPointList) => {
    alarmPointList.forEach((point, index) => {
      mineMap.addMarker(
        {
          id: point.id,
          style: {
            backgroundImage: `url(${warningPosition})`,
            backgroundSize: '100%',
            width: '84px',
            height: '67px',
            borderRadius: '20%',
          },
          lnglat: point.lnglat,
          clickFun: () => {
            alert(`我是marker`);
          },
        },
        {
          offset: [-42, -33.5],
        },
      );
      const el = warningPopupRef[index].popupRef;

      mineMap.createPopup(
        `${point.id}-warningPopup`,
        {
          closeButton: false,
          closeOnClick: false,
          closeOnMove: false,
          offset: [0, -33.5],
          className: 'map-popup warning-popup',
        },
        point.lnglat,
        el,
      );
    });
  };

  const closeWarningPopup = (id, option = { isRemove: true }) => {
    mineMap.removeMarker(id);
    mineMap.removePopup(`${id}-warningPopup`);
    option.isRemove && emit('closeWarningPopup', id);
  };

  const closeVideoPopup = () => {
    mineMap.popupSetLngLat(mapVideoPopup.value, { lng: 0, lat: 0 });
  };

  const addEvent = () => {
    mineMap.addEvent('mousemove', (e) => {
      const features = mineMap.queryRenderedFeatures(e.point, {
        layers: props.addEventLayer,
      });
      // 鼠标移出点位处理
      if (!features.length) {
        mineMap.getCanvas().style.cursor = 'grab';
        props.moveCallBack({}, { isShow: false });
        return;
      }
      let feature = features[0];

      mineMap.getCanvas().style.cursor = 'pointer';

      props.moveCallBack(feature.properties);
    });

    mineMap.addEvent('click', (e) => {
      console.log(e, 'mapClick');
      const features = mineMap.queryRenderedFeatures(e.point, {
        layers: props.addEventLayer,
      });
      if (!features.length) {
        return;
      }

      let feature = features[0];

      let coord = null;

      coord = feature.geometry.coordinates;

      mineMap.setCenter(coord);

      props.clickCallBack(feature.properties);

      console.log(`点击了${feature.properties.title}`);
    });
  };

  const switchMap = (type) => {
    clearMap();
    if (type === '2D') {
      mineMap.flyTo({ pitch: 0 });
      initEditToMap();
      // removeSceneComponent('sceneTiles');
    } else {
      mineMap.flyTo({ pitch: 57 });
      // satelliteMap();
      // addSceneTilesComponent();
      props.mapEditData.length && addFence(props.mapEditData);
    }
    props.alarmPointList.length && addAlarmMarker(props.alarmPointList);
    if (props.pointNormalList.length) {
      addNormalLayer(props.pointNormalList);
      createNormalPopup();
      createVideoPopup();
    }
    props.pointBuildList.length && addBuildingLayer(props.pointBuildList);
    props.pointBuildList.length && createMessagePopup(props.pointBuildList);
  };

  const changeLayerByData = (layerId, pointData) => {
    mineMap.changeLayerByData(layerId, pointData);
  };

  const clearMap = () => {
    mineMap.clear();
  };

  const ranging = () => {
    mineMap.turnOn();
  };

  const rangingEnd = () => {
    mineMap.turnOff();
  };

  const ctrlActive = (type, styleOptions) => {
    mineMap.ctrlActive(type, styleOptions);
  };

  // 删除edit中的除了mapEditData之外的数据
  const deleteFeature = () => {
    const features = getAllFeatures();
    const delFeatures = [];
    features.forEach((feature) => {
      const fe = props.mapEditData.find((edit) => edit.id === feature.id);
      if (!fe) {
        delFeatures.push(feature.id);
      }
    });
    delFeatures.length && mineMap.deleteFeature(delFeatures);
  };

  const getAllFeatures = () => {
    return mineMap.getAllFeatures().features;
  };

  const centroid = (feature) => {
    return mineMap.centroid(feature);
  };

  watch(
    () => props.map2D3D,
    (val) => {
      switchMap(val);
    },
  );

  watch(
    () => props.alarmPointList,
    (val) => {
      warningPopupRef.length = 0;
      // 由于使用的alarm弹框为vue的dom所以需要等待dom加载完成后更改地图图层
      nextTick(() => {
        addAlarmMarker(val);
      });
    },
    { deep: true },
  );

  watch(
    () => [props.mapEditData, loadMap],
    () => {
      if (loadMap.value) {
        // 由于使用的info弹框为vue的dom所以需要等待dom加载完成后更改地图图层
        nextTick(() => {
          if (props.map2D3D === '2D') {
            mineMap.delAllFeatures();
            initEditToMap();
          }
          // 更新建筑点位图层
          changeLayerByData('buildingLayer', props.pointBuildList);
          createMessagePopup(props.pointBuildList);
        });
      }
    },
    { deep: true },
  );

  watch(
    () => props.pointNormalList,
    (val) => {
      if (loadMap.value) {
        changeLayerByData('normalLayer', val);
      }
    },
    { deep: true },
  );

  defineExpose({
    messagePopupRef,
    ranging,
    rangingEnd,
    ctrlActive,
    deleteFeature,
    addAlarmMarker,
    closeWarningPopup,
    addFence,
    removePrimitiveById,
    getAllFeatures,
    centroid,
    clearMap,
  });

  onUnmounted(() => {
    mineMap.destoryMap();
  });
</script>

<style lang="scss" scoped>
  .map-box {
    width: 100%;
    height: 100%;

    > :deep(.map-popup) {
      max-width: none !important;

      .minemap-popup-tip {
        border: none;
      }

      .minemap-popup-content {
        padding: 0;
        background-color: transparent;
      }
    }

    > :deep(.warning-popup) {
      z-index: 1;
    }

    > :deep(.normal-popup) {
      .minemap-popup-tip {
        border-top-color: rgb(0 85 255 / 50%);
      }

      .minemap-popup-content {
        font-size: 14px;
        color: #fff;
        background-color: rgb(2 11 44 / 70%);
        box-shadow: inset 0 0 20px rgb(0 85 255 / 50%);
      }
    }
  }

  .map-option {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px;
    text-align: right;
    background-color: rgb(0 0 0 / 50%);

    .option-title {
      font-size: 16px;
      color: #ddd;
    }
  }
</style>
