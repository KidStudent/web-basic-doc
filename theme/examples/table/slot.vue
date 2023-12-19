<template>
  <ui-table :table-columns="tableColumns" :table-data="tableData">
    <template #address="{ row }">
      <span>{{ row.name }} is {{ row.address }}</span>
    </template>
  </ui-table>
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
      slot: 'address',
    },
  ]);

  const tableData = ref([
    {
      name: 'John Brown',
      age: 18,
      address: 'New York No. 1 Lake Park',
    },
    {
      name: 'Jim Green',
      age: 24,
      address: 'London No. 1 Lake Park',
    },
    {
      name: 'Joe Black',
      age: 30,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      name: 'Jon Snow',
      age: 26,
      address: 'Ottawa No. 2 Lake Park',
    },
  ]);
</script>
