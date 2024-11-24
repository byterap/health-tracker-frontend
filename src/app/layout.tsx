import './globals.css'
import type { Metadata } from 'next'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: '健康指标记录',
  description: '记录体重和血压等健康指标',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        {children}
        <BottomNav />
      </body>
    </html>
  )
} 