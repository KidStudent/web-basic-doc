---
title: Table 表格
date: 2022-12-20
permalink: /component-library/table/
---

# 表格

用于展示多条结构类似的数据。本组件基于 [View Design Table](https://www.iviewui.com/view-ui-plus/component/form/table) 封装。

## 基础用法

`table-data` 为数据，`table-column` 为列。

:::demo
table/basic
:::

## 插槽传入

`tableColumn` 中设置某一列 `slot` 的值，在 `ui-table` 中传入对应插槽为 `slot` 的值即可。`slot` 的参数有 3 个：当前行数据 `row`，当前列数据 `column`，当前行序号 `index`。

:::demo
table/slot
:::

## 设置最大高度

设置 `max-height` 超出高度将滚动。

:::demo
table/scroll
:::

## 根据上下文自适应高度

需要设置其父级元素 `height: 100%; display: flex; flex-direction: column; flex: 1;`

给 `ui-table` 设置 `display: flex; flex-direction: column; flex: 1;`

此处已经通过公用 `class` 设置 css

:::demo
table/autofill
:::

## 翻页选中

全选所有页传入 `is-all` 为 `true` 即可，全选所有页之后禁止取消选中单项。需要配合 `reserve-selection` 属性一起使用，设置为 `true` 将启用翻页勾选，`row-key` 默认值为 `id` 作为翻页选中的标识符。

:::demo
table/select
:::

## 属性

| 属性名            | 说明                                                                                  | 类型    | 可选值 | 默认值 |
| ----------------- | ------------------------------------------------------------------------------------- | ------- | ------ | ------ |
| table-columns     | 表格列的配置描述                                                                      | array   | ——     | ——     |
| table-data        | 显示的结构化数据                                                                      | array   | ——     | ——     |
| loading           | 加载中                                                                                | boolean | ——     | false  |
| max-height        | 最大高度                                                                              | number  | ——     | ——     |
| reserve-selection | 是否开启翻页选中                                                                      | boolean | ——     | false  |
| row-key           | 配合 reserve-selection 使用，作为翻页选中的标识符                                     | string  | ——     | id     |
| default-storeData | 配合 reserve-selection 使用，默认选中的数据                                           | array   | ——     | ——     |
| is-all            | 配合 reserve-selection 使用，全选所有页                                               | boolean | ——     | false  |
| special-jsx       | 空数据显示的内容                                                                      | string  | ——     | ——     |
| special-jsx       | 空数据显示的内容                                                                      | string  | ——     | ——     |
| 透传属性          | 见 [View Design Table](https://www.iviewui.com/view-ui-plus/component/form/table#API) | ——      | ——     | ——     |

## 事件

| 事件名              | 说明                                                                                  | 参数                                        |
| ------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------- |
| cancelSelectTable   | 取消选中某一项                                                                        | `selection` 已选项数据 `row` 取消选择的数据 |
| storeSelectList     | 配合 reserve-selection 使用                                                           | `storeSelectTable` 翻页选中的数据           |
| cacelAllSelectTable | 点击取消全选时触发                                                                    | `selection` 已选项数据                      |
| onSelectAllTable    | 点击全选时触发                                                                        | `selection` 已选项数据                      |
| oneSelected         | 选中某一项                                                                            | `selection` 已选项数据 `row` 刚选择的项数据 |
| 透传事件            | 见 [View Design Table](https://www.iviewui.com/view-ui-plus/component/form/table#API) | ——                                          |

## 插槽

| 名称 | 说明                                      |
| ---- | ----------------------------------------- |
| ——   | 对应 `table-columns` 单个项中 `slot` 的值 |
