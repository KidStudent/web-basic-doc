<template>
  <Image
    preview
    lazy
    :class="bem.b()"
    :src="src"
    :key="src"
    :fit="fit"
    :preview-list="previewList"
    :initial-index="initialIndex"
  >
    <template #error>
      <img :src="errorUrl" />
    </template>
    <template #placeholder>
      <img :src="loadUrl" />
    </template>
  </Image>
</template>

<script setup>
  import Image from 'view-ui-plus/src/components/image';
  import { createNamespace } from '@web-basic-doc/utils';
  import { loadErrorDark, loadError, loadDark, load } from './util/static';
  import { ref, onMounted, watchEffect } from 'vue';
  const bem = createNamespace('image');

  defineOptions({
    name: 'ui-image',
  });

  const props = defineProps({
    src: {
      type: String, // 图片路径
      default: '',
    },
    fit: {
      type: String, // 图片样式
      default: () => 'contain',
    },
    urlList: {
      type: Array,
      default: () => [],
    },
    errorSrc: {
      type: String, // 图片路径
      default: '',
    },
    loadSrc: {
      type: String, // 图片路径
      default: '',
    },
  });

  let previewList = ref([]);
  let initialIndex = ref(0);
  let errorUrl = ref('');
  let loadUrl = ref('');

  function setLoadUrl(type) {
    if (type === 'dark') {
      loadUrl.value = loadDark;
    } else {
      loadUrl.value = load;
    }
  }

  function setErrorUrl(type) {
    if (type === 'dark') {
      errorUrl.value = loadErrorDark;
    } else {
      errorUrl.value = loadError;
    }
  }

  onMounted(() => {
    !errorUrl.value ? setErrorUrl(localStorage.getItem('type')) : '';
    !loadUrl.value ? setLoadUrl(localStorage.getItem('type')) : '';
  });

  watchEffect(() => {
    if (props.errorSrc) {
      errorUrl.value = props.errorSrc;
    }
    if (props.loadSrc) {
      loadUrl.value = props.loadSrc;
    }
  });

  watchEffect(() => {
    if (props.urlList.length === 0 && props.src) {
      previewList.value = [props.src];
    } else if (props.urlList.length !== 0 && props.src) {
      previewList.value = props.urlList;
      initialIndex.value = previewList.value.findIndex((url) => props.src === url);
    }
  });
</script>
