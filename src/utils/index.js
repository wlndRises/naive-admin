// 放一些不确定分类的实用函数
import { omitBy } from 'lodash-es'
import { isEmpty, isArray, isObject, isString } from '@/utils/is'

export const filterEmpty = (v, fn = isEmpty) => {
  if (isArray(v)) return v.filter(fn)
  if (isObject(v)) return omitBy(v, fn)
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
  if (isString(source)) {
    return source.split('').reverse().join('')
  }
  if (isArray(source)) {
    const arr = []
    for (let i = source.length - 1; i >= 0; i--) {
      const element = source[i]
      arr.push(element)
    }
    return arr
  }
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
