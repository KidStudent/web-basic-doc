---
title: 路由和菜单
date: 2022-11-21
permalink: /guide/router-menu/
---

# 路由和菜单

## 系统中如何生成路由菜单

### 配置项

```js
const router = {
  path: '/examples', //路由地址 ·必填·
  name: 'examples', //路由名字与组件中的`name` 保持一致 ·必填·
  text: '组件库', //展示名称 ·必填·
  id: 1024, //id不可重复 ·必填·
  parentId: null, //父级菜单id ·可选·
  component: '', //对应的组件 ·可选·
  iconName: 'zichanzhongxin', //菜单图标 ·可选·
  isExternalLink: false, //是否外部网站链接 如果是外部网站链接可以在nav-header中额外处理 ·可选·
}
```

### 静态路由

在 `src/router/index.js` 中可以直接添加，也可以在 `src/stores/modules/permission.js`中按需引入，例如 `examplesRoutes`

### 动态路由

在 `系统管理` 中添加，找到对应的应用系统，新增模块，如下图

![add-router-dynamic](/images/guide/routerMenu/add-router-dynamic.png)

```
父层级 —— 同配置项parentId
层级名称 —— 同配置项name
资源编码 —— 可随意填写，只要没有报重复即可
权限标识 —— 用来做权限控制一般与name保持一致，具体使用方法见 权限章节
路由地址 —— 同配置项component
是否外链 —— 同配置项isExternalLink
图标 —— 同配置项iconName
```

在 `src/router/guard.js` 路由钩子函数中，调用 `src/stores/modules/permission.js` 中的 `setRouterList` 方法从后端获取菜单路由并处理一部分字段

[guard.js](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L96)

```javascript{3-5,7-10}
async function _getRoutes(to, from, next) {
  try {
    const permissionStore = usePermissionStore();
    await permissionStore.setRouterList();
    const accessRoutes = getAsyncRoutes(permissionStore.routerList);
    if (accessRoutes.length > 0) {
      // 动态添加格式化过的路由
      accessRoutes.forEach((route) => {
        router.addRoute(route);
      });

      /**
       * 如果有重定向路由则直接跳转到重定向
       */
      const query = to.query;
      const redirect = to.query.redirect;
      if (redirect) {
        delete query.redirect;
        next({
          path: redirect,
          query: query,
          replace: true,
        });
        return;
      }
      /**
       * 由于路由是动态创建的，初次进入时还未载入，这时会进入到404页面中
       * 路由动态添加完成后需要重新载入要进入的路由，
       * 如果是重定向路由，从缓存的路由列表中找到需要重定向进入的路由
       * 如果是指定路由则替换即可
       */
      if (to.name === '/') {
        const redirectRoute = accessRoutes.find((row) => row.name === '/');
        next({
          ...redirectRoute,
          query: query,
          replace: true,
        });
      } else if (to.name === 'login') {
        next({
          name: '/',
        });
      } else {
        next({
          path: to.fullPath,
          query: to.query,
          replace: true,
        });
      }
    } else {
      Message.warning('该用户未分配菜单权限,请联系管理员分配！');
      if (to.name === 'login') {
        next();
      } else {
        next({
          name: 'login',
        });
      }
    }
  } catch (err) {
    console.log(err, 'err');
    next({
      name: 'login',
    });
  }
}
```

