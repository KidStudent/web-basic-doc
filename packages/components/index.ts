import components from './src/index';
export * from './src/index';
import { App } from 'vue';
import '@web-basic-doc/theme-chalk/src/index.scss';
import directives from '@web-basic-doc/directives/index';

export default {
  install: (app: App) => {
    components.forEach((c) => app.use(c));
    directives.forEach((d) => app.use(d));
  },
};
