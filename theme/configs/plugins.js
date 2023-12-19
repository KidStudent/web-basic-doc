import { searchPlugin } from '@vuepress/plugin-search';
// import { themeDataPlugin } from '@vuepress/plugin-theme-data'
// import { sidebar } from './nav/sidebar'

import mdContainer from 'markdown-it-container';
import { path } from '@vuepress/utils';
import fs from 'fs';
import { highlight } from '../utils/highlight';

export const plugins = [
  searchPlugin({}),
  // themeDataPlugin({
  //   themeData: {
  //     sidebar: sidebar,
  //   },
  // }),
];

export const mdPlugin = (md) => {
  // 当md中:::demo时，通过render替换掉本身的内容
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const sourceFileToken = tokens[idx + 2];
        // 获取当前md文档中的路径
        const sourceFile = sourceFileToken.children?.[0].content ?? '';
        // 通过node的fs读取文件中的源码
        let source = fs.readFileSync(
          path.resolve(__dirname, '../examples', `${sourceFile}.vue`),
          'utf-8',
        );
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);
        // 加载demo组件
        return `<demo source="${encodeURIComponent(
          highlight(source, 'vue'),
        )}" path="${sourceFile}" raw-source="${encodeURIComponent(source)}">`;
      } else {
        return `</demo>`;
      }
    },
  });
};
