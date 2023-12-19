<template>
  <Button @click="show">显示弹框</Button>
  <ui-modal v-model="visible" @onCancel="onCancel" @query="query">
    <template #header> 自定义标题 </template>
    内容
    <template #footer> 页脚 </template>
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
