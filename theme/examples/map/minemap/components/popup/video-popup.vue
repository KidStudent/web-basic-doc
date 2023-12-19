<template>
  <div class="video-popup-content" ref="popupRef" v-show="point.title">
    <div class="title-box">
      <span class="round" />
      <span class="title-text">{{ point.title }}</span>
      <div class="close" @click="closePopup" title="关闭" />
    </div>
    <div class="video-box">
      <div class="light" />
      <!-- <video-player :video-url="videoUrl" /> -->
    </div>

    <div class="arrow">
      <div class="up-arrow" />
      <div class="up-arrow-border" />
    </div>
  </div>
</template>

<script setup>
  // import videoPlayer from '@/components/video-player/index.vue';
  import { ref } from 'vue';
  defineProps({
    videoUrl: {
      type: String,
      default: '',
    },
    point: {
      type: Object,
      default: () => {},
    },
  });

  const emit = defineEmits(['closeVideoPopup']);

  const popupRef = ref(null);

  const closePopup = () => {
    emit('closeVideoPopup');
  };

  defineExpose({ popupRef });
</script>

<style lang="scss" scoped>
  .video-popup-content {
    width: 333px;
    height: 230px;
    padding: 16px;
    background-image: url('/images/map/minemap/video-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .title-box {
      position: relative;
      margin-bottom: 5px;
      color: #fff;

      .round {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 10px;
        background-color: #fff;
        border: 1px solid #209fff;
        border-radius: 50%;
      }

      .title-text {
        display: inline-block;
        width: 236px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }

      .close {
        position: absolute;
        top: 50%;
        right: 0;
        width: 15px;
        height: 15px;
        cursor: pointer;
        background-image: url('/images/map/minemap/video-close.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        transform: translate(0, -50%);
      }
    }

    .video-box {
      height: 164px;

      .light {
        width: 100%;
        height: 1px;
        background-image: url('/images/map/minemap/light.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>
