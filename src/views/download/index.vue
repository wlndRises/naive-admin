<template>
  <div class="p-20px">
    <el-button type="primary" @click="handleClick1">在线图片下载</el-button>
    <el-button type="primary" @click="handleClick2">在线图片预览</el-button>
  </div>
</template>

<script>
import { downloadByUrl, downloadByOnlineUrl } from '@/utils/file'
export default {
  name: 'DownLoad',
  setup(props, ctx) {
    const handleClick1 = () => {
      downloadByOnlineUrl('https://img0.baidu.com/it/u=1491798261,3357676182&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500','小姐姐.png')
    }
    const handleClick2 = () => {
      downloadByUrl('https://img0.baidu.com/it/u=1491798261,3357676182&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500','小姐姐')
    }
    return {
      handleClick1,
      handleClick2
    }
  }
}
</script>