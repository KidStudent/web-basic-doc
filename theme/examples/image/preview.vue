<template>
  <div>
    <ui-image
      class="mr-lg"
      v-for="url in urlList"
      width="100px"
      height="100px"
      :src="url"
      :key="url"
      :url-list="urlList"
    />
  </div>
</template>

<script setup>
  import demo1 from '/images/image/demo1.jpg';
  import demo2 from '/images/image/demo2.jpg';
  import demo3 from '/images/image/demo3.jpg';

  const urlList = [demo1, demo2, demo3];
</script>
