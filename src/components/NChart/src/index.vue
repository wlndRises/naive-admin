<template>
  <el-empty v-if="isEmpty">
    <template #image>
      <slot v-if="$slots.image" name="image" />
    </template>
    <template #description>
      <slot v-if="$slots.text" name="text" />
    </template>
    <template #default>
      <slot v-if="$slots.default" name="default" />
    </template>
  </el-empty>
  <v-chart
    v-else
    ref="Nchart"
    v-bind="$attrs"
    :update-options="updateOptions"
    manual-update
    v-on="$listeners"
  />
</template>

<script>
import VChart from 'vue-echarts'
import { merge } from '@/utils/lodash'
export default {
  name: 'NChart',
  components: {
    VChart,
  },
  inheritAttrs: false,
  props: {
    isEmpty: {
      type: Boolean,
      default: false,
    },
    updateOptions: {
      type: Object,
      default: () => ({}),
    },
    // 为了绕过vue的响应式系统 这里强制传入一个返回对象的function
    // 这样则无需在data声明一个被Object.freeze冻结的对象
    defineOption: {
      type: Function,
      default: () => ({}),
    },
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    isEmpty: {
      async handler(val) {
        if (!val) {
          await this.$nextTick()
          this.updateChartView()
        }
      },
      immediate: true,
    },
    option: {
      handler() {
        this.updateChartView()
      },
      deep: true,
    },
  },
  methods: {
    getInstance() {
      if (this.isEmpty) {
        return null
      } else {
        return this.$refs.Nchart
      }
    },
    mergeOption() {
      return merge({}, this.defineOption(), this.option)
    },
    mergeUpdateOptions() {
      return Object.assign({}, this.updateOptions, {
        notMerge: true,
      })
    },
    updateChartView() {
      const chart = this.getInstance()

      if (!chart) return

      const option = this.mergeOption()

      const updateOptions = this.mergeUpdateOptions()

      // setOption methods init use this.updateOptions
      // but update use this.mergeUpdateOptions
      chart.setOption(option, updateOptions)
    },
  },
}
</script>
