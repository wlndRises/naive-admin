import Vue from 'vue'
import SvgIcon from './SvgIcon'

const components = [SvgIcon]

components.forEach((component) => {
  Vue.component(component.name, component)
})
