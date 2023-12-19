import { getDirname, path } from '@vuepress/utils';
import { defaultTheme } from '@vuepress/theme-default';

import { navbar, sidebar, plugins, mdPlugin } from './configs';

const __dirname = getDirname(import.meta.url);

export const customTheme = () => {
  // 返回一个主题对象
  return {
    name: 'vuepress-theme-custom',

    // 主题的客户端配置文件的路径
    clientConfigFile: path.resolve(__dirname, 'client.js'),
    // 使用插件
    plugins: plugins,
    // 其他的插件 API 也都可用
    // 继承默认主题 sidebar 中必须要存在标题链接才能使 active-header-links插件正常工作
    // https://v2.vuepress.vuejs.org/zh/reference/plugin/active-header-links.html#headerlinkselector
    extends: defaultTheme({
      navbar: navbar,
      sidebar: sidebar,
      lastUpdatedText: '上次更新',
      contributorsText: '贡献者',
    }),
    extendsMarkdown: (md) => mdPlugin(md),
  };
};
