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
import validatorJs from 'validator'
import dayjs from 'dayjs'
import { isNumber } from '@/utils/lodash'

class Validator {
  constructor() {
    this.validatorJs = validatorJs
    this.trigger = 'blur' // change、blur
  }

  // iview内置验证封装-----------------------------------------------------------------

  /**
   * 非空验证
   * @param name 表单的label字段
   * @param type
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{required: boolean, message: string, trigger: (*|string)}}
   */
  required(name, type = 'string', trigger = this.trigger) {
    return { required: true, type, message: `${name}不能为空`, trigger }
  }

  /**
   * 邮件地址验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, message: string, trigger: (*|string)}}
   */
  mail(trigger = this.trigger) {
    return { type: 'email', message: `E-mail格式不正确`, trigger }
  }

  /**
   * 数字类型验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, message: string, trigger: (*|string)}}
   */
  number(trigger = this.trigger) {
    return {
      type: 'number',
      message: `请输入正确的数字`,
      trigger,
      transform(value) {
        value = value === '' ? null : Number(value)
        return value
      },
    }
  }

  /**
   * 整数验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, message: string, trigger: (*|string)}}
   */
  integer(trigger = this.trigger) {
    return {
      type: 'integer',
      message: `请输入整数`,
      trigger,
      transform(value) {
        value = value === '' ? null : Number(value)
        return value
      },
    }
  }

  /**
   * 浮点数验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, message: string, trigger: (*|string)}}
   */
  float(trigger = this.trigger) {
    return {
      type: 'float',
      message: `请输入正确的浮点数`,
      trigger,
      transform(value) {
        value = value === '' ? null : Number(value)
        return value
      },
    }
  }

