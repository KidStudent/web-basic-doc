---
title: 常见问题
date: 2022-11-29
permalink: /guide/FAQ/
---

# 常见问题

## 项目出现报错 `Access is denied`（`windows` 常见）

解决办法：请遵循平台要求，安装对应的 `node` 和 `pnpm` 版本 ( `node` 16 版本及以上、`pnpm` 6 版本及以上)

## 项目首次启动 `cmd` 中出现错误 Cannot assign to "xxx" because it is a constant

![FAQ-error](/images/guide/FAQ/FAQ-error.png)

声明对象时使用了 `const` 但是又更改了它的值，使用 `let` 代替它

## 项目警告 `Invalid watch source`

![FAQ-watch-warning](/images/guide/FAQ/FAQ-watch-warning.png)

`vue3` watch 函数必须监听的是 `getter/effect function, a ref, a reactive object, or an array of these types` 举个:chestnut:

::: details 点击查看

```vue
<script setup>
import { watch } from 'vue'
const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
})

// 错误示例
watch(props.isCollapsed, () => {})

// 正确示例
watch(
  () => props.isCollapsed,
  () => {}
)
</script>
```

:::

## `vue3` 的 `<script setup>` 写法，虽然会依据它的文件名来自动推断组件名称 `name`，但这也约束了我们的写法，不算灵活，如何解决？

[unplugin-vue-define-options](https://www.npmjs.com/package/unplugin-vue-define-options) 可以在一个 `setup` 里加入 `name` ，很方便。用法如下

```vue
<script setup>
defineOptions({
  name: 'ui-menu',
})
</script>
```

## `$ref` 语法糖不起作用

:::warning 警告
Vue 3.4 及以上版本中被移除，最新的前端框架中已弃用
:::

响应性语法糖目前默认是关闭状态，需要你显式选择启用。。

官方解答 [显式启用](https://cn.vuejs.org/guide/extras/reactivity-transform.html#explicit-opt-in)

## `$children` 不存在怎么办？

可以在父组件中声明一个数组通过 `provide` 注入，在子组件中通过 `inject` 获取后，在 `Onmounted`中 向数组中添加子组件中的方法或者属性，这样在父组件中就可以获取到子组件中的方法或者属性了。下面是一个:chestnut:

ui-menu.vue

::: details 点击查看

```vue
<script setup>
import { reactive, provide } from 'vue'
let menuItemSlot = reactive([])
provide('UiMenu', reactive({ menuItemSlot }))
</script>
```

:::

menu-item.vue

::: details 点击查看

```vue
<script setup>
import { inject, onMounted, reactive } from 'vue'
import { getUUID } from '@/utils/common'

defineOptions({
  name: 'menu-item',
})

const props = defineProps({
  name: {
    required: true,
    type: String,
  },
})

let active = $ref(false)

const rootMenu = inject('UiMenu')
const id = getUUID()

function handleUpdateActiveName(name) {
  if (props.name === name) {
    active = true
  } else {
    active = false
  }
}

onMounted(() => {
  const menuItem = reactive({
    id: id,
    name: props.name,
    handleUpdateActiveName,
  })
  rootMenu.menuItemSlot.push(menuItem)
})
</script>
```

:::

## 通过 `createApp` 方法创建的组件无法识别全局组件

由于通过 `createApp` 创建的组件并不是在 APP 下进行渲染，无法使用 APP 下的环境（全局组件，全局指令，原型属性函数）

所以当需要用到其他组件等，需要再次引入

## `jsx` 创建的组件样式不起作用

由于在 `vue3` 中带有 `scoped` 的 style 标签只能作用域 vue 文件。所以这里需要用到 [CSS Modules](https://cn.vuejs.org/api/sfc-css-features.html#css-modules)

具体例子可参考 [src/components/ui-confirm/index.vue](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/components/ui-confirm/index.vue#L54)

## `v-model` 在 `vue3` 中的更改

见[官方示例](https://cn.vuejs.org/guide/components/events.html#usage-with-v-model)

## 404 路由必要性

如果没有对不存在的路由进行匹配，登录系统会有如下警告：

![FAQ-router-warning](/images/guide/FAQ/FAQ-router-warning.png)

这是由于系统中的路由是由后端生成的，初始化未登录时还没有在路由列表中生成路由造成的，这时需要由一个 [404 路由匹配](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-not-found-%E8%B7%AF%E7%94%B1)

此时会有一个问题，登录系统后由于还未动态生成其他路由，系统会跳转到 404 路由，动态添加路由成功后未继续跳转真正需要跳转的路由，需要在 `全局路由警卫` 中跳转，以下为[核心代码](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L95)

::: details 点击查看

```javascript
/**
 * 由于路由是动态创建的，初次进入时还未载入，这时会进入到404页面中
 * 路由动态添加完成后需要重新载入要进入的路由，
 * 如果是重定向路由，从缓存的路由列表中找到需要重定向进入的路由
 * 如果是指定路由则替换即可
 */
if (to.name === '/') {
  const redirectRoute = accessRoutes.find((row) => row.name === '/')
  next({
    ...redirectRoute,
    replace: true,
  })
} else {
  next({
    path: to.fullPath,
    replace: true,
    query: to.query,
  })
}
```

:::
