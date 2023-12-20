import { createApp } from 'vue';
import App from './App.vue';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import ViewUIPlus from 'view-ui-plus';
import ui from '@web-basic-doc/components';
import '@web-basic-doc/theme-chalk/src/index.scss';
const app = createApp(App);
app.use(ViewUIPlus).use(ui).mount('#app');
