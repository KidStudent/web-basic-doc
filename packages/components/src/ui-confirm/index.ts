/**
 *
 * @description 代替 $Modal.confirm(config)
 * @example
 * import { getCurrentInstance } from 'vue'
 * const { proxy } = getCurrentInstance()
 * proxy.$UiConfirm({content: "", title: ""}).then(res=>{
        console.log(res);
    }).catch(res=>{
        console.log(res);
    })
 * */
import { createApp } from 'vue';
import _UiConfirm from './ui-confirm.vue';
import { withInstallFunction } from '@web-basic-doc/utils';

const defaultOptions: {
  visible: boolean;
  content: string;
  title: string;
  okText: string;
  render?: () => void;
  callback?: () => void;
} = {
  visible: true,
  content: '您确定要删除吗?',
  title: '提示',
  okText: '确 定',
};
let mountApp;

function mountComponent(node: Element) {
  document.body.appendChild(node);
  mountApp.mount(node);
}

function removeComponent(node: Element) {
  mountApp.unmount(node);
  document.body.removeChild(node);
}

const confirm = (options: object = {}) => {
  const mountNode = document.createElement('div');
  mountNode.setAttribute('class', 'ui-confirm');
  const opt = Object.assign({}, defaultOptions, options);
  return new Promise((resolve, reject) => {
    opt.callback = (visible: boolean): void => {
      if (visible) {
        resolve(visible);
      } else {
        reject(visible);
      }
      removeComponent(mountNode);
    };
    mountApp = createApp(_UiConfirm, opt);
    mountComponent(mountNode);
  });
};
const UiConfirm = withInstallFunction(confirm, '$UiConfirm');
export default UiConfirm;
