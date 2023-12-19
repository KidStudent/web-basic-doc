/**
 * @example <Button v-throttle:click="callback">copy</Button>
 * @example <Input v-throttle:input="callback"></Input>
 * @example <Button v-throttle:click="{fun: callback}">copy</Button>
 * @example <Button v-throttle:click="{fun: callback, delay: 1000}">copy</Button>
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

const THROTTLE_DELAY = 200;

const Throttle: ObjectDirective = {
  beforeMount(el: ElType, binding: DirectiveBinding) {
    if (!binding.value) {
      throw Error('未传入需要节流处理的函数');
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const value: BindValue | any = binding.value;
    el.__handleClick__ = () => {
      if (!timer) {
        if (value.fun) {
          value.fun();
          timer = setTimeout(() => {
            clearTimeout(timer);
            timer = undefined;
          }, value.delay || THROTTLE_DELAY);
        } else {
          value();
          timer = setTimeout(() => {
            clearTimeout(timer);
            timer = undefined;
          }, THROTTLE_DELAY);
        }
      }
    };
    el.addEventListener(binding.arg as keyof HTMLElementEventMap, el.__handleClick__);
  },
  unmounted(el: ElType, binding: DirectiveBinding) {
    el.removeEventListener(binding.arg as keyof HTMLElementEventMap, el.__handleClick__);
  },
};

export const VThrottle = 'throttle';

const ThrottleDirective = withInstallDirective(Throttle, VThrottle);

export default ThrottleDirective;
