import SvgIcon from './SvgIcon'

const components = { SvgIcon }

export default {
  install(Vue) {
    Object.values(components).forEach(component => {
      Vue.component(component.name, component)
    })
  },
}
