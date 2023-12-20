<template>
  <div class="right-menu-wrapper" v-if="headers.length">
    <div class="right-menu-margin">
      <div class="right-menu-title">目录</div>
      <div class="right-menu-content">
        <div
          :class="['right-menu-item', 'level' + item.level, { active: item.slug === hashText }]"
          v-for="(item, i) in headers"
          :key="i"
        >
          <a :href="'#' + item.slug">{{ item.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { onMounted, watch, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { usePageData } from '@vuepress/client';
  import { jsonToArray, deepCopy } from '../utils';

  const pageData = usePageData();
  const route = useRoute();
  let hashText = ref('');
  let headers = ref([]);

  function getHashText() {
    hashText.value = decodeURIComponent(window.location.hash.slice(1));
  }

  function getHeadersData() {
    headers.value = jsonToArray(deepCopy(pageData.value.headers));
  }

  onMounted(() => {
    getHeadersData();
  });

  watch(route, () => {
    getHeadersData();
    getHashText();
  });
</script>

<style scoped lang="scss">
  $rightMenuWidth: 230px;

  .right-menu-wrapper {
    position: sticky;
    top: 0;
    float: right;
    width: $rightMenuWidth;
    margin-right: -($rightMenuWidth + 55px);
    font-size: 0.8rem;

    .right-menu-margin {
      margin-top: 4.6rem;
      overflow: hidden;
      border-radius: 3px;
    }

    .right-menu-title {
      &::after {
        display: block;
        width: 100%;
        height: 1px;
        margin-top: 10px;
        background: var(--borderColor);
        content: '';
      }
    }

    .right-menu-content {
      position: relative;
      max-height: 80vh;
      padding: 4px 3px 4px 0;
      overflow: hidden;

      &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
      }

      &::-webkit-scrollbar-track-piece {
        background: none;
      }

      &::-webkit-scrollbar-thumb:vertical {
        background-color: hsl(0deg 0% 49% / 30%);
      }

      &:hover {
        padding-right: 0;
        overflow-y: auto;
      }

      .right-menu-item {
        position: relative;
        padding: 4px 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &.level2 {
          font-size: 0.8rem;
        }

        &.level3 {
          padding-left: 27px;
        }

        &.level4 {
          padding-left: 37px;
        }

        &.level5 {
          padding-left: 47px;
        }

        &.level6 {
          padding-left: 57px;
        }

        &.active {
          &::before {
            position: absolute;
            top: 5px;
            left: 0;
            width: 3px;
            height: 14px;
            background: var(--c-text-accent);
            border-radius: 0 4px 4px 0;
            content: '';
          }

          a {
            color: var(--c-text-accent);
            opacity: 1;
          }
        }

        a {
          display: inline-block;
          width: 100%;
          overflow: hidden;
          color: var(--textColor);
          text-overflow: ellipsis;
          white-space: nowrap;
          opacity: 0.75;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
