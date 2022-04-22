<template>
  <el-tooltip v-if="!expandTrigger" v-bind="$attrs">
    <template #content>
      <slot name="tooltip">
        <slot></slot>
      </slot>
    </template>
    <div
      class="n-ellipsis"
      :class="{ 'ellipsis-line-clamp': lineClamp != 1 }"
      :style="{
        '-webkit-line-clamp': lineClamp,
        textOverflow: lineClamp == 1 ? 'n-ellipsis' : '',
      }"
    >
      <slot></slot>
    </div>
  </el-tooltip>
  <div
    v-else
    class="n-ellipsis"
    :class="{ 'ellipsis-line-clamp': lineClamp != 1 }"
    :style="{
      '-webkit-line-clamp': lineClamp,
      textOverflow: lineClamp == 1 ? 'n-ellipsis' : '',
      cursor: expandTrigger ? 'pointer' : '',
    }"
    @click="expandTrigger && handleClick()"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Ellipsis',
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
      lineClamp: undefined,
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
        this.lineClamp = undefined
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
}

.n-ellipsis:not(.ellipsis-line-clamp) {
  white-space: nowrap;
  display: inline-block;
  vertical-align: bottom;
}

.n-ellipsis.ellipsis-line-clamp {
  display: inline-box;
  -webkit-box-orient: vertical;
}
</style>
