---
title: 布局
date: 2022-12-21
permalink: /component-library/layout/
---

# 布局

本组件库已经在 `@web-basic-doc/theme-chalk/common.scss` 中声明了五个尺寸：mini、xs、sm、md 和 lg。

适用于 `width`、`margin`、`padding`。

# 属性

## margin & padding

| 属性名 | 说明 |
| ------ | ---- |
| mini   | 3px  |
| xs     | 5px  |
| sm     | 10px |
| md     | 15px |
| lg     | 20px |

## width

| 属性名 | 说明  |
| ------ | ----- |
| mini   | 80px  |
| xs     | 120px |
| sm     | 150px |
| md     | 200px |
| lg     | 230px |

# 如何使用

如果需要为一个 Dom 左侧添加 10px 的 `margin` 和 150px 的 `width` 则只需添加 `class` 为 `ml-sm`，其中 `m` 为 margin，`l` 为 `left`，`sm` 为属性名。举个:chestnut:

```vue
<div class="ml-sm width-sm"></div>
```
