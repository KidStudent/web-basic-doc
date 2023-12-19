<template>
  <div class="message-popup-content" ref="popupRef" :style="{ 'background-image': bgUrl }">
    <div class="title"> <span class="sign">🔹</span>{{ title }} <span class="sign">🔹</span></div>
    <slot />
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import greenBg from '/images/map/minemap/green-bg.png';
  import blueBg from '/images/map/minemap/blue-bg.png';
  import redBg from '/images/map/minemap/red-bg.png';

  const props = defineProps({
    type: {
      type: String,
      default: 'green',
    },
    title: {
      type: String,
      default: '测试',
    },
  });

  const popupRef = ref(null);

  const bgUrl = computed(() => {
    return props.type === 'green'
      ? `url(${greenBg})`
      : props.type === 'blue'
      ? `url(${blueBg})`
      : `url(${redBg})`;
  });

  defineExpose({
    popupRef,
  });
</script>

<style lang="scss" scoped>
  .message-popup-content {
    display: flex;
    min-width: 260px;
    padding: 15px 30px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    justify-content: center;
    flex-direction: column;

    .title {
      display: flex;
      font-family: youShe;
      font-size: 20px;
      color: #fff;
      align-items: center;
      justify-content: center;

      .sign {
        font-size: 17px;
        color: transparent;
        text-shadow: 0 0 0 #fff;
      }
    }
  }
</style>
