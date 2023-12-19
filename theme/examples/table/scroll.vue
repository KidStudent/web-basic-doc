<template>
  <Button class="mb-sm" @click="add">添加数据</Button>
  <ui-table
    :table-columns="tableColumns"
    :table-data="tableData"
    :max-height="300"
    :table-scroll="true"
  />
</template>

<script setup>
  import { reactive, ref } from 'vue';

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

  const tableData = reactive([
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
  ]);

  const add = () => {
    tableData.push({
      name: 'Jon Snow',
      age: 26,
      address: 'Ottawa No. 2 Lake Park',
      date: '2016-10-04',
    });
  };
</script>
