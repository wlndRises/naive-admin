import screenfull from 'screenfull'
import { Message } from 'element-ui'

export default {
  bind(el, binding) {
    // 添加 icon 修饰符 向el中添加 el-icon-fullscreen 图标
    if (binding.modifiers.icon) {
      if (el.hasIcon) return
      // 创建全屏图标
      const iconElement = document.createElement('i')
      iconElement.setAttribute('class', 'el-icon-full-screen')
      el.appendChild(iconElement)
      el.hasIcon = true
    }
    el.style.cursor = el.style.cursor || 'pointer'
    // 监听点击全屏事件
    el.addEventListener('click', () => handleClick())
  },
}

function handleClick() {
  if (!screenfull.isEnabled) {
    return Message.warning('浏览器不支持全屏')
  }
  screenfull.toggle()
}
