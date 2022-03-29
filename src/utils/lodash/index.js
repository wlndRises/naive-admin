// https://www.lodashjs.com
// babel-plugin-lodash 按需引入
// 在你需要使用lodash时 在这里添加抛出 就不会打整包
import _ from 'lodash'

export const cloneDeep = _.cloneDeep

export const debounce = _.debounce

export const throttle = _.throttle

export const merge = _.merge

export const head = _.head

export const last = _.last

// 去重
export const uniq = _.uniq

// 并集
export const union = _.union

// 交集
export const intersection = _.intersection

// 一维数组转二维
export const chunk = _.chunk

// 数组求和
export const sum = _.sum

// 随机数 除了可以通过第三个参数指定是否返回浮点数
// 还可以设置最大值最小值都为浮点数 结果也会返回浮点数
export const random = _.random

// 去空值
export const filterEmpty = (list) => list.filter(Boolean)

export const size = _.size

// 创建一个返回 value 的函数
export const constant = _.constant

// 这个方法返回 undefined
export const noop = _.noop

export const times = _.times
