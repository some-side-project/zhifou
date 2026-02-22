'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'

interface Message {
  id: string
  sender: {
    id: string
    name: string
    avatar: string
    online: boolean
  }
  content: string
  timestamp: string
  unread: boolean
}

interface Conversation {
  id: string
  user: {
    id: string
    name: string
    avatar: string
    online: boolean
  }
  lastMessage: Message
  unreadCount: number
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: '王五',
      avatar: '',
      online: true
    },
    lastMessage: {
      id: 'msg1',
      sender: {
        id: 'user1',
        name: '王五',
        avatar: '',
        online: true
      },
      content: '你好，关于你写的React文章，我有一些问题想请教...',
      timestamp: '10:30',
      unread: false
    },
    unreadCount: 0
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: '赵六',
      avatar: '',
      online: false
    },
    lastMessage: {
      id: 'msg2',
      sender: {
        id: 'user2',
        name: '赵六',
        avatar: '',
        online: false
      },
      content: '谢谢你分享的TypeScript教程，非常有用！',
      timestamp: '昨天',
      unread: true
    },
    unreadCount: 1
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: '孙七',
      avatar: '',
      online: true
    },
    lastMessage: {
      id: 'msg3',
      sender: {
        id: 'user3',
        name: '孙七',
        avatar: '',
        online: true
      },
      content: '你好，我想了解一下你提供的前端咨询服务',
      timestamp: '2026-02-20',
      unread: false
    },
    unreadCount: 0
  }
]

const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: 'msg1',
      sender: {
        id: 'user1',
        name: '王五',
        avatar: '',
        online: true
      },
      content: '你好，关于你写的React文章，我有一些问题想请教...',
      timestamp: '10:30',
      unread: false
    },
    {
      id: 'msg2',
      sender: {
        id: 'current',
        name: '我',
        avatar: '',
        online: true
      },
      content: '你好，很高兴收到你的消息！请问有什么问题可以帮你解答？',
      timestamp: '10:35',
      unread: false
    }
  ],
  '2': [
    {
      id: 'msg3',
      sender: {
        id: 'user2',
        name: '赵六',
        avatar: '',
        online: false
      },
      content: '谢谢你分享的TypeScript教程，非常有用！',
      timestamp: '昨天',
      unread: true
    }
  ],
  '3': [
    {
      id: 'msg4',
      sender: {
        id: 'user3',
        name: '孙七',
        avatar: '',
        online: true
      },
      content: '你好，我想了解一下你提供的前端咨询服务',
      timestamp: '2026-02-20',
      unread: false
    }
  ]
}

export default function MessageWorkbench() {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS)
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1')
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES['1'] || [])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (selectedConversation) {
      setMessages(MOCK_MESSAGES[selectedConversation] || [])
    }
  }, [selectedConversation])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: {
        id: 'current',
        name: '我',
        avatar: '',
        online: true
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      unread: false
    }

    const updatedMessages = [...messages, newMsg]
    setMessages(updatedMessages)
    setNewMessage('')

    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation
        ? {
            ...conv,
            lastMessage: newMsg
          }
        : conv
    ))
  }

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId)
  }

  const filteredConversations = conversations.filter(conv => 
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg border border-border overflow-hidden min-h-[80vh] flex flex-col">
            {/* 顶部导航栏 */}
            <div className="bg-white border-b border-border p-4 flex items-center justify-between">
              <h1 className="text-xl font-bold text-foreground flex items-center">
                <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                私信工作台
              </h1>
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-secondary hover:text-primary transition-colors">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  新消息
                </button>
                <button className="flex items-center text-secondary hover:text-primary transition-colors">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  设置
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              {/* 左侧会话列表 */}
              <div className="w-80 border-r border-border flex flex-col bg-gray-50">
                {/* 搜索框 */}
                <div className="p-4 border-b border-border bg-white">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                      type="text" 
                      placeholder="搜索联系人..." 
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* 会话列表 */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div 
                      key={conversation.id}
                      className={`p-4 border-b border-border hover:bg-gray-100 transition-colors cursor-pointer ${selectedConversation === conversation.id ? 'bg-primary/5 border-l-4 border-primary' : 'bg-white'}`}
                      onClick={() => handleSelectConversation(conversation.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${conversation.user.online ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                            <span className="font-medium">{getInitial(conversation.user.name)}</span>
                          </div>
                          {conversation.user.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-foreground truncate">{conversation.user.name}</h3>
                            <span className="text-xs text-secondary">{conversation.lastMessage.timestamp}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-secondary truncate max-w-[180px]">
                              {conversation.lastMessage.sender.id === 'current' ? '我: ' : ''}
                              {conversation.lastMessage.content}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 右侧聊天区域 */}
              {selectedConversation ? (
                <div className="flex-1 flex flex-col bg-white">
                  {/* 聊天头部 */}
                  <div className="border-b border-border p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${conversations.find(c => c.id === selectedConversation)?.user.online ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                          <span className="font-medium">{getInitial(conversations.find(c => c.id === selectedConversation)?.user.name || '')}</span>
                        </div>
                        {conversations.find(c => c.id === selectedConversation)?.user.online && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{conversations.find(c => c.id === selectedConversation)?.user.name}</h3>
                        <p className="text-xs text-secondary">
                          {conversations.find(c => c.id === selectedConversation)?.user.online ? '在线' : '离线'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="text-secondary hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-secondary hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* 消息列表 */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex items-start space-x-3 ${message.sender.id === 'current' ? 'justify-end' : ''}`}
                      >
                        {message.sender.id !== 'current' && (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${conversations.find(c => c.id === selectedConversation)?.user.online ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                            <span className="text-sm font-medium">{getInitial(message.sender.name)}</span>
                          </div>
                        )}
                        <div className="max-w-[70%]">
                          <div className={`rounded-lg p-4 ${message.sender.id === 'current' ? 'bg-primary text-white' : 'bg-white border border-border'}`}>
                            <p>{message.content}</p>
                          </div>
                          <p className={`text-xs text-secondary mt-1 ${message.sender.id === 'current' ? 'text-right' : ''}`}>
                            {message.timestamp}
                          </p>
                        </div>
                        {message.sender.id === 'current' && (
                          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                            <span className="text-sm font-medium">{getInitial(message.sender.name)}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* 消息输入框 */}
                  <div className="border-t border-border p-4 bg-white">
                    <div className="flex items-end space-x-3">
                      <div className="flex space-x-2 mr-2">
                        <button className="text-secondary hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </button>
                        <button className="text-secondary hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex-1">
                        <textarea 
                          placeholder="输入消息..."
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none min-h-[80px]"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                      </div>
                      <button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="btn-primary py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        发送
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-500">选择一个会话开始聊天</h3>
                    <p className="text-sm text-gray-400 mt-2">点击左侧列表中的联系人开始对话</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
