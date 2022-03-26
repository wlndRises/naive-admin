<template>
  <div class="flex p-30px">
    <Ellipsis class="w-220px h-48px">
      住在我心里孤独的 孤独的海怪 痛苦之王 <br />
      开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
    <Ellipsis class="w-220px h-48px ml-30px" lineElips="2">
      电灯熄灭 物换星移 泥牛入海<br />黑暗好像 一颗巨石 按在胸口<br />独脚大盗 百万富翁 摸爬滚打<br />黑暗好像
      一颗巨石 按在胸口
    </Ellipsis>
    <Ellipsis class="w-220px ml-30px" expandTrigger lineElips="2" :tooltip="false">
      电灯熄灭 物换星移 泥牛入海<br />
      黑暗好像 一颗巨石 按在胸口<br />
      独脚大盗 百万富翁 摸爬滚打<br />
      黑暗好像 一颗巨石 按在胸口
    </Ellipsis>
    <Ellipsis class="w-220px ml-30px">
      住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
      <template #tooltip>
        <div style="text-align: center">
          《秦皇岛》<br />住在我心里孤独的<br />孤独的海怪 痛苦之王<br />开始厌倦 深海的光
          停滞的海浪
        </div>
      </template>
    </Ellipsis>
  </div>
</template>

<script>
import Ellipsis from '@/components/Ellipsis'
export default {
  name: 'LangText',
  components: {
    Ellipsis,
  }
}
</script>
