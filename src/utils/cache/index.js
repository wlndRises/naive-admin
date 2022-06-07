import { createStorage } from './storage'
import { isNull } from '@/utils/is'

export const createSessionStorage = prefixKey => {
  return createStorage(sessionStorage, prefixKey)
}

export const createLocalStorage = prefixKey => {
  return createStorage(localStorage, prefixKey)
}

export const nonNull = (val, def) => {
  return isNull(val) ? def : val
}
