'use client'

import { HomeIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'

const navigation = [
  { name: '首页', href: '/', icon: HomeIcon },
  { name: '统计', href: '/stats', icon: ChartBarIcon },
  { name: '我的', href: '/profile', icon: UserIcon },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`flex flex-col items-center py-3 px-6 ${
                  isActive ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="mt-1 text-xs">{item.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
} 