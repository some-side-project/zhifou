'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import RichTextEditor from '@/components/RichTextEditor'

export default function CreateBlogPage() {
  const params = useParams()
  const router = useRouter()
  const username = decodeURIComponent(params.username as string)

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('tech')
  const [content, setContent] = useState('')
  const [price, setPrice] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingCategoryName, setEditingCategoryName] = useState('')

  // 模拟分类数据
  const [categories, setCategories] = useState([
    { id: 'tech', name: '技术' },
    { id: 'life', name: '生活' },
    { id: 'ai', name: 'AI' },
    { id: 'design', name: '设计' },
  ])

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

  // 分类管理函数
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newId = newCategoryName.toLowerCase().replace(/\s+/g, '-')
      setCategories([...categories, { id: newId, name: newCategoryName.trim() }])
      setNewCategoryName('')
      // 自动选择新创建的分类
      setCategory(newId)
    }
  }

  const handleEditCategory = () => {
    if (editingCategory && editingCategoryName.trim()) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory ? { ...cat, name: editingCategoryName.trim() } : cat
      ))
      setEditingCategory(null)
      setEditingCategoryName('')
    }
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId))
    if (category === categoryId) {
      setCategory(categories[0]?.id || '')
    }
  }

  const startEditCategory = (categoryId: string, categoryName: string) => {
    setEditingCategory(categoryId)
    setEditingCategoryName(categoryName)
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
            <span className="text-foreground">创建博客</span>
          </div>
          
          {/* 创建博客表单 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-6">创建新博客</h1>
            
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
                <div className="flex space-x-2">
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                    className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-muted transition-colors whitespace-nowrap"
                  >
                    管理分类
                  </button>
                </div>
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
                  {submitting ? '发布中...' : '发布博客'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      {/* 分类管理模态框 */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">管理分类</h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-secondary hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* 添加新分类 */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-2">添加新分类</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="输入分类名称"
                  className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  添加
                </button>
              </div>
            </div>
            
            {/* 分类列表 */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">现有分类</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-2 border border-border rounded-md">
                    {editingCategory === cat.id ? (
                      <div className="flex-1 space-x-2">
                        <input
                          type="text"
                          value={editingCategoryName}
                          onChange={(e) => setEditingCategoryName(e.target.value)}
                          className="flex-1 px-3 py-1 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                          onClick={handleEditCategory}
                          className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
                        >
                          保存
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          className="px-3 py-1 border border-border rounded-md text-foreground hover:bg-muted transition-colors text-sm"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="flex-1">{cat.name}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditCategory(cat.id, cat.name)}
                            className="px-3 py-1 border border-border rounded-md text-foreground hover:bg-muted transition-colors text-sm"
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="px-3 py-1 border border-red-300 text-red-500 rounded-md hover:bg-red-50 transition-colors text-sm"
                          >
                            删除
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}
