'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function BlogCategoriesPage() {
  const params = useParams()
  const username = decodeURIComponent(params.username as string)

  // 模拟分类数据
  const [categories, setCategories] = useState([
    { id: 'tech', name: '技术', count: 12 },
    { id: 'life', name: '生活', count: 5 },
    { id: 'ai', name: 'AI', count: 8 },
    { id: 'design', name: '设计', count: 3 },
  ])

  const [newCategory, setNewCategory] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const id = newCategory.toLowerCase().replace(/\s+/g, '-')
      setCategories([...categories, { id, name: newCategory.trim(), count: 0 }])
      setNewCategory('')
    }
  }

  const handleEditCategory = (category: { id: string; name: string }) => {
    setEditingId(category.id)
    setEditingName(category.name)
  }

  const handleSaveEdit = () => {
    if (editingId && editingName.trim()) {
      setCategories(categories.map(cat => 
        cat.id === editingId ? { ...cat, name: editingName.trim() } : cat
      ))
      setEditingId(null)
      setEditingName('')
    }
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id))
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
            <span className="text-foreground">分类管理</span>
          </div>
          
          {/* 分类管理 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-6">博客分类管理</h1>
            
            {/* 添加分类 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">添加新分类</h2>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="输入分类名称"
                  className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleAddCategory}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  添加
                </button>
              </div>
            </div>
            
            {/* 分类列表 */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">分类列表</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                        分类名称
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                        博客数量
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-border">
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === category.id ? (
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="flex-1 px-3 py-1 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                              />
                              <button
                                onClick={handleSaveEdit}
                                className="px-3 py-1 bg-primary text-white rounded-md text-xs hover:bg-primary/90 transition-colors"
                              >
                                保存
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-3 py-1 border border-border rounded-md text-xs hover:bg-muted transition-colors"
                              >
                                取消
                              </button>
                            </div>
                          ) : (
                            <span className="text-foreground">{category.name}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                          {category.count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingId !== category.id && (
                            <>
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="text-primary hover:underline mr-4"
                              >
                                编辑
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="text-red-500 hover:underline"
                              >
                                删除
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
