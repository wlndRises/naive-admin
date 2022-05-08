import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import 'windi.css'

import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
Vue.use(ElementUI)

import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

import directives from '@/directives' // global directives
Vue.use(directives)

import '@/styles/index.scss' // global scss

import './echarts.all' // tree-shaking echarts

import '@/components' // global components

import '@/assets/icons' // global icons

import '@/router/permission' // permission control

// 如果您不想使用mock-server 想用MockJs来模拟api 可以执行：mockXHR()
// 目前，MockJs将用于生产环境 请在上线前删除它！！！
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('/mock')
  mockXHR()
}

function bootstrap() {
  Vue.config.productionTip = false

  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  })
}

bootstrap()
