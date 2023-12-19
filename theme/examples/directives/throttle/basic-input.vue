<template>
  <Input v-throttle:input="search">搜索</Input>
</template>

<script setup>
  import { getCurrentInstance } from 'vue';

  const { proxy } = getCurrentInstance();

  const search = () => {
    proxy.$Message.info('搜索');
  };
</script>
