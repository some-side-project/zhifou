'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function DashboardPage() {
  const params = useParams()
  const username = decodeURIComponent(params.username as string)

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
            <span className="text-foreground">管理中心</span>
          </div>
          
          {/* 管理中心标题 */}
          <h1 className="text-2xl font-bold text-foreground mb-8">管理中心</h1>
          
          {/* 管理卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 博客管理 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-border hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">📝</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">博客管理</h2>
              <p className="text-secondary mb-4">创建和管理博客文章与分类</p>
              <div className="space-y-2">
                <Link href={`/${username}/dashboard/blogs`} className="block btn-secondary text-center">
                  管理博客
                </Link>
                <Link href={`/${username}/dashboard/blogs/create`} className="block btn-secondary text-center">
                  创建博客
                </Link>
                <Link href={`/${username}/dashboard/blogs/categories`} className="block btn-secondary text-center">
                  管理分类
                </Link>
              </div>
            </div>
            
            {/* 教程管理 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-border hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">教程管理</h2>
              <p className="text-secondary mb-4">创建和管理教程包与课程</p>
              <div className="space-y-2">
                <Link href={`/${username}/dashboard/tutorials`} className="block btn-secondary text-center">
                  管理教程
                </Link>
                <Link href={`/${username}/dashboard/tutorials/create`} className="block btn-secondary text-center">
                  创建教程包
                </Link>
              </div>
            </div>
            
            {/* 文件管理 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-border hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">📁</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">文件管理</h2>
              <p className="text-secondary mb-4">创建文件夹和上传文件</p>
              <div className="space-y-2">
                <Link href={`/${username}/dashboard/files`} className="block btn-secondary text-center">
                  管理文件
                </Link>
                <Link href={`/${username}/dashboard/files/create`} className="block btn-secondary text-center">
                  创建文件夹
                </Link>
                <Link href={`/${username}/dashboard/files/upload`} className="block btn-secondary text-center">
                  上传文件
                </Link>
              </div>
            </div>
            
            {/* 服务管理 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-border hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">💼</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">服务管理</h2>
              <p className="text-secondary mb-4">创建和管理服务内容</p>
              <div className="space-y-2">
                <Link href={`/${username}/dashboard/services`} className="block btn-secondary text-center">
                  管理服务
                </Link>
                <Link href={`/${username}/dashboard/services/create`} className="block btn-secondary text-center">
                  创建服务
                </Link>
              </div>
            </div>
            
            {/* AI助理管理 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-border hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🤖</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">AI助理管理</h2>
              <p className="text-secondary mb-4">配置AI助理的设置</p>
              <div className="space-y-2">
                <Link href={`/${username}/dashboard/ai-assistant`} className="block btn-secondary text-center">
                  配置AI助理
                </Link>
              </div>
            </div>
            
            {/* 账户设置 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-border hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">⚙️</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">账户设置</h2>
              <p className="text-secondary mb-4">管理个人信息和账户设置</p>
              <div className="space-y-2">
                <Link href={`/${username}/settings`} className="block btn-secondary text-center">
                  账户设置
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}