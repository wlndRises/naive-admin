<template>
  <div class="p-5">
    <n-form
      :form-data-list="formData"
      :form-value="formValue"
      :rules="rules"
      @submit-form="submitForm"
      @reset-form="resetForm"
    >
      <template #customLabel_label>自定义标签</template>
      <template #customForm="{ data }">
        <el-input v-model="formValue[data.code]" placeholder="自定义表单"></el-input>
      </template>
    </n-form>
    {{ formValue }}
  </div>
</template>

<script>
import NForm from '@/components/NForm'
import { formData, formValue } from '../options/formData'
import { isNull } from '@/utils/is'

export default {
  components: {
    NForm,
  },
  data() {
    return {
      formData,
      formValue,
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
    submitForm(error) {
      if (isNull(error)) {
        // 校验规则通过
      } else {
        // 未通过
      }
    },
    resetForm() {},
  },
}
</script>
