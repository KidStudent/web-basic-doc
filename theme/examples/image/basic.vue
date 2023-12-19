<template>
  <div class="over-flow">
    <div v-for="fit in fitList" :key="fit" class="fl mr-lg">
      <ui-image width="100px" height="100px" :src="demo1" :fit="fit" />
      <p class="t-center">{{ fit }}</p>
    </div>
    <div class="fl mr-lg">
      <ui-image
        width="100px"
        height="100px"
        src="https://file.iviewui.com/images/image-demo-30.jpg"
        error-src="https://file.iviewui.com/images/image-demo-2.jpg"
        load-src="https://file.iviewui.com/images/image-demo-3.jpg"
      />
      <p class="t-center">显示loadSrc和errorSrc</p>
    </div>
  </div>
</template>

<script setup>
  import demo1 from '/images/image/demo1.jpg';

  const fitList = ['fill', 'contain', 'cover', 'none', 'scale-down'];
</script>
