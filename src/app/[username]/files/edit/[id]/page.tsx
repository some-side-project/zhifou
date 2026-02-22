'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function EditFolderPage() {
  const params = useParams()
  const router = useRouter()
  const username = decodeURIComponent(params.username as string)
  const folderId = params.id as string

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // 模拟获取文件夹数据
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      // 模拟文件夹数据
      setName('技术文档')
      setDescription('存放各种技术相关的文档和资料')
      setPrice('')
      setIsPrivate(false)
      setLoading(false)
    }, 500)
  }, [folderId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setSubmitting(false)
      // 重定向到文件列表
      router.push(`/${username}/files`)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8 border border-border">
              <div className="flex justify-center items-center h-40">
                <div className="text-secondary">加载中...</div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 面包屑导航 */}
          <div className="mb-6 text-sm text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">首页</Link>
            {' > '}
            <Link href={`/${username}`} className="hover:text-primary transition-colors">个人主页</Link>
            {' > '}
            <Link href={`/${username}/files`} className="hover:text-primary transition-colors">文件</Link>
            {' > '}
            <span className="text-foreground">编辑文件夹</span>
          </div>
          
          {/* 编辑文件夹表单 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-6">编辑文件夹</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 文件夹名称 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  文件夹名称
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入文件夹名称"
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              
              {/* 文件夹描述 */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  文件夹描述
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请输入文件夹描述"
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              {/* 价格设置 */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
                  价格 (可选)
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="设置为付费文件夹（元），留空为免费"
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  min="0"
                  step="0.01"
                />
              </div>
              
              {/* 公开/私密设置 */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 text-primary focus:ring-primary/50 border-border rounded"
                />
                <label htmlFor="isPrivate" className="ml-2 block text-sm text-foreground">
                  设为私密 (仅自己可见)
                </label>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex space-x-4 pt-4">
                <Link
                  href={`/${username}/files`}
                  className="px-6 py-3 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                >
                  取消
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex-1"
                  disabled={submitting}
                >
                  {submitting ? '保存中...' : '保存修改'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
