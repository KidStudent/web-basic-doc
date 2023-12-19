// 点击空白区域消失该区域
import type { DirectiveBinding, ObjectDirective } from 'vue';
import { withInstallDirective } from '@web-basic-doc/utils';

interface ElType extends HTMLElement {
  __handleClick__: (e: MouseEvent) => void;
}

const Clickoutside: ObjectDirective = {
  beforeMount(el: ElType, binding: DirectiveBinding) {
    el.__handleClick__ = (e: MouseEvent) => {
      if (el.contains(e.target as Node)) {
        return;
      }
      if (binding.value) {
        binding.value(e);
      }
    };
    document.addEventListener('click', el.__handleClick__);
  },
  unmounted(el: ElType) {
    document.removeEventListener('click', el.__handleClick__);
  },
};
export const VClickoutside = 'clickoutside';

const ClickoutsideDirective = withInstallDirective(Clickoutside, VClickoutside);

export default ClickoutsideDirective;
