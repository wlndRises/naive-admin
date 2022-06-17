// 放一些不确定分类的实用函数
import { omitBy } from 'lodash-es'
import { isEmpty, isArray, isObject, isString } from '@/utils/is'

export const filterEmpty = (val, fn = isEmpty) => {
  if (isArray(val)) return val.filter(fn)
  if (isObject(val)) return omitBy(val, fn)
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

export const errorCapture = async asyncFunc => {
  try {
    const res = await asyncFunc()
    return [null, res]
  } catch (err) {
    return [err, null]
  }
}
