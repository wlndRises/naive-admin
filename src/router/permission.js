import router from '.'
import store from '../store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // get token from cookie
import defaultSettings from '/config/settings'

const title = defaultSettings.title || 'Naive Admin'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

  // 确定用户是否登录过
  const hasToken = getToken()

  if (hasToken) {
    // 将要跳转登录页
    if (to.path === '/login') {
      // 则重定向到主页
      next({ path: '/' })
      NProgress.done()
    }
    // 否则
    else {
      const hasGetUserInfo = store.getters.name
      // 如果存在用户名则正常跳转
      if (hasGetUserInfo) {
        next()
      }
      // 否则
      else {
        // 如果Token没有过期获取到了userInfo则正常跳转
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch {
          // 过期则删除Token令牌，进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error('Token已过期请重新登录')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  }
  // 没有Token
  else {
    // 在免登录白名单中，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    }
    // 没有访问权限的其他页面被重定向到登录页面。
    else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
