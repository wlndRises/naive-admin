<template>
  <div v-waterMarker="waterMarker" class="h-55 p-5">
    <el-button v-waves.dblclick v-copy.dblclick="text">双击复制</el-button>
    <el-button v-color="['red', 'green']">color text</el-button>
    <el-button v-spring v-screenfull.icon>全屏</el-button>
    <el-button v-waves v-clickOutSide="handleClickOutSide">clickOutSide</el-button>
    <el-button v-spring v-longPress="handleLongPress">longPress</el-button>
    <el-button v-waves>水波纹</el-button>
    <el-button v-spring>回弹</el-button>
  </div>
</template>

<script>
import { copy, color, clickOutSide, longPress, waterMarker } from 'naive-directives'
export default {
  directives: {
    copy,
    color,
    clickOutSide,
    longPress,
    waterMarker,
  },
  data() {
    return {
      text: 'hello naive-directives',
      waterMarker: {
        text: 'naive-directives',
        textColor: '#7232dd',
        font: '20px Fire Code',
      },
      tooltip: {
        effect: 'dark',
        content: 'Top Left 提示文字',
        placement: 'top-start',
        className: ['text-24px', 'leading-10', 'text-yellow-500'],
      },
    }
  },
  methods: {
    handleClickOutSide() {
      console.log('click handleClickOutSide')
    },
    handleLongPress() {
      console.log('click handleLongPress')
    },
  },
}
</script>