[permission.js](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/stores/modules/permission.js#L34)

```javascript
async setRouterList() {
  try {
    const commonStore = UseCommonStore();
    const userStore = useUser();
    const examples = useExamplesRoutes();
    // 获取菜单信息等
    const res = await userStore.getUserInfo();
    // 只返回页面或模块菜单
    const menus = res.data.data.resourceVoList.filter(
      (row) => row.resourceType === '1' || row.resourceType === '2',
    );
    const datascopeVoList = res.data.data.datascopeVoList;
    const permissions = res.data.data.permissions;
    this.routerList = menus.map((row) => {
      return {
        path: row.componentUrl || `/${row.resourceUrl}`,
        name: row.resourceUrl,
        text: row.resourceCname,
        id: row.id,
        parentId: row.parentId,
        component: row.componentUrl || `/${row.resourceUrl}`, //路由对应文件
        iconName: geticonClassName(row.iconUrl), //菜单图标
        isExternalLink: row.isExternalLink, //是否外部网站链接
      };
    });

    if (isDev) {
      this.routerList = [...this.routerList, ...examples.routerList];
    }

    this.routerTreeList = arrayToJson(deepCopy(this.routerList), 'id', 'parentId');
    this.permissions = permissions;
    commonStore.setOrganizationList(datascopeVoList);
  } catch (err) {
    console.log(err);
  }
}
```

然后通过 `src/router/asyncRouter.js` 处理获取到的菜单路由列表，将字段转化为 `vue-router` 所需的字段，并生成重定向路由

`asyncRouter.js`

```javascript
const modules = import.meta.glob('../views/**/*.vue')
// 引入路由文件这种的公共路由
export function getAsyncRoutes(routes) {
  const res = []
  // 定义路由中需要的自定名
  const keys = ['path', 'name', 'children', 'redirect', 'meta']
  // 遍历路由数组去重组可用的路由
  routes.forEach((item) => {
    const newItem = {}
    newItem.component = modules[`../views${item.component}/index.vue`]
    for (const key in item) {
      if (keys.includes(key)) {
        newItem[key] = item[key]
      }
    }

    const hasChild = routes.findIndex((row) => row.parentId === item.id)
    // 若遍历的当前路由存在子路由，需要对子路由进行递归遍历
    if (hasChild !== -1) {
      let redirect = getRedirect(routes, item)
      newItem.redirect = {
        name: redirect,
      }
    }
    res.push(newItem)
  })
  // 动态添加重定向路由
  res.length &&
    res.push({
      path: '/',
      name: '/',
      redirect: {
        name: res[0].name,
      },
    })
  // 返回处理好且可用的路由数组
  return res
}

function getRedirect(routes, route, redirect = '') {
  const redirectRoute = routes.find((row) => row.parentId === route.id)
  if (!!redirectRoute) {
    redirect = `${redirectRoute.name}`
    return getRedirect(routes, redirectRoute, redirect)
  } else {
    return redirect
  }
}
```

## 全局前置守卫 [guard.js](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js)

当一个导航触发时，需要根据系统是否授权、用户是否登录、动态路由创建等触发以下步骤

###### ⒈ [跳转路由清空所有的异步请求](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L14)

###### ⒉ [系统是否授权](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L20)

没有授权信息就去获取授权信息

###### ⒊ [获取系统信息](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L56)

###### ⒋ [单点登录](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L57)

###### ⒌ [判断登录状态、动态路由是否添加](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L58)

###### ⒍ [没有登录、没有添加动态路由](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L78)

###### ⒎ [记录需要登录后跳转的页面](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L85)

###### ⒏ [已经登录、没有添加动态路由](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L77)

###### ⒐ [添加动态路由](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L96)

###### ⒑ [跳转重定向](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L107)

###### ⒒ [已经登录、已经添加动态路由进入页面](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/router/guard.js#L61)

### 单点登录流程

浏览器输入 `http://127.0.0.1:8888/login?token=001` =>
[⒈跳转路由清空所有的异步请求](/guide/routerMenu/#_1-跳转路由清空所有的异步请求) =>
[⒉系统是否授权](/guide/routerMenu/#_2-系统是否授权) =>
[⒊获取系统信息](/guide/routerMenu/#_3-获取系统信息) =>
[⒋单点登录](/guide/routerMenu/#_4-单点登录) =>
[⒏已经登录、没有添加动态路由](/guide/routerMenu/#_8-已经登录、没有添加动态路由) =>
[⒐添加动态路由](/guide/routerMenu/#_9-添加动态路由) =>
[⒒已经登录、已经添加动态路由进入页面](/guide/routerMenu/#_11-已经登录、已经添加动态路由进入页面)

### 普通登录

浏览器输入 `http://127.0.0.1:8888/login` =>

[⒈跳转路由清空所有的异步请求](/guide/routerMenu/#_1-跳转路由清空所有的异步请求) =>
[⒉系统是否授权](/guide/routerMenu/#_2-系统是否授权) =>
[⒍没有登录、没有添加动态路由](/guide/routerMenu/#_6-没有登录、没有添加动态路由) =>
[⒊获取系统信息](/guide/routerMenu/#_3-获取系统信息) =>
进入 `login` 页面，输入用户名和密码点击登录，存入 `token` 信息 => 
[⒏已经登录、没有添加动态路由](/guide/routerMenu/#_8-已经登录、没有添加动态路由) =>
[⒐添加动态路由](/guide/routerMenu/#_9-添加动态路由) =>
[⒒已经登录、已经添加动态路由进入页面](/guide/routerMenu/#_11-已经登录、已经添加动态路由进入页面)

### 重定向登录

浏览器输入 `http://127.0.0.1:8888/home` =>

[⒈跳转路由清空所有的异步请求](/guide/routerMenu/#_1-跳转路由清空所有的异步请求) =>
[⒉系统是否授权](/guide/routerMenu/#_2-系统是否授权) =>
[⒊获取系统信息](/guide/routerMenu/#_3-获取系统信息) =>
[⒍没有登录、没有添加动态路由](/guide/routerMenu/#_6-没有登录、没有添加动态路由) =>
[⒎记录需要登录后跳转的页面](/guide/routerMenu/#_7-记录需要登录后跳转的页面) =>
进入 `login` 页面，输入用户名和密码点击登录，存入 `token` 信息 => 
[⒏已经登录、没有添加动态路由](/guide/routerMenu/#_8-已经登录、没有添加动态路由) =>
[⒐添加动态路由](/guide/routerMenu/#_9-添加动态路由) =>
[⒑跳转重定向](/guide/routerMenu/#_10-跳转重定向)

### 已登录状态下刷新页面

[⒈跳转路由清空所有的异步请求](/guide/routerMenu/#_1-跳转路由清空所有的异步请求) =>
[⒉系统是否授权](/guide/routerMenu/#_2-系统是否授权) =>
[⒊获取系统信息](/guide/routerMenu/#_3-获取系统信息) =>
[⒏已经登录、没有添加动态路由](/guide/routerMenu/#_8-已经登录、没有添加动态路由) =>
[⒐添加动态路由](/guide/routerMenu/#_9-添加动态路由) =>
[⒒已经登录、已经添加动态路由进入页面](/guide/routerMenu/#_11-已经登录、已经添加动态路由进入页面)

### 流程图

![router-before-each](/images/guide/routerMenu/router-before.png)