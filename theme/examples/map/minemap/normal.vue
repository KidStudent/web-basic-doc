<template>
  <div style="position: relative; width: 100%; height: 500px; overflow: hidden">
    <minemap
      map-dom-id="normal"
      :point-normal-list="pointNormalList"
      :add-event-layer="addEventLayer"
      :move-call-back="mapMoveCallBack"
      @createNormalPopup="createNormalPopup"
    />
  </div>
</template>

<script setup>
  import minemap from './components/index.vue';
  const pointNormalList = [
    {
      id: 1,
      title: '江苏省海安高级中学',
      lng: 120.468851,
      lat: 32.555493,
      icon: 'school', //必须为staticUtil中加载到地图中的图片
    },
    {
      id: 2,
      orgId: 2000007,
      title: '王府大酒店',
      lng: 120.491374,
      lat: 32.538508,
      icon: 'hotel',
    },
    {
      id: 3,
      title: '智达教育(海安校区)',
      lng: 120.471218,
      lat: 32.537631,
      icon: 'school',
    },
  ];

  const addEventLayer = ['normalLayer'];
  let mapNormalpopup = null;
  let mapPopupSetContent = null;

  const createNormalPopup = (normalPopup, popupSetContent) => {
    mapNormalpopup = normalPopup;
    mapPopupSetContent = popupSetContent;
  };

  const mapMoveCallBack = (point, popupOption = { isShow: true }) => {
    // 鼠标移入相关点位就默认显示离开就隐藏
    if (popupOption.isShow) {
      mapPopupSetContent(mapNormalpopup, point);
    } else {
      mapPopupSetContent(mapNormalpopup, { lng: 0, lat: 0 });
    }
  };
</script>

<style lang="scss" scoped></style>
