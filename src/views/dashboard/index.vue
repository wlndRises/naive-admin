<template>
  <div class="m-20px flex flex-col">
    <div class="my-20px">Hi~ {{ name }} {{ text }}</div>
    <el-button v-copy:dblclick="text" type="primary">双击复制</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { copy } from 'naive-directives'
import dayjs from 'dayjs'
export default {
  name: 'Dashboard',
  directives: {
    copy,
  },
  data() {
    return {
      text: null,
    }
  },
  computed: {
    ...mapGetters(['name']),
  },
  mounted() {
    const hour = dayjs().hour(),
      day = dayjs().day()

    if (hour > 8 && hour < 12) {
      this.text = '上午好~'
    } else if (hour > 11 && hour < 15) {
      this.text = '中午好~'
    } else if (hour > 14 && hour < 19) {
      this.text = '下午好~'
    } else if (day != 6 && day != 0) {
      this.text = '晚上好~ 上班辛苦了 好好休息吧'
    } else {
      this.text = '晚上好~ 周末了 记得休息欧'
    }
  },
}
</script>
