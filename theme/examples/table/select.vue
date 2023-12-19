<template>
  <el-checkbox v-model="checkAll">全选</el-checkbox>
  <ui-table
    row-key="age"
    :is-all="checkAll"
    :reserve-selection="true"
    :table-columns="tableColumns"
    :table-data="tableData"
  />
  <ui-page
    v-model:pageSize="pageData.pageSize"
    v-model:pageNum="pageData.pageNum"
    :total-count="pageData.totalCount"
  />
</template>

<script setup>
  import { onMounted, reactive, ref, watch } from 'vue';
  import { pagination } from '@web-basic-doc/utils';

  let checkAll = ref(false);
  const tableColumns = ref([
    {
      type: 'selection',
      width: 60,
    },
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

  const data = reactive([
    {
      name: 'John Brown',
      age: 1,
      address: 'New York No. 1 Lake Park',
      date: '2016-10-03',
    },
    {
      name: 'Jim Green',
      age: 2,
      address: 'London No. 1 Lake Park',
      date: '2016-10-01',
    },
    {
      name: 'Joe Black',
      age: 3,
      address: 'Sydney No. 1 Lake Park',
      date: '2016-10-02',
    },
    {
      name: 'Jon Snow',
      age: 4,
      address: 'Ottawa No. 2 Lake Park',
      date: '2016-10-04',
    },
    {
      name: 'John Brown',
      age: 5,
      address: 'New York No. 1 Lake Park',
      date: '2016-10-03',
    },
    {
      name: 'Jim Green',
      age: 6,
      address: 'London No. 1 Lake Park',
      date: '2016-10-01',
    },
    {
      name: 'Joe Black',
      age: 7,
      address: 'Sydney No. 1 Lake Park',
      date: '2016-10-02',
    },
    {
      name: 'Jon Snow',
      age: 8,
      address: 'Ottawa No. 2 Lake Park',
      date: '2016-10-04',
    },
    {
      name: 'John Brown',
      age: 9,
      address: 'New York No. 1 Lake Park',
      date: '2016-10-03',
    },
    {
      name: 'Jim Green',
      age: 10,
      address: 'London No. 1 Lake Park',
      date: '2016-10-01',
    },
    {
      name: 'Joe Black',
      age: 11,
      address: 'Sydney No. 1 Lake Park',
      date: '2016-10-02',
    },
    {
      name: 'Jon Snow',
      age: 12,
      address: 'Ottawa No. 2 Lake Park',
      date: '2016-10-04',
    },
  ]);

  const pageData = reactive({
    pageNum: 1,
    pageSize: 10,
    totalCount: 0,
  });

  let tableData = ref([]);

  watch(
    () => pageData.pageNum,
    (val) => {
      tableData.value = pagination(data, val, pageData.pageSize);
    },
  );

  watch(
    () => pageData.pageSize,
    (val) => {
      pageData.pageNum = 1;
      tableData.value = pagination(data, pageData.pageNum, val);
    },
  );

  onMounted(() => {
    pageData.totalCount = data.length;
    tableData.value = pagination(data, pageData.pageNum, pageData.pageSize);
  });
</script>
