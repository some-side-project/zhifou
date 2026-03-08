'use client'

import { useState, useEffect, Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { api } from '@/lib/api'
import { File } from '@/types'

function FileCard({ file }: { file: File }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold flex-1 pr-2 line-clamp-2">
            <Link href={`/${file.author?.toLowerCase() || 'anonymous'}/files/${file.id}`} className="hover:text-primary transition-colors">
              {file.title}
            </Link>
          </h3>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {file.type || '文件'}
          </span>
        </div>
        <p className="text-secondary text-xs mb-3 line-clamp-2">
          {file.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-secondary mb-2">
          <Link href={`/${file.author?.toLowerCase() || 'anonymous'}`} className="hover:text-primary transition-colors">
            {file.author}
          </Link>
          <span>{file.date}</span>
          <span>📦 {file.size}</span>
          <span>⬇️ {file.downloads} 下载</span>
        </div>
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  )
}

export default function FilesPage() {
  const [latestFiles, setLatestFiles] = useState<File[]>([])
  const [popularFiles, setPopularFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching files data...')
        const [latestRes, popularRes] = await Promise.all([
          api.files.getList({ page: 1, limit: 6 }),
          api.files.getList({ page: 1, limit: 6, sort: 'popular' })
        ])
        
        console.log('Latest files response:', latestRes)
        console.log('Popular files response:', popularRes)
        
        if (latestRes.success) setLatestFiles(latestRes.data || [])
        if (popularRes.success) setPopularFiles(popularRes.data || [])
        
        if (!latestRes.success || !popularRes.success) {
          setError('数据加载失败')
        }
      } catch (err) {
        console.error('Failed to fetch files:', err)
        setError('加载数据时出错')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const categories = [
    { id: 1, name: '技术文档', count: 789, color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700', icon: '📄' },
    { id: 2, name: '代码示例', count: 654, color: 'bg-green-50 border-green-200', textColor: 'text-green-700', icon: '💻' },
    { id: 3, name: '开发资源', count: 432, color: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700', icon: '📦' },
    { id: 4, name: '工具软件', count: 234, color: 'bg-amber-50 border-amber-200', textColor: 'text-amber-700', icon: '🔧' },
    { id: 5, name: '模板素材', count: 123, color: 'bg-red-50 border-red-200', textColor: 'text-red-700', icon: '🎨' },
    { id: 6, name: '教程资料', count: 98, color: 'bg-indigo-50 border-indigo-200', textColor: 'text-indigo-700', icon: '📚' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <LoadingSpinner />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
            >
              刷新页面
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">首页</Link>
            {' > '}
            <span>探索文件</span>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="space-y-16">
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-blue-500 rounded-full"></span>
                  最新上传
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {latestFiles.map((file) => (
                    <FileCard key={file.id} file={file} />
                  ))}
                  {latestFiles.length === 0 && (
                    <p className="col-span-full text-center text-gray-500 py-8">暂无最新文件</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-orange-500 rounded-full"></span>
                  热门下载
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularFiles.map((file) => (
                    <FileCard key={file.id} file={file} />
                  ))}
                  {popularFiles.length === 0 && (
                    <p className="col-span-full text-center text-gray-500 py-8">暂无热门文件</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
