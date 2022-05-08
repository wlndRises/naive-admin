import { on } from '@/utils/event'

export default {
  inserted: (el, binding) => {
    el.$eventName = binding.modifiers.dblclick ? 'dblclick' : 'click'
    on(el, el.$eventName, animate)
    function animate() {
      if (el.__animatetimer__) return
      el.__animate__ = binding.expression || 'scale-down-center' // default spring
      el.classList.add(el.__animate__)
      el.__animatetimer__ = setTimeout(() => {
        const className = Array.prototype.at.call(el.classList, -1)
        el.classList.remove(className)
        el.__animatetimer__ = null
      }, 400)
    }
  },
}
