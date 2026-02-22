'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function TutorialPackageDetailPage() {
  const params = useParams()
  const username = decodeURIComponent(params.username as string)
  const packageId = params.packageId as string

  // 模拟教程包数据
  const tutorialPackage = {
    id: packageId,
    title: 'React从入门到精通',
    author: username,
    authorNickname: '张三',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=React%20programming%20tutorial%20cover%20image%2C%20modern%20design%2C%20blue%20theme%2C%20code%20snippets%2C%20high%20quality&image_size=landscape_16_9',
    lessons: 24,
    students: 5678,
    description: '全面介绍React框架的核心概念和实战技巧，从基础到高级，适合前端开发者学习。',
    level: '中级',
    duration: '12小时',
    contents: [
      {
        id: 1,
        title: '第1章：React入门',
        duration: '30分钟',
        order: 1,
      },
      {
        id: 2,
        title: '第2章：组件基础',
        duration: '45分钟',
        order: 2,
      },
      {
        id: 3,
        title: '第3章：状态管理',
        duration: '60分钟',
        order: 3,
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 教程包详情 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* 教程封面 */}
              <div className="w-full md:w-1/3 lg:w-1/4">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={tutorialPackage.cover} 
                    alt={tutorialPackage.title} 
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              {/* 教程信息 */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-3">{tutorialPackage.title}</h1>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                        {tutorialPackage.level}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {tutorialPackage.duration}
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">
                        {tutorialPackage.lessons} 课时
                      </span>
                    </div>
                    <p className="text-secondary mb-6">
                      {tutorialPackage.description}
                    </p>
                  </div>
                  
                  {/* 添加内容按钮 */}
                  <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                    <Link 
                      href={`/${username}/tutorials/${packageId}/create`}
                      className="btn-primary"
                    >
                      添加内容
                    </Link>
                    <Link 
                      href={`/${username}/tutorials/edit/${packageId}`}
                      className="btn-secondary"
                    >
                      编辑教程包
                    </Link>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-secondary">
                  <span>👨‍💼 作者：{tutorialPackage.authorNickname}</span>
                  <span>👥 {tutorialPackage.students} 学习</span>
                  <span>📅 更新于：2026-02-21</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 教程内容列表 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">教程内容</h2>
              <Link 
                href={`/${username}/tutorials/${packageId}/create`}
                className="text-primary hover:underline flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                添加内容
              </Link>
            </div>
            
            <div className="space-y-4">
              {tutorialPackage.contents.map((content) => (
                <div key={content.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-medium text-foreground">{content.title}</h3>
                    <p className="text-sm text-secondary">时长：{content.duration}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      第{content.order}节
                    </span>
                    <Link 
                      href={`/${username}/tutorials/${packageId}/edit/${content.id}`}
                      className="text-primary hover:underline text-sm"
                    >
                      编辑
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
