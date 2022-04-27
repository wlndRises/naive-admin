import { createStorage } from './Storage'

export const createSessionStorage = prefixkey => {
  return createStorage(sessionStorage, prefixkey)
}

export const createLocalStorage = prefixKey => {
  return createStorage(localStorage, prefixKey)
}
