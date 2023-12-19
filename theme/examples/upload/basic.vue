<template>
  <Button @click="clickBtn" class="btn-box">可触发上传组件的点击事件</Button>
  <Button @click="clearFn" class="clear-box">清空图片</Button>
  <br />
  <ui-upload-img ref="uploadImg" @on-choose="uploadSuccess" :default-list="defaultUploadList" />
</template>

<script setup>
  import { ref } from 'vue';
  let defaultUploadList = ref(['https://file.iviewui.com/images/image-demo-1.jpg']);
  const uploadSuccess = (data) => {
    console.log(data, '上传成功的图片');
  };
  const uploadImg = ref(null);
  const clickBtn = () => {
    uploadImg.value.handleClick();
  };
  const clearFn = () => {
    uploadImg.value.clear();
  };
</script>
<style scoped>
  .btn-box {
    width: 200px;
  }

  .clear-box {
    width: 100px;
    margin: 20px;
  }
</style>
