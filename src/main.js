import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueCompositionAPI from '@vue/composition-api'

import 'windi.css'

import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'

Vue.use(ElementUI).use(VueCompositionAPI)

import './echarts.all' // tree-shaking echarts

import '@/styles/index.scss' // global scss

import '@/components' // global components

import '@/assets/icons' // global icons

import '@/plugins' // global plugins

import '@/router/permission' // permission control

import cdnConfig from '/config/cdn'

import { cdnLoad } from './utils'

async function bootstrap() {
  await cdnLoad(cdnConfig)

  // 如果您不想使用mock-server 想用MockJs来模拟api 可以执行：mockXHR()
  // 目前，MockJs将用于生产环境 请在上线前删除它！！！
  if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('/mock')
    mockXHR()
  }

  Vue.config.productionTip = false

  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  })
}

bootstrap()
