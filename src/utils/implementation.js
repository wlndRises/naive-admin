/*
 * @Description: 实用函数
 * @Version: 1.0
 * @Autor: Wind
 * @Date: 2022-04-30 11:56:48
 * @LastEditors: Wind
 * @LastEditTime: 2022-06-17 21:06:54
 */
import { isDate, isJson, isObject, isArray, isDef } from './is'

/**
 * 防抖函数(间隔时间内的持续触发只会触发最后一次，持续触发等于永远不会触发)
 * 例如 百度输入框一直输入时不会出现返回的列表数据
 */
export function debounce(fn, delay) {
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
 * 例如 避免在scroll、resize 时过于频繁的更新
 */
export function throttle(fn, delay) {
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

/**
 * 深拷贝
 * json对象：属性名称必须是双引号括起来的字符串 最后一个属性后不能有逗号
 */
export function cloneDeep(val) {
  if (val === null) return null
  if (isJson(val)) return JSON.parse(JSON.stringify(val))
  if (isDate(val)) return new Date(val)
  if (!isObject(val)) return val
  const newVal = new val.constructor() //保持继承链
  for (const key in val) {
    if (Object.prototype.hasOwnProperty.call(val, key)) {
      // 不遍历其原型链上的属性
      const element = val[key]
      newVal[key] = isObject(element) ? arguments.callee(val) : val // 使用arguments.callee解除与函数名的耦合
    }
  }
  return newVal
}

export function merge(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i] || {}
    for (const prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        let targetVal = target[prop]
        const sourceVal = source[prop]
        if (isObject(targetVal) && isObject(sourceVal)) {
          merge(targetVal, sourceVal)
        } else if (isArray(targetVal) && isArray(sourceVal)) {
          mergeArray(targetVal, sourceVal)
        } else if (isDef(sourceVal)) {
          target[prop] = sourceVal
        }
      }
    }
  }

  function mergeArray(target, source) {
    if (source.length > target.length) {
      target = source
    } else {
      for (let i = 0; i < source.length; i++) {
        target[i] = source[i]
      }
    }
  }

  return target
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

/**
 * @description: 纵向合并单元格
 * @param {Array} 表格数据
 * @param {Array | String} 需要纵向合并列 依据的字段组成的数组 也可传单个字段字符串
 * @return {Array} 每行合并的格数组成的数组
 * @author: Wind
 * eg:
 * const row = rowSpanList[rowIndex]
 * const col = _row > 0 ? 1 : 0
 * return [row, col]
 */
export function getRowSpanList(data, contentList) {
  // 单个字段转为数组
  !Array.isArray(contentList) && (contentList = [contentList])
  // 每次都清空之前存储的 保证遍历的数据是最新的数据。以免造成数据渲染混乱
  const rowSpanList = []
  let pos = 0
  // 遍历数据
  data.forEach((_, index) => {
    // 判断是否是第一项
    if (index === 0) {
      rowSpanList.push(1)
      pos = 0
    } else {
      // 不是第一项时，就根据标识去存储
      if (contentList.every(content => data[index][content] === data[index - 1][content])) {
        // 查找到符合条件的数据时每次要把之前存储的数据+1
        rowSpanList[pos] += 1
        rowSpanList.push(0)
      } else {
        // 没有符合的数据时，要记住当前的index
        rowSpanList.push(1)
        pos = index
      }
    }
  })
  return rowSpanList
}
