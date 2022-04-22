<template>
  <div class="p-20px">
    <Form
      :form-data-list="formDataList"
      :form-value="formValue"
      :rules="rules"
      @submit-form="submitForm"
      @reset-form="resetForm"
    >
      <template #customLabel_label>自定义标签</template>
      <template #customForm="{ data }">
        <el-input v-model="formValue[data.code]" placeholder="自定义表单"></el-input>
      </template>
    </Form>
    {{ formValue }}
  </div>
</template>

<script>
import Form from '@/components/Form'
import formDataList from '../options/formDataList'
export default {
  components: {
    Form,
  },
  data() {
    return {
      formDataList,
      formValue: {
        input: '',
        select: '',
        customLabel: '',
        customForm: '',
        radio: '',
        checkbox: [],
        treeSelect: [],
        switch: false,
        textarea: '',
      },
      rules: {
        input: [
          {
            required: true,
            message: '输入框不能为空',
            trigger: 'blur',
          },
        ],
        select: [
          {
            required: true,
            message: '下拉框不能为空',
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    submitForm(newVal) {
      console.log(newVal)
    },
    resetForm() {},
  },
}
</script>
