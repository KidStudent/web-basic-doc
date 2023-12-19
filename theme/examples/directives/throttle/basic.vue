<template>
  <Button v-throttle:click="search">搜索</Button>
</template>

<script setup>
  import { getCurrentInstance } from 'vue';

  const { proxy } = getCurrentInstance();

  const search = () => {
    proxy.$Message.info('搜索');
  };
</script>
