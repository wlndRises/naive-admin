// 放一些不确定分类的实用函数
import { omitBy } from 'lodash-es'
import { isEmpty, isArray, isObject, isString, isDef } from './is'

export const filterEmpty = (v, fn = isEmpty) => {
  if (isArray(v)) v => v.filter(fn)
  if (isObject(v)) omitBy(v, fn)
}

export function softBind(fn, obj) {
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

export function cloneFunc(func) {
  return new Function('return ' + func.toString())()
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

export function mergeDeep(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i] || {}
    for (const prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        let targetVal = target[prop]
        const sourceVal = source[prop]
        if (isObject(targetVal) && isObject(sourceVal)) {
          mergeDeep(targetVal, sourceVal)
        } else if (isArray(targetVal) && isArray(sourceVal)) {
          if (sourceVal.length > targetVal.length) {
            targetVal = sourceVal
          } else {
            for (let i = 0; i < sourceVal.length; i++) {
              targetVal[i] = sourceVal[i]
            }
          }
        } else if (isDef(sourceVal)) {
          target[prop] = sourceVal
        }
      }
    }
  }

  return target
}
