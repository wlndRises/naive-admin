import { describe, expect, it } from 'vitest'
import { mergeDeep } from './src/utils'

describe('lodash utils', () => {
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
})
