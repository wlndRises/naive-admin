/**
 * 封装一些表单内置验证 async-validator https://github.com/yiminghe/async-validator
 *
 * 属性	类型	说明
 * type	String	用于验证数据类型，默认类型为’string’
 * required	boolean	是否必填
 * pattern	regexp/string	字段值匹配正则表达式才能通过验证
 * min和max	number	对于字符串和数组类型，将根据长度进行比较，对于数字类型，数字不得小于min，也不得大于max
 * len	number	对于字符串和数组类型，对length属性执行比较，对于数字类型，此属性指示数字的完全匹配，len属性与min和max属性组合，则len优先。
 * enum	array	type必须设置为enum，值必须包含在从可能值列表中才能通过验证
 * whitespace	boolean	type必须设置为string，要为仅包含空格的字符串可以将whitespace设置为true
 * transform	function	在验证之前转换值
 * defaultField	array/object	type为数组或对象类型时一起使用，用来验证数组或对象中包含的所有值，进行深层验证
 * fields	object	type为数组或对象类型时一起使用，分别验证array/object类型的数据中的值，实现深度验证
 * validator	function	验证器，可以为指定字段自定义验证函数：function(rule, value, callback)
 * asyncValidator	function	异步验证器，可以为指定字段自定义异步验证函数 function(rule, value, callback)
 * message	string/jsx/function等	根据需要将消息分配给规则
 *
 * 基于 validator.js 对表单验证扩展 https://github.com/chriso/validator.js
 */
import dayjs from 'dayjs'

import validatorJs from 'validator'

import { isNumber } from '@/utils/is'

/**
 * 非空验证
 */
export function required(name, type = 'string', trigger = 'blur') {
  return { required: true, type, message: `${name}不能为空`, trigger }
}

// iview内置验证封装

/**
 * 固定字符长度
 */
export function lengths(len, trigger = 'blur') {
  return {
    type: 'string',
    message: `请输入一个等于${len}的字符`,
    trigger,
    len,
  }
}

/**
 * 邮件地址验证
 */
export function mail(trigger = 'blur') {
  return { type: 'email', message: `E-mail格式不正确`, trigger }
}

/**
 * 数字类型验证
 */
export function number(trigger = 'blur') {
  return {
    type: 'number',
    message: `请输入正确的数字`,
    trigger,
    transform(value) {
      return value === '' ? null : Number(value)
    },
  }
}

/**
 * 整数验证
 */
export function integer(trigger = 'blur') {
  return {
    type: 'integer',
    message: `请输入整数`,
    trigger,
    transform(value) {
      return value === '' ? null : Number(value)
    },
  }
}

/**
 * 浮点数验证
 */
export function float(trigger = 'blur') {
  return {
    type: 'float',
    message: `请输入正确的浮点数`,
    trigger,
    transform(value) {
      return value === '' ? null : Number(value)
    },
  }
}

/**
 * 正数验证
 */
export function positiveNumber(trigger = 'blur') {
  return {
    type: 'number',
    message: `请输入一个正数`,
    trigger,
    transform(value) {
      return value === '' ? null : Number(value)
    },
    validator(_, value, callback) {
      if (value === null) {
        return callback()
      }
      if (!isNumber(value)) {
        callback(new Error())
      } else {
        if (value < 0) {
          callback(new Error())
        } else {
          callback()
        }
      }
    },
  }
}

/**
 * 负数验证
 */
export function negativeNumber(trigger = 'blur') {
  return {
    type: 'number',
    message: `请输入一个负数`,
    trigger,
    transform(value) {
      return value === '' ? null : Number(value)
    },
    validator(_, value, callback) {
      if (value === null) {
        callback()
        return
      }
      if (!isNumber(value)) {
        callback(new Error())
      } else {
        if (value > 0) {
          callback(new Error())
        } else {
          callback()
        }
      }
    },
  }
}

/**
 * url 验证
 */
export function url(trigger = 'blur') {
  return {
    type: 'url',
    message: `请输入一个正确的链接地址（例如：https://www.baidu.com/）`,
    trigger,
  }
}

// 自定义验证

