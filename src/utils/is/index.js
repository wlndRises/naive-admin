/*
 * @Description: is
 * @Version: 1.0
 * @Autor: Wind
 * @Date: 2021-12-23 16:50:01
 * @LastEditors: Wind
 * @LastEditTime: 2022-06-17 15:35:37
 */
export { isEqual, isFinite, isInteger } from 'lodash-es'

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export const isBrowser = !isServer

export const isArray = Array.isArray

export const toString = Object.prototype.toString

export function is(val, type) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef(val) {
  return typeof val !== 'undefined'
}

export function isUnDef(val) {
  return !isDef(val)
}

export function isNull(val) {
  return val === null
}

export function isNil(val) {
  return isUnDef(val) || isNull(val)
}

export function isString(val) {
  return is(val, 'String')
}

export function isNumber(val) {
  return is(val, 'Number')
}

export function isNumString(val) {
  return isString(val) && !isNaN(Number(val))
}

export function isBoolean(val) {
  return is(val, 'Boolean')
}

export function isFunction(val) {
  return typeof val === 'function'
}

export function isObject(val) {
  return !isNull(val) && is(val, 'Object')
}

export function isSymbol(val) {
  return typeof val === 'symbol'
}

export function isSet(val) {
  return is(val, 'Set')
}

export function isMap(val) {
  return is(val, 'Map')
}

export function isWeakMap(val) {
  return is(val, 'WeakMap')
}

export function isPromise(val) {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isDate(val) {
  return is(val, 'Date')
}

export function isRegExp(val) {
  return is(val, 'RegExp')
}

export function isJson(val) {
  // Es10 catch 可以不写error
  try {
    JSON.parse(val)
    return true
  } catch {
    return false
  }
}

export function isBase(val) {
  return isString(val) || isNumber(val) || isBoolean(val) || isNil(val) || isSymbol(val)
}

export function isReference(val) {
  return !isBase(val)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isElement(val) {
  return isObject(val) && !!val.tagName
}

export function isWindow(val) {
  return typeof window !== 'undefined' && is(val, 'Window')
}

// 与lodash的 isEmpty 不同之处在于
// lodash isEmpty 用于判断一个对象是否为空 判断的依据是 是否有枚举属性
// 传入基本类型如 Boolean Number 也会返回true
export function isEmpty(val) {
  if (isArray(val) || isString(val)) return val.length === 0

  if (isMap(val) || isSet(val)) return val.size === 0

  if (isObject(val)) return Object.keys(val).length === 0

  return isNil(val)
}

/**
 * @description element是否在视口范围
 * isFullyVisible 是否 判断完全在视口范围内
 */
export function isVisibleInViewport(el, isFullyVisible) {
  const { top, left, right, bottom } = el.getBoundingClientRect()
  const { innerHeight, innerWidth } = window
  return isFullyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top > 0 && left > 0 && bottom < innerHeight && right < innerWidth
}
