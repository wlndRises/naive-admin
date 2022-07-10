import { WebStorage } from './WebStorage'

export const defaultKey = 'naive'

export function createStorage({ prefixKey = defaultKey, storage = localStorage }) {
  return new WebStorage({ prefixKey, storage })
}

export function createLocalStorage(prefixKey = defaultKey) {
  return createStorage({ prefixKey, storage: localStorage })
}

export function createSessionStorage(prefixKey = defaultKey) {
  return createStorage({ prefixKey, storage: sessionStorage })
}

export { getToken, setToken, removeToken } from './token'
