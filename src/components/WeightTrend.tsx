'use client'

import { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'

interface WeightRecord {
  weight: number
  date: string
}

interface WeightTrendProps {
  data: WeightRecord[]
  height: number
}

export default function WeightTrend({ data, height }: WeightTrendProps) {
  const [option, setOption] = useState({})

  const getBmiStatus = (weight: number) => {
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters * heightInMeters)
    return bmi >= 18.5 && bmi < 24
  }

  useEffect(() => {
    // 获取最近7天的数据
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date
    }).reverse()

    // 将数据按日期分组
    const dateMap = new Map(
      data.map(item => [new Date(item.date).toDateString(), item.weight])
    )

    // 准备图表数据
    const chartData = last7Days.map(date => {
      const weight = dateMap.get(date.toDateString())
      const isToday = new Date().toDateString() === date.toDateString()
      return {
        date,
        weight,
        hasRecord: !!weight,
        isToday,
        isNormalBmi: weight ? getBmiStatus(weight) : false,
        weekday: isToday ? '今天' : ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
      }
    })

    // 找出最大体重值，用于设置柱状图高度
    const maxWeight = Math.max(...chartData.filter(item => item.hasRecord).map(item => item.weight || 0))

    setOption({
      tooltip: {
        trigger: 'axis',
        formatter: function(params: any) {
          const data = params[0]
          const date = new Date(data.axisValue)
          const record = chartData[data.dataIndex]
          return `${date.getMonth() + 1}月${date.getDate()}日 ${record.weekday}<br/>
                  体重: ${record.hasRecord ? record.weight + 'kg' : '未记录'}`
        }
      },
      grid: {
        top: '25%',
        left: '10%',
        right: '10%',
        bottom: '8%',
        height: '160px'
      },
      xAxis: {
        type: 'category',
        data: chartData.map(item => item.date),
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          formatter: (value: string) => {
            const item = chartData.find(item => 
              item.date.toDateString() === new Date(value).toDateString()
            )
            return item?.weekday
          },
          interval: 0,
          color: (value: string) => {
            const item = chartData.find(item => 
              item.date.toDateString() === new Date(value).toDateString()
            )
            return item?.isToday ? '#58D9F9' : '#999'
          },
          fontWeight: (value: string) => {
            const item = chartData.find(item => 
              item.date.toDateString() === new Date(value).toDateString()
            )
            return item?.isToday ? 'bold' : 'normal'
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        show: false,
        max: maxWeight,
        splitLine: {
          show: false
        }
      },
      series: [
        {
          // 背景柱状图（浅色柱）
          type: 'bar',
          barWidth: '40%',
          silent: true,
          itemStyle: {
            color: 'rgba(88, 217, 249, 0.1)',
            borderColor: 'rgba(88, 217, 249, 0.2)',
            borderWidth: 1,
            borderType: 'solid',
            borderRadius: [4, 4, 0, 0]
          },
          data: Array(chartData.length).fill(maxWeight),
          label: {
            show: true,
            position: 'top',
            distance: 10,
            formatter: (params: any) => {
              const record = chartData[params.dataIndex]
              const emoji = record.hasRecord ? (record.isNormalBmi ? '😊' : '😢') : '😊'
              const value = record.hasRecord ? record.weight : '0'
              return [
                `{emoji|${emoji}}`,
                `{value|${value}}`
              ].join('\n')
            },
            rich: {
              emoji: {
                fontSize: 14,
                lineHeight: 16,
                padding: [0, 0, 2, 0],
                align: 'center',
                verticalAlign: 'bottom',
                width: 40
              },
              value: {
                fontSize: 12,
                lineHeight: 12,
                align: 'center',
                verticalAlign: 'top',
                width: 40,
                color: '#666'
              }
            }
          }
        },
        {
          // 数据柱状图
          data: chartData.map(item => ({
            value: item.hasRecord ? item.weight : maxWeight,
            itemStyle: {
              color: item.hasRecord ? '#58D9F9' : 'transparent',
              borderRadius: [4, 4, 0, 0]
            }
          })),
          type: 'bar',
          barWidth: '40%',
          barGap: '-100%',
          label: {
            show: false
          }
        }
      ]
    });
  }, [data, height]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-base font-medium text-gray-900">近7天体重记录</h2>
        <div className="text-xs text-gray-500">
          {new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).getMonth() + 1}月
          {new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).getDate()}日 - {' '}
          {new Date().getMonth() + 1}月{new Date().getDate()}日
        </div>
      </div>
      <ReactECharts 
        option={option} 
        style={{ height: '260px' }}
      />
    </div>
  )
} 