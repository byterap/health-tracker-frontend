'use client'

import { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

interface WeightGaugeProps {
  currentWeight: number
  initialWeight: number
  targetWeight: number
  height: number
  onOpenSettings: () => void
}

export default function WeightGauge({ currentWeight, initialWeight, targetWeight, height, onOpenSettings }: WeightGaugeProps) {
  const [option, setOption] = useState({})
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let calculatedProgress = 0
    const totalDiff = initialWeight - targetWeight

    if (totalDiff > 0) {
      const currentDiff = initialWeight - currentWeight
      calculatedProgress = (currentDiff / totalDiff) * 100
    } else if (totalDiff < 0) {
      const currentDiff = currentWeight - initialWeight
      const targetDiff = targetWeight - initialWeight
      calculatedProgress = (currentDiff / targetDiff) * 100
    } else {
      calculatedProgress = currentWeight === targetWeight ? 100 : 0
    }

    calculatedProgress = Math.max(0, Math.min(100, calculatedProgress))
    setProgress(calculatedProgress)
    
    setOption({
      series: [{
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        radius: '130%',
        center: ['50%', '70%'],
        itemStyle: {
          color: '#58D9F9'
        },
        progress: {
          show: true,
          roundCap: true,
          width: 8
        },
        pointer: {
          show: false
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 8,
            color: [[1, '#E3E6EB']]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          show: false
        },
        data: [{
          value: calculatedProgress
        }]
      }]
    });
  }, [currentWeight, initialWeight, targetWeight]);

  const getBmiStatus = (weight: number) => {
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters * heightInMeters)
    if (bmi < 18.5) return { text: '偏瘦', color: 'text-yellow-500' }
    if (bmi < 24) return { text: '正常', color: 'text-green-500' }
    if (bmi < 28) return { text: '偏胖', color: 'text-orange-500' }
    return { text: '肥胖', color: 'text-red-500' }
  }

  const bmi = currentWeight / ((height / 100) * (height / 100))
  const bmiStatus = getBmiStatus(currentWeight)

  const getTargetDiffText = () => {
    const diff = currentWeight - targetWeight
    if (Math.abs(diff) < 0.1) return '已达标'
    return `还差 ${Math.abs(diff).toFixed(1)}kg`
  }

  return (
    <div className="bg-[#5CD0E9] rounded-2xl relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <button className="p-2">
          <ArrowPathIcon className="h-5 w-5 text-white" />
        </button>
      </div>
      <div className="relative px-4 pt-4">
        <ReactECharts option={option} style={{ height: '160px' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <div className="text-3xl font-semibold mb-1">{currentWeight.toFixed(1)}</div>
          <div className="text-xs opacity-80">BMI: {bmi.toFixed(1)}</div>
          <div className={`text-xs px-2 py-0.5 rounded-full bg-white/20 mt-1`}>
            {bmiStatus.text}
          </div>
          <div className="text-xs mt-1">
            目标达成 {progress.toFixed(1)}%
          </div>
        </div>
      </div>
      <div className="flex justify-between px-4 pb-4 mt-2 text-white">
        <button 
          className="text-center flex-1"
          onClick={onOpenSettings}
        >
          <div className="text-xs opacity-80">初始体重</div>
          <div className="text-sm">{initialWeight}kg</div>
        </button>
        <button className="text-center flex-1">
          <div className="text-xs opacity-80">距离目标</div>
          <div className="text-sm">{getTargetDiffText()}</div>
        </button>
        <button className="text-center flex-1">
          <div className="text-xs opacity-80">目标体重</div>
          <div className="text-sm">{targetWeight}kg</div>
        </button>
      </div>
    </div>
  )
} 