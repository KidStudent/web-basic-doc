<template>
  <Button @click="show">显示弹框</Button>
  <ui-modal title="可拖拽" draggable v-model="visible" @onCancel="onCancel" @query="query">
    内容
  </ui-modal>
</template>

<script setup>
  import { ref } from 'vue';

  const visible = ref(false);
  const show = () => {
    visible.value = true;
  };

  const onCancel = () => {
    console.log(`关闭弹框`);
  };

  const query = () => {
    console.log(`确认`);
  };
</script>
