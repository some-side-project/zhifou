'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export default function FilePackagePage() {
  const params = useParams()
  const router = useRouter()
  const username = decodeURIComponent(params.username as string)
  const fileId = params.id as string
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')

  // 检查登录状态
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      const user = localStorage.getItem('username') || ''
      setIsLoggedIn(loggedIn)
      setCurrentUser(user)
    }

    checkLoginStatus()
    window.addEventListener('storage', checkLoginStatus)
    return () => window.removeEventListener('storage', checkLoginStatus)
  }, [])

  // 获取header高度
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header')
      if (header) {
        setHeaderHeight(header.offsetHeight)
      }
    }

    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    return () => window.removeEventListener('resize', updateHeaderHeight)
  }, [])

  // 滚动监听逻辑
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollDirection = scrollY > lastScrollY ? 'down' : 'up'
      lastScrollY = scrollY
      
      // 向下滚动时的逻辑
      if (scrollDirection === 'down') {
        // 当scrollY大于header高度时，隐藏header
        if (scrollY > headerHeight + 20) {
          setIsHeaderVisible(false)
        }
      }
      // 向上滚动时的逻辑
      else {
        // 当scrollY小于header高度时，显示header
        if (scrollY < headerHeight) {
          setIsHeaderVisible(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headerHeight])

  // 模拟文件夹数据 - 与 files/page.tsx 保持一致
  const folders = [
    {
      id: '1',
      name: '技术文档',
      files: 23,
      size: '128MB',
      updatedAt: '2026-02-19',
      icon: '📁',
      description: '包含各种技术相关的文档，如前端框架使用指南、后端开发手册等。',
      folderFiles: [
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
          name: 'Node.js实战.pdf',
          size: '35MB',
          type: 'pdf',
          icon: '📄',
          createdAt: '2026-02-17',
        },
      ],
    },
    {
      id: '2',
      name: '设计资源',
      files: 45,
      size: '256MB',
      updatedAt: '2026-02-18',
      icon: '🎨',
      description: '包含UI设计、图标、字体等设计相关资源。',
      folderFiles: [
        {
          id: 1,
          name: 'UI设计规范.pdf',
          size: '18MB',
          type: 'pdf',
          icon: '📄',
          createdAt: '2026-02-18',
        },
        {
          id: 2,
          name: '图标库.zip',
          size: '120MB',
          type: 'zip',
          icon: '📦',
          createdAt: '2026-02-17',
        },
      ],
    },
    {
      id: '3',
      name: '项目代码',
      files: 12,
      size: '512MB',
      updatedAt: '2026-02-17',
      icon: '💻',
      description: '包含各种项目的源代码，如前端项目、后端项目等。',
      folderFiles: [
        {
          id: 1,
          name: '前端组件库.zip',
          size: '256MB',
          type: 'zip',
          icon: '📦',
          createdAt: '2026-02-17',
        },
        {
          id: 2,
          name: '后端API代码.zip',
          size: '256MB',
          type: 'zip',
          icon: '📦',
          createdAt: '2026-02-16',
        },
      ],
    },
    {
      id: '4',
      name: '学习资料',
      files: 34,
      size: '1GB',
      updatedAt: '2026-02-16',
      icon: '📚',
      description: '包含各种学习资料，如视频教程、电子书等。',
      folderFiles: [
        {
          id: 1,
          name: '前端面试题.zip',
          size: '45MB',
          type: 'zip',
          icon: '📦',
          createdAt: '2026-02-16',
        },
        {
          id: 2,
          name: '前端进阶视频教程.zip',
          size: '955MB',
          type: 'zip',
          icon: '📦',
          createdAt: '2026-02-15',
        },
      ],
    },
  ]

  // 获取当前文件夹数据
  const currentFolder = folders.find(folder => folder.id === fileId) || folders[0]

  return (
    <div className="min-h-screen flex flex-col">
      {/* 使用视觉隐藏而非完全移除header，保留占位高度 */}
      <div className={`transition-opacity duration-300 ${isHeaderVisible ? 'opacity-100 z-50' : 'opacity-0 z-[-1] pointer-events-none'}`}>
        <Header />
      </div>
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 面包屑导航 */}
          <div className="mb-6 text-sm text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">首页</Link>
            {' > '}
            <Link href={`/${username}`} className="hover:text-primary transition-colors">{username}</Link>
            {' > '}
            <Link href={`/${username}/files`} className="hover:text-primary transition-colors">文件</Link>
            {' > '}
            <span className="text-foreground">{currentFolder.name}</span>
          </div>
          

          
          {/* 文件夹详情卡片 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-3xl">{currentFolder.icon}</span>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-2">{currentFolder.name}</h1>
                <p className="text-secondary mb-4">{currentFolder.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center">
                    <span className="font-semibold text-foreground">作者</span>
                    <Link href={`/${username}`} className="flex items-center ml-2 hover:text-primary transition-colors">
                      <img 
                        src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20Chinese%20person%2C%20clean%20background%2C%20high%20quality&image_size=square" 
                        alt={username} 
                        className="w-5 h-5 rounded-full mr-1"
                      />
                      <span className="text-secondary">{username}</span>
                    </Link>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">大小</span>
                    <span className="text-secondary ml-1">{currentFolder.size}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">文件数</span>
                    <span className="text-secondary ml-1">{currentFolder.files}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">更新时间</span>
                    <span className="text-secondary ml-1">{currentFolder.updatedAt}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button className="btn-primary">
                  下载全部
                </button>
                {isLoggedIn && currentUser === username && (
                  <Link href={`/${username}/files/upload`} className="btn-secondary">
                    上传文件
                  </Link>
                )}
              </div>
            </div>
            
            {/* 包含的文件列表 - 使用旧的表格样式 */}
            <div>

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
                    {currentFolder.folderFiles.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{file.icon}</span>
                            <div>
                              <div className="text-sm font-medium text-foreground">{file.name}</div>
                              <div className="text-xs text-secondary">{file.type?.toUpperCase() || 'FILE'}</div>
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
          </div>
          

        </div>
      </main>
      
      <Footer />
    </div>
  )
}
