import { describe, expect, it } from 'vitest'
// 如果要使用别名 需要新建vite.config.js 配置alias
import { capitalize, toHump, toLine } from './src/utils/letter'

describe('letter utils', () => {
  it('toLine', () => {
    expect(toLine('camelCase')).toEqual('camel-case')
  })
  it('toLine', () => {
    expect(toLine('CamelCase')).toEqual('camel-case')
  })
  it('toHump', () => {
    expect(toHump('camel-case')).toEqual('camelCase')
  })
  it('firstUpper', () => {
    expect(capitalize('firstUpper')).toEqual('FirstUpper')
  })
})
