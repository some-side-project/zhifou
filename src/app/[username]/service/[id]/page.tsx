'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function ServiceDetailPage() {
  const params = useParams()
  const username = decodeURIComponent(params.username as string)
  const serviceId = params.id as string

  // 模拟服务详情数据
  const serviceData = serviceId === '5' ? {
    // 网页应用类型服务
    id: serviceId,
    title: 'AI 代码助手',
    price: '¥0',
    originalPrice: '¥0',
    description: '智能代码助手，帮助您快速编写、优化和理解代码，提高开发效率。',
    icon: '🤖',
    type: 'web',
    appName: 'AI 代码助手',
    appUrl: 'https://ai-code-assistant.example.com',
    features: [
      '智能代码生成',
      '代码优化建议',
      '代码解释和文档生成',
      '多种编程语言支持',
      '实时协作功能',
    ],
    process: [
      '创建项目',
      '开始使用代码助手',
      '获取智能建议',
      '优化和完善代码',
      '导出最终代码',
    ],
    faq: [
      {
        question: '支持哪些编程语言？',
        answer: '我们支持主流的编程语言，包括JavaScript、Python、Java、C++、Go等。',
      },
      {
        question: '需要安装什么软件吗？',
        answer: '不需要，这是一个网页应用，您只需通过浏览器访问即可使用。',
      },
      {
        question: '数据安全吗？',
        answer: '是的，我们非常重视数据安全，您的代码会被严格保密，不会被用于任何其他目的。',
      },
    ],
  } : {
    // 人工服务类型
    id: serviceId,
    title: '前端技术咨询',
    price: '¥299/次',
    originalPrice: '¥399/次',
    description: '提供前端技术方面的咨询服务，包括技术选型、架构设计、性能优化等问题的解答。',
    duration: '60分钟',
    delivery: '线上视频会议',
    icon: '💻',
    type: 'manual',
    features: [
      '技术选型建议',
      '架构设计咨询',
      '性能优化方案',
      '代码质量评估',
      '最佳实践指导',
      '60分钟线上视频会议',
      '会议记录和后续跟进',
    ],
    process: [
      '提交咨询需求',
      '确认服务时间',
      '进行线上咨询',
      '提供解决方案',
      '后续跟进支持',
    ],
    faq: [
      {
        question: '咨询前需要准备什么？',
        answer: '建议您提前整理好需要咨询的问题，准备相关的代码或项目文档，以便我们能够更有针对性地为您提供帮助。',
      },
      {
        question: '咨询时间可以延长吗？',
        answer: '默认咨询时间为60分钟，如果需要延长，可以在咨询过程中与顾问协商，可能会产生额外费用。',
      },
      {
        question: '咨询后会提供书面资料吗？',
        answer: '是的，我们会在咨询后24小时内提供会议记录和相关的技术建议文档。',
      },
    ],
  }

  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    setLoading(true)
    // 模拟购买请求
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('购买成功！我们将尽快与您联系确认服务详情。')
    } catch (error) {
      alert('购买失败，请稍后重试。')
    } finally {
      setLoading(false)
    }
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
            <Link href={`/${username}`} className="hover:text-primary transition-colors">{username}</Link>
            {' > '}
            <Link href={`/${username}/services`} className="hover:text-primary transition-colors">服务</Link>
            {' > '}
            <span className="text-foreground">{serviceData.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧服务信息 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">{serviceData.icon}</div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{serviceData.title}</h1>
                    {serviceData.type === 'manual' && (
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xl font-bold text-primary">{serviceData.price}</span>
                        <span className="text-sm text-gray-400 line-through">{serviceData.originalPrice}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">服务描述</h2>
                  <p className="text-secondary">{serviceData.description}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">服务特点</h2>
                  <ul className="space-y-2">
                    {serviceData.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">服务流程</h2>
                  <ol className="space-y-2 list-decimal list-inside">
                    {serviceData.process.map((step, index) => (
                      <li key={index} className="text-foreground">{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">常见问题</h2>
                  <div className="space-y-4">
                    {serviceData.faq.map((item, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium text-foreground mb-2">{item.question}</h3>
                        <p className="text-secondary">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 右侧购买信息 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-8 border border-border sticky top-24">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">服务信息</h2>
                  <div className="space-y-3 text-sm text-secondary">
                    <div className="flex justify-between items-center">
                      <span>服务博主</span>
                      <Link href={`/${username}`} className="flex items-center space-x-2 hover:text-primary transition-colors">
                        <img 
                          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20Chinese%20person%2C%20clean%20background%2C%20high%20quality&image_size=square" 
                          alt={username} 
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="text-foreground">{username}</span>
                      </Link>
                    </div>
                    <div className="flex justify-between">
                      <span>服务类型</span>
                      <span className="text-foreground">{serviceData.type === 'web' ? '网页应用服务' : '人工服务'}</span>
                    </div>
                    {serviceData.type === 'web' && serviceData.appName && (
                      <div className="flex justify-between">
                        <span>应用名称</span>
                        <span className="text-foreground">{serviceData.appName}</span>
                      </div>
                    )}
                    {serviceData.type === 'manual' && (
                      <>
                        <div className="flex justify-between">
                          <span>服务时长</span>
                          <span className="text-foreground">{serviceData.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>交付方式</span>
                          <span className="text-foreground">{serviceData.delivery}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>服务保障</span>
                          <span className="text-foreground">不满意退款</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-foreground">价格</span>
                    <div className="flex items-center space-x-2">
                      {serviceData.type === 'web' ? (
                        <span className="text-xl font-bold text-primary">以应用内价格为准</span>
                      ) : (
                        <>
                          <span className="text-xl font-bold text-primary">{serviceData.price}</span>
                          <span className="text-sm text-gray-400 line-through">{serviceData.originalPrice}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {serviceData.type === 'manual' && (
                    <div className="text-sm text-green-600">
                      限时优惠，立省¥100
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={serviceData.type === 'web' ? () => window.location.href = serviceData.appUrl || '' : handlePurchase}
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        处理中...
                      </>
                    ) : (
                      serviceData.type === 'web' ? '开始' : '立即购买'
                    )}
                  </button>
                  
                  <Link href={`/${username}/services`} className="w-full btn-secondary flex items-center justify-center">
                    返回服务列表
                  </Link>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border text-sm text-secondary">
                  <p className="mb-2">购买即表示您同意我们的</p>
                  <div className="space-y-1">
                    <Link href="#" className="text-primary hover:underline">服务条款</Link>
                    <Link href="#" className="text-primary hover:underline">隐私政策</Link>
                  </div>
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
