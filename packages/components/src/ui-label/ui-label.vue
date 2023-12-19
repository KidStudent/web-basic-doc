<template>
  <div :class="[bem.b(), required ? 'required' : '']">
    <label ref="labelRef" class="label fl" :class="{ 'mr-sm': !width }">
      <span class="label-text">{{ label }}</span>
    </label>
    <slot />
  </div>
</template>
<script setup>
  import { createNamespace } from '@web-basic-doc/utils';
  import { onMounted, watch, ref } from 'vue';
  const bem = createNamespace('label');

  defineOptions({
    name: 'ui-label',
  });

  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    // 不传入width则根据label内容设置宽度
    width: {
      type: [String, Number],
      default: null,
    },
    align: {
      type: String,
      default: 'left',
    },
  });

  const labelRef = ref(null);

  onMounted(() => {
    if (props.width) {
      if (document.body.clientWidth <= 1366) {
        labelRef.value.style.width = `${props.width}px`;
      } else {
        labelRef.value.style.width = `${
          props.width / (parseFloat(document.documentElement.style.fontSize) || 16)
        }rem`;
      }
    }
    labelRef.value.style.textAlign = props.align;
  });

  watch(
    () => props.width,
    (val) => {
      if (val) {
        if (document.body.clientWidth <= 1366) {
          labelRef.value.style.width = `${props.width}px`;
        } else {
          labelRef.value.style.width = `${
            props.width / (parseFloat(document.documentElement.style.fontSize) || 16)
          }rem`;
        }
      }
      labelRef.value.style.textAlign = props.align;
    },
  );
</script>
