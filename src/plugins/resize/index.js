import { isFunction } from '@/utils/is'
import { throttle } from '@/utils/lodash'
import { addResizeListener, removeResizeListener } from '@/utils/event/resize'

const Resize = {
  install(Vue, options) {
    const wait = options.wait || 200
    Vue.directive('resize', {
      inserted(el, binding) {
        Resize.handleAddListener(el, binding, wait)
      },
      update(el, binding) {
        Resize.handleRemoveListener(el)
        Resize.handleAddListener(el, binding, wait)
      },
      unbind(el) {
        Resize.handleRemoveListener(el)
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

export default Resize
