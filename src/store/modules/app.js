import { createLocalStorage, nonNull } from '@/utils/cache'

const Storage = createLocalStorage()

const state = {
  sidebar: {
    opened: nonNull(Storage.get('sidebarStatus'), true),
    withoutAnimation: false,
  },
  device: 'desktop',
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Storage.set('sidebarStatus', true)
    } else {
      Storage.set('sidebarStatus', false)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Storage.set('sidebarStatus', false)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
