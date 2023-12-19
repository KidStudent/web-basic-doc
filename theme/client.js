import { defineClientConfig } from '@vuepress/client';
import { setupSidebarItems } from './hooks/index.js';
import pkg from 'view-ui-plus';
const {
  Button,
  Input,
  Icon,
  Select,
  Option,
  InputNumber,
  Table,
  Upload,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Checkbox,
} = pkg;
import 'view-ui-plus/dist/styles/viewuiplus.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import BasicComponents from '@web-basic-doc/components';
import '@web-basic-doc/theme-chalk/src/index.scss';
import Layout from './layouts/Layout.vue';
import Demo from './components/demo/index.vue';
import '../docs/.vuepress/styles/index.scss';
export default defineClientConfig({
  layouts: {
    Layout,
  },
  enhance({ app }) {
    app.use(BasicComponents);
    app.use(ElementPlus);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(`ElIcon${key}`, component);
    }
    app.component('Button', Button);
    app.component('Input', Input);
    app.component('Select', Select);
    app.component('Option', Option);
    app.component('InputNumber', InputNumber);
    app.component('Icon', Icon);
    app.component('Table', Table);
    app.component('Demo', Demo);
    app.component('Upload', Upload);
    app.component('Dropdown', Dropdown);
    app.component('DropdownMenu', DropdownMenu);
    app.component('DropdownItem', DropdownItem);
    app.component('Checkbox', Checkbox);
    app.config.globalProperties.$Message = ElMessage;
  },
  setup() {
    setupSidebarItems();
  },
  rootComponents: [],
});
