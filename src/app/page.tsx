'use client'

import { useEffect, useState } from 'react'
import WeightGauge from '@/components/WeightGauge'
import WeightTrend from '@/components/WeightTrend'
import SettingsModal from '@/components/SettingsModal'
import WeightInputModal from '@/components/WeightInputModal'
import PageTitle from '@/components/PageTitle'
import { metricsApi, settingsApi, WeightRecord, UserSettings } from '@/services/api'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import axios from 'axios'

export default function Home() {
  const [settings, setSettings] = useState<UserSettings>({
    initialWeight: 80,
    targetWeight: 70,
    height: 170
  })
  const [currentWeight, setCurrentWeight] = useState(52.0)
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      console.log('Starting to fetch data...')
      
      try {
        // 获取设置
        console.log('Fetching settings...')
        const settingsResponse = await settingsApi.get()
        console.log('Settings response:', settingsResponse.data)
        if (settingsResponse.data) {
          setSettings(settingsResponse.data)
        }

        // 获取体重记录
        console.log('Fetching metrics...')
        const metricsResponse = await metricsApi.getAll()
        console.log('Metrics response:', metricsResponse.data)
        setWeightRecords(metricsResponse.data)
        if (metricsResponse.data.length > 0) {
          setCurrentWeight(metricsResponse.data[0].weight)
        }
      } catch (error) {
        console.error('获取数据失败:', error)
        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
          })
        }
      }
    }

    fetchData()
  }, [])

  const handleSaveSettings = async (newSettings: UserSettings) => {
    try {
      await settingsApi.update(newSettings)
      setSettings(newSettings)
    } catch (error) {
      console.error('保存设置失败:', error)
      alert('保存设置失败，请重试')
    }
  }

  const handleWeightRecorded = async () => {
    // 重新获取数据
    try {
      const metricsResponse = await metricsApi.getAll()
      setWeightRecords(metricsResponse.data)
      if (metricsResponse.data.length > 0) {
        setCurrentWeight(metricsResponse.data[0].weight)
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <PageTitle>体重记录</PageTitle>
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto space-y-4">
          <WeightGauge
            currentWeight={currentWeight}
            initialWeight={settings.initialWeight}
            targetWeight={settings.targetWeight}
            height={settings.height}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
          <div className="bg-white rounded-3xl p-4 shadow-sm">
            <WeightTrend data={weightRecords} height={settings.height} />
          </div>
          <button 
            className="fixed bottom-20 right-4 bg-[#5CD0E9] text-white p-4 rounded-full shadow-lg"
            onClick={() => setIsWeightModalOpen(true)}
          >
            <PencilSquareIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        currentSettings={settings}
      />
      <WeightInputModal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        onSuccess={handleWeightRecorded}
      />
    </main>
  )
} 