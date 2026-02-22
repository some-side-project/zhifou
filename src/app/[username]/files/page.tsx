'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function UserFilesPage() {
  const params = useParams()
  const username = decodeURIComponent(params.username as string)

  // 模拟文件夹数据
  const folders = [
    {
      id: 1,
      name: '技术文档',
      files: 23,
      size: '128MB',
      updatedAt: '2026-02-19',
      icon: '📁',
    },
    {
      id: 2,
      name: '设计资源',
      files: 45,
      size: '256MB',
      updatedAt: '2026-02-18',
      icon: '🎨',
    },
    {
      id: 3,
      name: '项目代码',
      files: 12,
      size: '512MB',
      updatedAt: '2026-02-17',
      icon: '💻',
    },
    {
      id: 4,
      name: '学习资料',
      files: 34,
      size: '1GB',
      updatedAt: '2026-02-16',
      icon: '📚',
    },
  ]

  // 模拟文件数据
  const files = [
    {
      id: 1,
      name: 'React开发指南.pdf',
      size: '24MB',
      type: 'pdf',
      icon: '📄',
      createdAt: '2026-02-19',
    },
    {
      id: 2,
      name: 'TypeScript手册.md',
      size: '2MB',
      type: 'md',
      icon: '📝',
      createdAt: '2026-02-18',
    },
    {
      id: 3,
      name: '项目架构图.png',
      size: '5MB',
      type: 'png',
      icon: '🖼️',
      createdAt: '2026-02-17',
    },
    {
      id: 4,
      name: '前端面试题.zip',
      size: '45MB',
      type: 'zip',
      icon: '📦',
      createdAt: '2026-02-16',
    },
  ]

  const [activeFolder, setActiveFolder] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 博主个人资料卡片 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Link href={`/${username}`} className="hover:opacity-80 transition-opacity">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-md">
                  <img 
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20Chinese%20person%2C%20clean%20background%2C%20high%20quality&image_size=square" 
                    alt={username} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <Link href={`/${username}`} className="text-xl font-bold text-foreground mb-1 hover:text-primary transition-colors">
                      {username}
                    </Link>
                    <p className="text-secondary mb-4">专注于技术分享，提供优质的学习资源</p>
                  </div>
                  <Link href={`/${username}`} className="btn-secondary mt-2 md:mt-0">
                    查看ta的主页
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-secondary">
                  <span>📁 {folders.length} 文件夹</span>
                  <span>📄 {files.length + folders.reduce((total, f) => total + f.files, 0)} 总文件数</span>
                  <span>💾 {folders.reduce((total, f) => total + parseInt(f.size), 0) + files.reduce((total, f) => total + parseInt(f.size), 0)}MB 总大小</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 页面标题和操作按钮 */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-end mb-4">
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href={`/${username}/files/create`} className="btn-primary">
                  创建文件夹
                </Link>
                <Link href={`/${username}/files/upload`} className="btn-secondary">
                  上传文件
                </Link>
              </div>
            </div>
            
            {activeFolder && (
              <div className="mt-4">
                <button 
                  onClick={() => setActiveFolder(null)}
                  className="btn-secondary"
                >
                  返回文件夹列表
                </button>
              </div>
            )}
          </div>
          
          {/* 文件夹列表或文件列表 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            {!activeFolder ? (
              // 文件夹列表
              <div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {folders.map((folder) => (
                    <div key={folder.id} className="border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/50 transition-all">
                      <Link 
                        href={`/${username}/files/${folder.id}`}
                        className="block"
                      >
                        <div className="text-4xl mb-4">{folder.icon}</div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{folder.name}</h3>
                        <div className="space-y-1 text-sm text-secondary">
                          <p>{folder.files} 个文件</p>
                          <p>{folder.size}</p>
                          <p>更新于 {folder.updatedAt}</p>
                        </div>
                      </Link>
                      <div className="mt-4 flex space-x-2">
                        <Link href={`/${username}/files/edit/${folder.id}`} className="text-primary hover:underline text-xs">
                          编辑
                        </Link>
                        <button className="text-red-500 hover:underline text-xs">
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // 文件列表
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">{activeFolder} - 文件列表</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                          文件
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                          大小
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                          创建时间
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-border">
                      {files.map((file) => (
                        <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{file.icon}</span>
                              <div>
                                <div className="text-sm font-medium text-foreground">{file.name}</div>
                                <div className="text-xs text-secondary">{file.type.toUpperCase()}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                            {file.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                            {file.createdAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-primary hover:text-primary/80 transition-colors">
                              下载
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
