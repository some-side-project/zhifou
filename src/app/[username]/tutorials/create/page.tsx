'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import RichTextEditor from '@/components/RichTextEditor'

export default function CreateTutorialPackagePage() {
  const params = useParams()
  const router = useRouter()
  const username = decodeURIComponent(params.username as string)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState<string>('')
  const [price, setPrice] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 模拟上传
      const imageUrl = `https://example.com/uploads/${file.name}`
      setCoverImage(imageUrl)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setSubmitting(false)
      // 重定向到教程列表
      router.push(`/${username}/tutorials`)
    }, 1000)
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
            <Link href={`/${username}/tutorials`} className="hover:text-primary transition-colors">教程</Link>
            {' > '}
            <span className="text-foreground">创建教程包</span>
          </div>
          
          {/* 创建教程包表单 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-6">创建教程包</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 标题 */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                  教程包标题
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入教程包标题"
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              
              {/* 封面图片 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  封面图片
                </label>
                <div className="flex items-center space-x-4">
                  {coverImage ? (
                    <div className="relative">
                      <img 
                        src={coverImage} 
                        alt="封面" 
                        className="w-32 h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setCoverImage('')}
                        className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center w-32 h-24 border-2 border-dashed border-border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-secondary">上传图片</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>
              
              {/* 描述 */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  教程包描述
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请输入教程包描述"
                  rows={4}
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
                  placeholder="设置为付费教程包（元），留空为免费"
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
                  href={`/${username}/tutorials`}
                  className="px-6 py-3 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                >
                  取消
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex-1"
                  disabled={submitting}
                >
                  {submitting ? '创建中...' : '创建教程包'}
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
