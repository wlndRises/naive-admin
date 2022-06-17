import { isNull } from '@/utils/is'
import { createStorage } from './storage'

export const createSessionStorage = () => createStorage(sessionStorage)

export const createLocalStorage = () => createStorage(localStorage)

export const nonNull = (val, def) => (isNull(val) ? def : val)

export { getToken, setToken, removeToken } from './token'
