<template>
  <span> {{ text }} </span>
  <Button style="margin-left: 10px" v-copy="text">复制上面的文本</Button>
</template>

<script setup>
  const text = '复制的文本';
</script>
