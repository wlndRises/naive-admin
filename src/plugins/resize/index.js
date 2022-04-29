import { isFunction } from '@/utils/is'
import { throttle } from '@/utils/lodash'
import { addResizeListener, removeResizeListener } from '@/utils/event/resize'

const resize = {
  install(Vue, options) {
    const wait = options.wait || 200
    Vue.directive('resize', {
      inserted(el, binding) {
        resize.handleAddListener(el, binding, wait)
      },
      update(el, binding) {
        resize.handleRemoveListener(el)
        resize.handleAddListener(el, binding, wait)
      },
      unbind(el) {
        resize.handleRemoveListener(el)
      },
    })
  },
  handleAddListener(el, binding, wait) {
    if (isFunction(binding.value)) {
      el.__handleResize__ = throttle(binding.value, +(binding.arg || wait))
      addResizeListener(el, el.__handleResize__)
    }
  },
  handleRemoveListener(el) {
    if (el.__handleResize__) {
      removeResizeListener(el, el.__handleResize__)
    }
  },
}

export default resize
