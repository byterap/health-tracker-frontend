'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (settings: { initialWeight: number; height: number; targetWeight: number }) => void
  currentSettings: {
    initialWeight: number
    height: number
    targetWeight: number
  }
}

export default function SettingsModal({ isOpen, onClose, onSave, currentSettings }: SettingsModalProps) {
  const [settings, setSettings] = useState(currentSettings)

  const handleSubmit = () => {
    onSave(settings)
    onClose()
  }

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
                    基础设置
                  </Dialog.Title>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        初始身高 (cm)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.height}
                        onChange={(e) => setSettings({...settings, height: Number(e.target.value)})}
                        className="w-full px-4 py-3 text-center rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5CD0E9] focus:border-transparent"
                        placeholder="输入初始身高"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        初始体重 (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.initialWeight}
                        onChange={(e) => setSettings({...settings, initialWeight: Number(e.target.value)})}
                        className="w-full px-4 py-3 text-center rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5CD0E9] focus:border-transparent"
                        placeholder="输入初始体重"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        目标体重 (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.targetWeight}
                        onChange={(e) => setSettings({...settings, targetWeight: Number(e.target.value)})}
                        className="w-full px-4 py-3 text-center rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5CD0E9] focus:border-transparent"
                        placeholder="输入目标体重"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full rounded-xl px-4 py-3 text-white bg-[#5CD0E9]"
                    onClick={handleSubmit}
                  >
                    保存
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