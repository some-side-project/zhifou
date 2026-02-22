'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [username, setUsername] = useState('')
  
  // 从localStorage获取用户名
  useEffect(() => {
    const savedUsername = localStorage.getItem('username')
    if (savedUsername) {
      setUsername(savedUsername)
    }
  }, [])
  
  const [activeTab, setActiveTab] = useState('following')
  const [currentPage, setCurrentPage] = useState(1)
  const [profileForm, setProfileForm] = useState({
    nickname: '张三',
    bio: '建站技术爱好者，专注于前端开发和AI应用，重启web2.0博客时代的践行者。',
    email: 'zhangsan@example.com',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20Chinese%20person%20with%20glasses%2C%20clean%20background%2C%20high%20quality&image_size=square',
  })
  
  // Mock data for following users
  const mockFollowingData = {
    1: Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `用户${index + 1}`,
      profession: `职业${index + 1}`,
      avatar: String.fromCharCode(65 + (index % 26))
    })),
    2: Array.from({ length: 10 }, (_, index) => ({
      id: index + 11,
      name: `用户${index + 11}`,
      profession: `职业${index + 11}`,
      avatar: String.fromCharCode(65 + ((index + 10) % 26))
    })),
    3: Array.from({ length: 3 }, (_, index) => ({
      id: index + 21,
      name: `用户${index + 21}`,
      profession: `职业${index + 21}`,
      avatar: String.fromCharCode(65 + ((index + 20) % 26))
    }))
  }
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [backupStatus, setBackupStatus] = useState('')
  const [backupLink, setBackupLink] = useState('')
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [withdrawSuccess, setWithdrawSuccess] = useState(false)
  const [showWorkbenchModal, setShowWorkbenchModal] = useState(false)

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setSuccessMessage('个人信息保存成功！')
      setTimeout(() => setSuccessMessage(''), 3000)
    }, 1000)
  }

  const handleSavePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('两次输入的密码不一致')
      return
    }
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setSuccessMessage('密码修改成功！')
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSuccessMessage(''), 3000)
    }, 1000)
  }

  const handleBackupData = async () => {
    setIsBackingUp(true)
    setBackupStatus('正在备份数据...')
    setTimeout(() => {
      setIsBackingUp(false)
      setBackupStatus('备份完成！数据已发送到您的邮箱，并生成了下载链接。')
      setBackupLink('https://example.com/backup.zip')
      setTimeout(() => {
        setBackupStatus('')
        setBackupLink('')
      }, 5000)
    }, 2000)
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('请输入有效的提现金额')
      return
    }
    setIsWithdrawing(true)
    setTimeout(() => {
      setIsWithdrawing(false)
      setWithdrawSuccess(true)
      setTimeout(() => {
        setShowWithdrawModal(false)
        setWithdrawSuccess(false)
        setWithdrawAmount('')
      }, 3000)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 shrink-0">
              <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden sticky top-8">
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">我的互动</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('following')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'following' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      我的关注
                    </button>
                    <button
                      onClick={() => setActiveTab('collection')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'collection' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      我的收藏
                    </button>
                    <button
                      onClick={() => setActiveTab('likes')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'likes' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      我的点赞
                    </button>
                  </div>
                </div>
                
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">我的消息</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('system-notifications')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'system-notifications' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      系统通知
                    </button>
                    <button
                      onClick={() => setActiveTab('interaction-notifications')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'interaction-notifications' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      互动通知
                    </button>
                    <button
                      onClick={() => setActiveTab('private-messages')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'private-messages' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      私信对话
                    </button>
                  </div>
                </div>
                
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">账户管理</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('password')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'password' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      密码修改
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'security' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      账号安全
                    </button>
                  </div>
                </div>
                
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">财务管理</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('wallet')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'wallet' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      钱包管理
                    </button>
                  </div>
                </div>
                
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">交易管理</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('sold')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'sold' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      我卖出的
                    </button>
                    <button
                      onClick={() => setActiveTab('bought')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'bought' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      我买入的
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">数据管理</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('data')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'data' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50 hover:text-primary'}`}
                    >
                      数据备份
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden p-8">
              {successMessage && (
                <div className="bg-green-100 text-green-600 p-3 rounded-md mb-6">
                  {successMessage}
                </div>
              )}
              
              {activeTab === 'following' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">我的关注</h2>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6 min-h-[300px]">
                    <div className="space-y-4 mb-12">
                      {mockFollowingData[currentPage as keyof typeof mockFollowingData]?.map((user: { id: number; name: string; profession: string; avatar: string }) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-primary font-medium">{user.avatar}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{user.name}</h4>
                              <p className="text-sm text-secondary">{user.profession}</p>
                            </div>
                          </div>
                          <button className="btn-secondary">已关注</button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50 disabled:opacity-50"
                        >
                          上一页
                        </button>
                        {[1, 2, 3].map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 border rounded-md transition-colors ${currentPage === page ? 'border-primary bg-primary text-white' : 'border-border text-secondary hover:bg-gray-50'}`}
                          >
                            {page}
                          </button>
                        ))}
                        <button 
                          onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
                          disabled={currentPage === 3}
                          className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50 disabled:opacity-50"
                        >
                          下一页
                        </button>
                      </div>
                      <div className="text-sm text-secondary">共 23 人</div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'collection' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">我的收藏</h2>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6 min-h-[300px]">
                    <div className="space-y-4 mb-12">
                      <div className="border-b border-border pb-3">
                        <h4 className="font-medium text-foreground mb-1">React 18新特性详解</h4>
                        <p className="text-sm text-secondary">2026-02-19</p>
                      </div>
                      <div className="border-b border-border pb-3">
                        <h4 className="font-medium text-foreground mb-1">TypeScript高级类型实践</h4>
                        <p className="text-sm text-secondary">2026-02-18</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">上一页</button>
                          <button className="px-3 py-1 border border-primary bg-primary text-white rounded-md">1</button>
                          <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">2</button>
                          <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">下一页</button>
                        </div>
                        <div className="text-sm text-secondary">共 28 篇</div>
                      </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'likes' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">我的点赞</h2>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6 min-h-[300px]">
                    <div className="space-y-4 mb-12">
                      <div className="border-b border-border pb-3">
                        <h4 className="font-medium text-foreground mb-1">Tailwind CSS最佳实践</h4>
                        <p className="text-sm text-secondary">2026-02-17</p>
                      </div>
                      <div className="border-b border-border pb-3">
                        <h4 className="font-medium text-foreground mb-1">Next.js 14 App Router深度解析</h4>
                        <p className="text-sm text-secondary">2026-02-16</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">上一页</button>
                          <button className="px-3 py-1 border border-primary bg-primary text-white rounded-md">1</button>
                          <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">2</button>
                          <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">下一页</button>
                        </div>
                        <div className="text-sm text-secondary">共 42 篇</div>
                      </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'system-notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">系统通知</h2>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">接收系统通知</span>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input type="checkbox" value="" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6 min-h-[300px]">
                    <div className="space-y-6 mb-12">
                      <div className="flex items-start space-x-4 p-4 border border-border rounded-md">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-foreground">系统公告</h4>
                            <span className="text-xs text-secondary">今天 09:00</span>
                          </div>
                          <p className="text-sm text-secondary mt-1">知否平台将于2026年2月25日进行系统维护</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">上一页</button>
                        <button className="px-3 py-1 border border-primary bg-primary text-white rounded-md">1</button>
                        <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">2</button>
                        <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">下一页</button>
                      </div>
                      <div className="text-sm text-secondary">共 8 条消息</div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'interaction-notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">互动通知</h2>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">接收互动通知</span>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input type="checkbox" value="" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6 min-h-[300px]">
                    <div className="flex border-b border-border mb-6">
                      <button className="px-4 py-2 font-medium text-primary border-b-2 border-primary">全部</button>
                      <button className="px-4 py-2 font-medium text-secondary hover:text-primary">评论消息</button>
                      <button className="px-4 py-2 font-medium text-secondary hover:text-primary">点赞消息</button>
                      <button className="px-4 py-2 font-medium text-secondary hover:text-primary">留言板消息</button>
                      <button className="px-4 py-2 font-medium text-secondary hover:text-primary">收藏消息</button>
                      <button className="px-4 py-2 font-medium text-secondary hover:text-primary">访客消息</button>
                    </div>
                    <div className="space-y-6 mb-12">
                      <div className="flex items-start space-x-4 p-4 border border-border rounded-md">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-foreground">有人点赞了你的文章</h4>
                            <span className="text-xs text-secondary">今天 10:30</span>
                          </div>
                          <p className="text-sm text-secondary mt-1">王五点赞了你的文章《React 18新特性详解》</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">上一页</button>
                        <button className="px-3 py-1 border border-primary bg-primary text-white rounded-md">1</button>
                        <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">2</button>
                        <button className="px-3 py-1 border border-border rounded-md text-secondary hover:bg-gray-50">下一页</button>
                      </div>
                      <div className="text-sm text-secondary">共 12 条消息</div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'private-messages' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-foreground">私信对话</h2>
                    <button className="btn-primary" onClick={() => window.open('/messages/workbench', '_blank')}>新建私信</button>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">接收邮件通知</span>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-md cursor-pointer" onClick={() => window.open('/messages/workbench', '_blank')}>
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-primary font-medium">C</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-foreground">王五</h4>
                            <div className="flex items-center">
                              <span className="text-xs text-secondary mr-3">10:30</span>
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            </div>
                          </div>
                          <p className="text-sm text-secondary truncate">你好，关于你写的React文章，我有一些问题想请教...</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <button className="text-primary hover:underline" onClick={() => window.open('/messages/workbench', '_blank')}>查看全部私信</button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'password' && (
                <div>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground mb-2">当前密码</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-2">新密码</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        minLength={6}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <p className="mt-1 text-xs text-secondary">密码长度至少6位</p>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">确认新密码</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        minLength={6}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button onClick={handleSavePassword} disabled={isSaving} className="btn-primary">
                        {isSaving ? '保存中...' : '修改密码'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-border rounded-md">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">两步验证</h3>
                        <p className="text-sm text-secondary">开启两步验证提高账号安全性</p>
                      </div>
                      <button className="btn-secondary">未开启</button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-md">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">登录设备管理</h3>
                        <p className="text-sm text-secondary">查看和管理登录过的设备</p>
                      </div>
                      <button className="btn-secondary">查看</button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-md">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">登录历史</h3>
                        <p className="text-sm text-secondary">查看最近的登录记录</p>
                      </div>
                      <button className="btn-secondary">查看</button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-md">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">账号注销</h3>
                        <p className="text-sm text-secondary">注销账号将删除所有数据</p>
                      </div>
                      <button className="text-red-600 hover:text-red-800 font-medium">注销账号</button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'wallet' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-blue-700">钱包余额</h3>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-blue-900">¥8888.88</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-green-700">待提现</h3>
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-green-900">¥1500.00</p>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">收入历史</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium text-secondary">来源</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">金额</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">时间</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border hover:bg-gray-50">
                            <td className="py-3 px-4 text-foreground">博客付费阅读</td>
                            <td className="py-3 px-4 text-primary font-medium">+¥128.00</td>
                            <td className="py-3 px-4 text-secondary">2026-02-21 10:30:00</td>
                            <td className="py-3 px-4">
                              <button className="text-primary hover:underline" onClick={() => setActiveTab('sold')}>详情</button>
                            </td>
                          </tr>
                          <tr className="border-b border-border hover:bg-gray-50">
                            <td className="py-3 px-4 text-foreground">教程付费阅读</td>
                            <td className="py-3 px-4 text-primary font-medium">+¥99.00</td>
                            <td className="py-3 px-4 text-secondary">2026-02-20 14:20:00</td>
                            <td className="py-3 px-4">
                              <button className="text-primary hover:underline" onClick={() => setActiveTab('sold')}>详情</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">提现历史</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium text-secondary">金额</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">提现渠道</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">状态</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">时间</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border hover:bg-gray-50">
                            <td className="py-3 px-4 text-foreground font-medium">¥2000.00</td>
                            <td className="py-3 px-4 text-foreground">微信</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">已完成</span>
                            </td>
                            <td className="py-3 px-4 text-secondary">2026-02-20 16:45:00</td>
                            <td className="py-3 px-4">
                              <button className="text-primary hover:underline">详情</button>
                            </td>
                          </tr>
                          <tr className="border-b border-border hover:bg-gray-50">
                            <td className="py-3 px-4 text-foreground font-medium">¥1500.00</td>
                            <td className="py-3 px-4 text-foreground">支付宝</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">处理中</span>
                            </td>
                            <td className="py-3 px-4 text-secondary">2026-02-19 10:30:00</td>
                            <td className="py-3 px-4">
                              <button className="text-primary hover:underline">详情</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">提现详情</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-secondary">提现金额</p>
                          <p className="font-medium text-foreground">¥2000.00</p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary">提现渠道</p>
                          <p className="font-medium text-foreground">微信</p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary">提现时间</p>
                          <p className="font-medium text-foreground">2026-02-20 16:45:00</p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary">状态</p>
                          <p className="font-medium text-foreground">已完成</p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary">微信账号</p>
                          <p className="font-medium text-foreground">wxid_123456789</p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary">手机号</p>
                          <p className="font-medium text-foreground">138****8888</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="btn-primary" onClick={() => setShowWithdrawModal(true)}>提现</button>
                  </div>
                </div>
              )}
              
              {activeTab === 'data' && (
                <div>
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6 border border-border">
                      <h3 className="text-lg font-semibold text-foreground mb-4">数据备份</h3>
                      <p className="text-secondary mb-2">备份您的所有数据，包括博客、教程、服务等内容。</p>
                      {backupStatus && (
                        <div className="mb-4 p-4 rounded-md bg-blue-50 text-blue-700">{backupStatus}</div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handleBackupData} disabled={isBackingUp} className="btn-primary">
                          {isBackingUp ? '备份中...' : '立即备份数据'}
                        </button>
                        {backupLink && (
                          <a href={backupLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">下载备份文件</a>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 border border-border">
                      <h3 className="text-lg font-semibold text-foreground mb-4">备份设置</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">自动备份</h4>
                            <p className="text-sm text-secondary">每周自动备份数据并发送到邮箱</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div>
                          <label htmlFor="backupEmail" className="block text-sm font-medium text-foreground mb-2">备份邮箱</label>
                          <input type="email" id="backupEmail" value="zhangsan@example.com" className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'sold' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">我卖出的</h2>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium text-secondary">订单编号</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">商品名称</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">金额</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">购买时间</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">状态</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border hover:bg-gray-50">
                            <td className="py-3 px-4 text-foreground">ORD20260221001</td>
                            <td className="py-3 px-4 text-foreground">React 18新特性详解</td>
                            <td className="py-3 px-4 text-primary font-medium">¥128.00</td>
                            <td className="py-3 px-4 text-secondary">2026-02-21 10:30:00</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">已完成</span>
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-primary hover:underline">详情</button>
                            </td>
                          </tr>
                          <tr className="border-b border-border hover:bg-gray-50">
                            <td className="py-3 px-4 text-foreground">ORD20260220002</td>
                            <td className="py-3 px-4 text-foreground">TypeScript高级类型实践</td>
                            <td className="py-3 px-4 text-primary font-medium">¥99.00</td>
                            <td className="py-3 px-4 text-secondary">2026-02-20 14:20:00</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">已完成</span>
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-primary hover:underline">详情</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">订单详情</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-secondary">订单编号</p>
                          <p className="font-medium text-foreground">ORD20260221001</p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary">商品名称</p>
                          <p className="font-medium text-foreground">React 18新特性详解</p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary">金额</p>
                          <p className="font-medium text-foreground">¥128.00</p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary">购买时间</p>
                          <p className="font-medium text-foreground">2026-02-21 10:30:00</p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary">状态</p>
                          <p className="font-medium text-foreground">已完成</p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary">购买用户</p>
                          <p className="font-medium text-foreground">李四</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'bought' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">我买入的</h2>
                  <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium text-secondary">订单编号</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">商品名称</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">金额</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">购买时间</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">状态</th>
                            <th className="text-left py-3 px-4 font-medium text-secondary">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border hover:bg-gray-50">
                            <td className="py-3 px-4 text-foreground">ORD20260219003</td>
                            <td className="py-3 px-4 text-foreground">Tailwind CSS最佳实践</td>
                            <td className="py-3 px-4 text-primary font-medium">¥68.00</td>
                            <td className="py-3 px-4 text-secondary">2026-02-19 09:15:00</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">已完成</span>
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-primary hover:underline">详情</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
        </div>
      </div>
      </main>
      
      <Footer />
      
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">提现</h3>
            </div>
            <div className="p-6">
              {withdrawSuccess ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-4">✅</div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">提现成功！</h4>
                  <p className="text-secondary">您的提现申请已提交，我们将尽快处理。</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="withdrawAmount" className="block text-sm font-medium text-foreground mb-2">提现金额</label>
                    <input
                      type="number"
                      id="withdrawAmount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="请输入提现金额"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">提现渠道</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 p-3 border border-border rounded-md cursor-pointer">
                        <input type="radio" name="withdrawChannel" value="wechat" className="w-4 h-4 text-primary" checked />
                        <span className="text-foreground">微信</span>
                      </label>
                      <label className="flex items-center space-x-2 p-3 border border-border rounded-md cursor-pointer">
                        <input type="radio" name="withdrawChannel" value="alipay" className="w-4 h-4 text-primary" />
                        <span className="text-foreground">支付宝</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-4">
              {!withdrawSuccess ? (
                <>
                  <button onClick={() => setShowWithdrawModal(false)} className="btn-secondary">取消</button>
                  <button onClick={handleWithdraw} disabled={isWithdrawing} className="btn-primary">
                    {isWithdrawing ? '处理中...' : '确认提现'}
                  </button>
                </>
              ) : (
                <button onClick={() => setShowWithdrawModal(false)} className="btn-primary">关闭</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}