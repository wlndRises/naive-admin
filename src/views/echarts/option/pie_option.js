const option = {
  color: ['rgba(250, 200, 88, 1)', 'rgba(145, 204, 117, 1)'],
  title: {
    text: '本年工单执行情况',
    top: 20,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: 20,
    left: 'left',
    orient: 'vertical',
  },
  series: [
    {
      name: '执行情况',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        formatter: '任务总数: 1783',
      },
      data: [
        { value: 1048, name: '待执行' },
        { value: 735, name: '已完成' },
      ],
    },
  ],
}

export default () => option
