import { isVisibleInViewport } from '@/utils/is'
import { throttle } from '@/utils/lodash'
const LazyLoad = {
  // install方法
  install(Vue, options) {
    let defaultSrc = options.default || ''
    Vue.directive('lazy', {
      bind(el, binding) {
        LazyLoad.init(el, binding.value, defaultSrc)
      },
      inserted(el) {
        // 兼容处理
        if (IntersectionObserver) {
          LazyLoad.observe(el)
        } else {
          LazyLoad.listenerScroll(el)
        }
      },
    })
  },
  // 初始化
  init(el, val, def) {
    // data-src 储存真实src el.dataset.src
    el.setAttribute('data-src', val)
    // 设置src为loading图
    el.setAttribute('src', def)
  },
  // 利用IntersectionObserver监听el
  observe(el) {
    el._observer = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc
          el.removeAttribute('data-src')
          el._observer.unobserve(el)
        }
      }
    })
    el._observer.observe(el)
  },
  // 监听scroll事件
  listenerScroll(el) {
    el._handler = () => {
      throttle(LazyLoad.load, 300)(el)
    }
    LazyLoad.load(el)
    window.addEventListener('scroll', el._handler)
  },
  // 加载真实图片
  load(el) {
    const realSrc = el.dataset.src
    if (isVisibleInViewport(el)) {
      if (realSrc) {
        el.src = realSrc
        el.removeAttribute('data-src')
        window.removeEventListener('scroll', el._handler)
      }
    }
  },
}

export default LazyLoad
