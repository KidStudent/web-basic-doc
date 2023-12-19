<template>
  <div style="position: relative; width: 100%; height: 500px; overflow: hidden">
    <minemap
      ref="mineMapRef"
      map-dom-id="build-filter"
      :map2D3D="map2D3D"
      :map-edit-data="mapEditDataFilter"
      :point-build-list="pointBuildListFilter"
      :alarm-point-list="alarmPointList"
      :get-message-popupBg="getMessagePopupBg"
      @closeWarningPopup="closeWarningPopup"
    />
    <div class="map-options">
      <div class="options-type">
        <div>
          <i class="iconfont icon-tuceng mr-xs" />
          <span class="inline vt-middle">图层</span>
        </div>
        <div>
          <Dropdown trigger="click" transfer @on-click="switchMap">
            <i class="iconfont icon-ditu mr-xs" />
            <span class="inline vt-middle">地图</span>
            <template #list>
              <DropdownMenu>
                <DropdownItem name="2D">
                  <i class="iconfont icon-wanggekai mr-xs" />
                  <span class="inline vt-middle">二维</span>
                </DropdownItem>
                <DropdownItem name="3D">
                  <i class="iconfont icon-d mr-xs" />
                  <span class="inline vt-middle">三维</span>
                </DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
        </div>
      </div>

      <div class="options-detail">
        <div class="options-content layer" v-show="activeOption === 'layer'">
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
  import { ref, reactive } from 'vue';
  import minemap from './components/index.vue';

  import { deepCopy } from '@web-basic-doc/utils';
  import {
    mapEditDataMock,
    pointBuildListMock,
    alarmPointListMock,
    layerTypeListMock,
  } from './example.mock';

  const mineMapRef = ref(null);

  let activeOption = ref('layer');

  // 全选图层状态
  let checkAllLayer = ref(true);
  // 全选图层半选状态
  let indeterminate = ref(false);

  // 地图处于2D还是3D
  let map2D3D = ref('3D');

  const layerTypeList = reactive(layerTypeListMock);

  const mapEditData = mapEditDataMock;

  const pointBuildList = pointBuildListMock;

  const alarmPointList = ref(alarmPointListMock);

  let mapEditDataFilter = ref(deepCopy(mapEditDataMock));

  let pointBuildListFilter = ref(deepCopy(pointBuildListMock));

  // 转换地图2D3D
  const switchMap = (type) => {
    map2D3D.value = type;
  };

  // 全选/取消全选 所有图层分类
  const handleCheckAllLayer = (val) => {
    mineMapRef.value.messagePopupRef.length = 0;
    if (val) {
      checkAllLayer.value = true;
      indeterminate.value = false;
      layerTypeList.forEach((layer) => {
        layer.checked = true;
      });
      // 建筑图层
      if (pointBuildList.length) {
        pointBuildListFilter.value = deepCopy(pointBuildList);
      }
      // 编辑池图层
      if (map2D3D.value === '3D' && mapEditData.length) {
        mapEditDataFilter.value = deepCopy(mapEditData);
        mineMapRef.value.addFence(mapEditDataFilter.value);
      }
    } else {
      checkAllLayer.value = false;
      indeterminate.value = false;
      layerTypeList.forEach((layer) => {
        layer.checked = false;
        removePrimitiveByLayer(layer);
      });
      pointBuildListFilter.value = [];
      mapEditDataFilter.value = [];
    }
    if (alarmPointList.value.length) {
      checkWarningPopup(val);
    }
  };

  // 点选报警弹框图层
  const checkWarningPopup = (val) => {
    if (val) {
      mineMapRef.value.addAlarmMarker(alarmPointList.value);
    } else {
      alarmPointList.value.forEach((row) => {
        mineMapRef.value.closeWarningPopup(row.id, { isRemove: false });
      });
    }
  };

  const closeWarningPopup = (pointId) => {
    const index = alarmPointList.value.findIndex((point) => point.id === pointId);
    if (index !== -1) {
      alarmPointList.value.splice(index, 1);
    }
  };

  const checkLayerChange = (val, layer) => {
    if (layer.layerType === 'warningInfo') {
      checkWarningPopup(val);
      return;
    }
    // 点选其他图层
    mineMapRef.value.messagePopupRef.length = 0;
    const checkedLayer = layerTypeList.filter((row) => row.checked);
    // 全选的情况下
    if (checkedLayer.length === layerTypeList.length) {
      indeterminate.value = false;
      checkAllLayer.value = true;
      pointBuildListFilter.value = deepCopy(pointBuildList);
      mapEditDataFilter.value = deepCopy(mapEditData);
      // 区域范围
      if (map2D3D.value === '3D' && mapEditData.length) {
        const addEditList = mapEditData.filter((edit) => edit.kind === layer.layerType);
        mineMapRef.value.addFence(addEditList);
      }

      // 没有全选的情况下
    } else if (checkedLayer.length > 0) {
      indeterminate.value = true;
      checkAllLayer.value = false;
      if (val) {
        // 建筑点位加载
        if (pointBuildList.length) {
          pointBuildListFilter.value = pointBuildList.filter(
            (point) => checkedLayer.findIndex((row) => row.layerType === point.kind) !== -1,
          );
        }

        // 区域范围
        if (mapEditData.length) {
          mapEditDataFilter.value = mapEditData.filter(
            (edit) => checkedLayer.findIndex((row) => row.layerType === edit.kind) !== -1,
          );
          if (map2D3D.value === '3D') {
            mineMapRef.value.addFence(mapEditDataFilter.value);
          }
        }
      } else {
        // 移除点位
        if (pointBuildList.length) {
          const removePointList = pointBuildListFilter.value.filter(
            (point) => point.kind === layer.layerType,
          );
          removePointList.forEach((removePoint) => {
            const pointIndex = pointBuildListFilter.value.findIndex(
              (point) => point.id === removePoint.id,
            );
            pointIndex !== -1 && pointBuildListFilter.value.splice(pointIndex, 1);
          });
        }

        // 移除围栏
        removePrimitiveByLayer(layer);
        if (mapEditData.length) {
          // 移除框选范围
          const removeEditList = mapEditDataFilter.value.filter(
            (edit) => edit.kind === layer.layerType,
          );
          removeEditList.forEach((removeEdit) => {
            const editIndex = mapEditDataFilter.value.findIndex(
              (edit) => edit.id === removeEdit.id,
            );
            mapEditDataFilter.value.splice(editIndex, 1);
          });
        }
      }
      // 全不选的情况下
    } else {
      indeterminate.value = false;
      checkAllLayer.value = false;
      removePrimitiveByLayer(layer);
      pointBuildListFilter.value = [];
      mapEditDataFilter.value = [];
    }
  };

  // 找到对应的围栏的Primitive并移除
  const removePrimitiveByLayer = (layer) => {
    if (map2D3D.value === '3D' && mapEditData.length) {
      const editData = mapEditData.filter((edit) => edit.kind === layer.layerType);
      editData.forEach((edit) => {
        mineMapRef.value.removePrimitiveById(edit.id);
      });
    }
  };

  const getMessagePopupBg = (point) => {
    return point.kind;
  };
</script>

<style lang="scss" scoped>
  .map-options {
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 3;

    .options-type {
      display: flex;
      width: 210px;
      height: 30px;
      color: #fff;
      background-color: rgb(8 86 189 / 40%);
      justify-content: space-between;
      align-items: center;

      > div {
        position: relative;
        display: flex;
        width: 33.33%;
        cursor: pointer;
        align-items: center;
        justify-content: center;

        &:hover {
          color: #1acbfe;
        }
      }
    }

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