  /**
   * 正数验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {*}
   */
  positiveNumber(trigger = this.trigger) {
    return {
      type: 'number',
      message: `请输入一个正数`,
      trigger,
      transform(value) {
        value = value === '' ? null : Number(value)
        return value
      },
      validator(rule, value, callback) {
        if (value === null) {
          callback()
          return
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
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {*}
   */
  negativeNumber(trigger = this.trigger) {
    return {
      type: 'number',
      message: `请输入一个负数`,
      trigger,
      transform(value) {
        value = value === '' ? null : Number(value)
        return value
      },
      validator(rule, value, callback) {
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
   * 数字大小区间值验证
   * @param min 限制最小值
   * @param max 限制最大值
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {*}
   */
  range(min, max, trigger = this.trigger) {
    const tempMap = {
      type: 'number',
      trigger,
      transform(value) {
        value = value === '' ? null : Number(value)
        return value
      },
    }
    if (min !== undefined && max !== undefined) {
      tempMap.min = min
      tempMap.max = max
      tempMap.message = `请输入一个大于等于${min}小于等于${max}的数字`
    } else if (min !== undefined) {
      tempMap.min = min
      tempMap.message = `请输入大于等于${min}的数字`
    } else if (max !== undefined) {
      tempMap.max = max
      tempMap.message = `请输入小于等于${max}的数字`
    }
    return tempMap
  }

  /**
   * 字符串区间长度验证
   * @param min 字符长度最小值
   * @param max 字符长度最大值
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, trigger: string}}
   */
  rangeString(min, max, trigger = this.trigger) {
    const tempMap = {
      type: 'string',
      trigger,
    }
    if (min !== undefined && max !== undefined) {
      tempMap.min = min
      tempMap.max = max
      tempMap.message = `请输入一个长度大于等于${min}小于等于${max}的字符`
    } else if (min !== undefined) {
      tempMap.min = min
      tempMap.message = `请输入一个长度大于等于${min}的字符`
    } else if (max !== undefined) {
      tempMap.max = max
      tempMap.message = `请输入一个长度小于等于${max}的字符`
    }
    return tempMap
  }

  /**
   * 固定字符长度
   * @param length
   * @param trigger
   * @returns {{type: string, message: string, trigger: string, length: *}}
   */
  lengths(len, trigger = this.trigger) {
    return {
      type: 'string',
      message: `请输入一个等于${len}的字符`,
      trigger,
      len,
    }
  }

  /**
   * 枚举验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @param array 表单输入值必须包含在array中
   */
  enum(array, trigger = this.trigger) {
    return {
      type: 'enum',
      enum: array,
      message: `输入的字符必须包含在 ${JSON.stringify(array)} 中`,
      trigger,
    }
  }

  /**
   * url 验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, message: string, trigger: string}}
   */
  url(trigger = this.trigger) {
    return {
      type: 'url',
      message: `请输入一个正确的链接地址（例如：https://www.baidu.com/）`,
      trigger,
    }
  }

  /**
   * 16进制验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, message: string, trigger: string}}
   */
  hex(trigger = this.trigger) {
    return {
      type: 'hex',
      message: `请输入一个正确的16进制数`,
      trigger,
    }
  }

  // 自定义验证 -----------------------------------------------------------------

  /**
   * 空白字符验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, whitespace: boolean, message: string, trigger: string}}
   */
  whitespace(trigger = this.trigger) {
    return {
      type: 'string',
      message: `请输入一个不包含空格的字符`,
      trigger,
      validator(rule, value, callback) {
        if (value.indexOf(' ') === -1) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  // 基于 validator.js 的验证扩展
  /**
   * 只包含字母验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): undefined}}
   */
  isAlpha(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: `请输入正确的英文字母`,
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isAlpha(value)) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 小写英文字母验证
   * @param trigger
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): undefined}}
   */
  isLowercase(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: `请输入正确的小写英文字母`,
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isAlpha(value)) {
          if (that.validatorJs.isLowercase(value)) {
            callback()
          } else {
            callback(new Error())
          }
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 大写英文字母
   * @param trigger
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): undefined}}
   */
  isUppercase(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: `请输入正确的大写英文字母`,
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isAlpha(value)) {
          if (that.validatorJs.isUppercase(value)) {
            callback()
          } else {
            callback(new Error())
          }
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 只包含字母和数字验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): undefined}}
   */
  isAlphanumeric(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: `请输入一个只包含英文字母和数字的字符`,
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isAlphanumeric(value)) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 银行卡号验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): void}}
   */
  isCreditCard(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: '请输入正确的银行卡号',
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isCreditCard(value)) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 十进制数字验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): void}}
   */
  isDecimal(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: '请输入正确的十进制数',
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isDecimal(value)) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 完整域名验证
   * @param trigger 触发方式 'blur' 或者 'change' 默认 'blur'
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): void}}
   */
  isFQDN(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: '请输入正确域名（例如：baidu.com）',
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isFQDN(value)) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * IP验证
   * @param trigger
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): undefined}}
   */
  isIP(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: '请输入正确IP（例如：192.168.1.1）',
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isIP(value)) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 端口验证
   * @param trigger
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): undefined}}
   */
  isPort(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: '请输入正确端口（例如：8080）',
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isPort(value)) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * MAC地址验证
   * @param trigger
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): undefined}}
   */
  isMACAddress(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: '请输入正确MAC地址（例如：9C-4E-36-C7-59-38）',
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isMACAddress(value)) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 16进制颜色值验证
   * @param trigger
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): void}}
   */
  isHexColor(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: '请输入正确的16进制颜色值',
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isHexColor(value)) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 电话号码验证
   * @param trigger
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): undefined}}
   */
  isMobilePhone(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: '请输入正确的电话号码',
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isMobilePhone(value, 'zh-CN')) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 邮政编码验证
   * @param trigger
   * @returns {{type: string, message: string, trigger: string, validator(*, *=, *): undefined}}
   */
  isPostalCode(trigger = this.trigger) {
    const that = this
    return {
      type: 'string',
      message: '请输入正确的邮政编码',
      trigger,
      validator(rule, value, callback) {
        if (value === '') {
          callback()
          return
        }
        if (that.validatorJs.isPostalCode(value, 'any')) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 日期验证 指定日期 beforeDate 之后
   * @param beforeDate 指定日期
   * @param message 验证错误信息 自定义 默认为 “结束日期不能大于起始日期”
   */
  isAfter(beforeDate, message) {
    const that = this
    return {
      type: 'date',
      message: message || '结束日期不能在起始日期之前',
      trigger: 'blur',
      validator(rule, value, callback) {
        if (value === '' || beforeDate === '' || beforeDate === undefined) {
          callback()
          return
        }
        const currDate = dayjs(value).format('YYYY-MM-DD')
        const befDate =
          typeof beforeDate === 'string' ? beforeDate : dayjs(beforeDate).format('YYYY-MM-DD')
        if (that.validatorJs.isAfter(currDate, befDate)) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }

  /**
   * 日期验证 指定日期 afterDate 之前
   * @param afterDate
   * @param message
   * @returns {{type: string, message: (*|string), trigger: string, validator(*, *=, *): undefined}}
   */
  isBefore(afterDate, message) {
    const that = this
    return {
      type: 'date',
      message: message || '起始日期不能在结束日期之后',
      trigger: 'blur',
      validator(rule, value, callback) {
        if (value === '' || afterDate === '' || afterDate === undefined) {
          callback()
          return
        }

        const currDate = dayjs(value).format('YYYY-MM-DD')
        const aftDate =
          typeof afterDate === 'string' ? afterDate : dayjs(afterDate).format('YYYY-MM-DD')
        if (that.validatorJs.isBefore(currDate, aftDate)) {
          callback()
        } else {
          callback(new Error())
        }
      },
    }
  }
}
export default new Validator()
