<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :inline="inline"
    :inline-message="inlineMessage"
    :status-icon="statusIcon"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :hide-required-asterisk="hideRequiredAsterisk"
  >
    <el-row>
      <el-col
        v-for="(data, index) in formDataList"
        :key="index"
        :span="24 / layoutColumn"
      >
        <el-form-item
          :prop="rules ? data.code : rules"
          :disabled="data.disabled"
        >
          <template #label>
            <slot :name="data.code + '_label'" :data="data">{{
              data.label
            }}</slot>
          </template>
          <slot :name="data.code" :data="data">
            <form-item v-model="FormData[data.code]" :info="data"></form-item>
          </slot>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{
            submitText
          }}</el-button>
          <el-button @click="resetForm">{{ resetText }}</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import FormItem from '@/components/FormItem'

export default {
  components: {
    FormItem,
  },
  props: {
    rules: {
      type: Object,
      default: null,
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
    labelWidth: {
      type: String,
      default: '100px',
    },
    labelPosition: {
      type: String,
      default: 'right',
    },
    // ---------------------------------------------
    formData: {
      type: Object,
      default: () => ({}),
    },
    layoutColumn: {
      type: Number,
      default: 3,
    },
    submitText: {
      type: String,
      default: '提交',
    },
    resetText: {
      type: String,
      default: '重置',
    },
  },
  data() {
    return {
      formDataList: [
        {
          code: 'name',
          label: '名字',
          type: 'input',
        },
        {
          code: 'desc',
          label: '活动区域',
          type: 'select',
          data: [
            {
              label: '区域一',
              value: '01',
            },
            {
              label: '区域二',
              value: '02',
            },
          ],
        },
        {
          code: 'name1',
          label: '名字',
          type: 'input',
        },
        {
          code: 'name2',
          label: '名字',
          type: 'input',
        },
      ],
    }
  },
  computed: {
    FormData() {
      return this.formData
    },
  },
  methods: {
    submitForm() {
      // 没有传入校验规则时
      if (this.rules) {
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
