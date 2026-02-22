'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import RichTextEditor from '@/components/RichTextEditor'

export default function EditTutorialContentPage() {
  const params = useParams()
  const router = useRouter()
  const username = decodeURIComponent(params.username as string)
  const packageId = params.packageId as string
  const contentId = params.contentId as string

  const [title, setTitle] = useState('')
  const [contentType, setContentType] = useState<'article' | 'video' | 'audio' | 'image'>('article')
  const [content, setContent] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [price, setPrice] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // 模拟获取教程内容数据
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      // 模拟教程内容数据
      setTitle('React 18 并发渲染详解')
      setContentType('article')
      setContent('# React 18 并发渲染\n\n并发渲染是React 18的核心特性，它允许React同时处理多个任务...')
      setPrice('')
      setIsPrivate(false)
      setLoading(false)
    }, 500)
  }, [contentId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setSubmitting(false)
      // 重定向到教程包详情
      router.push(`/${username}/tutorial/${packageId}`)
    }, 1000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'audio' | 'image') => {
    const file = e.target.files?.[0]
    if (file) {
      // 模拟文件上传
      const fileUrl = `https://example.com/uploads/${file.name}`
      if (type === 'video') {
        setVideoUrl(fileUrl)
      } else if (type === 'audio') {
        setAudioUrl(fileUrl)
      } else if (type === 'image') {
        setImageUrl(fileUrl)
      }
    }
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
            <Link href={`/${username}/tutorials`} className="hover:text-primary transition-colors">教程</Link>
            {' > '}
            <Link href={`/${username}/tutorial/${packageId}`} className="hover:text-primary transition-colors">教程包</Link>
            {' > '}
            <span className="text-foreground">编辑教程内容</span>
          </div>
          
          {/* 编辑教程内容表单 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-6">编辑教程内容</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 标题 */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                  内容标题
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入内容标题"
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              
              {/* 内容类型 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  内容类型
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'article', label: '文章', icon: '📝' },
                    { value: 'video', label: '视频', icon: '🎬' },
                    { value: 'audio', label: '音频', icon: '🎵' },
                    { value: 'image', label: '图片', icon: '🖼️' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setContentType(type.value as any)}
                      className={`p-4 border ${contentType === type.value ? 'border-primary bg-primary/5' : 'border-border'} rounded-md text-center hover:bg-muted/50 transition-colors`}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-sm">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 内容 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {contentType === 'article' ? '文章内容' : contentType === 'video' ? '视频内容' : contentType === 'audio' ? '音频内容' : '图片内容'}
                </label>
                
                {contentType === 'article' && (
                  <RichTextEditor
                    value={content}
                    onChange={setContent}
                    placeholder="开始编写文章内容..."
                  />
                )}
                
                {contentType === 'video' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-secondary mb-2">上传视频</label>
                      <div className="flex items-center space-x-4">
                        {videoUrl ? (
                          <div className="relative">
                            <video src={videoUrl} controls className="w-64 h-36 object-cover rounded-md" />
                            <button
                              type="button"
                              onClick={() => setVideoUrl('')}
                              className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <label className="flex items-center justify-center w-64 h-36 border-2 border-dashed border-border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                            <span className="text-sm text-secondary">上传视频</span>
                            <input
                              type="file"
                              accept="video/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, 'video')}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="videoUrl" className="block text-sm text-secondary mb-2">或输入视频URL</label>
                      <input
                        type="text"
                        id="videoUrl"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="请输入视频URL"
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                )}
                
                {contentType === 'audio' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-secondary mb-2">上传音频</label>
                      <div className="flex items-center space-x-4">
                        {audioUrl ? (
                          <div className="relative">
                            <audio src={audioUrl} controls className="w-64 rounded-md" />
                            <button
                              type="button"
                              onClick={() => setAudioUrl('')}
                              className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <label className="flex items-center justify-center w-64 h-16 border-2 border-dashed border-border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                            <span className="text-sm text-secondary">上传音频</span>
                            <input
                              type="file"
                              accept="audio/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, 'audio')}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="audioUrl" className="block text-sm text-secondary mb-2">或输入音频URL</label>
                      <input
                        type="text"
                        id="audioUrl"
                        value={audioUrl}
                        onChange={(e) => setAudioUrl(e.target.value)}
                        placeholder="请输入音频URL"
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                )}
                
                {contentType === 'image' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-secondary mb-2">上传图片</label>
                      <div className="flex items-center space-x-4">
                        {imageUrl ? (
                          <div className="relative">
                            <img src={imageUrl} alt="上传图片" className="w-64 h-48 object-cover rounded-md" />
                            <button
                              type="button"
                              onClick={() => setImageUrl('')}
                              className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <label className="flex items-center justify-center w-64 h-48 border-2 border-dashed border-border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                            <span className="text-sm text-secondary">上传图片</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, 'image')}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="imageUrl" className="block text-sm text-secondary mb-2">或输入图片URL</label>
                      <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="请输入图片URL"
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                )}
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
                  href={`/${username}/tutorial/${packageId}`}
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