export function createValidator(message, checkFn, trigger, type = 'string') {
  return {
    type,
    message,
    trigger,
    validator(_, value, callback) {
      if (value === '') {
        callback()
        return
      }
      if (checkFn(value)) {
        callback()
      } else {
        callback(new Error())
      }
    },
  }
}

/**
 * 只包含字母验证
 */
export function isAlpha(trigger = 'blur') {
  return createValidator('请输入正确的英文字母', validatorJs.isAlpha, trigger)
}

/**
 * 小写英文字母验证
 */
export function isLowercase(trigger = 'blur') {
  const checkFn = value => {
    return validatorJs.isAlpha(value) && validatorJs.isLowercase(value)
  }
  return createValidator('请输入正确的小写英文字母', checkFn, trigger)
}

/**
 * 大写英文字母
 */
export function isUppercase(trigger = 'blur') {
  const checkFn = value => {
    return validatorJs.isAlpha(value) && validatorJs.isUppercase(value)
  }
  return createValidator('请输入正确的大写英文字母', checkFn, trigger)
}

/**
 * 只包含字母和数字验证
 */
export function isAlphanumeric(trigger = 'blur') {
  return createValidator(
    '请输入一个只包含英文字母和数字的字符',
    validatorJs.isAlphanumeric,
    trigger
  )
}

/**
 * 银行卡号验证
 */
export function isCreditCard(trigger = 'blur') {
  return createValidator('请输入正确的银行卡号', validatorJs.isCreditCard, trigger)
}

/**
 * 十进制数字验证
 */
export function isDecimal(trigger = 'blur') {
  return createValidator('请输入正确的十进制数', validatorJs.isDecimal, trigger)
}

/**
 * IP验证
 */
export function isIP(trigger = 'blur') {
  return createValidator('请输入正确IP（例如：192.168.1.1', validatorJs.isIP, trigger)
}

/**
 * 端口验证
 */
export function isPort(trigger = 'blur') {
  return createValidator('请输入正确端口（例如：8080）', validatorJs.isPort, trigger)
}

/**
 * 完整域名验证
 */
export function isFQDN(trigger = 'blur') {
  return {
    type: 'string',
    message: '请输入正确域名（例如：baidu.com）',
    trigger,
    validator(_, value, callback) {
      if (value === '') {
        callback()
        return
      }
      if (validatorJs.isFQDN(value)) {
        callback()
      } else {
        callback(new Error())
      }
    },
  }
}

/**
 * MAC地址验证
 */
export function isMACAddress(trigger = 'blur') {
  return createValidator(
    '请输入正确MAC地址（例如：9C-4E-36-C7-59-38）',
    validatorJs.isMACAddress,
    trigger
  )
}

/**
 * 16进制颜色值验证
 */
export function isHexColor(trigger = 'blur') {
  return createValidator('请输入正确的16进制颜色值', validatorJs.isHexColor, trigger)
}

/**
 * 电话号码验证
 */
export function isMobilePhone(trigger = 'blur') {
  return createValidator('请输入正确的手机号码', validatorJs.isMobilePhone, trigger)
}

/**
 * 邮政编码验证
 */
export function isPostalCode(trigger = 'blur') {
  return createValidator('请输入正确的邮政编码', validatorJs.isPostalCode, trigger)
}

/**
 * 日期验证 指定日期在 startDate 之后
 */
export function isAfter(startDate, trigger = 'blur') {
  return {
    type: 'date',
    message: '结束日期不能在起始日期之前',
    trigger,
    validator(_, value, callback) {
      if (value === '' || startDate === '') {
        return callback()
      }

      if (dayjs(value).isAfter(dayjs(startDate))) {
        callback()
      } else {
        callback(new Error())
      }
    },
  }
}

/**
 * 日期验证 指定日期在 endDate 之前
 */
export function isBefore(endDate, trigger = 'blur') {
  return {
    type: 'date',
    message: '起始日期不能在结束日期之后',
    trigger,
    validator(_, value, callback) {
      if (value === '' || endDate === '') {
        return callback()
      }

      if (dayjs(value).isBefore(endDate)) {
        callback()
      } else {
        callback(new Error())
      }
    },
  }
}
