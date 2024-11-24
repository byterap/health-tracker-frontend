import React from 'react'
import PageTitle from '@/components/PageTitle'

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <PageTitle>个人中心</PageTitle>
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">用户名</h2>
                <p className="text-sm text-gray-500">查看和编辑个人资料</p>
              </div>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-50 rounded-xl">
                <span>个人资料</span>
                <span className="text-gray-400">›</span>
              </button>
              <button className="w-full text-left px-4 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-50 rounded-xl">
                <span>设置</span>
                <span className="text-gray-400">›</span>
              </button>
              <button className="w-full text-left px-4 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-50 rounded-xl">
                <span>关于</span>
                <span className="text-gray-400">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 