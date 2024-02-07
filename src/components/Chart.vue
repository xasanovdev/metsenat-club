<template>
  <div class="bg-white mt-7 rounded-xl py-6">
    <v-chart class="chart" :option="option" autoresize style="height: 60vh" />
  </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  LineChart,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

provide(THEME_KEY, 'light')
const colors = ['#5470C6', '#EE6666']
const option = ref({
  color: colors,
  tooltip: {
    trigger: 'none',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {},
  grid: {
    top: 70,
    bottom: 50
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[1]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return (
              'Precipitation  ' +
              params.value +
              (params.seriesData.length ? '：' + params.seriesData[0].data : '')
            )
          }
        }
      },

      data: [
        'fevral',
        'mart',
        'aprel',
        'may',
        'iyun',
        'iyul',
        'avgust',
        'sentabr',
        'oktabr',
        'noyabr',
        'dekabr',
        'yanvar'
      ]
    },
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[0]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return (
              'Precipitation  ' +
              params.value +
              (params.seriesData.length ? '：' + params.seriesData[0].data : '')
            )
          }
        }
      },

      data: [
        'fevral',
        'mart',
        'aprel',
        'may',
        'iyun',
        'iyul',
        'avgust',
        'sentabr',
        'oktabr',
        'noyabr',
        'dekabr',
        'yanvar'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Homiylar',
      type: 'line',
      xAxisIndex: 1,
      smooth: true,
      emphasis: {
        focus: 'series'
      },
      data: [3000, 4000, 3000, 4000, 9000, 8000, 900, 20000, 4000, 10000, 5000, 30000]
    },
    {
      name: 'Talabalar',
      type: 'line',
      smooth: true,
      emphasis: {
        focus: 'series'
      },
      data: [5000, 7000, 10000, 1100, 10000, 8000, 900, 10000, 2000, 10000, 11000, 50000]
    }
  ]
})
</script>
