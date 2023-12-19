<template>
  <Button v-throttle:click="{ fun: search, delay: 2000 }">搜索</Button>
</template>

<script setup>
  import { getCurrentInstance } from 'vue';

  const { proxy } = getCurrentInstance();

  const search = () => {
    proxy.$Message.info('搜索');
  };
</script>
