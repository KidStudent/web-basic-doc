/**
 * @example <Button v-debounce:click="callback">copy</Button>
 * @example <Input v-debounce:input="callback"></Input>
 * @example <Button v-debounce:click="{fun: callback}">copy</Button>
 * @example <Button v-debounce:click="{fun: callback, delay: 1000}">copy</Button>
 */
import type { DirectiveBinding, ObjectDirective } from 'vue';
import { withInstallDirective } from '@web-basic-doc/utils';

interface ElType extends HTMLElement {
  __handleClick__: () => void;
}

type BindValue = {
  fun?: (...args: unknown[]) => unknown;
  delay?: number;
};

const DEBOUNCE_DELAY = 200;

const Debounce: ObjectDirective = {
  beforeMount(el: ElType, binding: DirectiveBinding) {
    if (!binding.value) {
      throw Error('未传入需要防抖处理的函数');
    }
    if (!binding.value) {
      throw Error('未传入需要防抖处理的函数');
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const value: BindValue | any = binding.value;
    el.__handleClick__ = () => {
      timer && clearTimeout(timer);
      if (value.fun) {
        timer = setTimeout(() => {
          value.fun();
          clearTimeout(timer);
          timer = undefined;
        }, value.delay || DEBOUNCE_DELAY);
      } else {
        timer = setTimeout(() => {
          value();
          clearTimeout(timer);
          timer = undefined;
        }, DEBOUNCE_DELAY);
      }
    };
    el.addEventListener(binding.arg as keyof HTMLElementEventMap, el.__handleClick__);
  },
  unmounted(el: ElType, binding: DirectiveBinding) {
    el.removeEventListener(binding.arg as keyof HTMLElementEventMap, el.__handleClick__);
  },
};
export const VDebounce = 'debounce';

const DebounceDirective = withInstallDirective(Debounce, VDebounce);

export default DebounceDirective;
