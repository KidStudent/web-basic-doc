<template>
  <div style="position: relative; width: 100%; height: 500px; overflow: hidden">
    <minemap
      map-dom-id="building"
      :point-build-list="pointBuildList"
      :get-message-popup-bg="getMessagePopupBg"
    >
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
  </div>
</template>

<script setup>
  import minemap from './components/index.vue';
  const pointBuildList = [
    {
      id: 1,
      title: '海安市政府',
      lng: 120.467735,
      lat: 32.532712,
      icon: 'redPoint',
    },
    {
      id: 2,
      title: '书香园小区',
      lng: 120.468946,
      lat: 32.537649,
      icon: 'bluePoint',
      buildingNumber: 20,
      houseNumber: 1440,
    },
    {
      id: 3,
      title: '江苏省海安高级中学',
      lng: 120.468851,
      lat: 32.555493,
      icon: 'greenPoint',
    },
    {
      id: 4,
      title: '王府大酒店',
      lng: 120.491374,
      lat: 32.538508,
      icon: 'redPoint',
    },
    {
      id: 5,
      title: '智达教育(海安校区)',
      lng: 120.471218,
      lat: 32.537631,
      icon: 'greenPoint',
    },
    {
      id: 7,
      title: '123',
      lng: 120.472562307338,
      lat: 32.5334267105474,
      icon: 'bluePoint',
    },
  ];

  const getMessagePopupBg = (point) => {
    return point.icon === 'redPoint' ? 'red' : point.icon === 'greenPoint' ? 'green' : 'blue';
  };
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
