<template>
  <div style="position: relative; width: 100%; height: 500px; overflow: hidden">
    <minemap
      map-dom-id="alarm"
      :alarm-point-list="alarmPointList"
      @closeWarningPopup="closeWarningPopup"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import minemap from './components/index.vue';
  const alarmPointList = ref([
    {
      lnglat: [120.456101, 32.53736],
      id: '1',
      title: `一级`,
      similarity: 85.5,
      alarmLevel: '一级',
      name: '陶尚华',
      taskLibName: '人脸测试布控库001',
      alarmTime: '2023-11-23 09:24:09',
      deviceName: 'B_QN1077延安路东南(结构化2)_(一期)',
      alarmPicUrl: '/images/map/minemap/default-photo.png',
      taskPicUrl: '/images/map/minemap/default-photo.png',
      messageType: 'faceAlarms',
    },
  ]);

  // 关闭报警弹框
  const closeWarningPopup = (pointId) => {
    const index = alarmPointList.value.findIndex((point) => point.id === pointId);
    if (index !== -1) {
      alarmPointList.value.splice(index, 1);
    }
  };
</script>

<style lang="scss" scoped></style>
