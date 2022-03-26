// 放一些不确定分类的工具

import { isDate, isJson, isObject, isDef } from './is'

export const cdnLoad = (cdnConfig) => {
  const cdnInject = (url) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = url
      script.onload = function () {
        resolve(url)
      }
      script.onerror = function () {
        reject(url)
      }
      document.head.appendChild(script)
    })
  }
  return Promise.all(cdnConfig.map((url) => cdnInject(url)))
}

/**
 * @description: 不会改变原数组的reverse
 * @param {Array} 源数组
 * @return {Array} 反转后的新数组
 * @author: Elk
 */
export function reverse(source) {
  const arr = []
  for (let i = source.length - 1; i > -1; i--) {
    const element = source[i]
    arr.push(element)
  }
  return arr
}

/**
 * @description: 软绑定的bind
 * @author: Elk
 */
export const softBind = function (fn, obj) {
  const curried = Array.prototype.slice.call(arguments, 2)
  const bound = function () {
    return fn.apply(
      !this || this === (window || global) ? obj : this,
      Array.prototype.concat.apply(curried, arguments)
    )
  }
  bound.prototype = Object.create(fn.prototype)
  return bound
}

/**
 * 深拷贝
 * json对象键必须加双引号 值不可以是方法函数、undefined以及NAN
 */
export const cloneDeep = function (val) {
  if (val === null) return null
  if (isJson(val)) return JSON.parse(JSON.stringify(val))
  if (!isObject(val)) return val
  if (isDate(val)) return new Date(val)
  const newVal = new val.constructor() //保持继承链
  for (const key in val) {
    if (val.hasOwnProperty(key)) {
      //不遍历其原型链上的属性
      const element = val[key]
      newVal[key] = isObject(element) ? arguments.callee(val) : val // 使用arguments.callee解除与函数名的耦合
    }
  }
  return newVal
}
/**
 * 防抖函数(间隔时间内的持续触发只会触发最后一次，持续触发等于永远不会触发)
 * 例如 百度输入框一直输入时不会出现返回的列表数据
 */
export const debounce = (fn, delay) => {
  let timeout = null // 创建一个标记用来存放定时器的返回值
  // tip: 注意不能返回箭头函数 apply call bind无法改变箭头函数的this
  return function () {
    // 每当用户输入的时候把前一个 setTimeout clear 掉
    clearTimeout(timeout)
    // 然后又创建一个新的 setTimeout, 这样就能保证 interval 内持续触发，就不会执行 fn 函数
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

/**
 * 节流函数(间隔时间内只会触发一次)
 * 例如 避免在scroll、resize时过分的更新
 */
export const throttle = (fn, delay) => {
  let canRun = true // 通过闭包保存一个标记
  // 小知识: 箭头函数没有arguments 只能(...arg) => arg
  return function () {
    if (!canRun) return
    canRun = false
    fn.apply(this, arguments)
    // 将外部传入的函数的执行放在setTimeout中
    setTimeout(() => {
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
      // 当定时器没有执行的时候标记永远是false，在开头被return掉
      fn.apply(this, arguments)
      canRun = true
    }, delay)
  }
}

export const merge = function (target) {
  for (const i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i] || {}
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        const value = source[prop]
        if (isDef(value)) {
          target[prop] = value
        }
      }
    }
  }

  return target
}
