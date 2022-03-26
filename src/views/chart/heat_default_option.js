const BASIC_OPTION = {
  tooltip: {
    position: 'top'
  },
  animation: false,
  grid: {
    height: '80%',
    top: 0
  },
  xAxis: {
    type: 'category',
    data: [],
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: 'category',
    data: [],
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 20,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '0'
  },
  series: {
    name: 'Punch Card',
    type: 'heatmap',
    data: [],
    label: {
      show: true
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }
}

export { BASIC_OPTION }
