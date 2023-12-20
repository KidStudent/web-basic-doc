<template>
  <aside class="sidebar-zml">
    <ul class="sidebar-items-zml">
      <li class="sidebar-items-zml" v-for="(item, index) in sidebarList" :key="index">
        <p class="sidebar-item-zml sidebar-heading">{{ item.text }}</p>
        <ul v-for="(child, childIndex) in item.children" :key="childIndex">
          <li>
            <RouterLink
              :class="['sidebar-item-zml', child.link === route.path ? 'active' : '']"
              :to="child.link"
              >{{ child.text }}</RouterLink
            >
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { useSidebarItems } from '../hooks/index';

  const route = useRoute();
  const sidebarList = useSidebarItems();
</script>

<style scoped lang="scss">
  .sidebar-zml {
    position: fixed;
    top: var(--navbar-height);
    bottom: 0;
    left: 0;
    z-index: 10;
    width: var(--sidebar-width);
    margin: 0;
    overflow-y: auto;
    font-size: 16px;
    background-color: var(--c-bg-sidebar);
    border-right: 1px solid var(--c-border);
    box-sizing: border-box;
    transition: transform var(--t-transform), background-color var(--t-color),
      border-color var(--t-color);
    scrollbar-width: thin;
    scrollbar-color: var(--c-brand) var(--c-border);

    .sidebar-items-zml {
      padding: 1.5rem 0;

      .sidebar-item-zml {
        color: var(--c-text);
        cursor: default;
        border-left: 0.25rem solid transparent;

        &.sidebar-heading {
          width: 100%;
          padding: 0.35rem 1.5rem 0.35rem 1.25rem;
          margin: 0;
          font-size: 1.1em;
          font-weight: 700;
          box-sizing: border-box;
          transition: color 0.15s ease;
        }

        &:not(.sidebar-heading) {
          display: inline-block;
          width: 100%;
          padding: 0.35rem 1rem 0.35rem 2rem;
          margin: 0;
          font-size: 1em;
          font-weight: 400;
          line-height: 1.4;
          box-sizing: border-box;
        }

        &.active:not(p.sidebar-heading) {
          font-weight: 600;
          color: var(--c-text-accent);
          border-left-color: var(--c-text-accent);
        }
      }

      a.sidebar-item-zml {
        cursor: pointer;

        &:hover {
          color: var(--c-text-accent);
        }
      }
    }
  }
</style>
