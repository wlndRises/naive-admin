import { isFunction } from '@/utils/is'
import { throttle } from '@/utils/lodash'
import { addResizeListener, removeResizeListener } from '@/utils/event/resize'

const resize = {
  handleAddListener(el, binding) {
    if (isFunction(binding.value)) {
      el.__handleResize__ = throttle(binding.value, +(binding.arg || 200))
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
  inserted(el, binding) {
    resize.handleAddListener(el, binding)
  },
  update(el, binding) {
    resize.handleRemoveListener(el)
    resize.handleAddListener(el, binding)
  },
  unbind(el) {
    resize.handleRemoveListener(el)
  },
}
