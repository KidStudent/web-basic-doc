<template>
  <ui-page
    v-model:page-num="pageData.pageNum"
    v-model:page-size="pageData.pageSize"
    :total-count="pageData.totalCount"
    :has-last="false"
  />
</template>

<script setup>
  import { reactive } from 'vue';

  const pageData = reactive({
    totalCount: 1000,
    pageNum: 1,
    pageSize: 20,
  });
</script>
