---
title: 单点登录
date: 2023-12-13
permalink: /guide/sso/
---

# 单点登录

## 前端实现步骤划分

先判断是否为单点登录，不为则直接返回不再进行任何逻辑处理，下面是单点登录的处理步骤

:::warning 注意
首先需要在后台配置 `distinguishVersion` 字段配合使用才可触发单点登录
:::

① [配置单点登录](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/config/http/sso-config.js#L21) 其中 `key` 应该对应配置的项目，`must` 为必须要在浏览器中的参数， `validateParams` 为单点登录所需的参数校验，`loginAsync` 为单点登录需要异步登陆后的处理，`getUserInfo` 为获取用户信息，权限等。 

② [获取url中的信息](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/config/http/sso.js#L6) 根据系统数据库中配置的信息和 `sso-config` 文件中对比， 以及 `validateParams` 校验通过，调用单点登录函数 `loginAsync`

③ [删除不需要显示在 `url` 中的参数](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/config/http/sso.js#L18)

④ [使用 `window.location.replace` 跳转正确页面，`window.location.replace` 可以替换浏览器历史记录项](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/config/http/sso.js#L30)


## 主要代码

[sso-config.js](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/config/http/sso-config.js)

::: details
```js
import axios from './http';
import user from '../api/user';
import UseUserStore from '@/stores/modules/user';
/**
 * key: 1:默认,2:江苏省厅,3:河北(石家庄),4:四川省厅,5:内江市局,6:四川高新区,7:济南市局,8:甘肃省厅,9:兰州,10:乌市
 * 属性 validateParams: 校验对应参数是否存在
 * 属性 loginAsync: 对应的登陆方法
 */
const validateMust = (params, must) => {
  let start = 0;
  const mustLength = must.length;
  while (start < mustLength) {
    if (!Object.keys(params).includes(must[start])) {
      return false;
    }
    start++;
  }
  return true;
};

const ssoConfig = {
  '4': {
    must: ['token'],
    validateParams: validateMust,
    loginAsync: async (params) => {
      try {
        const userStore = UseUserStore();
        const res = await axios.get(user.tokenWsUniportalCheck, { params });
        userStore.setSystemData(res.data.data);
        sessionStorage.setItem('isSSO', '1');
        console.info('第三方登录成功');
        return true;
      } catch (err) {
        console.error(err, 'err');
        return false;
      }
    },
    getUserInfo: async () => {
      try {
        const res = await axios.post(user.userWsInfo);
        return res;
      } catch (err) {
        console.error(err, 'err');
      }
    },
  },
};

export default ssoConfig;
```
:::

[sso.js](http://192.168.1.123:10080/platform/qsdi/web-basic/-/blob/master/src/config/http/sso.js)

::: details
```js
import { getRegust } from '@/utils/common';
import ssoConfig from './sso-config';
import UseCommonStore from '@/stores/modules/common';

const ssoLogin = async () => {
  const params = getRegust(location.search);
  const commonStore = UseCommonStore();
  const distinguishVersion = commonStore.systemConfig.distinguishVersion;
  if (
    !distinguishVersion ||
    !ssoConfig[distinguishVersion] ||
    !ssoConfig[distinguishVersion].validateParams(params, ssoConfig[distinguishVersion].must)
  ) {
    return;
  }
  await ssoConfig[distinguishVersion].loginAsync(params);

  ssoConfig[distinguishVersion].must.forEach((row) => {
    delete params[row];
  });

  const newUrl = `${location.origin}${location.pathname}${location.hash}?${JSON.stringify(params)
    .replace(/["{}]/g, '')
    .replace(/:/g, '=')
    .replace(/,/g, '&')}`;

  return new Promise((resolve) => {
    setTimeout(() => {
      // 替换历史记录项
      window.location.replace(newUrl);
      resolve();
    }, 1000);
  });
};

export default ssoLogin;
```
:::

## url 使用

举个:chestnut:

```text
完整地址 http://127.0.0.1:8888/login?token=001

http://127.0.0.1:8888 域名

/login 要跳转的页面(这里是history模式)

?token=001 是需要的单点登录的必要参数
```

