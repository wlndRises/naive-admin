import { createStorage } from './storage'

export const createSessionStorage = () => createStorage(sessionStorage)

export const createLocalStorage = () => createStorage(localStorage)

export { getToken, setToken, removeToken } from './token'
