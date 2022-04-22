<template>
  <div v-waterMarker="waterMarker" class="h-220px m-20px">
    <el-button v-copy:dblclick="text" type="primary">双击复制</el-button>
    <el-button v-screenfull.icon type="primary">全屏</el-button>
    <el-button v-clickOutSide="handleClickOutSide" type="primary">clickOutSide</el-button>
    <el-button v-longPress="handlelongPress" type="primary">longPress</el-button>
  </div>
</template>

<script>
import { copy, screenfull, clickOutSide, longPress, waterMarker } from 'naive-directives'
export default {
  directives: {
    copy,
    screenfull,
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
    }
  },
  methods: {
    handleClickOutSide() {
      console.log('click handleClickOutSide')
    },
    handlelongPress() {
      console.log('click handlelongPress')
    },
  },
}
</script>
