<template>
  <div class="content">
    <div class="height-full auto-fill">
      <div class="mb-sm">
        <ui-label label="设备名称">
          <el-input class="width-sm" />
        </ui-label>
      </div>
      <ui-table class="auto-fill" :table-columns="tableColumns" :table-data="tableData" />
      <ui-page :total-count="tableData.length" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const tableColumns = ref([
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Age',
      key: 'age',
    },
    {
      title: 'Address',
      key: 'address',
    },
  ]);

  const tableData = ref([
    {
      name: 'John Brown',
      age: 18,
      address: 'New York No. 1 Lake Park',
      date: '2016-10-03',
    },
    {
      name: 'Jim Green',
      age: 24,
      address: 'London No. 1 Lake Park',
      date: '2016-10-01',
    },
    {
      name: 'Joe Black',
      age: 30,
      address: 'Sydney No. 1 Lake Park',
      date: '2016-10-02',
    },
    {
      name: 'Jon Snow',
      age: 26,
      address: 'Ottawa No. 2 Lake Park',
      date: '2016-10-04',
    },
  ]);
</script>
<style lang="scss" scoped>
  .content {
    height: 500px;
  }
</style>
