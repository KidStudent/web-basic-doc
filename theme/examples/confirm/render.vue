<template>
  <Button @click="showConfirm">函数式弹框</Button>
</template>

<script lang="jsx" setup>
  import { getCurrentInstance } from 'vue';
  import pkg from 'view-ui-plus';
  const { Button } = pkg;

  const { proxy } = getCurrentInstance();

  const showConfirm = async () => {
    try {
      await proxy.$UiConfirm({
        title: 'render加载',
        render: () => {
          return (
            <div>
              <Button type="primary">按钮</Button>
            </div>
          );
        },
      });
      proxy.$Message.success('确定');
    } catch (err) {
      proxy.$Message.info('取消');
    }
  };
</script>
