<template>
  <div class="layer">
    <minemap map-dom-id="layer" :point-normal-list="pointNormalListFilter" />
    <div class="map-options">
      <div class="options-detail">
        <div class="options-content">
          <div class="layer-border top-left" />
          <div class="layer-border top-right" />
          <div class="layer-border bottom-left" />
          <div class="layer-border bottom-right" />
          <div class="all-layer">
            <Checkbox
              :indeterminate="indeterminate"
              :model-value="checkAllLayer"
              @on-change="handleCheckAllLayer"
            >
              <span style="color: #fff">全部图层</span>
            </Checkbox>
          </div>
          <Checkbox
            class="option-item"
            v-for="(layer, index) in layerTypeList"
            :key="index"
            v-model="layer.checked"
            @on-change="(val) => checkLayerChange(val, layer)"
          >
            <img class="layer-icon" v-if="layer.icon" :src="layer.icon" />
            <span v-else class="layer-sign" :style="{ backgroundColor: layer.color }" />
            <span style="color: #fff">{{ layer.layerName }}</span>
          </Checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import minemap from './components/index.vue';

  import { deepCopy } from '@web-basic-doc/utils';
  import { ref, reactive } from 'vue';

  // 动态引入图层icon
  const getImage = (name) => {
    return `/images/map/minemap/symbol-${name}-icon.png`;
  };

  const layerTypeList = reactive([
    {
      layerType: '1',
      icon: getImage('video'),
      layerName: '高清视频',
      checked: true,
    },
    {
      layerType: '11',
      icon: getImage('face'),
      layerName: '人脸卡口',
      checked: true,
    },
    {
      layerType: '2',
      icon: getImage('vehicle'),
      layerName: '车辆卡口',
      checked: true,
    },
    {
      layerType: '3',
      icon: getImage('wifi'),
      layerName: 'WiFi设备',
      checked: true,
    },
    {
      layerType: '5',
      icon: getImage('rfid'),
      layerName: 'RFID设备',
      checked: true,
    },
    {
      layerType: '4',
      icon: getImage('fence'),
      layerName: '电围设备',
      checked: true,
    },
  ]);

  // 全选图层状态
  let checkAllLayer = ref(true);
  // 全选图层半选状态
  let indeterminate = ref(false);

  const pointNormalList = [
    {
      id: 1,
      title: '海安设备1',
      kind: '1',
      lng: 120.468851,
      lat: 32.555493,
      icon: 'video', //必须为staticUtil中加载到地图中的图片
    },
    {
      id: 2,
      title: '海安设备2',
      kind: '11',
      lng: 120.491374,
      lat: 32.538508,
      icon: 'face',
    },
    {
      id: 3,
      title: '海安设备3',
      kind: '5',
      lng: 120.471218,
      lat: 32.537631,
      icon: 'rfid',
    },
  ];

  let pointNormalListFilter = ref([
    {
      id: 1,
      title: '海安设备1',
      kind: '1',
      lng: 120.468851,
      lat: 32.555493,
      icon: 'video', //必须为staticUtil中加载到地图中的图片
    },
    {
      id: 2,
      title: '海安设备2',
      kind: '11',
      lng: 120.491374,
      lat: 32.538508,
      icon: 'face',
    },
    {
      id: 3,
      title: '海安设备3',
      kind: '5',
      lng: 120.471218,
      lat: 32.537631,
      icon: 'rfid',
    },
  ]);

  // 全选/取消全选 所有图层分类
  const handleCheckAllLayer = (val) => {
    if (val) {
      checkAllLayer.value = true;
      indeterminate.value = false;
      layerTypeList.forEach((layer) => {
        layer.checked = true;
      });
      // 普通点位图层
      if (pointNormalList.length) {
        pointNormalListFilter.value = deepCopy(pointNormalList);
      }
    } else {
      checkAllLayer.value = false;
      indeterminate.value = false;
      layerTypeList.forEach((layer) => {
        layer.checked = false;
      });
      if (pointNormalList.length) {
        pointNormalListFilter.value = [];
      }
    }
  };

  const checkLayerChange = (val, layer) => {
    // 点选其他图层
    const checkedLayer = layerTypeList.filter((row) => row.checked);
    // 全选的情况下
    if (checkedLayer.length === layerTypeList.length) {
      indeterminate.value = false;
      checkAllLayer.value = true;
      pointNormalListFilter.value = deepCopy(pointNormalList);

      // 没有全选的情况下
    } else if (checkedLayer.length > 0) {
      indeterminate.value = true;
      checkAllLayer.value = false;
      if (val) {
        //普通点位筛选
        if (pointNormalList.length) {
          pointNormalListFilter.value = pointNormalList.filter(
            (point) => checkedLayer.findIndex((row) => row.layerType === point.kind) !== -1,
          );
        }
      } else {
        //普通点位筛选
        if (pointNormalList.length) {
          const removePointList = pointNormalListFilter.value.filter(
            (point) => point.kind === layer.layerType,
          );
          removePointList.forEach((removePoint) => {
            const pointIndex = pointNormalListFilter.value.findIndex(
              (point) => point.id === removePoint.id,
            );
            pointIndex !== -1 && pointNormalListFilter.value.splice(pointIndex, 1);
          });
        }
      }
      // 全不选的情况下
    } else {
      indeterminate.value = false;
      checkAllLayer.value = false;
      pointNormalListFilter.value = [];
    }
  };
</script>

<style lang="scss" scoped>
  .layer {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
  }

  .map-options {
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 3;

    .options-detail {
      position: relative;
      margin-top: 15px;
      color: #fff;
      background-color: transparent;

      .layer-border {
        position: absolute;
        width: 17px;
        height: 17px;

        &.top-left {
          top: -6px;
          left: -6px;
          border-top: 2px solid #14ccff;
          border-left: 2px solid #14ccff;
        }

        &.top-right {
          top: -6px;
          right: -6px;
          border-top: 2px solid #14ccff;
          border-right: 2px solid #14ccff;
        }

        &.bottom-left {
          bottom: -6px;
          left: -6px;
          border-bottom: 2px solid #14ccff;
          border-left: 2px solid #14ccff;
        }

        &.bottom-right {
          right: -6px;
          bottom: -6px;
          border-right: 2px solid #14ccff;
          border-bottom: 2px solid #14ccff;
        }
      }

      .options-content {
        background-color: rgb(2 11 44 / 70%);
        border: 1px solid #083d7d;
        box-shadow: inset 0 0 20px rgb(0 85 255 / 50%);
      }

      .all-layer {
        position: relative;
        display: flex;
        height: 44px;
        padding: 0 15px;
        border-bottom: 1px solid rgb(6 128 251 / 40%);
        align-items: center;

        &::after,
        &::before {
          position: absolute;
          right: 0;
          bottom: 0;
          display: inline-block;
          width: 10px;
          height: 1px;
          background-color: #0680fb;
          content: '';
        }

        &::before {
          left: 0;
        }
      }

      .option-item {
        display: flex;
        height: 40px;
        padding: 0 15px;
        align-items: center;

        :deep(.ivu-checkbox-label-text) {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .layer-sign {
          display: inline-block;
          width: 26px;
          height: 2px;
          margin-right: 10px;
          margin-left: 5px;
          border-radius: 1px;
        }

        .layer-icon {
          width: 26px;
          height: 30px;
          margin-right: 10px;
          margin-left: 5px;
        }
      }
    }
  }
</style>
