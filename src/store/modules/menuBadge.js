import { createSessionStorage } from '@/utils/cache'
import { isEmpty } from '@/utils/is'

const Storage = createSessionStorage()

export function resetMenuBadge(routes) {
  routes.forEach(route => {
    if (!isEmpty(route?.meta?.badge)) {
      route.meta.badge = {}
    }
    if (route.children?.length) {
      resetMenuBadge(route.children)
    }
  })
}

export function setMenuBadge(routes, badge) {
  routes.find(route => {
    if (route.name === badge.name) {
      route.meta.badge = badge
      return true
    }
    if (route.children?.length) {
      setMenuBadge(route.children, badge)
    }
  })
}

const state = {
  menuBadges: Storage.get('menuBadges') || [],
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
  DLE_MENU_BADGE: (state, badge) => {
    const index = state.menuBadges.findIndex(item => item.name === badge.name)
    if (index === -1) return
    state.menuBadges.splice(index, 1)
    Storage.set('menuBadges', state.menuBadges)
  },
  DLE_MENU_BADGES(state) {
    state.menuBadges = []
    Storage.remove('menuBadges')
  },
  UPDATA_MENU_BADGES_VIEW(state, routes) {
    // fix menuBadges is empty no update
    if (!state.menuBadges.length) {
      resetMenuBadge(routes)
    } else {
      state.menuBadges.forEach(badge => {
        setMenuBadge(routes, badge)
      })
    }
  },
}

const actions = {
  addMenuBadge({ commit, rootState }, badge) {
    commit('ADD_MENU_BADGE', badge)
    commit('UPDATA_MENU_BADGES_VIEW', rootState.permission.routes)
  },
  dleMenuBadge({ commit, rootState }, badge) {
    commit('DLE_MENU_BADGE', badge)
    commit('UPDATA_MENU_BADGES_VIEW', rootState.permission.routes)
  },
  dleMenuBadges({ commit, rootState }) {
    commit('DLE_MENU_BADGES')
    commit('UPDATA_MENU_BADGES_VIEW', rootState.permission.routes)
  },
  updataMenuBadgesView({ commit, rootState }) {
    commit('UPDATA_MENU_BADGES_VIEW', rootState.permission.routes)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
