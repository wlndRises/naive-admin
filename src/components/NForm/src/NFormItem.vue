<template>
  <!-- input -->
  <el-input
    v-if="formData.formType === 'input'"
    v-model="FormValue[formData.code]"
    v-bind="formData"
  ></el-input>

  <!-- textarea -->
  <el-input
    v-else-if="formData.formType === 'textarea'"
    v-model="FormValue[formData.code]"
    type="textarea"
    v-bind="formData"
  ></el-input>

  <!-- radio -->
  <el-radio-group v-else-if="formData.formType === 'radio'" v-model="FormValue[formData.code]">
    <el-radio v-for="item in formData.data" :key="item[optionValue]" :label="item[optionValue]">
      {{ item[optionLabel] }}
    </el-radio>
  </el-radio-group>

  <!-- date -->
  <el-date-picker
    v-else-if="formData.formType === 'date'"
    v-model="FormValue[formData.code]"
    v-bind="formData"
  ></el-date-picker>

  <!-- select -->
  <el-select
    v-else-if="formData.formType === 'select'"
    v-model="FormValue[formData.code]"
    class="w-full"
    v-bind="formData"
  >
    <el-option
      v-for="item in formData.data"
      :key="item[optionValue]"
      :label="item[optionLabel]"
      :value="item[optionValue]"
    ></el-option>
  </el-select>

  <!-- checkbox -->
  <el-checkbox-group
    v-else-if="formData.formType === 'checkbox'"
    v-model="FormValue[formData.code]"
  >
    <el-checkbox
      v-for="item in formData.data"
      :key="item[optionValue]"
      :type="item.code"
      :label="item[optionValue]"
    >
      {{ item[optionLabel] }}
    </el-checkbox>
  </el-checkbox-group>

  <!-- treeSelect -->
  <treeselect
    v-else-if="formData.formType === 'treeSelect'"
    v-model="FormValue[formData.code]"
    class="leading-normal py-2px"
    v-bind="formData"
  />

  <!-- switch -->
  <el-switch
    v-else-if="formData.formType === 'switch'"
    v-model="FormValue[formData.code]"
  ></el-switch>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    Treeselect,
  },
  props: {
    formData: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    formValue: {
      type: Object,
      require: true,
      default: () => ({}),
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
    FormValue() {
      return this.formValue
    },
  },
}
</script>
