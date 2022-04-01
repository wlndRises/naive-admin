<template>
  <div>
    <template v-if="formInfo.type === 'input'">
      <el-input
        v-model="formValue"
        class="max-w-240px"
        placeholder="请输入"
      ></el-input>
    </template>
    <template v-else-if="formInfo.type === 'select'">
      <el-select
        v-model="formValue"
        placeholder="请选择"
        class="w-full max-w-240px"
      >
        <el-option
          v-for="item in formInfo.data"
          :key="item[optionValue]"
          :label="item[optionLabel]"
          :value="item[optionValue]"
        >
        </el-option>
      </el-select>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    value: {
      type: [String, Array],
      require: true,
      default: '',
    },
    // 下拉框
    optionLabel: {
      type: String,
      default: 'label',
    },
    optionValue: {
      type: String,
      default: 'value',
    },
  },
  computed: {
    formInfo() {
      return this.info
    },
    formValue: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
      },
    },
  },
}
</script>

<style></style>
