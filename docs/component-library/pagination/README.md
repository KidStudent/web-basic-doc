---
title: Page 分页
date: 2022-12-08
permalink: /component-library/pagination/
---

# 分页

当数据量较多时，使用分页可以快速进行数据切换。

## 基础用法

设置 `pageData` 其中 `totalCount` 为总条数, `pageSize` 为一页展示多少条数据, `pageNum` 为当前页码

:::demo
pagination/basic
:::

## 小型分页

在空间有限的情况下，可以使用简单的小型分页。设置 `simple-page` 可以使分页变小。

:::demo
pagination/small-pagination
:::

## 不显示最后一页

当数据量过大时，可以选择隐藏最后一页。设置 `has-last` 为 `false` 可以隐藏最后一页

:::demo
pagination/nolast
:::

## 属性

| 属性名      | 说明                                           | 类型          | 可选值                                     | 默认值                                                                                                                                     |
| ----------- | ---------------------------------------------- | ------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| total-count | 总页码                                         | number        | ——                                         | ——                                                                                                                                         |
| page-num    | 当前页数，支持 v-model 双向绑定                | number        | ——                                         | ——                                                                                                                                         |
| page-size   | 每页显示条目个数，支持 v-model 双向绑定        | number        | ——                                         | ——                                                                                                                                         |
| simple-page | 是否小型分页                                   | boolean       | ——                                         | false                                                                                                                                      |
| has-last    | 是否显示最后一页                               | boolean       | ——                                         | true                                                                                                                                       |
| transfer    | 是否将弹层放置于 body 内，它将不受父级样式影响 | boolean       | ——                                         | false                                                                                                                                      |
| page-list   | 每页条数切换的配置                             | array[object] | [(label: '展示的名称', value: '具体的值')] | [{ label: '10 条/页', value: 10 }, { label: '20 条/页', value: 20 }, { label: '50 条/页', value: 50 }, { label: '100 条/页', value: 100 }] |

## 事件

| 事件名         | 说明                 | 参数       |
| -------------- | -------------------- | ---------- |
| changePage     | page-num 改变时触发  | 新当前页   |
| changePageSize | page-size 改变时触发 | 新每页条数 |
