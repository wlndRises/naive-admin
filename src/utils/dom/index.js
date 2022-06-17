import { upperFirst } from 'lodash-es'

function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function on(element, event, handler) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

export function off(element, event, handler) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false)
  }
}

export function once(el, event, fn) {
  const listener = function (self, ...args) {
    if (fn) {
      fn.apply(self, args)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

export function hasClass(el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

export function addClass(el, cls) {
  if (!el) return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export function removeClass(el, cls) {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export function hackCss(attr, value) {
  const prefix = ['webkit', 'Moz', 'ms', 'OT']

  const styleObj = Object.create(null)
  prefix.forEach(item => {
    styleObj[`${item}${upperFirst(attr)}`] = value
  })
  return {
    ...styleObj,
    [attr]: value,
  }
}

/**
 * @description 获取当前元素的左偏移量和顶偏移量
 * @param {HTMLElement} element
 * @returns left: 文档最左边元素和左边之间的距离
 * @returns top: 元素顶部到文档顶部的距离
 * @returns right: 元素的最右边到文档右边的距离
 * @returns bottom: 元素底部到文档底部的距离
 * @returns rightIncludeBody: 元素的最左边和文档右边之间的距离
 * @returns bottomIncludeBody: 元素的顶部和文档底部之间的距离
 */
export function getViewportOffset(element) {
  const doc = window.document.documentElement

  const docScrollLeft = doc.scrollLeft
  const docScrollTop = doc.scrollTop
  const docClientLeft = doc.clientLeft
  const docClientTop = doc.clientTop

  const pageXOffset = window.pageXOffset
  const pageYOffset = window.pageYOffset

  const box = getBoundingClientRect(element)

  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box

  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0)
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0)
  const offsetLeft = retLeft + pageXOffset
  const offsetTop = rectTop + pageYOffset

  const left = offsetLeft - scrollLeft
  const top = offsetTop - scrollTop

  const clientWidth = doc.clientWidth
  const clientHeight = doc.clientHeight
  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top,
  }
}

export function getBoundingClientRect(element) {
  if (!element || !element.getBoundingClientRect) {
    return 0
  }
  return element.getBoundingClientRect()
}
