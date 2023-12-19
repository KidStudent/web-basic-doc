<template>
  <Home v-if="frontmatter.home" />
  <ParentLayout v-else>
    <template #page>
      <sidebar />
      <main class="page">
        <div class="custom-wrapper">
          <rightMenu />
          <div class="theme-default-content">
            <Content />
          </div>
          <PageMeta />
          <PageNav />
        </div>
      </main>
    </template>
  </ParentLayout>
</template>

<script setup>
  import Home from '@vuepress/theme-default/components/Home.vue';
  import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue';
  import PageMeta from '@theme/PageMeta.vue';
  import PageNav from '@theme/PageNav.vue';
  import { usePageFrontmatter } from '@vuepress/client';
  import rightMenu from '../components/right-menu/index.vue';
  import sidebar from '../components/sidebar/index.vue';

  const frontmatter = usePageFrontmatter();
</script>

<style lang="css">
  .page {
    padding-right: 250px;
  }

  .custom-wrapper {
    max-width: 1100px;
    margin: 0 auto;
  }
</style>
