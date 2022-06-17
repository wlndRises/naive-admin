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
    ref="NChart"
    v-bind="$attrs"
    :update-options="updateOptions"
    manual-update
    v-on="$listeners"
  />
</template>

<script>
import VChart from 'vue-echarts'
import { constant, merge } from 'lodash-es'

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
      default: constant({}),
    },
    // 绕过vue的响应式系统 无需创建freeze对象
    defineOption: {
      type: Function,
      default: constant({}),
    },
    option: {
      type: Object,
      default: constant({}),
    },
  },
  watch: {
    isEmpty: {
      handler(val) {
        if (!val) {
          this.$nextTick(() => {
            this.updateChartView()
          })
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
    getNChartInstance() {
      if (this.isEmpty) {
        return null
      } else {
        return this.$refs.NChart
      }
    },
    mergeOption() {
      return merge({}, this.defineOption(), this.option)
    },
    getUpdateOptions() {
      return {
        ...this.updateOptions,
        notMerge: true,
      }
    },
    updateChartView() {
      const chart = this.getNChartInstance()

      if (!chart) return

      const option = this.mergeOption()

      const updateOptions = this.getUpdateOptions()

      chart.setOption(option, updateOptions)
    },
  },
}
</script>
