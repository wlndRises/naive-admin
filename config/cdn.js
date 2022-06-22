let cdnConfig, externals

if (process.env.NODE_ENV === 'development') {
  // 开发及测试环境CDN
  cdnConfig = []
  externals = []
} else {
  // 生产环境CDN
  cdnConfig = [
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.3/vue-router.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.min.js',
  ]
  externals = [{ vue: 'Vue', 'vue-router': 'VueRouter', vuex: 'Vuex' }]
}

module.exports = {
  cdnConfig,
  externals,
}
