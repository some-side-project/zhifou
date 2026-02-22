'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function UserBlogsPage() {
  const params = useParams()
  const username = decodeURIComponent(params.username as string)

  // 模拟分类数据
  const categories = [
    { id: 'latest', name: '最新' },
    { id: 'tech', name: '技术' },
    { id: 'life', name: '生活' },
    { id: 'ai', name: 'AI' },
    { id: 'design', name: '设计' },
  ]

  // 模拟博客数据
  const blogData = {
    latest: [
      {
        id: 1,
        title: 'React 18新特性详解',
        date: '2026-02-19',
        views: 345,
        category: 'tech',
        excerpt: 'React 18带来了很多新特性，包括并发渲染、自动批处理、Suspense改进等，本文详细介绍这些特性的使用方法和最佳实践...',
      },
      {
        id: 2,
        title: 'TypeScript高级类型实践',
        date: '2026-02-18',
        views: 234,
        category: 'tech',
        excerpt: 'TypeScript的高级类型系统非常强大，本文通过实际案例介绍如何使用条件类型、映射类型、模板字面量类型等高级特性...',
      },
      {
        id: 3,
        title: 'Tailwind CSS最佳实践',
        date: '2026-02-17',
        views: 123,
        category: 'design',
        excerpt: 'Tailwind CSS是一款实用优先的CSS框架，本文分享一些使用Tailwind CSS的最佳实践，包括自定义配置、组件化、性能优化等...',
      },
      {
        id: 4,
        title: 'AI时代的内容创作趋势',
        date: '2026-02-16',
        views: 567,
        category: 'ai',
        excerpt: 'AI如何改变内容创作？我们应该如何适应这个新趋势？本文分析了AI时代内容创作的变化和应对策略...',
      },
    ],
    tech: [
      {
        id: 1,
        title: 'React 18新特性详解',
        date: '2026-02-19',
        views: 345,
        category: 'tech',
        excerpt: 'React 18带来了很多新特性，包括并发渲染、自动批处理、Suspense改进等，本文详细介绍这些特性的使用方法和最佳实践...',
      },
      {
        id: 2,
        title: 'TypeScript高级类型实践',
        date: '2026-02-18',
        views: 234,
        category: 'tech',
        excerpt: 'TypeScript的高级类型系统非常强大，本文通过实际案例介绍如何使用条件类型、映射类型、模板字面量类型等高级特性...',
      },
    ],
    life: [
      {
        id: 5,
        title: '程序员的高效工作方式',
        date: '2026-02-15',
        views: 789,
        category: 'life',
        excerpt: '作为一名程序员，如何提高工作效率？本文分享了一些个人的工作习惯和工具推荐，帮助你更高效地完成工作...',
      },
    ],
    ai: [
      {
        id: 4,
        title: 'AI时代的内容创作趋势',
        date: '2026-02-16',
        views: 567,
        category: 'ai',
        excerpt: 'AI如何改变内容创作？我们应该如何适应这个新趋势？本文分析了AI时代内容创作的变化和应对策略...',
      },
    ],
    design: [
      {
        id: 3,
        title: 'Tailwind CSS最佳实践',
        date: '2026-02-17',
        views: 123,
        category: 'design',
        excerpt: 'Tailwind CSS是一款实用优先的CSS框架，本文分享一些使用Tailwind CSS的最佳实践，包括自定义配置、组件化、性能优化等...',
      },
    ],
  }

  const [activeCategory, setActiveCategory] = useState('latest')
  const blogs = blogData[activeCategory as keyof typeof blogData] || []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 用户信息和导航 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold text-foreground">{username}的博客</h1>
              <Link href={`/${username}`} className="btn-secondary mt-4 md:mt-0">
                查看ta的主页
              </Link>
            </div>
            
            {/* 分类Tab */}
            <div className="flex flex-wrap border-b border-border">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 font-medium transition-colors ${activeCategory === category.id 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-secondary hover:text-primary'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* 博客列表 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            {/* 创建新博客按钮和管理分类按钮 */}
            <div className="mb-8 flex justify-end space-x-3">
              <Link href={`/${username}/blogs/categories`} className="btn-secondary">
                管理分类
              </Link>
              <Link href={`/${username}/blogs/create`} className="btn-primary">
                创建新博客
              </Link>
            </div>
            
            <div className="space-y-8">
              {blogs.map((blog) => (
                <div key={blog.id} className="border-b border-border pb-8 last:border-0 last:pb-0">
                  <div className="cursor-pointer" onClick={() => window.location.href = `/${username}/blog/${blog.id}`}>
                    <h2 className="text-xl font-semibold text-foreground hover:text-primary transition-colors mb-3">
                      {blog.title}
                    </h2>
                    <p className="text-secondary mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm text-secondary">
                      <div className="flex items-center space-x-4">
                        <span>{blog.date}</span>
                        <span>📁 {categories.find(c => c.id === blog.category)?.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>👁️ {blog.views} 浏览</span>
                        <div className="flex items-center space-x-2">
                          <Link href={`/${username}/blogs/edit/${blog.id}`} className="text-primary hover:underline text-xs" onClick={(e) => e.stopPropagation()}>
                            编辑
                          </Link>
                          <button className="text-red-500 hover:underline text-xs" onClick={(e) => e.stopPropagation()}>
                            删除
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 分页 */}
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-border rounded-md text-secondary hover:bg-primary/5 disabled:opacity-50" disabled>
                  上一页
                </button>
                <button className="px-4 py-2 border border-primary bg-primary text-white rounded-md">
                  1
                </button>
                <button className="px-4 py-2 border border-border rounded-md text-secondary hover:bg-primary/5">
                  2
                </button>
                <button className="px-4 py-2 border border-border rounded-md text-secondary hover:bg-primary/5">
                  3
                </button>
                <button className="px-4 py-2 border border-border rounded-md text-secondary hover:bg-primary/5">
                  下一页
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
