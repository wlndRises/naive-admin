// directive https://cn.vuejs.org/v2/guide/custom-directive.html

// 在钩子之间共享数据 el.setAttribute('data-src', val) <===> val = el.dataset.src
import permission from './permission'
import spring from './spring'
import waves from './waves'

const directives = {
  permission,
  spring,
  waves,
}

export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key])
    })
  },
}
