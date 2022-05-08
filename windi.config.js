// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  // 属性化模式
  attributify: true,
  // 工具类
  shortcuts: {
    'n-flex': 'flex justify-center items-center',
  },
})
