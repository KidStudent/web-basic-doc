<template>
  <ui-page
    v-model:page-num="pageData.pageNum"
    v-model:page-size="pageData.pageSize"
    :total-count="pageData.totalCount"
    @changePage="changePage"
    @changePageSize="changePageSize"
  />
</template>

<script setup>
  import { reactive } from 'vue';

  const pageData = reactive({
    totalCount: 1000,
    pageNum: 1,
    pageSize: 20,
  });

  const changePage = (pageNum) => {
    console.log(`pageNum: ${pageNum}`);
  };

  const changePageSize = (pageSize) => {
    console.log(`pageSize: ${pageSize}`);
  };
</script>
