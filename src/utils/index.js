// 放一些不确定分类的工具
import { isString, isDef } from './is'

export const cdnLoad = cdnConfig => {
  const cdnInject = url => {
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
  return Promise.all(cdnConfig.map(url => cdnInject(url)))
}

const loadScripts = url => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    document.head.appendChild(script)
    script.onload = function () {
      resolve(url)
    }
    script.onerror = function () {
      reject(url)
    }
  })
}

export const cdnSequentialLoad = urls => {
  return new Promise(resolve => {
    async function doLoad(url) {
      await loadScripts(url)
      if (urls.length > 0) {
        doLoad(urls.shift())
      } else {
        resolve()
      }
    }
    doLoad(urls.shift())
  })
}

/**
 * @description: 字符串、数组的reverse 这个方法不会改变原数组
 * @author: wind
 */
export function reverse(source) {
  if (isString) {
    return source.split('').reverse().join('')
  } else {
    const arr = []
    for (let i = source.length - 1; i > -1; i--) {
      const element = source[i]
      arr.push(element)
    }
    return arr
  }
}

/**
 * @description: 软绑定的bind
 * @author: wind
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

export const cloneFunc = function (func) {
  return new Function('return ' + func.toString())()
}

export const merge = function (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i] || {}
    for (const prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        const value = source[prop]
        if (isDef(value)) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

/**
 * eg:
 * let [err, res] = await errorCaptured(asyncFunc)
 * if (err) {
 *   ... 错误捕获
 * }
 * ... 其他逻辑
 */
export const errorCaptured = async asyncFunc => {
  try {
    const res = await asyncFunc()
    return [null, res]
  } catch (err) {
    return [err, null]
  }
}

// 如果你想在出现错误时什么也不做 那么你可以
// const res = await asyncFunc().catch(noop)
// if (!res) return

export const kebabCase = function (str) {
  const hyphenateRE = /([^-])([A-Z])/g
  return str.replace(hyphenateRE, '$1-$2').toLowerCase()
}

export const capitalize = function (str) {
  if (!isString(str)) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
