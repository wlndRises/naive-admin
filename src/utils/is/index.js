/*
 * @Description: is/can/has
 * @Version: 1.0
 * @Autor: wind
 * @Date: 2021-12-23 16:50:01
 * @LastEditors: wind
 * @LastEditTime: 2022-05-30 15:02:05
 */
import _ from 'lodash'
const toString = Object.prototype.toString

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

export function isObject(val) {
  return !isNull(val) && is(val, 'Object')
}

export const isArray = Array.isArray

export function isMap(val) {
  return is(val, 'Map')
}

export function isFunction(val) {
  return typeof val === 'function'
}

export function isWindow(val) {
  return typeof window !== 'undefined' && is(val, 'Window')
}

// 扩展lodash的 isEmpty
// lodash isEmpty 用于判断一个对象是否为空 判断的依据是 是否有枚举属性
// 传入基本类型如 Boolean Number 也会返回true
export function isEmpty(val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return isNil(val)
}

export const isEqual = _.isEqual

export function isNumber(val) {
  return is(val, 'Number')
}

export const isFinite = _.isFinite

export const isInteger = _.isInteger

export function canToNumberString(val) {
  return isString(val) && !isNaN(Number(val))
}

export function isString(val) {
  return is(val, 'String')
}

export function isSymbol(val) {
  return typeof val === 'symbol'
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

export function isBoolean(val) {
  return is(val, 'Boolean')
}

export function isBase(val) {
  return isString(val) || isNumber(val) || isBoolean(val) || isNil(val) || isSymbol(val)
}

export function isReference(val) {
  return !isBase(val)
}

export function isRegExp(val) {
  return is(val, 'RegExp')
}

export function isPromise(val) {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isDate(val) {
  return is(val, 'Date')
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isElement(val) {
  return isObject(val) && !!val.tagName
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export const isBrowser = !isServer

/**
 * @description element是否在视口范围
 * @param {HTMLElement} el
 * @param {boolean} isFullyVisible 是否判断 是否完全在视口范围
 * @returns {boolean}
 */
export const isVisibleInViewport = (el, isFullyVisible) => {
  const { top, left, right, bottom } = el.getBoundingClientRect()
  const { innerHeight, innerWidth } = window
  return isFullyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top > 0 && left > 0 && bottom < innerHeight && right < innerWidth
}

/**
 * @description 判断dom文本是否显示省略号 （是否能在一行展示完成）
 * @param {HTMLElement} el
 * @returns {boolean}
 */
export const isEllipsis = el => {
  if (!el) return
  const cloneDom = el.cloneNode()
  const { style } = cloneDom
  style.whiteSpace = 'nowrap'
  style.overflow = 'auto'
  style.position = 'relative'
  style.zIndex = -9999
  style.opacity = 0

  const { offsetWidth, parentNode } = el
  parentNode.appendChild(cloneDom)
  const { scrollWidth } = cloneDom
  parentNode.removeChild(cloneDom)
  return scrollWidth > offsetWidth
}
