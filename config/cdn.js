let jsConfig = []

let externalConfig = []

if (process.env.NODE_ENV === 'production') {
  jsConfig = [
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.3/vue-router.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.min.js',
  ]
  externalConfig = [{ vue: 'Vue', 'vue-router': 'VueRouter', vuex: 'Vuex' }]
}

module.exports = { jsConfig, externalConfig }
