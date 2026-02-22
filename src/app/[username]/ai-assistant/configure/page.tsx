'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ConfigureAIAssistantPage() {
  const params = useParams()
  const router = useRouter()
  const username = decodeURIComponent(params.username as string)

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [description, setDescription] = useState('')
  const [personality, setPersonality] = useState('')
  const [knowledgeBase, setKnowledgeBase] = useState('')
  const [greetingMessage, setGreetingMessage] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // 模拟获取AI助理数据
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      // 模拟AI助理数据
      setName('技术助手')
      setAvatar('🤖')
      setDescription('一个专注于技术领域的AI助手，可以回答技术问题、提供开发建议。')
      setPersonality('专业、耐心、详细，喜欢用例子说明问题')
      setKnowledgeBase('前端开发、后端开发、AI技术、编程基础')
      setGreetingMessage('你好！我是你的技术助手，有什么问题可以随时问我。')
      setIsPrivate(false)
      setLoading(false)
    }, 500)
  }, [])

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setSubmitting(false)
      // 重定向到AI助理页面
      router.push(`/${username}/ai-assistant`)
    }, 1000)
  }

  // 可选的头像列表
  const availableAvatars = ['🤖', '👨‍💻', '👩‍💻', '🧠', '💡', '✨']

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8 border border-border">
              <div className="flex justify-center items-center h-40">
                <div className="text-secondary">加载中...</div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
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
            <Link href={`/${username}/ai-assistant`} className="hover:text-primary transition-colors">AI助理</Link>
            {' > '}
            <span className="text-foreground">配置助理</span>
          </div>
          
          {/* 配置AI助理表单 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-6">配置AI助理</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 助理名称 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  助理名称
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入助理名称"
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              
              {/* 助理头像 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  助理头像
                </label>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl mb-4">{avatar}</div>
                  <div className="flex space-x-2 flex-wrap">
                    {availableAvatars.map((avatarOption) => (
                      <button
                        key={avatarOption}
                        type="button"
                        onClick={() => handleAvatarChange(avatarOption)}
                        className={`text-2xl p-2 border ${avatar === avatarOption ? 'border-primary bg-primary/5' : 'border-border'} rounded-md hover:bg-muted/50 transition-colors`}
                      >
                        {avatarOption}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 助理描述 */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  助理描述
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请描述这个助理的功能和特点"
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              {/* 性格设定 */}
              <div>
                <label htmlFor="personality" className="block text-sm font-medium text-foreground mb-2">
                  性格设定
                </label>
                <textarea
                  id="personality"
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  placeholder="请描述助理的性格特点"
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              {/* 知识库 */}
              <div>
                <label htmlFor="knowledgeBase" className="block text-sm font-medium text-foreground mb-2">
                  知识库
                </label>
                <textarea
                  id="knowledgeBase"
                  value={knowledgeBase}
                  onChange={(e) => setKnowledgeBase(e.target.value)}
                  placeholder="请列出助理的知识领域，用逗号分隔"
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              {/* 问候语 */}
              <div>
                <label htmlFor="greetingMessage" className="block text-sm font-medium text-foreground mb-2">
                  问候语
                </label>
                <input
                  type="text"
                  id="greetingMessage"
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  placeholder="请输入助理的问候语"
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              {/* 公开/私密设置 */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 text-primary focus:ring-primary/50 border-border rounded"
                />
                <label htmlFor="isPrivate" className="ml-2 block text-sm text-foreground">
                  设为私密 (仅自己可见)
                </label>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex space-x-4 pt-4">
                <Link
                  href={`/${username}/ai-assistant`}
                  className="px-6 py-3 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                >
                  取消
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex-1"
                  disabled={submitting}
                >
                  {submitting ? '保存中...' : '保存配置'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
