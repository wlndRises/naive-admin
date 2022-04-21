// 手动引入 ECharts 各模块来减小打包体积
import { use } from 'echarts/core'

import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart, LineChart, HeatmapChart } from 'echarts/charts'
import {
  TitleComponent,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  HeatmapChart,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent,
])
