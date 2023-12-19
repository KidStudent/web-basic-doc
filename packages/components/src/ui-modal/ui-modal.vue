<template>
  <Modal
    v-model="modalShow"
    :class-name="computedClass"
    :title="title"
    :footer-hide="footerHide"
    :mask-closable="false"
    :transfer="false"
    :transition-names="[]"
    :draggable="draggable"
    sticky
    reset-drag-position
    @on-cancel="onCancel"
  >
    <template #header>
      <slot name="header" />
    </template>
    <slot />
    <template #footer>
      <slot name="footer">
        <Button class="plr-30" @click="onCancel"> 取 消 </Button>
        <Button class="plr-30" type="primary" :loading="loading" @click="query"> 确 定 </Button>
      </slot>
    </template>
  </Modal>
</template>
<script setup>
  import { ref, watch, computed } from 'vue';
  import Button from 'view-ui-plus/src/components/button';
  import Modal from 'view-ui-plus/src/components/modal';
  import { createNamespace } from '@web-basic-doc/utils';
  const bem = createNamespace('modal');

  defineOptions({
    name: 'UiModal',
  });
  const props = defineProps({
    modelValue: Boolean,
    title: {},
    footerHide: {
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    classCustom: {
      type: String,
      default: '',
    },
  });

  let modalShow = ref(false);

  const emit = defineEmits(['onCancel', 'query', 'update:modelValue']);
  const computedClass = computed(
    () => `${bem.b()} ${props.draggable ? 'drag-modal' : null} ${props.classCustom}`,
  );

  function onCancel() {
    modalShow.value = false;
    emit('onCancel');
  }

  const query = () => {
    emit('query');
  };

  watch(
    () => modalShow.value,
    (val) => {
      emit('update:modelValue', val);
    },
  );

  watch(
    () => props.modelValue,
    (val) => {
      modalShow.value = val;
    },
    {
      immediate: true,
    },
  );
</script>
