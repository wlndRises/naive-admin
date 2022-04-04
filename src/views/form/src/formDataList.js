export default [
  {
    code: 'input',
    label: '输入框',
    formType: 'input',
  },
  {
    code: 'select',
    label: '下拉框',
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
    label: '自定义标签',
    formType: 'input',
  },
  {
    code: 'customForm',
    label: '自定义表单',
    formType: 'input',
  },
  {
    code: 'radio',
    label: '单选框',
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
    label: '多选框',
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
    label: 'treeSelect',
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
    label: '开关',
  },
  {
    code: 'textarea',
    label: '文本域',
    formType: 'textarea',
    span: 24,
  },
]
