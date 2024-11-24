'use client'

import { useState, FormEvent } from 'react'
import { metricsApi } from '@/services/api'

interface Metrics {
  weight: string
  systolic: string
  diastolic: string
}

export default function HealthMetricsForm() {
  const [metrics, setMetrics] = useState<Metrics>({
    weight: '',
    systolic: '',
    diastolic: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      await metricsApi.create(metrics)
      // 清空表单
      setMetrics({ weight: '', systolic: '', diastolic: '' })
      // 可以添加成功提示
      alert('记录成功')
      // 触发列表刷新（后续实现）
      window.location.reload()
    } catch (error) {
      console.error('提交失败:', error)
      alert('提交失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm mb-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            体重 (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={metrics.weight}
            onChange={(e) => setMetrics({...metrics, weight: e.target.value})}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入体重"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              收缩压 (mmHg)
            </label>
            <input
              type="number"
              value={metrics.systolic}
              onChange={(e) => setMetrics({...metrics, systolic: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="收缩压"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              舒张压 (mmHg)
            </label>
            <input
              type="number"
              value={metrics.diastolic}
              onChange={(e) => setMetrics({...metrics, diastolic: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="舒张压"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 px-4 rounded-xl transition duration-200`}
        >
          {isSubmitting ? '记录中...' : '记录'}
        </button>
      </div>
    </form>
  )
} 