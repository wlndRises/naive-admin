<template>
  <el-tooltip v-if="!expandTrigger" v-bind="$attrs">
    <template #content>
      <slot name="tooltip">
        <slot></slot>
      </slot>
    </template>
    <div
      class="n-ellipsis"
      :style="{
        '-webkit-line-clamp': lineClamp,
      }"
    >
      <slot></slot>
    </div>
  </el-tooltip>
  <div
    v-else
    class="n-ellipsis cursor-pointer"
    :style="{
      '-webkit-line-clamp': lineClamp,
    }"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NEllipsis',
  props: {
    lineElips: {
      type: [String, Number],
      default: 1,
    },
    // 默认关闭展开收起功能
    expandTrigger: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      lineClamp: null,
    }
  },
  watch: {
    lineElips: {
      handler(newVal) {
        this.lineClamp = newVal
      },
      immediate: true,
    },
  },
  methods: {
    handleClick() {
      if (this.lineClamp) {
        this.lineClamp = null
      } else {
        this.lineClamp = this.lineElips
      }
    },
  },
}
</script>

<style scoped>
.n-ellipsis {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
