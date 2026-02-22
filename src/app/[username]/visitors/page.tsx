'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useParams } from 'next/navigation'

interface Visitor {
  id: string
  name: string
  avatar: string
  bio: string
  visitedAt: string
  isFollowing: boolean
}

export default function VisitorsPage() {
  const params = useParams()
  const username = params.username as string
  
  // 模拟访客数据
  const visitors: Visitor[] = [
    {
      id: '1',
      name: '张三',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20Chinese%20person%20with%20glasses%2C%20clean%20background%2C%20high%20quality&image_size=square',
      bio: '建站技术爱好者，专注于前端开发',
      visitedAt: '10分钟前',
      isFollowing: true
    },
    {
      id: '2',
      name: '李四',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20Chinese%20woman%2C%20clean%20background%2C%20high%20quality&image_size=square',
      bio: '后端开发者，喜欢研究新技术',
      visitedAt: '1小时前',
      isFollowing: false
    },
    {
      id: '3',
      name: '王五',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20young%20Chinese%20man%2C%20clean%20background%2C%20high%20quality&image_size=square',
      bio: '全栈开发者，热爱分享技术',
      visitedAt: '昨天',
      isFollowing: true
    },
    {
      id: '4',
      name: '赵六',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20young%20Chinese%20woman%2C%20clean%20background%2C%20high%20quality&image_size=square',
      bio: 'UI设计师，关注用户体验',
      visitedAt: '2天前',
      isFollowing: false
    },
    {
      id: '5',
      name: '钱七',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20middle-aged%20Chinese%20man%2C%20clean%20background%2C%20high%20quality&image_size=square',
      bio: '产品经理，专注于用户需求',
      visitedAt: '3天前',
      isFollowing: true
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border mb-8">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-foreground">访客记录</h1>
              <p className="text-sm text-secondary mt-1">查看最近访问您主页的用户</p>
            </div>
          </div>
          
          {/* 访客列表 */}
          <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
            <div className="p-6">
              <div className="space-y-6">
                {visitors.map((visitor) => (
                  <div key={visitor.id} className="flex items-start space-x-4 p-4 border border-border rounded-md">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={visitor.avatar} 
                        alt={visitor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-foreground">{visitor.name}</h3>
                        <span className="text-xs text-secondary">{visitor.visitedAt}</span>
                      </div>
                      <p className="text-sm text-secondary mt-1">{visitor.bio}</p>
                      <div className="mt-3 flex space-x-2">
                        <button 
                          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${visitor.isFollowing ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-primary text-white hover:bg-primary/90'}`}
                        >
                          {visitor.isFollowing ? '已关注' : '关注'}
                        </button>
                        <button className="px-4 py-1.5 text-sm font-medium text-secondary bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                          查看主页
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 分页 */}
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-border rounded-md text-secondary hover:bg-gray-50 transition-colors">
                    上一页
                  </button>
                  <button className="px-3 py-1 text-sm border border-primary rounded-md bg-primary text-white">
                    1
                  </button>
                  <button className="px-3 py-1 text-sm border border-border rounded-md text-secondary hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="px-3 py-1 text-sm border border-border rounded-md text-secondary hover:bg-gray-50 transition-colors">
                    3
                  </button>
                  <button className="px-3 py-1 text-sm border border-border rounded-md text-secondary hover:bg-gray-50 transition-colors">
                    下一页
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}