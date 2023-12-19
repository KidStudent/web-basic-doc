<template>
  <div ref="tipsRef" :class="bem.b()">
    <p class="title mb-xs">
      <i class="icon-font icon-jinggao orange-color mr-xs f-12" style="color: #e2872b" />
      <span class="orange-color" style="color: #e2872b">温馨提示</span>
      <i class="icon-guanbi icon-font close fr pointer" @click="closeTips" />
    </p>
    <p>还有更多隐藏内容,</p>
    <p>请左右滑动查看哦！</p>
  </div>
</template>
<script setup>
  import { createNamespace } from '@web-basic-doc/utils';
  const bem = createNamespace('table-tips');

  const props = defineProps({
    xclose: {
      type: Function,
      default: () => {},
    },
  });

  const closeTips = () => {
    props.xclose();
  };
</script>
