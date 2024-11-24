'use client'

import { useEffect, useState } from 'react'
import { metricsApi, WeightRecord } from '@/services/api'

export default function MetricsList() {
  const [metrics, setMetrics] = useState<WeightRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await metricsApi.getAll()
        setMetrics(response.data)
      } catch (error) {
        console.error('获取数据失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">历史记录</h2>
      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-500 text-center">加载中...</p>
        ) : metrics.length === 0 ? (
          <p className="text-gray-500 text-center">暂无记录</p>
        ) : (
          metrics.map((metric) => (
            <div
              key={metric._id}
              className="border border-gray-200 rounded-xl p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    体重: {metric.weight} kg
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(metric.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 