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
// tip:
// addEventListener
// 主要关注下第三个参数，可以设置为Boolean类型（useCapture）或者object类型(options)

// options包括三个布尔值选项：

// capture: 默认值为false（即 使用事件冒泡）是否使用事件捕获
// once: 默认值为false 是否只调用一次, if true, 会在调用后自动销毁listener
// passive: if true, 意味着listener永远不远调用preventDefault方法
// 如果又确实调用了的话,浏览器只会console一个warning而不会真的去执行preventDefault方法
// 根据规范，默认值为false. 但是chrome, Firefox等浏览器为了保证滚动时的性能
// 在document-level nodes(Window, Document, Document.body)上针对
// touchstart和touchmove事件将passive默认值改为了true, 保证了在页面滚动时不会因为自定义事件中调用了preventDefault而阻塞页面渲染

// useCapture: 默认值为false（即 使用事件冒泡）。
