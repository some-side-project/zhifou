'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function FollowingPage() {
  // 模拟数据 - 关注的博主发布的内容
  const initialContent = [
    {
      id: 1,
      type: 'blog',
      title: 'React 19 新特性详解',
      author: '张三',
      date: '2026-02-21',
      views: 1234,
      excerpt: 'React 19 带来了许多令人兴奋的新特性，包括...',
      avatar: '👨‍💻',
    },
    {
      id: 2,
      type: 'tutorial',
      title: 'Python 异步编程实战',
      author: '李四',
      date: '2026-02-20',
      students: 5678,
      excerpt: '本教程将带你深入了解 Python 异步编程的核心概念和实践技巧...',
      avatar: '👩‍💻',
    },
    {
      id: 3,
      type: 'file',
      title: '前端开发最佳实践手册',
      author: '王五',
      date: '2026-02-19',
      downloads: 2345,
      excerpt: '包含前端开发中的各种最佳实践，从代码规范到性能优化...',
      avatar: '👨‍🎨',
    },
    {
      id: 4,
      type: 'service',
      title: '前端技术咨询',
      author: '赵六',
      date: '2026-02-18',
      price: '¥200/小时',
      excerpt: '提供专业的前端技术咨询服务，解决你的技术难题...',
      avatar: '👩‍🚀',
    },
    {
      id: 5,
      type: 'blog',
      title: 'TypeScript 高级类型技巧',
      author: '孙七',
      date: '2026-02-17',
      views: 1876,
      excerpt: '掌握 TypeScript 高级类型技巧，让你的代码更加类型安全...',
      avatar: '👨‍🔬',
    },
  ]

  const [content, setContent] = useState(initialContent)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const observerRef = useRef<HTMLDivElement>(null)

  // 模拟加载更多数据
  const loadMoreContent = () => {
    if (loading) return
    
    setLoading(true)
    
    // 模拟网络请求延迟
    setTimeout(() => {
      const newContent = initialContent.map((item, index) => ({
        ...item,
        id: item.id + page * initialContent.length,
        date: `2026-02-${String(16 - page * 5 + index).padStart(2, '0')}`,
      }))
      
      setContent(prev => [...prev, ...newContent])
      setPage(prev => prev + 1)
      setLoading(false)
    }, 1000)
  }

  // 设置交叉观察器来检测滚动到底部
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreContent()
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [loading])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 面包屑导航 */}
          <div className="mb-6 text-sm text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">首页</Link>
            {' > '}
            <span className="text-foreground">关注动态</span>
          </div>
          
          <div className="max-w-4xl mx-auto">
            
            <div className="space-y-6">
              {content.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <Link href={`/${item.author.toLowerCase()}`} className="text-3xl hover:opacity-80 transition-opacity">{item.avatar}</Link>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Link href={`/${item.author.toLowerCase()}`} className="font-semibold hover:text-primary transition-colors">
                          {item.author}
                        </Link>
                        <span className="text-xs text-secondary">•</span>
                        <span className="text-xs text-secondary">{item.date}</span>
                        <span className="text-xs text-secondary">•</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {item.type === 'blog' ? '博客' : 
                           item.type === 'tutorial' ? '教程' : 
                           item.type === 'file' ? '文件' : '服务'}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2">
                        <Link href={`/${item.author.toLowerCase()}/${item.type}/${item.id}`} className="hover:text-primary transition-colors">
                          {item.title}
                        </Link>
                      </h2>
                      <p className="text-secondary mb-4">{item.excerpt}</p>
                      <div className="flex items-center space-x-4 text-sm text-secondary">
                        {item.type === 'blog' && (
                          <span>👁️ {item.views} 浏览</span>
                        )}
                        {item.type === 'tutorial' && (
                          <span>👥 {item.students} 学习</span>
                        )}
                        {item.type === 'file' && (
                          <span>⬇️ {item.downloads} 下载</span>
                        )}
                        {item.type === 'service' && (
                          <span>💰 {item.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 加载状态 */}
              <div ref={observerRef} className="py-8 text-center">
                {loading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span>加载中...</span>
                  </div>
                ) : (
                  <span className="text-secondary">滚动加载更多</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
