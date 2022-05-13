import { createStorage } from './storage'

export const createSessionStorage = prefixKey => {
  return createStorage(sessionStorage, prefixKey)
}

export const createLocalStorage = prefixKey => {
  return createStorage(localStorage, prefixKey)
}
