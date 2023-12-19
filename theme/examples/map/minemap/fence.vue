<template>
  <div style="position: relative; width: 100%; height: 500px; overflow: hidden">
    <minemap map-dom-id="fence" :map2D3D="map2D3D" :map-edit-data="mapEditData">
      <template #messagePopup="{ point }">
        <div class="mt-sm message-popup" v-if="point.buildingNumber">
          <div>
            <span class="message-title">楼栋：</span>
            <span class="message-num">{{ point.buildingNumber }}</span>
          </div>
          <div>
            <span class="message-title">房屋：</span>
            <span class="message-num">{{ point.houseNumber }}</span>
          </div>
        </div>
      </template>
    </minemap>
    <Button type="primary" style="position: absolute; top: 10px; right: 10px" @click="mapChange">
      转换2D3D
    </Button>
  </div>
</template>

<script setup>
  import minemap from './components/index.vue';
  import redFence from '/images/map/minemap/red-fence.png';
  import greenFence from '/images/map/minemap/green-fence.png';
  import blueFence from '/images/map/minemap/blue-fence.png';
  import { ref } from 'vue';
  const map2D3D = ref('3D');
  const mapChange = () => {
    map2D3D.value = map2D3D.value === '2D' ? '3D' : '2D';
  };
  const mapEditData = [
    {
      id: 1,
      type: 'Feature',
      properties: {
        lineColor: '#F61C35',
        fillColor: '#F61C35',
        fillOpacity: 0.2,
        fillOutlineColor: '#F61C35',
        fillOutlineWidth: 2,
        isLock: true,
        custom_style: 'true',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [120.465828, 32.533069],
            [120.468515, 32.534381],
            [120.46998, 32.532282],
            [120.467324, 32.530908],
            [120.465828, 32.533069],
          ],
        ],
      },
      fenceImgUrl: redFence,
    },
    {
      id: 2,
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [120.466307, 32.537685],
            [120.469146, 32.539252],
            [120.469523, 32.53875],
            [120.469523, 32.53875],
            [120.471136, 32.538194],
            [120.467354, 32.536174],
            [120.466307, 32.537685],
          ],
        ],
      },
      fenceImgUrl: greenFence,
    },
    {
      id: 3,
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [120.46706, 32.556076],
            [120.469683, 32.55657],
            [120.4713, 32.55479],
            [120.467761, 32.554341],
            [120.46706, 32.556076],
          ],
        ],
      },
      fenceImgUrl: blueFence,
    },
    {
      id: 4,
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [120.490838, 32.538595],
            [120.491557, 32.538888],
            [120.491611, 32.538439],
            [120.491103, 32.538237],
            [120.490838, 32.538595],
          ],
        ],
      },
      fenceImgUrl: blueFence,
    },
    {
      id: 5,
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [120.47087, 32.537774],
            [120.471112, 32.537877],
            [120.471413, 32.537302],
            [120.471413, 32.537302],
            [120.47087, 32.537774],
          ],
        ],
      },
      fenceImgUrl: blueFence,
    },
    {
      id: 7,
      type: 'Feature',
      properties: {
        lineColor: '#F61C35',
        fillColor: '#F61C35',
        fillOpacity: 0.2,
        fillOutlineColor: '#F61C35',
        fillOutlineWidth: 2,
        isLock: true,
        custom_style: 'true',
      },
      geometry: {
        coordinates: [
          [
            [120.46610539854002, 32.53577955594519],
            [120.46610539854002, 32.53107386514961],
            [120.47901921613597, 32.53107386514961],
            [120.47901921613597, 32.53577955594519],
            [120.46610539854002, 32.53577955594519],
          ],
        ],
        type: 'Polygon',
      },
      fenceImgUrl: redFence,
    },
  ];
</script>

<style lang="scss" scoped>
  .message-popup {
    display: flex;
    justify-content: space-around;

    .message-title {
      color: rgb(255 255 255 / 80%);
    }

    .message-num {
      font-weight: 900;
      color: #fff;
    }
  }
</style>
