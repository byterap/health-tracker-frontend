'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { metricsApi } from '@/services/api'

interface WeightInputModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function WeightInputModal({ isOpen, onClose, onSuccess }: WeightInputModalProps) {
  const [weight, setWeight] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 获取最近7天的日期范围
  const getDateRange = () => {
    const today = new Date()
    const sixDaysAgo = new Date(today)
    sixDaysAgo.setDate(today.getDate() - 6)
    return {
      min: sixDaysAgo.toISOString().split('T')[0],
      max: today.toISOString().split('T')[0]
    }
  }

  const handleSubmit = async () => {
    if (!weight || !date) return
    
    try {
      setIsSubmitting(true)
      await metricsApi.create({ weight, date })
      onSuccess()
      onClose()
      setWeight('')
      setDate(new Date().toISOString().split('T')[0])
    } catch (error) {
      console.error('记录失败:', error)
      alert('记录失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const dateRange = getDateRange()

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-xl w-full max-w-sm">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900"
                  >
                    记录体重
                  </Dialog.Title>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        日期
                      </label>
                      <input
                        type="date"
                        value={date}
                        min={dateRange.min}
                        max={dateRange.max}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 text-center rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5CD0E9] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        体重
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full px-4 py-3 text-2xl text-center rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5CD0E9] focus:border-transparent"
                        placeholder="输入体重"
                      />
                      <div className="text-sm text-gray-500 mt-2">单位：kg</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className={`w-full rounded-xl px-4 py-3 text-white ${
                      isSubmitting || !weight || !date ? 'bg-gray-400' : 'bg-[#5CD0E9]'
                    }`}
                    onClick={handleSubmit}
                    disabled={isSubmitting || !weight || !date}
                  >
                    {isSubmitting ? '记录中...' : '记录'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 