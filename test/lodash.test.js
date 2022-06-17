import { describe, expect, it } from 'vitest'
import { isFinite, isEmpty as CanEnumerated, merge as mergeDeep } from 'lodash-es'
import { isNumber, isNumString, isEmpty } from './src/utils/is'
import { merge } from './src/utils/implementation'

describe('lodash utils', () => {
  it('isFinite', () => {
    expect(isFinite(NaN)).toEqual(false)
    expect(isFinite(Infinity)).toEqual(false)
  })
  it('isNumber', () => {
    expect(isNumber(NaN)).toEqual(true)
    expect(isNumber(Infinity)).toEqual(true)
  })
  it('isNumString', () => {
    expect(isNumString('19.87')).toEqual(true)
    expect(isNumString('19-87')).toEqual(false)
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
    expect(CanEnumerated(new WeakMap())).toEqual(true)
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
    // TODO implement this function
    expect(isEmpty(new WeakMap())).toEqual(false)
  })
  it('mergeDeep', () => {
    expect(
      mergeDeep(
        {
          name: '',
          obj: {
            name: '',
            age: 18,
          },
        },
        {}
      )
    ).toEqual({
      name: '',
      obj: {
        name: '',
        age: 18,
      },
    })
    expect(
      mergeDeep(
        {
          name: '',
          obj: {
            name: '',
            age: 18,
          },
        },
        {
          name: 'Wind',
          obj: {
            name: 'Wind',
          },
        }
      )
    ).toEqual({
      name: 'Wind',
      obj: {
        name: 'Wind',
        age: 18,
      },
    })
    expect(
      mergeDeep(
        {
          name: '',
          arr: [1, 2],
        },
        {
          name: 'Wind',
          arr: [2],
        }
      )
    ).toEqual({
      name: 'Wind',
      arr: [2, 2],
    })
  })
  it('merge', () => {
    expect(
      merge(
        {
          name: '',
          obj: {
            name: '',
            age: 18,
          },
        },
        {}
      )
    ).toEqual({
      name: '',
      obj: {
        name: '',
        age: 18,
      },
    })
    expect(
      merge(
        {
          name: '',
          obj: {
            name: '',
            age: 18,
          },
        },
        {
          name: 'Wind',
          obj: {
            name: 'Wind',
          },
        }
      )
    ).toEqual({
      name: 'Wind',
      obj: {
        name: 'Wind',
        age: 18,
      },
    })
    expect(
      merge(
        {
          name: '',
          arr: [1, 2],
        },
        {
          name: 'Wind',
          arr: [2],
        }
      )
    ).toEqual({
      name: 'Wind',
      arr: [2, 2],
    })
  })
})
