<template>
  <div class="layer-tree-box">
    <minemap map-dom-id="layer-tree" :point-normal-list="pointNormalListFilter" />
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
          <el-tree
            class="layer-tree"
            :data="treeData"
            :icon="layerIcon"
            :props="{ class: customNodeClass }"
            :default-checked-keys="defaultCheckedKeys"
            ref="layerTreeRef"
            empty-text="暂无数据"
            node-key="typeCode"
            default-expand-all
            show-checkbox
            @check="checkTree"
          >
            <template #default="{ node, data }">
              <div class="layer-tree-item">
                <img
                  v-if="data.iconName"
                  class="layer-icon vt-middle"
                  :src="getImage(data.iconName)"
                />
                <span
                  class="inline vt-middle"
                  :style="{ fontWeight: node.level === 1 ? 900 : 500, color: '#fff' }"
                >
                  {{ data.typeName }}
                </span>
              </div>
            </template>
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import minemap from './components/index.vue';
  import layerIcon from './components/layer-icon.vue';

  import { deepCopy, arrayToJson } from '@web-basic-doc/utils';
  import { computed, ref } from 'vue';

  const layerTreeData = [
    {
      id: 1,
      typeCode: '1001',
      typeName: '公共服务场所',
      parentId: -1,
      iconName: null,
    },
    {
      id: 2,
      typeCode: '1002',
      typeName: '特种行业',
      parentId: -1,
      iconName: null,
    },
    {
      id: 3,
      typeCode: '1003',
      typeName: '新业态',
      parentId: -1,
      iconName: null,
    },
    {
      id: 4,
      typeCode: '100101',
      typeName: '歌舞厅',
      parentId: 1,
      iconName: 'other',
    },
    {
      id: 5,
      typeCode: '100102',
      typeName: '棋牌室',
      parentId: 1,
      iconName: 'chessCards',
    },
    {
      id: 6,
      typeCode: '100103',
      typeName: '影剧院',
      parentId: 1,
      iconName: 'other',
    },
    {
      id: 7,
      typeCode: '100104',
      typeName: '医院',
      parentId: 1,
      iconName: 'hospital',
    },
    {
      id: 8,
      typeCode: '100105',
      typeName: '学校',
      parentId: 1,
      iconName: 'school',
    },
    {
      id: 9,
      typeCode: '100106',
      typeName: '超市',
      parentId: 1,
      iconName: 'market',
    },
    {
      id: 10,
      typeCode: '100107',
      typeName: '游泳馆',
      parentId: 1,
      iconName: 'swim',
    },
    {
      id: 11,
      typeCode: '100108',
      typeName: '体育馆',
      parentId: 1,
      iconName: 'gym',
    },
    {
      id: 12,
      typeCode: '100201',
      typeName: '旅馆',
      parentId: 2,
      iconName: 'hotel',
    },
    {
      id: 13,
      typeCode: '100202',
      typeName: '印铸刻字',
      parentId: 2,
      iconName: 'other',
    },
    {
      id: 14,
      typeCode: '100203',
      typeName: '旧货',
      parentId: 2,
      iconName: 'other',
    },
    {
      id: 15,
      typeCode: '100204',
      typeName: '典当',
      parentId: 2,
      iconName: 'pawn',
    },
    {
      id: 16,
      typeCode: '100205',
      typeName: '拍卖',
      parentId: 2,
      iconName: 'other',
    },
    {
      id: 17,
      typeCode: '100206',
      typeName: '寄卖',
      parentId: 2,
      iconName: 'other',
    },
    {
      id: 18,
      typeCode: '100207',
      typeName: '维修',
      parentId: 2,
      iconName: 'other',
    },
    {
      id: 19,
      typeCode: '100301',
      typeName: '在线教育',
      parentId: 3,
      iconName: 'other',
    },
    {
      id: 20,
      typeCode: '100302',
      typeName: '互联网医疗',
      parentId: 3,
      iconName: 'other',
    },
    {
      id: 21,
      typeCode: '100303',
      typeName: '线上办公',
      parentId: 3,
      iconName: 'other',
    },
    {
      id: 22,
      typeCode: '100304',
      typeName: '电商',
      parentId: 3,
      iconName: 'other',
    },
    {
      id: 23,
      typeCode: '100305',
      typeName: '无人零售',
      parentId: 3,
      iconName: 'other',
    },
    {
      id: 24,
      typeCode: '100306',
      typeName: '共享出行',
      parentId: 3,
      iconName: 'other',
    },
  ];

  const pointNormalList = [
    {
      id: 1,
      title: '江苏省海安高级中学',
      unitType: '1001',
      unitSubType: '100105',
      lng: 120.468851,
      lat: 32.555493,
      icon: 'school', //必须为staticUtil中加载到地图中的图片
    },
    {
      id: 2,
      title: '王府大酒店',
      unitType: '1002',
      unitSubType: '100201',
      lng: 120.491374,
      lat: 32.538508,
      icon: 'hotel', //必须为staticUtil中加载到地图中的图片
    },
    {
      id: 3,
      title: '智达教育(海安校区)',
      unitType: '1003',
      unitSubType: '100301',
      lng: 120.471218,
      lat: 32.537631,
      icon: 'other', //必须为staticUtil中加载到地图中的图片
    },
  ];

  const getImage = (name) => {
    return `/images/map/minemap/symbol-${name}-icon.png`;
  };

  // 全选图层状态
  let checkAllLayer = ref(true);
  // 全选图层半选状态
  let indeterminate = ref(false);

  const customNodeClass = (data) => {
    if (data.parentId === -1) {
      return 'layer-item-type';
    }
  };

  let pointNormalListFilter = ref([
    {
      id: 1,
      title: '江苏省海安高级中学',
      unitType: '1001',
      unitSubType: '100105',
      lng: 120.468851,
      lat: 32.555493,
      icon: 'school', //必须为staticUtil中加载到地图中的图片
    },
    {
      id: 2,
      title: '王府大酒店',
      unitType: '1002',
      unitSubType: '100201',
      lng: 120.491374,
      lat: 32.538508,
      icon: 'hotel', //必须为staticUtil中加载到地图中的图片
    },
    {
      id: 3,
      title: '智达教育(海安校区)',
      unitType: '1003',
      unitSubType: '100301',
      lng: 120.471218,
      lat: 32.537631,
      icon: 'other', //必须为staticUtil中加载到地图中的图片
    },
  ]);

  const layerTreeRef = ref(null);

  // 树结构数据
  let treeData = ref(arrayToJson(layerTreeData, 'id', 'parentId'));

  // 默认选中树结构
  let defaultCheckedKeys = computed(() => treeData.value.map((row) => row.typeCode));

  // 选中树结构节点
  const checkTree = () => {
    const checkedKeys = layerTreeRef.value.getCheckedKeys(true);
    const checkedPoint = [];
    pointNormalList.forEach((point) => {
      if (checkedKeys.includes(point.unitSubType)) {
        checkedPoint.push(point);
      }
    });
    pointNormalListFilter.value = checkedPoint;

    // 判断是否全选
    const checkedNum = layerTreeRef.value.getCheckedKeys().length;
    if (checkedNum === 0) {
      checkAllLayer.value = false;
      indeterminate.value = false;
    } else if (checkedNum === layerTreeData.length) {
      checkAllLayer.value = true;
      indeterminate.value = false;
    } else {
      checkAllLayer.value = false;
      indeterminate.value = true;
    }
  };

  // 全选/取消全选 所有图层分类
  const handleCheckAllLayer = (val) => {
    if (val) {
      checkAllLayer.value = true;
      indeterminate.value = false;
      // 普通点位图层
      if (pointNormalList.length) {
        pointNormalListFilter.value = deepCopy(pointNormalList);
      }
      if (layerTreeData.length) {
        layerTreeRef.value.setCheckedKeys(layerTreeData.map((row) => row.typeCode));
      }
    } else {
      checkAllLayer.value = false;
      indeterminate.value = false;
      if (pointNormalList.length) {
        pointNormalListFilter.value = [];
      }
      if (layerTreeData.length) {
        layerTreeRef.value.setCheckedKeys([]);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .layer-tree-box {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
  }
  .map-options {
    position: absolute;
    z-index: 3;
    top: 10px;
    right: 20px;

    .options-detail {
      margin-top: 15px;
      color: #fff;
      background-color: transparent;
      position: relative;

      .layer-border {
        width: 17px;
        height: 17px;
        position: absolute;
        &.top-left {
          border-left: 2px solid #14ccff;
          border-top: 2px solid #14ccff;
          left: -6px;
          top: -6px;
        }
        &.top-right {
          border-right: 2px solid #14ccff;
          border-top: 2px solid #14ccff;
          right: -6px;
          top: -6px;
        }
        &.bottom-left {
          border-left: 2px solid #14ccff;
          border-bottom: 2px solid #14ccff;
          left: -6px;
          bottom: -6px;
        }
        &.bottom-right {
          border-right: 2px solid #14ccff;
          border-bottom: 2px solid #14ccff;
          right: -6px;
          bottom: -6px;
        }
      }

      .options-content {
        background-color: rgba(2, 11, 44, 0.7);
        box-shadow: inset 0 0 20px rgba(0, 85, 255, 0.5);
        border: 1px solid #083d7d;
      }
      .all-layer {
        padding: 0 15px;
        height: 44px;
        display: flex;
        align-items: center;
        position: relative;
        border-bottom: 1px solid rgba(6, 128, 251, 0.4);
        &::after,
        &::before {
          display: inline-block;
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          width: 10px;
          height: 1px;
          background-color: #0680fb;
        }
        &::before {
          left: 0;
        }
      }
      .layer-tree {
        max-height: 300px;
        overflow-y: auto;
        :deep(.el-tree-node__content) {
          padding: 5px 15px 5px 15px !important;
          height: auto;
          .is-leaf {
            .el-icon {
              color: transparent;
              cursor: default;
            }
          }
        }
        :deep(.el-tree-node__expand-icon) {
          position: absolute;
          right: 0;
        }
        :deep(.layer-item-type) {
          > .el-tree-node__content {
            background-color: rgba(13, 47, 123, 0.7);
          }
        }
        .layer-icon {
          width: 26px;
          height: 30px;
          margin-right: 3px;
        }
      }
    }
  }
</style>
