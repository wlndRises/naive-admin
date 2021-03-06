import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import menuBadge from './modules/menuBadge'
import permission from './modules/permission'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    menuBadge,
    permission,
    settings,
    tagsView,
    user,
  },
  getters,
})

export default store
