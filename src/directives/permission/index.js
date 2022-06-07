import store from '@/store'

export function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

export default {
  inserted(el, { value }) {
    const hasPermission = checkPermission(value)
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  },
  update(el, { value }) {
    const hasPermission = checkPermission(value)
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  },
}
