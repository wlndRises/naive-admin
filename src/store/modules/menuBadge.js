import { createSessionStorage } from '@/utils/cache'

const Storage = createSessionStorage()

const state = {
  menuBadges: Storage.get('menuBadges', []),
}

const mutations = {
  ADD_MENU_BADGE: (state, badge) => {
    const index = state.menuBadges.findIndex(item => item.name === badge.name)
    if (index === -1) {
      state.menuBadges.push(badge)
    } else {
      state.menuBadges.splice(index, 1, badge)
    }
    Storage.set('menuBadges', state.menuBadges)
  },
  DEL_MENU_BADGE: (state, badge) => {
    const index = state.menuBadges.findIndex(item => item.name === badge.name)
    if (index === -1) return
    state.menuBadges.splice(index, 1)
    Storage.set('menuBadges', state.menuBadges)
  },
  DEL_All_MENU_BADGE(state) {
    state.menuBadges = []
    Storage.remove('menuBadges')
  },
  UPDATE_MENU_BADGES_VIEW(state, routes) {
    resetMenuBadge(routes)
    state.menuBadges.forEach(badge => {
      setMenuBadge(routes, badge)
    })
  },
}

const actions = {
  addMenuBadge({ commit, rootState }, badge) {
    commit('ADD_MENU_BADGE', badge)
    commit('UPDATE_MENU_BADGES_VIEW', rootState.permission.routes)
  },
  delMenuBadge({ commit, rootState }, badge) {
    commit('DEL_MENU_BADGE', badge)
    commit('UPDATE_MENU_BADGES_VIEW', rootState.permission.routes)
  },
  delAllMenuBadge({ commit, rootState }) {
    commit('DEL_All_MENU_BADGE')
    commit('UPDATE_MENU_BADGES_VIEW', rootState.permission.routes)
  },
  updateMenuBadgesView({ commit, rootState }) {
    commit('UPDATE_MENU_BADGES_VIEW', rootState.permission.routes)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

export function setMenuBadge(routes, badge) {
  return routes.find(route => {
    if (route.name === badge.name) {
      route.meta.badge = badge
      return true
    }

    if (route.children?.length) {
      return setMenuBadge(route.children, badge)
    }
  })
}

export function resetMenuBadge(routes) {
  routes.forEach(route => {
    if (route?.meta?.badge) {
      route.meta.badge = null
    }

    if (route.children?.length) {
      resetMenuBadge(route.children)
    }
  })
}
