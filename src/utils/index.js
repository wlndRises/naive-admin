// 放一些不确定分类的工具
import { isEmpty, isArray, isObject, isString, isDef } from './is'
import { omitBy } from '@/utils/lodash'

export const filterEmpty = (v, fn = isEmpty) => {
  if (isArray(v)) v => v.filter(fn)
  if (isObject(v)) omitBy(v, fn)
}

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
