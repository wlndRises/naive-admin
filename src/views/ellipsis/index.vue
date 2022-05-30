<template>
  <div class="flex flex-col p-5 p-25">
    <n-ellipsis class="w-55">
      我曾难自拔于世界之大 也沉溺于其中梦话 不得真假 不做挣扎 不惧笑话
    </n-ellipsis>

    <n-ellipsis class="w-55 mt-20" line-elips="2">
      我曾难自拔于世界之大 也沉溺于其中梦话 不得真假 不做挣扎 不惧笑话
    </n-ellipsis>

    <n-ellipsis class="w-55 mt-20" expand-trigger>
      我曾难自拔于世界之大 也沉溺于其中梦话 不得真假 不做挣扎 不惧笑话
    </n-ellipsis>

    <n-ellipsis class="w-55 mt-20" line-elips="2" expand-trigger>
      我曾难自拔于世界之大 也沉溺于其中梦话 不得真假 不做挣扎 不惧笑话
    </n-ellipsis>

    <n-ellipsis class="w-55 mt-20">
      我曾难自拔于世界之大 也沉溺于其中梦话 不得真假 不做挣扎 不惧笑话
      <template #tooltip>
        <div class="text-center">
          《起风了》
          <br />
          我曾难自拔于世界之大
          <br />
          也沉溺于其中梦话
          <br />
          不得真假 不做挣扎 不惧笑话
        </div>
      </template>
    </n-ellipsis>
  </div>
</template>

<script>
import NEllipsis from '@/components/NEllipsis'
export default {
  name: 'Ellipsis',
  components: {
    NEllipsis,
  },
}
</script>
