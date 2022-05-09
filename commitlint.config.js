module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'workflow', // 工作流改进
        'wip', // 开发中
        'mod', // 不确定分类的修改
      ],
    ],
  },
}
