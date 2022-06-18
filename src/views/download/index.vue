<template>
  <div class="p-5">
    <el-button type="primary" @click="handleClick1">在线图片下载</el-button>
    <el-button type="primary" @click="handleClick2">在线图片预览</el-button>
  </div>
</template>

<script>
import { downloadByOnlineUrl, downloadByUrl } from '@/utils/file'
export default {
  name: 'DownLoad',
  methods: {
    handleClick1() {
      downloadByOnlineUrl(
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F6e41bd4e7a39526f221ee25b7ad625f63e3d6a8d.png&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653553508&t=7f604e28ca6b93a550f4338501b3fe70',
        '天空之城.png'
      )
    },
    handleClick2() {
      downloadByUrl(
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F6e41bd4e7a39526f221ee25b7ad625f63e3d6a8d.png&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653553508&t=7f604e28ca6b93a550f4338501b3fe70'
      )
    },
  },
}
</script>
