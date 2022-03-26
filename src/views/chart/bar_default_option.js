const BASIC_OPTION = {
  tooltip: {
    trigger: 'axis',
    formatter: '{a}:{c}',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  legend: {
    show: true,
    selectedMode: 'single', //single: 设置显示单一图例的图形 点击可切换  multiple: 多选模式
    textStyle: {
      color: '#666',
      fontSize: 12,
    },
    itemGap: 20,
    data: ['设备一', '设备二', '设备三'],
    inactiveColor: '#ccc',
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '济南',
        '青岛',
        '烟台',
        '威海',
        '潍坊',
        '东营',
        '日照',
        '滨州',
        '莱芜',
        '淄博',
        '德州',
        '聊城',
        '临沂',
        '泰安',
        '菏泽',
        '济宁',
        '枣庄',
      ],

      // axisLabel: {
      //   interval: 0,
      //   formatter(val) {
      //     if (val.length > 2) {
      //       return val.substr(0, 2)
      //     } else {
      //       return val
      //     }
      //   }
      // },

      axisPointer: {
        type: 'shadow',
      },

      axisTick: {
        show: true,
        interval: 0,
      },
    },
  ],

  //设置两个y轴，左边显示数量，右边显示概率

  yAxis: [
    {
      type: 'value',
      name: '数量',
      interval: 100,
    },
    {
      type: 'value',
      name: '概率',
      min: 0,
      max: 100,
      interval: 10,
      axisLabel: {
        formatter: '{value} %',
      },
    },
  ],

  //每个设备分数量、概率2个指标，只要让他们的name一致，即可通过，legend进行统一的切换

  series: [
    {
      name: '设备一',
      type: 'bar',
      data: [
        900, 800, 700, 680, 650, 640, 600, 570, 680, 650, 640, 600, 570, 450,
        400, 380, 300,
      ],
      barWidth: '50%',
    },
    {
      name: '设备一',
      type: 'line',
      yAxisIndex: 1, //这里要设置哪个y轴，默认是最左边的是0，然后1，2顺序来。
      data: [
        36, 42, 50, 65, 56, 42, 78, 69, 70, 75, 80, 75, 65, 85, 66, 45, 55,
      ],
      symbolSize: 10,
      itemStyle: {
        normal: {
          color: '#DDA0DD',
        },
      },
    },
    {
      name: '设备二',
      type: 'bar',
      data: [
        700, 680, 650, 640, 600, 570, 680, 650, 640, 600, 570, 450, 400, 380,
        300, 900, 800,
      ],
      barWidth: '50%',
    },
    {
      name: '设备二',
      type: 'line',
      yAxisIndex: 1,
      data: [
        75, 56, 36, 42, 50, 65, 75, 80, 42, 78, 69, 70, 65, 85, 66, 45, 55,
      ],
      symbolSize: 10,
      itemStyle: {
        normal: {
          color: '#87CEFA',
        },
      },
    },
    {
      name: '设备三',
      type: 'bar',
      data: [
        600, 570, 680, 650, 640, 600, 570, 450, 400, 380, 300, 900, 800, 700,
        680, 650, 640,
      ],
      barWidth: '50%',
    },
    {
      name: '设备三',
      type: 'line',
      yAxisIndex: 1,
      data: [
        75, 65, 85, 66, 45, 55, 56, 42, 78, 69, 70, 36, 42, 50, 65, 75, 80,
      ],
      symbolSize: 10,
      itemStyle: {
        normal: {
          color: '#CD5C5C',
        },
      },
    },
  ],
}

export { BASIC_OPTION }
