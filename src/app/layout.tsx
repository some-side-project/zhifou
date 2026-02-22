import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '知否 - 重启web2.0博客时代',
  description: '每个人的个人数字资产沉淀和变现平台',
  keywords: ['博客', '教程', '文件', '服务', 'AI助理'],
  authors: [{ name: '知否团队' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: [
    {
      url: '/favicon.ico',
      sizes: 'any',
      type: 'image/x-icon',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
