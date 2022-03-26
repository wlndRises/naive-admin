/*
 * @Description: ResizeObserver
 * @Version: 1.0
 * @Autor: Elk
 * @Date: 2022-01-04 20:04:27
 * @LastEditors: Elk
 * @LastEditTime: 2022-02-20 00:08:20
 */
import ResizeObserver from 'resize-observer-polyfill'

function resizeHandler(entries) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach((fn) => {
        fn()
      })
    }
  }
}

export function addResizeListener(element, fn) {
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}

export function removeResizeListener(element, fn) {
  if (!element || !element.__resizeListeners__) return
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect()
  }
}

/**
 * 触发 window.resize
 */
export function triggerWindowResize() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}
