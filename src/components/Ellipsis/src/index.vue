<template>
  <el-tooltip v-if="tooltip" v-bind="$attrs">
    <template #content>
      <slot name="tooltip">
        <slot></slot>
      </slot>
    </template>
    <div
      class="ellipsis"
      :class="{ 'ellipsis--line-clamp': lineClamp != 1 }"
      :style="{
        '-webkit-line-clamp': lineClamp,
        textOverflow: lineClamp == 1 ? 'ellipsis' : '',
      }"
    >
      <slot></slot>
    </div>
  </el-tooltip>
  <div
    v-else
    class="ellipsis"
    :class="{ 'ellipsis--line-clamp': lineClamp != 1 }"
    :style="{
      '-webkit-line-clamp': lineClamp,
      textOverflow: lineClamp == 1 ? 'ellipsis' : '',
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
    // 默认显示tooltip
    tooltip: {
      type: Boolean,
      default: true,
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
.ellipsis {
  overflow: hidden;
}
.ellipsis:not(.ellipsis--line-clamp) {
  white-space: nowrap;
  display: inline-block;
  vertical-align: bottom;
}
.ellipsis.ellipsis--line-clamp {
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
}
</style>
