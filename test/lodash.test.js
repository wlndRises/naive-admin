import { describe, expect, it } from 'vitest'
import { isFinite, isEmpty as CanEnumerated } from 'lodash'
import { isNumber, canToNumberString, isEmpty } from './src/utils/is'

describe('lodash utils', () => {
  it('isFinite', () => {
    expect(isFinite(NaN)).toEqual(false)
    expect(isFinite(Infinity)).toEqual(false)
  })
  it('isNumber', () => {
    expect(isNumber(NaN)).toEqual(true)
    expect(isNumber(Infinity)).toEqual(true)
  })
  it('canToNumberString', () => {
    expect(canToNumberString('19.87')).toEqual(true)
    expect(canToNumberString('19-87')).toEqual(false)
  })
  it('CanEnumerated', () => {
    expect(CanEnumerated(null)).toEqual(true)
    expect(CanEnumerated(undefined)).toEqual(true)
    expect(CanEnumerated(true)).toEqual(true)
    expect(CanEnumerated(0)).toEqual(true)
    expect(CanEnumerated('')).toEqual(true)
    expect(CanEnumerated([])).toEqual(true)
    expect(CanEnumerated({})).toEqual(true)
    expect(CanEnumerated(new Set())).toEqual(true)
    expect(CanEnumerated(new Map())).toEqual(true)
  })
  it('isEmpty', () => {
    expect(isEmpty(null)).toEqual(true)
    expect(isEmpty(undefined)).toEqual(true)
    expect(isEmpty(true)).toEqual(false)
    expect(isEmpty(0)).toEqual(false)
    expect(isEmpty('')).toEqual(true)
    expect(isEmpty([])).toEqual(true)
    expect(isEmpty({})).toEqual(true)
    expect(isEmpty(new Set())).toEqual(true)
    expect(isEmpty(new Map())).toEqual(true)
  })
})
