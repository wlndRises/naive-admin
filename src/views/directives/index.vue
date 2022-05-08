<template>
  <div v-waterMarker="waterMarker" class="h-220px p-20px">
    <el-button v-animation.dblclick v-copy.dblclick="text">双击复制</el-button>
    <el-button v-color="['red', 'green']">color text</el-button>
    <el-button v-animation v-screenfull.icon>全屏</el-button>
    <el-button v-animation v-clickOutSide="handleClickOutSide">clickOutSide</el-button>
    <el-button v-animation v-longPress="handleLongPress">longPress</el-button>
    <br />
    <span v-tooltip="tooltip" class="inline-block"></span>
  </div>
</template>

<script>
import { copy, color, tooltip, clickOutSide, longPress, waterMarker } from 'naive-directives'
export default {
  directives: {
    copy,
    color,
    tooltip,
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
        className: ['text-24px', 'leading-40px', 'text-yellow-500'],
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
