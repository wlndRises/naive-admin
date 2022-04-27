import { asyncRoutes, constantRoutes } from '@/router'
import { createSessionStorage } from '@/utils/cache'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export function setMenuBadge(routes, badge) {
  routes.find(item => {
    if (item.name === badge.name) {
      item.meta.badge = badge
      return true
    }
    if (item.children?.length) {
      setMenuBadge(item.children, badge)
    }
  })
}

const Storage = createSessionStorage()

const state = {
  routes: [],
  addRoutes: [],
  menuBadges: Storage.get('menuBadges') || [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_MENU_BADGES(state, badges) {
    if (badges) {
      state.menuBadges = badges
      Storage.set('menuBadges', badges)
    }
    state.menuBadges.forEach(item => {
      setMenuBadge(state.routes, item)
    })
  },
}

const actions = {
  // TODO getMenuBadges
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_MENU_BADGES')
      resolve(accessedRoutes)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
