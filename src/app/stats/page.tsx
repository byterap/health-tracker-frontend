import React from 'react'
import PageTitle from '@/components/PageTitle'

export default function StatsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <PageTitle>健康统计</PageTitle>
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">数据趋势</h2>
            <div className="space-y-4">
              {/* TODO: 添加图表组件 */}
              <p className="text-gray-500 text-center">图表开发中...</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 