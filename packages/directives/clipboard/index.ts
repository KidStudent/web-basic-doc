/**
 * @example <Button v-copy="'345'">copy</Button>
 */
import type { DirectiveBinding, ObjectDirective } from 'vue';
import { withInstallDirective } from '@web-basic-doc/utils';

import Message from 'view-ui-plus/src/components/message';

interface ElType extends HTMLElement {
  __handleClick__: () => void;
}

const Clipboard: ObjectDirective = {
  beforeMount(el: ElType, binding: DirectiveBinding) {
    el.__handleClick__ = () => {
      navigator.clipboard.writeText(binding.value).then(() => {
        Message.success('拷贝成功');
      });
    };
    el.addEventListener('click', el.__handleClick__);
  },
  unmounted(el: ElType) {
    el.removeEventListener('click', el.__handleClick__);
  },
};

export const VClipboard = 'copy';

const ClipboardDirective = withInstallDirective(Clipboard, VClipboard);

export default ClipboardDirective;
