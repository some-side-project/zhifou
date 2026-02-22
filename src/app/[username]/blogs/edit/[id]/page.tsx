'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import RichTextEditor from '@/components/RichTextEditor'

export default function EditBlogPage() {
  const params = useParams()
  const router = useRouter()
  const username = decodeURIComponent(params.username as string)
  const blogId = params.id as string

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('tech')
  const [content, setContent] = useState('')
  const [price, setPrice] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // 模拟分类数据
  const categories = [
    { id: 'tech', name: '技术' },
    { id: 'life', name: '生活' },
    { id: 'ai', name: 'AI' },
    { id: 'design', name: '设计' },
  ]

  // 模拟获取博客数据
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      // 模拟博客数据
      setTitle('React 18新特性详解')
      setCategory('tech')
      setContent('# React 18新特性详解\n\nReact 18带来了很多新特性，包括并发渲染、自动批处理、Suspense改进等。\n\n## 并发渲染\n\n并发渲染是React 18的核心特性...')
      setPrice('')
      setIsPrivate(false)
      setLoading(false)
    }, 500)
  }, [blogId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setSubmitting(false)
      // 重定向到博客列表
      router.push(`/${username}/blogs`)
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
            <Link href={`/${username}/blogs`} className="hover:text-primary transition-colors">博客</Link>
            {' > '}
            <span className="text-foreground">编辑博客</span>
          </div>
          
          {/* 编辑博客表单 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-6">编辑博客</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 标题 */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                  标题
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入博客标题"
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              
              {/* 分类 */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                  分类
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* 内容 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  内容
                </label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="开始编写博客内容..."
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
                  placeholder="设置为付费内容（元），留空为免费"
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
                  href={`/${username}/blogs`}
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
