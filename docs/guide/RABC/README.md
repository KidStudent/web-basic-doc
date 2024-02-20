---
title: RABC权限
date: 2022-11-24
permalink: /guide/RABC/
---

# RABC 权限

`RABC` （Role Based Access Control）权限指的是基于角色的访问控制

![RABC-introduce](/images/guide/RABC/RABC-introduce.png)

## 用户

在 `系统管理` 中创建用户，并且关联角色

## 角色

在 `系统管理` 中创建角色，并且配置权限

## 权限

整体分为 [粗粒度权限](#粗粒度权限) 和 [细粒度权限](#细粒度权限)

### 粗粒度权限

#### 菜单权限

登录时由后端返回有权限的菜单路由 [动态添加到路由列表中](/guide/routerMenu/#动态添加路由)

#### 按钮权限

通过 [v-permission](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/directives/permission.js) 指令实现

##### 传参解析

| **参数属性** | **说明**         | **类型**  | **是否必传** |
| ------------ | ---------------- | --------- | ------------ |
| `route`      | 接口所在菜单路由 | `string`  | 是           |
| `permission` | 权限标识         | `string`  | 是           |
| `mutually`   | 是否互斥         | `boolean` | 否           |

##### 如何使用

第一步：在 `系统管理` 中添加按钮权限，如下图所示

![RABC-btn-permission](/images/guide/RABC/RABC-btn-permission.png)

| **参数属性** | **说明**          | **是否必填** |
| ------------ | ----------------- | ------------ |
| `按钮名称`   | 中文名称          | 是           |
| `权限标识`   | route-permission  | 是           |
| `资源编码`   | 随意填写 3 位数字 | 否           |
| `操作类型`   | 操作类型          | 否           |
| `接口地址`   | 完整接口地址      | 否           |

第二部：在 vue 文件中使用，举个:chestnut:

```vue
<Button
  type="primary"
  v-permission="{
    route: 'login',
    permission: 'add',
  }"
>
  在login页面 有 'add' 权限可见
</Button>
```
