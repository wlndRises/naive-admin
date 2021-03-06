<template>
  <el-form
    ref="ruleForm"
    :model="formValue"
    :rules="rules"
    :inline="inline"
    :inline-message="inlineMessage"
    :status-icon="statusIcon"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :hide-required-asterisk="hideRequiredAsterisk"
    :disabled="disabled"
  >
    <el-row>
      <el-col v-for="(formData, index) in formDataList" :key="index" :span="formData.span || 12">
        <el-form-item class="px-8" :prop="formData.code">
          <template #label>
            <slot :name="`${formData.code}_label`" :data="formData">
              {{ formData.formLabel }}
            </slot>
          </template>
          <template #default>
            <slot :name="formData.code" :data="formData">
              <n-form-item :form-value="realFormValue" :form-data="formData"></n-form-item>
            </slot>
          </template>
        </el-form-item>
      </el-col>
      <el-col v-if="!footerHide" :span="24">
        <el-form-item>
          <el-button type="primary" @click="submitForm">
            {{ submitText }}
          </el-button>
          <el-button @click="resetForm">{{ resetText }}</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import NFormItem from './NFormItem.vue'
import { isEmpty, constant } from 'lodash-es'

export default {
  name: 'NForm',
  components: {
    NFormItem,
  },
  props: {
    rules: {
      type: Object,
      default: constant({}),
    },
    inline: {
      type: Boolean,
      default: false,
    },
    inlineMessage: {
      type: Boolean,
      default: false,
    },
    statusIcon: {
      type: Boolean,
      default: false,
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: String,
      default: '100px',
    },
    labelPosition: {
      type: String,
      default: 'left',
    },
    formDataList: {
      type: Array,
      required: true,
    },
    formValue: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
      default: '提交',
    },
    resetText: {
      type: String,
      default: '重置',
    },
    footerHide: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    realFormValue() {
      return this.formValue
    },
  },
  methods: {
    submitForm() {
      if (isEmpty(this.rules)) {
        this.$emit('submit-form', null)
      } else {
        this.$refs.ruleForm.validate((valid, error) => {
          if (valid) {
            this.$emit('submit-form', null)
          } else {
            this.$emit('submit-form', error)
          }
        })
      }
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.$emit('reset-form')
    },
    clearValidate() {
      this.$refs.ruleForm.clearValidate()
    },
  },
}
</script>
