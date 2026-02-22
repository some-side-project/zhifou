'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'

export default function TutorialDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const username = decodeURIComponent(params.username as string)
  const tutorialId = params.id as string

  // 模拟教程详情数据
  const tutorialData = {
    id: tutorialId,
    title: 'React从入门到精通',
    author: username,
    authorNickname: '张三',
    authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20Chinese%20person%20with%20glasses%2C%20clean%20background%2C%20high%20quality&image_size=square',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=React%20programming%20tutorial%20cover%20image%2C%20modern%20design%2C%20blue%20theme%2C%20code%20snippets%2C%20high%20quality&image_size=landscape_16_9',
    lessons: 24,
    students: 5678,
    description: '全面介绍React框架的核心概念和实战技巧，从基础到高级，适合前端开发者学习。',
    level: '中级',
    duration: '12小时',
    createdAt: '2026-01-15',
    updatedAt: '2026-02-10',
    chapters: [
      {
        id: 1,
        title: '第1章：React简介',
        sections: [
          { id: 1, title: '1.1 React是什么？' },
          { id: 2, title: '1.2 React的特点' },
          { id: 3, title: '1.3 环境搭建' },
        ],
      },
      {
        id: 2,
        title: '第2章：React基础',
        sections: [
          { id: 4, title: '2.1 JSX语法' },
          { id: 5, title: '2.2 组件基础' },
          { id: 6, title: '2.3 Props和State' },
          { id: 7, title: '2.4 生命周期' },
        ],
      },
      {
        id: 3,
        title: '第3章：React进阶',
        sections: [
          { id: 8, title: '3.1 组件通信' },
          { id: 9, title: '3.2 Context API' },
          { id: 10, title: '3.3 Hooks介绍' },
          { id: 11, title: '3.4 自定义Hooks' },
        ],
      },
      {
        id: 4,
        title: '第4章：React实战',
        sections: [
          { id: 12, title: '4.1 表单处理' },
          { id: 13, title: '4.2 状态管理' },
          { id: 14, title: '4.3 路由配置' },
          { id: 15, title: '4.4 项目部署' },
        ],
      },
    ],
    currentSection: {
      id: 1,
      title: '1.1 React是什么？',
      content: `
        <h2>React是什么？</h2>
        
        <p className="mt-4">React是由Facebook开发的开源JavaScript库，用于构建用户界面。它的核心思想是组件化开发，将用户界面拆分为独立的可复用组件。</p>
        
        <h3 className="mt-6">React的起源</h3>
        
        <p className="mt-2">React最初是为了解决Facebook内部的前端开发问题而创建的。在2011年，Facebook的工程师们面临着一个挑战：如何构建一个能够处理大量动态内容的用户界面，同时保持代码的可维护性。</p>
        
        <p className="mt-2">2013年，Facebook正式开源了React，随后它迅速成为前端开发中最受欢迎的库之一。</p>
        
        <h3 className="mt-6">React的核心概念</h3>
        
        <ul className="mt-2 list-disc pl-6 space-y-2">
          <li><strong>组件化</strong>：将UI拆分为独立的可复用组件</li>
          <li><strong>虚拟DOM</strong>：通过虚拟DOM提高渲染性能</li>
          <li><strong>单向数据流</strong>：数据从父组件流向子组件</li>
          <li><strong>JSX</strong>：JavaScript的语法扩展，用于描述UI</li>
        </ul>
        
        <h3 className="mt-6">React的应用场景</h3>
        
        <p className="mt-2">React适用于构建各种规模的Web应用，特别是需要处理大量动态内容的单页应用(SPA)。它也可以用于构建移动应用（通过React Native）和桌面应用（通过Electron）。</p>
        
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h4 className="font-semibold text-blue-700">学习提示</h4>
          <p className="mt-2 text-blue-600">学习React时，建议先掌握JavaScript的基础知识，包括ES6+特性，然后再开始学习React的核心概念。</p>
        </div>
      `,
    },
  }

  // 从URL参数获取当前section，或使用默认值
  const [activeSection, setActiveSection] = useState(() => {
    const sectionFromUrl = searchParams.get('section')
    return sectionFromUrl ? sectionFromUrl === 'intro' ? 'intro' : parseInt(sectionFromUrl) : 'intro'
  })

  // 当activeSection变化时，更新URL参数
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('section', activeSection.toString())
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`
    window.history.replaceState({}, '', newUrl)
  }, [activeSection])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 面包屑导航 */}
          <div className="mb-6 text-sm text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">首页</Link>
            {' > '}
            <Link href={`/${username}`} className="hover:text-primary transition-colors">{tutorialData.authorNickname}</Link>
            {' > '}
            <Link href={`/${username}/tutorials`} className="hover:text-primary transition-colors">教程</Link>
            {' > '}
            <span className="text-foreground">{tutorialData.title}</span>
          </div>
          
          {/* 教程内容 */}
          <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* 左侧导航栏 */}
              <div className="lg:w-1/4 border-r border-border bg-gray-50">
                <div className="p-6">
                  <div>
                    {/* 介绍 */}
                    <div className="mb-4">
                      <button
                        onClick={() => setActiveSection('intro')}
                        className="w-full text-left font-semibold text-foreground py-1 rounded transition-colors hover:text-primary hover:bg-primary/5"
                      >
                        介绍
                      </button>
                    </div>
                    
                    {/* 目录 */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">目录</h3>
                      <div className="space-y-4">
                        {tutorialData.chapters.map((chapter) => (
                          <div key={chapter.id}>
                            <h4 className="font-medium text-foreground mb-2">{chapter.title}</h4>
                            <ul className="space-y-1 pl-4">
                              {chapter.sections.map((section) => (
                                <li key={section.id}>
                                  <button
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full text-left text-sm py-1 px-2 rounded transition-colors ${activeSection === section.id 
                                      ? 'bg-primary/10 text-primary' 
                                      : 'text-secondary hover:text-primary hover:bg-primary/5'}`}
                                  >
                                    {section.title}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    

                  </div>
                </div>
              </div>
              
              {/* 右侧内容区 */}
              <div className="lg:w-3/4">
                {/* 教程头部 */}
                <div className="p-6 border-b border-border">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-0">
                    <div>
                      <h1 className="text-2xl font-bold text-foreground mb-1">{tutorialData.title}</h1>
                      
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                            {tutorialData.level}
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            {tutorialData.duration}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-secondary">
                          <span>📚 {tutorialData.lessons} 课时</span>
                          <span>👥 {tutorialData.students} 学习</span>
                          <span>📅 更新于 {tutorialData.updatedAt}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 操作按钮 */}
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/${username}/tutorials/${tutorialId}/create`} className="btn-primary">
                        添加内容
                      </Link>
                      <Link href={`/${username}/tutorials/${tutorialId}/edit/${activeSection}`} className="btn-secondary">
                        编辑
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* 内容区域 */}
                <div className="p-8">
                  {/* 教程介绍内容 */}
                  {activeSection === 'intro' && (
                    <div className="space-y-6">
                      <div className="rounded-lg overflow-hidden">
                        <img 
                          src={tutorialData.cover} 
                          alt={tutorialData.title} 
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="text-secondary">{tutorialData.description}</p>
                        
                        <div className="space-y-4">
                          <h2 className="text-xl font-semibold text-foreground">作者介绍</h2>
                          <div className="flex flex-col items-center">
                            <Link href={`/${username}`} className="mb-3">
                              <div className="w-16 h-16 rounded-full overflow-hidden">
                                <img 
                                  src={tutorialData.authorAvatar} 
                                  alt={tutorialData.authorNickname} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </Link>
                            <Link 
                              href={`/${username}`} 
                              className="font-semibold text-foreground hover:text-primary transition-colors mb-1"
                            >
                              {tutorialData.authorNickname}
                            </Link>
                            <p className="text-sm text-secondary mb-4 text-center max-w-md">
                              专注于技术教育，分享高质量的学习内容
                            </p>
                            
                            {/* 作者数据 */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-md">
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-secondary mb-1">知龄</p>
                                <p className="font-semibold text-foreground">1年2月</p>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-secondary mb-1">产量</p>
                                <p className="font-semibold text-foreground">12.3万</p>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-secondary mb-1">粉丝</p>
                                <p className="font-semibold text-foreground">1.2k</p>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-secondary mb-1">浏览</p>
                                <p className="font-semibold text-foreground">5.6万</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* 章节内容 */}
                  {activeSection !== 'intro' && (
                    /* 根据activeSection获取当前section */
                    <>
                      {(() => {
                        // 遍历所有章节和小节，找到对应的section
                        for (const chapter of tutorialData.chapters) {
                          for (const section of chapter.sections) {
                            if (section.id === activeSection) {
                              return (
                                <>
                                  <h2 className="text-xl font-semibold text-foreground mb-6">{section.title}</h2>
                                  
                                  <div className="prose max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: tutorialData.currentSection.content }} />
                                  </div>
                                  
                                  {/* 章节导航 */}
                                  <div className="mt-12 flex justify-between items-center pt-6 border-t border-border">
                                    <button className="btn-secondary opacity-50 cursor-not-allowed">
                                      上一节
                                    </button>
                                    <button className="btn-primary">
                                      下一节
                                    </button>
                                  </div>
                                </>
                              )
                            }
                          }
                        }
                        // 如果没有找到，显示默认内容
                        return (
                          <>
                            <h2 className="text-xl font-semibold text-foreground mb-6">{tutorialData.currentSection.title}</h2>
                            
                            <div className="prose max-w-none">
                              <div dangerouslySetInnerHTML={{ __html: tutorialData.currentSection.content }} />
                            </div>
                            
                            {/* 章节导航 */}
                            <div className="mt-12 flex justify-between items-center pt-6 border-t border-border">
                              <button className="btn-secondary opacity-50 cursor-not-allowed">
                                上一节
                              </button>
                              <button className="btn-primary">
                                下一节
                              </button>
                            </div>
                          </>
                        )
                      })()}
                    </>
                  )}
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
