<template>
  <Button @click="showConfirm">函数式弹框</Button>
</template>

<script setup>
  import { getCurrentInstance } from 'vue';

  const { proxy } = getCurrentInstance();

  const showConfirm = async () => {
    try {
      await proxy.$UiConfirm({ content: '函数式弹框', title: '弹框' });
      proxy.$Message.success('确定');
    } catch (err) {
      proxy.$Message.info('取消');
    }
  };
</script>
