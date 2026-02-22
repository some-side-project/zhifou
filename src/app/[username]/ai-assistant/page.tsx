'use client'

import { useState, useRef, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AIAssistantIcon from '@/components/AIAssistantIcon'

export default function AIAssistantPage() {
  const params = useParams()
  const username = decodeURIComponent(params.username as string)
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: '你好！我是{username}的AI助理，有什么我可以帮助你的吗？',
    },
    {
      id: 2,
      role: 'blogger',
      content: '你好！我是{username}，你发的所有消息我都能看到，如有必要我也会随时介入回答你。',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // 模拟AI回复
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: getAIResponse(inputValue.trim()),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const getAIResponse = (userInput: string): string => {
    const responses = [
      '这是一个很好的问题！根据{username}的知识，我可以为你提供以下信息...',
      '关于这个话题，{username}在他的博客中有详细的介绍，你可以查看相关文章。',
      '我理解你的需求，让我为你整理一下相关信息...',
      '这个问题很有深度，让我为你分析一下...',
      '根据{username}的经验，我建议你可以这样做...',
    ]
    return responses[Math.floor(Math.random() * responses.length)].replace('{username}', username)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">

          {/* AI助理界面 */}
          <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <h3 className="text-md font-semibold text-foreground">与博主对话</h3>
              <Link href={`/${username}/ai-assistant/configure`} className="text-xs btn-secondary">
                配置助理
              </Link>
            </div>
            <div className="flex flex-col lg:flex-row min-h-[700px] h-[700px]">
              {/* 左侧虚拟形象 */}
              <div className="lg:w-1/4 bg-gradient-to-b from-primary/10 to-primary/5 p-6 flex flex-col items-center justify-center">
                <div className="relative mb-4">
                  {/* 虚拟形象 */}
                  <AIAssistantIcon />
                </div>
                
                <h2 className="text-lg font-semibold text-foreground mb-3 mt-4">{username}的AI助理</h2>
                <p className="text-xs text-secondary text-center mb-4">
                  基于{username}的知识，为你提供智能问答服务
                </p>
                
                <div className="text-center text-xs text-secondary mb-6 space-y-1">
                  <p>💡 技术问题、学习建议</p>
                  <p>📚 基于博主知识经验</p>
                  <p>🤖 24/7 全天候服务</p>
                  <p>🔒 消息博主可见</p>
                </div>
                
                {/* 主人信息 */}
                <div className="w-full border-t border-border pt-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3 text-center">主人信息</h3>
                  <div className="flex flex-col items-center gap-2">
                    <Link href={`/${username}`} className="hover:opacity-80 transition-opacity">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
                        <img 
                          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20Chinese%20person%2C%20clean%20background%2C%20high%20quality&image_size=square" 
                          alt={username} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="text-center flex flex-col items-center gap-2">
                      <Link href={`/${username}`} className="text-foreground text-sm hover:text-primary transition-colors">
                        {username}
                      </Link>

                      <Link href={`/${username}`} className="btn-secondary w-full text-center text-sm py-1">
                        查看ta的主页
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 右侧对话区 */}
              <div className="lg:w-3/4 flex flex-col">
                {/* 对话历史 */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-4`}>
                        {message.role !== 'user' && (
                          <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-border bg-white">
                            {message.role === 'assistant' && (
                              <div className="text-2xl text-primary">🤖</div>
                            )}
                            {message.role === 'blogger' && (
                              <div className="text-2xl text-green-500">👨‍💼</div>
                            )}
                          </div>
                        )}
                        <div className={`max-w-[80%] p-4 rounded-lg ${message.role === 'user' 
                          ? 'bg-primary text-white' 
                          : message.role === 'assistant' 
                          ? 'bg-gray-100 text-foreground' 
                          : 'bg-green-50 text-foreground'}`}>
                          <p>{message.content.replace('{username}', username)}</p>
                        </div>
                        {message.role === 'user' && (
                          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 border-2 border-white">
                            <span className="text-sm font-medium">你</span>
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start items-start gap-4">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-border bg-white">
                          <div className="text-2xl text-primary">🤖</div>
                        </div>
                        <div className="max-w-[80%] p-4 rounded-lg bg-gray-100 text-foreground">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                
                {/* 输入区域 */}
                <div className="p-6 border-t border-border">
                  {!inputValue && (
                    <div className="mb-3 text-sm text-secondary text-center">
                      <p>示例问题：</p>
                      <div className="flex flex-wrap justify-center gap-2 mt-2">
                        <button 
                          onClick={() => setInputValue('如何学习React？')}
                          className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          如何学习React？
                        </button>
                        <button 
                          onClick={() => setInputValue('前端面试常见问题')}
                          className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          前端面试常见问题
                        </button>
                        <button 
                          onClick={() => setInputValue('代码优化技巧')}
                          className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          代码优化技巧
                        </button>
                      </div>
                    </div>
                  )}
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }} className="flex space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="输入你的问题..."
                      disabled={isLoading}
                      className="flex-1 px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isLoading}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      发送
                    </button>
                  </form>
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
