<template>
  <ui-label :label="label" :width="200">
    <el-input class="width-sm" v-model="username" placeholder="请输入用户名" />
  </ui-label>
</template>

<script setup>
  import { ref } from 'vue';

  const label = '用户名';
  const username = ref('');
</script>
