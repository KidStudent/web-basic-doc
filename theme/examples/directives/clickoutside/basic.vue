<template>
  <div style="width: 200px; height: 200px; border: 1px solid red" v-clickoutside="outside">
    点击此处之外的区域
    <div style="width: 100px; height: 100px; border: 1px solid green"> 内部区域 </div>
  </div>
</template>

<script setup>
  import { getCurrentInstance } from 'vue';

  const { proxy } = getCurrentInstance();

  const outside = () => {
    proxy.$Message.info('点击其他区域');
  };
</script>
