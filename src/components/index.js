import SvgIcon from './SvgIcon'

const components = { SvgIcon }

export default {
  install(Vue) {
    Object.keys(components).forEach((_, component) => {
      Vue.directive(component.name, component)
    })
  },
}
