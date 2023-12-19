<template>
  <div :class="bem.b()" :style="{ background: bgColor }">
    <img v-if="skin === 'dark'" src="@/assets/img/common/loading.gif" alt="" />
    <svg
      v-else
      class="loading"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="40px"
      height="40px"
      viewBox="0 0 50 50"
      style="enable-background: new 0 0 50 50"
      xml:space="preserve"
    >
      <path
        :fill="color"
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
    <div class="text">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import { createNamespace } from '@web-basic-doc/utils';
  import classes from '@web-basic-doc/theme-chalk/src/mixins/config.module.scss';
  const bem = createNamespace('loading');
  defineProps({
    color: {
      type: String,
      default: '#55c5f2',
    },
  });

  let skin = ref(null);
  let bgColor = ref(null);

  onMounted(() => {
    nextTick(() => {
      skin.value = document.documentElement.getAttribute(`${classes.namespace}-skin`);
      bgColor.value = skin.value === 'dark' ? '#071B39' : '#fff';
    });
  });
</script>
