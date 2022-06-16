import { isNull } from '@/utils/is'
import { createStorage } from './storage'

export const createSessionStorage = prefixKey => createStorage(sessionStorage, prefixKey)

export const createLocalStorage = prefixKey => createStorage(localStorage, prefixKey)

export const nonNull = (val, def) => (isNull(val) ? def : val)
