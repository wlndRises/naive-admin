<template>
  <div v-waterMarker="waterMarker" class="h-55 p-5">
    <el-button v-waves.dblclick v-copy.dblclick="text">双击复制</el-button>
    <el-button v-waves v-clickOutSide="handleClickOutSide">clickOutSide</el-button>
    <el-button v-color="['red', 'green']">color text</el-button>
    <el-button v-expandClick>元素向外扩展10px</el-button>
    <el-button v-spring v-longPress="handleLongPress">longPress</el-button>
    <el-button v-waves>水波纹</el-button>
    <el-button v-spring>回弹</el-button>
  </div>
</template>

<script>
import { clickOutSide, color, copy, expandClick, longPress, waterMarker } from 'naive-directives'
export default {
  directives: {
    color,
    copy,
    expandClick,
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
    handleLongPress() {
      console.log('click handleLongPress')
    },
  },
}
</script>
