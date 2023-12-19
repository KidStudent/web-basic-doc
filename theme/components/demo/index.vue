<script setup>
  import { computed, getCurrentInstance } from 'vue';
  import { useClipboard, useToggle } from '@vueuse/core';

  import Example from './example.vue';
  import SourceCode from './source-code.vue';

  const [sourceVisible, toggleSourceVisible] = useToggle();
  const props = defineProps({
    // 高亮的源码
    source: {
      type: String,
    },
    // 文件地址
    path: {
      type: String,
    },
    // 剪切板需要复制的源码
    rawSource: {
      type: String,
    },
  });

  const vm = getCurrentInstance();
  const { copy, isSupported } = useClipboard({
    source: decodeURIComponent(props.rawSource),
    read: false,
  });

  const copyCode = async () => {
    const { $Message } = vm.appContext.config.globalProperties;
    if (!isSupported) {
      $Message.error('不支持复制');
    }
    try {
      await copy();
      $Message.success('复制成功');
    } catch (e) {
      $Message.error(e.message);
    }
  };

  const formatPathDemos = computed(() => {
    const demosGlob = import.meta.globEager(`../../examples/**/*.vue`);
    const demos = {};
    Object.keys(demosGlob).forEach((key) => {
      demos[key.replace('../../examples/', '').replace('.vue', '')] = demosGlob[key].default;
    });
    return demos;
  });
</script>

<template>
  <div class="example">
    <Example :demo="formatPathDemos[path]" />
    <div class="divider" />
    <div class="op-btns">
      <ElTooltip content="复制代码" :show-arrow="false">
        <ElIcon :size="16" class="op-btn" @click="copyCode"> <ElIconCopyDocument /> </ElIcon>
      </ElTooltip>
      <ElTooltip content="查看源代码" :show-arrow="false">
        <ElIcon :size="16" class="op-btn" @click="toggleSourceVisible()"> <ElIconReading /></ElIcon>
      </ElTooltip>
    </div>
    <ElCollapseTransition>
      <SourceCode v-show="sourceVisible" :source="source" />
    </ElCollapseTransition>
    <Transition name="el-fade-in-linear">
      <div v-show="sourceVisible" class="example-float-control" @click="toggleSourceVisible(false)">
        <span>隐藏源代码</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
  .example {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-base);

    .divider {
      display: block;
      width: 100%;
      height: 1px;
      border-top: 1px solid var(--border-color);
    }

    .op-btns {
      display: flex;
      height: 2.5rem;
      padding: 0.5rem;
      align-items: center;
      justify-content: flex-end;

      .op-btn {
        margin: 0 0.5rem;
        color: var(--text-color-lighter);
        cursor: pointer;
        transition: 0.2s;

        &.github a {
          color: var(--text-color-lighter);
          transition: 0.2s;

          &:hover {
            color: var(--text-color);
          }
        }
      }
    }
  }

  .example-float-control {
    position: sticky;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: flex;
    height: 44px;
    margin-top: -1px;
    color: #909399;
    cursor: pointer;
    background-color: var(--bg-color, #fff);
    border-top: 1px solid var(--border-color);
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
  }
</style>
