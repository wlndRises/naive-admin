import { on } from '@/utils/dom'

export default {
  inserted: (el, binding) => {
    const eventType = binding.modifiers.dblclick ? 'dblclick' : 'click'
    on(el, eventType, handler)
    function handler() {
      if (el.__springTimer__) return
      el.classList.add('scale-down-center')
      el.__springTimer__ = setTimeout(() => {
        const className = Array.prototype.at.call(el.classList, -1)
        el.classList.remove(className)
        el.__springTimer__ = null
      }, 400)
    }
  },
}
