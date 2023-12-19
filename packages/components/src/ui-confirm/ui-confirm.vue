<template>
  <ui-confirm :class="bem.b()" />
</template>
<script lang="jsx" setup>
  import { ref, onMounted } from 'vue';
  import Button from 'view-ui-plus/src/components/button';
  import UiModal from '@/src/ui-modal/ui-modal.vue';
  import { createNamespace } from '@web-basic-doc/utils';
  const bem = createNamespace('confirm');

  defineOptions({
    name: 'ui-confirm',
  });
  const props = defineProps({
    visible: {
      type: Boolean,
    },
    content: {
      type: String,
    },
    title: {
      type: String,
    },
    okText: {
      type: String,
    },
    render: {
      type: Function,
    },
    callback: {
      type: Function,
      default: () => {},
    },
  });

  let visible = ref(false);
  let loading = ref(false);

  function onCancel() {
    visible.value = false;
    props.callback(false);
  }

  async function onOk() {
    loading.value = true;
    await props.callback(true);
    visible.value = false;
    loading.value = false;
  }

  const UiConfirm = () => {
    const contentDom = props.render ? (
      props.render()
    ) : (
      <span>
        <i class={['icon-font icon-jinggao', 'warning']}></i>
        <span class={'desc'}>{props.content}</span>
      </span>
    );
    return (
      <UiModal vModel={visible.value} loading={loading.value} title={props.title} ref="modal">
        {{
          default: () => <div class={'content-wrapper'}>{contentDom}</div>,
          footer: () => [
            <Button
              onClick={() => {
                onCancel();
              }}
              class="plr-30"
            >
              取 消
            </Button>,
            <Button
              type="primary"
              onClick={() => {
                onOk();
              }}
              loading={loading.value}
              class="plr-30"
            >
              <span>{props.okText}</span>
            </Button>,
          ],
        }}
      </UiModal>
    );
  };

  onMounted(() => {
    visible.value = props.visible;
  });
</script>
