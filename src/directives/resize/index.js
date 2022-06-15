import { isFunction } from '@/utils/is'
import { throttle } from 'lodash-es'
import { addResizeListener, removeResizeListener } from '@/utils/event/resize'

const resize = {
  handleAddListener(el, binding) {
    if (isFunction(binding.value)) {
      el.__handleResize__ = throttle(binding.value, 200)
      addResizeListener(el, el.__handleResize__)
    }
  },
  handleRemoveListener(el) {
    if (el.__handleResize__) {
      removeResizeListener(el, el.__handleResize__)
    }
  },
}

export default {
  bind(el, binding) {
    resize.handleAddListener(el, binding)
  },
  // 静态绑定函数时无需考虑
  // componentUpdated(el, binding) {
  //   resize.handleRemoveListener(el)
  //   resize.handleAddListener(el, binding)
  // },
  unbind(el) {
    resize.handleRemoveListener(el)
  },
}
