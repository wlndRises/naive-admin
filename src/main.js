import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import 'windi.css'

import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
Vue.use(ElementUI)

import components from '@/components' // global components
Vue.use(components)

import directives from '@/directives' // global directives
Vue.use(directives)

import '@/styles/index.scss' // global scss

import './echarts.all' // global echarts

import '@/assets/icons' // global icons

import '@/router/permission' // permission control

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('/mock')
  mockXHR() // use MockJs to simulate the API in a production environment
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
