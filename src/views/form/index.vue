<template>
  <div>
    <Form
      :form-data="formData"
      :rules="rules"
      :layout-column="3"
      @submit-form="submitForm"
      @reset-form="resetForm"
    >
      <template #name1_label> 名字222 </template>
      <template #name2="{ data }">
        <el-radio-group v-model="formData[data.code]">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </template>
    </Form>
    {{ formData }}
  </div>
</template>

<script>
import Form from '@/components/Form'
export default {
  components: {
    Form,
  },
  data() {
    return {
      formData: {
        name: '222',
        name1: '222',
        name2: '222',
        desc: '01',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
      },
      resource: '',
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

<style></style>
