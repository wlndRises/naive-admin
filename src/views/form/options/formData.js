const formData = [
  {
    code: 'input',
    formLabel: '输入框',
    formType: 'input',
  },
  {
    code: 'select',
    formLabel: '下拉框',
    formType: 'select',
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
    clearable: true,
  },
  {
    code: 'customLabel',
    formLabel: '自定义标签',
    formType: 'input',
  },
  {
    code: 'customForm',
    formLabel: '自定义表单',
    formType: 'input',
  },
  {
    code: 'radio',
    formLabel: '单选框',
    formType: 'radio',
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
    code: 'checkbox',
    formLabel: '多选框',
    formType: 'checkbox',
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
    code: 'treeSelect',
    formType: 'treeSelect',
    formLabel: 'treeSelect',
    multiple: true,
    options: [
      {
        id: 'a',
        label: 'a',
        children: [
          {
            id: 'aa',
            label: 'aa',
          },
          {
            id: 'ab',
            label: 'ab',
          },
        ],
      },
      {
        id: 'b',
        label: 'b',
      },
      {
        id: 'c',
        label: 'c',
      },
    ],
  },
  {
    code: 'switch',
    formType: 'switch',
    formLabel: '开关',
  },
  {
    code: 'textarea',
    formLabel: '文本域',
    formType: 'textarea',
    span: 24,
  },
]

const formValue = {
  input: '',
  select: '',
  customLabel: '',
  customForm: '',
  radio: '',
  checkbox: [],
  treeSelect: [],
  switch: false,
  textarea: '',
}

export { formData, formValue }
