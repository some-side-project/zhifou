'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function UserServicesPage() {
  const params = useParams()
  const username = decodeURIComponent(params.username as string)

  // 模拟服务数据
  const services = [
    {
      id: 1,
      title: '前端技术咨询',
      price: '¥299/次',
      description: '提供前端技术方面的咨询服务，包括技术选型、架构设计、性能优化等问题的解答。',
      duration: '60分钟',
      delivery: '线上视频会议',
      icon: '💻',
      type: 'manual' // 人工服务
    },
    {
      id: 2,
      title: '代码审查服务',
      price: '¥499/次',
      description: '对您的前端代码进行全面审查，提供代码质量评估、性能优化建议和最佳实践指导。',
      duration: '3-5个工作日',
      delivery: '详细报告',
      icon: '🔍',
      type: 'manual' // 人工服务
    },
    {
      id: 3,
      title: '项目架构设计',
      price: '¥999/次',
      description: '为您的前端项目提供完整的架构设计方案，包括技术栈选择、目录结构、组件设计等。',
      duration: '1-2周',
      delivery: '架构文档 + 视频讲解',
      icon: '🏗️',
      type: 'manual' // 人工服务
    },
    {
      id: 4,
      title: '前端面试辅导',
      price: '¥599/次',
      description: '提供前端面试准备辅导，包括简历优化、技术问题解答、模拟面试等服务。',
      duration: '90分钟',
      delivery: '线上视频会议',
      icon: '🎯',
      type: 'manual' // 人工服务
    },
    {
      id: 5,
      title: 'AI 代码助手',
      description: '智能代码助手，帮助您快速编写、优化和理解代码，提高开发效率。',
      icon: '🤖',
      type: 'web', // 网页应用服务
      appName: 'AI 代码助手',
      appUrl: 'https://ai-code-assistant.example.com',
      price: '¥0'
    }
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
                    <p className="text-secondary mb-4">提供专业的技术服务，助力您的项目成功</p>
                  </div>
                  <Link href={`/${username}`} className="btn-secondary mt-2 md:mt-0">
                    查看ta的主页
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-secondary">
                  <span>💼 {services.length} 服务</span>
                  {services.some(s => s.price) && (
                    <span>💰 平均价格 ¥{Math.round(services.filter(s => s.price).reduce((total, s) => total + parseInt(s.price.replace(/[^0-9]/g, '')), 0) / services.filter(s => s.price).length)}/次</span>
                  )}
                  <span>⏱️ 快速响应</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 页面标题和创建按钮 */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-end">
            <Link href={`/${username}/services/create`} className="btn-primary mt-4 md:mt-0">
              创建服务
            </Link>
          </div>
          
          {/* 服务卡片列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md border border-border overflow-hidden hover:shadow-lg transition-all">
                <Link href={`/${username}/service/${service.id}`} className="block">
                  {/* 服务头部 */}
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{service.icon}</div>
                      <span className="text-xl font-bold text-primary">
                        {service.type === 'web' ? '以应用内价格为准' : service.price}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground hover:text-primary transition-colors mb-2">
                      {service.title}
                    </h2>
                  </div>
                  
                  {/* 服务详情 */}
                  <div className="p-6">
                    <p className="text-secondary mb-4">{service.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-primary">🏷️</span>
                        <span className="text-foreground">服务类型：{service.type === 'web' ? '网页应用服务' : '人工服务'}</span>
                      </div>
                      {service.type === 'manual' && (
                        <>
                          <div className="flex items-center space-x-2">
                            <span className="text-primary">⏱️</span>
                            <span className="text-foreground">服务时长：{service.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-primary">📤</span>
                            <span className="text-foreground">交付方式：{service.delivery}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Link href={`/${username}/services/edit/${service.id}`} className="text-primary hover:underline text-xs">
                          编辑
                        </Link>
                        <button className="text-red-500 hover:underline text-xs">
                          删除
                        </button>
                      </div>
                      <span className="text-primary font-medium">
                        {service.type === 'web' ? '开始 →' : '查看详情 →'}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
