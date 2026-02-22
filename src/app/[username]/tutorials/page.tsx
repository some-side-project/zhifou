'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function UserTutorialsPage() {
  const params = useParams()
  const username = decodeURIComponent(params.username as string)

  // 模拟教程数据
  const tutorials = [
    {
      id: 1,
      title: 'React从入门到精通',
      author: username,
      authorNickname: '张三',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=React%20programming%20tutorial%20cover%20image%2C%20modern%20design%2C%20blue%20theme%2C%20code%20snippets%2C%20high%20quality&image_size=landscape_16_9',
      lessons: 24,
      students: 5678,
      description: '全面介绍React框架的核心概念和实战技巧，从基础到高级，适合前端开发者学习。',
      level: '中级',
      duration: '12小时',
    },
    {
      id: 2,
      title: 'Python数据分析实战',
      author: username,
      authorNickname: '张三',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20analysis%20tutorial%20cover%20image%2C%20modern%20design%2C%20green%20theme%2C%20charts%20and%20graphs%2C%20high%20quality&image_size=landscape_16_9',
      lessons: 30,
      students: 4321,
      description: '使用Python进行数据分析的实战教程，包括NumPy、Pandas、Matplotlib等库的使用。',
      level: '中级',
      duration: '15小时',
    },
    {
      id: 3,
      title: 'UI/UX设计原理',
      author: username,
      authorNickname: '张三',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=UI%20UX%20design%20principles%20tutorial%20cover%20image%2C%20modern%20design%2C%20purple%20theme%2C%20user%20interface%20elements%2C%20high%20quality&image_size=landscape_16_9',
      lessons: 18,
      students: 3456,
      description: '介绍UI/UX设计的基本原理和最佳实践，帮助你创建美观易用的用户界面。',
      level: '初级',
      duration: '9小时',
    },
    {
      id: 4,
      title: 'TypeScript全栈开发',
      author: username,
      authorNickname: '张三',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=TypeScript%20full%20stack%20development%20tutorial%20cover%20image%2C%20modern%20design%2C%20red%20theme%2C%20code%20and%20server%20icons%2C%20high%20quality&image_size=landscape_16_9',
      lessons: 36,
      students: 2345,
      description: '从TypeScript基础到全栈应用开发，涵盖前端和后端的完整开发流程。',
      level: '高级',
      duration: '18小时',
    },
  ]

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
                    <p className="text-secondary mb-4">专注于技术教育，分享高质量的学习内容</p>
                  </div>
                  <Link href={`/${username}`} className="btn-secondary mt-2 md:mt-0">
                    查看ta的主页
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-secondary">
                  <span>📚 {tutorials.length} 教程</span>
                  <span>👥 {tutorials.reduce((total, t) => total + t.students, 0)} 总学习人数</span>
                  <span>🎓 {tutorials.reduce((total, t) => total + t.lessons, 0)} 总课时</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 页面标题和创建按钮 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-end mb-8">
            <Link href={`/${username}/tutorials/create`} className="btn-primary mt-4 md:mt-0">
              创建教程包
            </Link>
          </div>
          
          {/* 教程卡片列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial) => (
              <div key={tutorial.id} className="bg-white rounded-lg shadow-md border border-border overflow-hidden hover:shadow-lg transition-all">
                <Link href={`/${username}/tutorial/${tutorial.id}`} className="block">
                  {/* 教程封面 */}
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={tutorial.cover} 
                      alt={tutorial.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  
                  {/* 教程信息 */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                        {tutorial.level}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {tutorial.duration}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-foreground hover:text-primary transition-colors mb-2">
                      {tutorial.title}
                    </h2>
                    
                    <p className="text-secondary text-sm mb-4 line-clamp-2">
                      {tutorial.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-4 text-sm text-secondary">
                        <span>📚 {tutorial.lessons} 课时</span>
                        <span>👥 {tutorial.students} 学习</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-primary font-medium">
                          开始学习 →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* 编辑和删除按钮 - 仅作者可见 */}
                <div className="p-4 border-t border-border bg-gray-50 flex justify-end space-x-2">
                  <Link href={`/${username}/tutorials/edit/${tutorial.id}`} className="text-primary hover:underline text-xs">
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
      </main>
      
      <Footer />
    </div>
  )
}
