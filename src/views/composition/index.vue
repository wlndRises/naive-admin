<template>
  <div class="flex p-30px">
    <div class="w-200px">
      <el-input v-model="title" />
    </div>
    <div class="ml-20px">
      <el-button type="primary" @click="toggleDark">点击</el-button>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import { useTitle, useDark, useToggle } from '@vueuse/core'

export default {
  name: 'Composition',
  setup() {
    const title = useTitle()

    const isDark = useDark()

    const toggleDark = useToggle(isDark)

    onMounted(() => {
      title.value = 'composition api'
    })

    return {
      title,
      toggleDark,
    }
  },
}
</script>
