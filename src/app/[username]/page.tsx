'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import AIAssistantIcon from '@/components/AIAssistantIcon'

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = decodeURIComponent(params.username as string)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isTabSticky, setIsTabSticky] = useState(false)
  // 初始化状态，从URL参数获取
  const [activeTab, setActiveTab] = useState(() => {
    const tabFromParams = searchParams.get('tab')
    return tabFromParams || 'home'
  })
  const [activeBlogCategory, setActiveBlogCategory] = useState('all')
  const [aiAssistantTabActive, setAiAssistantTabActive] = useState(false)
  // 控制添加内容模态框的显示
  const [showAddContentModal, setShowAddContentModal] = useState(false)
  // 登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // 留言功能状态
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [messageContent, setMessageContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [isReplying, setIsReplying] = useState(false)
  
  // 联系方式弹窗状态
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactInfo, setContactInfo] = useState({ type: '', value: '' })
  const [showLevelModal, setShowLevelModal] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // 客户端初始化：从sessionStorage加载备份状态
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 加载aiAssistantTabActive
      const savedAiTab = sessionStorage.getItem(`aiAssistantTabActive_${username}`)
      if (savedAiTab) {
        setAiAssistantTabActive(savedAiTab === 'true')
      }
      
      // 检查登录状态
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
    }
  }, [username])

  // 监听登录状态变化
  useEffect(() => {
    const checkLoginStatus = () => {
      if (typeof window !== 'undefined') {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
        setIsLoggedIn(loggedIn)
      }
    }

    // 监听storage事件，当登录状态发生变化时更新
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', checkLoginStatus)
      
      return () => {
        window.removeEventListener('storage', checkLoginStatus)
      }
    }
  }, [])

  // 计算知龄（从加入日期到现在的时间差）
  const calculateZhiling = (joinDate: string) => {
    const join = new Date(joinDate)
    const now = new Date()
    
    let years = now.getFullYear() - join.getFullYear()
    let months = now.getMonth() - join.getMonth()
    let days = now.getDate() - join.getDate()
    
    // 调整天数为负数的情况
    if (days < 0) {
      months--
      // 获取上个月的天数
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      days += lastMonth.getDate()
    }
    
    // 调整月份为负数的情况
    if (months < 0) {
      years--
      months += 12
    }
    
    return { years, months, days }
  }
  
  // 根据等级获取等级图标
  const getLevelIcon = (level: number) => {
    switch(level) {
      case 10: return '👑' // 10级：皇冠
      case 9: return '💎' // 9级：钻石
      case 8: return '🌟' // 8级：星星
      case 7: return '⚡' // 7级：闪电
      case 6: return '🔥' // 6级：火焰
      case 5: return '💪' // 5级：肌肉
      case 4: return '📈' // 4级：上升趋势
      case 3: return '📊' // 3级：图表
      case 2: return '📝' // 2级：笔记
      case 1: return '🌱' // 1级：萌芽
      default: return '🌱'
    }
  }
  
  // 处理复制到剪贴板
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch(err => {
        console.error('复制失败:', err)
      })
  }
  
  // 打开联系弹窗
  const openContactModal = (type: string, value: string) => {
    setContactInfo({ type, value })
    setShowContactModal(true)
  }
  
  // 关闭联系弹窗
  const closeContactModal = () => {
    setShowContactModal(false)
    setContactInfo({ type: '', value: '' })
  }


  const tabRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [tabHeight, setTabHeight] = useState(0)

  // 获取header和tab实际高度
  useEffect(() => {
    const updateHeights = () => {
      const header = document.querySelector('header')
      if (header) {
        setHeaderHeight(header.offsetHeight)
      }
      if (tabRef.current) {
        setTabHeight(tabRef.current.offsetHeight)
      }
    }

    updateHeights()
    window.addEventListener('resize', updateHeights)
    return () => window.removeEventListener('resize', updateHeights)
  }, [])

  // 保存tab状态到sessionStorage和URL参数
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 保存到sessionStorage
      sessionStorage.setItem(`activeTab_${username}`, activeTab)
      
      // 更新URL参数，使用replaceState避免浏览器历史记录堆积
      const urlParams = new URLSearchParams(window.location.search)
      if (activeTab === 'home') {
        // 如果是home tab，移除tab参数
        urlParams.delete('tab')
      } else {
        // 否则设置tab参数
        urlParams.set('tab', activeTab)
      }
      
      // 构建新的URL
      const newUrl = `${window.location.pathname.split('?')[0]}${urlParams.toString() ? '?' + urlParams.toString() : ''}`
      
      // 使用replaceState更新URL，不创建新的历史记录
      window.history.replaceState({}, '', newUrl)
    }
  }, [activeTab, username])

  // 保存AI助理tab状态到sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`aiAssistantTabActive_${username}`, aiAssistantTabActive.toString())
    }
  }, [aiAssistantTabActive, username])

  // 处理留言提交
  const handleSubmitMessage = async () => {
    if (!messageContent.trim() || isSubmitting) return

    setIsSubmitting(true)
    // 模拟提交请求
    setTimeout(() => {
      setIsSubmitting(false)
      setMessageContent('')
      setShowMessageForm(false)
      alert('留言提交成功！')
      // 这里可以添加刷新留言列表的逻辑
    }, 1000)
  }

  // 处理回复提交
  const handleSubmitReply = async (messageId: number) => {
    if (!replyContent.trim() || isReplying) return

    setIsReplying(true)
    // 模拟提交请求
    setTimeout(() => {
      setIsReplying(false)
      setReplyContent('')
      setReplyTo(null)
      alert('回复提交成功！')
      // 这里可以添加刷新回复列表的逻辑
    }, 1000)
  }

  // 取消回复
  const handleCancelReply = () => {
    setReplyTo(null)
    setReplyContent('')
  }

  // 滚动监听逻辑
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      if (tabRef.current && profileRef.current && headerHeight > 0) {
        const tabRect = tabRef.current.getBoundingClientRect()
        const profileRect = profileRef.current.getBoundingClientRect()
        const scrollY = window.scrollY
        const scrollDirection = scrollY > lastScrollY ? 'down' : 'up'
        lastScrollY = scrollY
        
        // 向下滚动时的逻辑
        if (scrollDirection === 'down') {
          // 当tab顶部距离视口顶部小于等于header高度时，隐藏header
          if (tabRect.top <= headerHeight + 20 && scrollY > headerHeight) {
            setIsHeaderVisible(false)
          }
        }
        // 向上滚动时的逻辑
        else {
          // 当个人介绍组件的top滑进浏览器时，显示header
          if (profileRect.top >= 0) {
            setIsHeaderVisible(true)
          }
        }
        
        // 检查个人介绍组件是否可见
        const isProfileVisible = profileRect.bottom > 0 && profileRect.top < window.innerHeight
        
        // 当个人介绍组件不可见且tab滚动到视口顶部时，触发tab吸顶
        if (!isProfileVisible && tabRect.top <= 0 && !isHeaderVisible) {
          setIsTabSticky(true)
        } 
        // 当个人介绍组件可见时，取消tab吸顶
        else {
          setIsTabSticky(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headerHeight, isHeaderVisible, tabHeight])

  // 模拟用户数据
  const userData = {
    id: 1,
    username: username || 'zhangsan',
    nickname: '张三',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20Chinese%20person%20with%20glasses%2C%20clean%20background%2C%20high%20quality&image_size=square',
    bio: '知否创始人。建站技术爱好者，专注于Web开发和AI应用，博客时代的经历者，长内容践行者。',
    joinDate: '2026-01-01',
    gender: '女',
    province: '广东',
    city: '深圳',
    occupation: '前端开发工程师',
    company: '字节跳动',
    education: {
      school: '北京大学',
      major: '计算机科学与技术',
      degree: '硕士'
    },
    skills: '前端开发,React,TypeScript,Next.js,UI设计',
    coins: 10000, // 金币数量
    wallet: {
      balance: 8888.88, // 钱包余额
      totalIncome: 12345.67, // 总收入
      pendingWithdrawal: 1500.00, // 待提现金额
      withdrawalHistory: [
        { id: 1, amount: 2000.00, status: '已完成', date: '2026-02-20' },
        { id: 2, amount: 1500.00, status: '处理中', date: '2026-02-19' },
        { id: 3, amount: 3000.00, status: '已完成', date: '2026-02-10' },
      ],
      incomeHistory: [
        { id: 1, source: '博客付费阅读', amount: 128.00, date: '2026-02-21' },
        { id: 2, source: '教程购买', amount: 299.00, date: '2026-02-20' },
        { id: 3, source: '服务咨询', amount: 299.00, date: '2026-02-19' },
        { id: 4, source: '文件下载', amount: 99.00, date: '2026-02-18' },
      ],
    },
    level: {
      current: 5,
      experience: 650,
      required: 1000,
      icon: '⭐',
    },
    levelBadges: [
      { level: 1, name: '萌芽创作者', bgGradient: 'from-green-400 to-green-600', textColor: 'text-white', borderColor: 'border-green-500' },
      { level: 2, name: '初级创作者', bgGradient: 'from-blue-400 to-blue-600', textColor: 'text-white', borderColor: 'border-blue-500' },
      { level: 3, name: '进阶创作者', bgGradient: 'from-cyan-400 to-cyan-600', textColor: 'text-white', borderColor: 'border-cyan-500' },
      { level: 4, name: '成长创作者', bgGradient: 'from-teal-400 to-teal-600', textColor: 'text-white', borderColor: 'border-teal-500' },
      { level: 5, name: '成熟创作者', bgGradient: 'from-indigo-400 to-indigo-600', textColor: 'text-white', borderColor: 'border-indigo-500' },
      { level: 6, name: '优秀创作者', bgGradient: 'from-orange-400 to-orange-600', textColor: 'text-white', borderColor: 'border-orange-500' },
      { level: 7, name: '精英创作者', bgGradient: 'from-purple-400 to-purple-600', textColor: 'text-white', borderColor: 'border-purple-500' },
      { level: 8, name: '大师创作者', bgGradient: 'from-yellow-400 to-yellow-600', textColor: 'text-white', borderColor: 'border-yellow-500' },
      { level: 9, name: '传奇创作者', bgGradient: 'from-red-400 to-red-600', textColor: 'text-white', borderColor: 'border-red-500' },
      { level: 10, name: '创世创作者', bgGradient: 'from-amber-300 to-yellow-500', textColor: 'text-white', borderColor: 'border-amber-400' },
    ],
    vip: {
      level: 2,
      isVip: true,
      expireDate: '2027-01-01',
    },
    badges: [
      { id: 1, name: '技术专家', icon: '🏆', color: 'bg-yellow-500' },
      { id: 2, name: '内容创作者', icon: '✍️', color: 'bg-blue-500' },
      { id: 3, name: '社区活跃者', icon: '🔥', color: 'bg-red-500' },
    ],
    stats: {
      blogs: 23,
      tutorials: 5,
      files: 45,
      services: 3,
      followers: 128,
      views: 5678,
      words: 123456,
    },
    latestBlogs: [
      {
        id: 1,
        title: 'React 18新特性详解',
        date: '2026-02-19',
        views: 345,
        category: 'frontend',
      },
      {
        id: 2,
        title: 'TypeScript高级类型实践',
        date: '2026-02-18',
        views: 234,
        category: 'frontend',
      },
      {
        id: 3,
        title: 'Tailwind CSS最佳实践',
        date: '2026-02-17',
        views: 123,
        category: 'frontend',
      },
      {
        id: 4,
        title: 'Next.js 14 App Router深度解析',
        date: '2026-02-16',
        views: 456,
        category: 'frontend',
      },
      {
        id: 5,
        title: '前端性能优化实战指南',
        date: '2026-02-15',
        views: 567,
        category: 'frontend',
      },
      {
        id: 6,
        title: 'GraphQL在前端的应用',
        date: '2026-02-14',
        views: 678,
        category: 'frontend',
      },
      {
        id: 7,
        title: 'Vue 3 Composition API最佳实践',
        date: '2026-02-13',
        views: 789,
        category: 'frontend',
      },
      {
        id: 8,
        title: '前端工程化完整方案',
        date: '2026-02-12',
        views: 890,
        category: 'frontend',
      },
      {
        id: 9,
        title: 'PWA应用开发实践',
        date: '2026-02-11',
        views: 901,
        category: 'frontend',
      },
      {
        id: 10,
        title: '前端安全防护指南',
        date: '2026-02-10',
        views: 102,
        category: 'frontend',
      },
      {
        id: 11,
        title: 'React Native跨平台开发',
        date: '2026-02-09',
        views: 234,
        category: 'frontend',
      },
      {
        id: 12,
        title: 'CSS Grid布局完全指南',
        date: '2026-02-08',
        views: 345,
        category: 'frontend',
      },
      {
        id: 13,
        title: 'Node.js后端开发实战',
        date: '2026-02-07',
        views: 456,
        category: 'backend',
      },
      {
        id: 14,
        title: 'Express框架深度解析',
        date: '2026-02-06',
        views: 567,
        category: 'backend',
      },
      {
        id: 15,
        title: 'MongoDB数据库最佳实践',
        date: '2026-02-05',
        views: 678,
        category: 'backend',
      },
      {
        id: 16,
        title: 'Redis缓存策略',
        date: '2026-02-04',
        views: 789,
        category: 'backend',
      },
      {
        id: 17,
        title: 'RESTful API设计规范',
        date: '2026-02-03',
        views: 890,
        category: 'backend',
      },
      {
        id: 18,
        title: 'ChatGPT应用开发',
        date: '2026-02-02',
        views: 901,
        category: 'ai',
      },
      {
        id: 19,
        title: '机器学习入门教程',
        date: '2026-02-01',
        views: 102,
        category: 'ai',
      },
      {
        id: 20,
        title: 'AI辅助编程实践',
        date: '2026-01-31',
        views: 234,
        category: 'ai',
      },
      {
        id: 21,
        title: 'VS Code插件开发',
        date: '2026-01-30',
        views: 345,
        category: 'tools',
      },
      {
        id: 22,
        title: 'Git高级命令教程',
        date: '2026-01-29',
        views: 456,
        category: 'tools',
      },
      {
        id: 23,
        title: 'Docker容器化实践',
        date: '2026-01-28',
        views: 567,
        category: 'tools',
      },
    ],
    latestTutorials: [
      {
        id: 1,
        title: 'React从入门到精通',
        lessons: 24,
        students: 567,
      },
      {
        id: 2,
        title: 'TypeScript全栈开发',
        lessons: 30,
        students: 432,
      },
    ],
    latestServices: [
      {
        id: 1,
        title: '前端技术咨询',
        price: '¥299/次',
      },
      {
        id: 2,
        title: '代码审查服务',
        price: '¥499/次',
      },
    ],
    blogCategories: [
      { id: 'all', name: '最新', count: 23 },
      { id: 'frontend', name: '前端开发', count: 12 },
      { id: 'backend', name: '后端开发', count: 5 },
      { id: 'ai', name: '人工智能', count: 3 },
      { id: 'tools', name: '开发工具', count: 3 },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 使用视觉隐藏而非完全移除header，保留占位高度 */}
      <div className={`transition-opacity duration-300 ${isHeaderVisible ? 'opacity-100 z-50' : 'opacity-0 z-[-1] pointer-events-none'}`}>
        <Header />
      </div>
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 个人信息卡片 */}
          <div ref={profileRef} className="bg-white rounded-lg shadow-md p-6 border border-border mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* 左侧：头像和昵称 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                  <img 
                    src={userData.avatar} 
                    alt={userData.nickname} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 昵称 */}
                <h1 className="text-xl font-bold text-foreground mt-2 text-center">{userData.nickname}</h1>
                <span className="text-sm text-secondary text-center">@{userData.username}</span>
                
                {/* 基本信息 */}
                <div className="mt-2 space-y-1 text-sm text-center">
                  {/* 性别图标 */}
                  {userData.gender === '男' && <span className="text-blue-600">♂</span>}
                  {userData.gender === '女' && <span className="text-red-600">♀</span>}
                  {userData.gender === '其他' && <span className="text-gray-600">⚧</span>}
                </div>
              </div>
              
              {/* 右侧：主要信息和操作 */}
              <div className="flex-1 relative">
                {/* 顶部：社交媒体图标 - 使用绝对定位不占用文档流 */}
                <div className="absolute top-0 right-0 flex space-x-2">
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" title="GitHub">
                    <span className="text-gray-700">�</span>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" title="知乎">
                    <span className="text-gray-700">📖</span>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" title="微博">
                    <span className="text-gray-700">�</span>
                  </a>
                  <a 
                    href="#" 
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer" 
                    title="微信"
                    onClick={(e) => {
                      e.preventDefault()
                      openContactModal('微信', 'wechat123')
                    }}
                  >
                    <span className="text-gray-700">�</span>
                  </a>
                  <a 
                    href="#" 
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer" 
                    title="联系电话"
                    onClick={(e) => {
                      e.preventDefault()
                      openContactModal('联系电话', '13800138000')
                    }}
                  >
                    <span className="text-gray-700">📞</span>
                  </a>
                  <a 
                    href="#" 
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer" 
                    title="邮箱"
                    onClick={(e) => {
                      e.preventDefault()
                      openContactModal('邮箱', 'example@zhifou.com')
                    }}
                  >
                    <span className="text-gray-700">📧</span>
                  </a>
                </div>
                
                {/* 中间：主要信息和大按钮 */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-1">
                    {/* 公司和学校信息 */}
                    <div className="space-y-1 text-sm mb-1">
                      {(userData.occupation || userData.company) && (
                        <div className="flex items-center gap-2 text-secondary">
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs">🏢</span>
                          {userData.company && userData.occupation ? `${userData.company}  ${userData.occupation}` : userData.company || userData.occupation}
                        </div>
                      )}
                      {userData.education && (userData.education.school || userData.education.major || userData.education.degree) && (
                        <div className="flex items-center gap-2 text-secondary">
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">🎓</span>
                          {[userData.education.school, userData.education.degree, userData.education.major].filter(Boolean).join('  ')}
                        </div>
                      )}
                    </div>
                    
                    {/* 等级信息 */}
                    <div className="flex items-center gap-2 mb-1 text-sm">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-xs">🏆</span>
                      <span className="text-secondary">创作等级：</span>
                      {(() => {
                        const currentLevel = userData.level.current
                        const badge = userData.levelBadges?.find(b => b.level === currentLevel)
                        if (!badge) return null
                        return (
                          <span className="cursor-pointer inline-block" onClick={() => setShowLevelModal(true)} style={{ zoom: 0.7 }}>
                            <div className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded-md bg-gradient-to-r ${badge.bgGradient} shadow-sm border ${badge.borderColor}`}>
                              <span className={`text-xs font-bold ${badge.textColor}`}>{badge.level}</span>
                              <span className={`text-[10px] font-medium ${badge.textColor}`}>{badge.name}</span>
                            </div>
                          </span>
                        )
                      })()}
                      <span className="w-px h-3 bg-gray-300"></span>
                      <span className="text-secondary">经验值：</span>
                      <span className="text-secondary cursor-pointer hover:text-primary" onClick={() => setShowLevelModal(true)}>500</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2 cursor-pointer hover:bg-gray-300" onClick={() => setShowLevelModal(true)}>
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(userData.level.experience / userData.level.required) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    {/* 知龄、粉丝、访客信息 */}
                    <div className="flex items-center gap-4 mb-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-xs">📅</span>
                        <span className="text-secondary">知龄:</span>
                        <span className="text-secondary">
                          {(() => {
                            const zhiling = calculateZhiling(userData.joinDate)
                            return `${zhiling.years}年${zhiling.months}月`
                          })()}
                        </span>
                      </div>
                      <Link href={`/${username}/followers`} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xs">👥</span>
                        <span>粉丝:</span>
                        <span>{userData.stats.followers}</span>
                      </Link>
                      <Link href={`/${username}/visitors`} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-xs">👣</span>
                        <span>访客:</span>
                        <span>{userData.stats.views}</span>
                      </Link>
                    </div>
                    
                    {/* 自我介绍 */}
                    {userData.bio && (
                      <p className="text-foreground mt-3 mb-3 line-clamp-2">{userData.bio}</p>
                    )}
                    
                    {/* 技能标签 */}
                    {userData.skills && (
                      <div className="flex flex-wrap gap-2">
                        {userData.skills.split(',').map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* 大按钮 */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* 根据登录状态显示不同按钮 */}
                    {isLoggedIn && (
                      <>
                        <button 
                          onClick={() => router.push(`/${userData.username}/edit-profile`)}
                          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-primary font-medium rounded-lg transition-colors border border-primary shadow hover:shadow-md"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          编辑资料
                        </button>
                        <button 
                          onClick={() => setShowAddContentModal(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors shadow hover:shadow-md"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          创作
                        </button>
                      </>
                    )}
                    {!isLoggedIn && (
                      <>
                        <button className="btn-primary">
                          关注
                        </button>
                        <button 
                          onClick={() => router.push(`/${userData.username}/ai-assistant`)}
                          className="btn-secondary"
                        >
                          私信
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 占位元素，用于解决tab吸顶时的滚动条跳跃问题 */}
          {isTabSticky && (
            <div style={{ 
              height: tabHeight, 
              marginBottom: '2rem' 
            }}></div>
          )}
          
          {/* 导航标签 */}
          <div 
            ref={tabRef}
            className={`bg-white rounded-lg shadow-md border border-border mb-8 transition-all duration-300 ${isTabSticky ? 'fixed top-0 left-0 right-0 z-50 w-full shadow-md' : ''}`}
          >
            <div className={`container mx-auto ${isTabSticky ? 'px-8' : 'px-4'}`}>
              {/* 主导航 */}
              <div className="flex border-b border-border">
                <div 
                  onClick={() => {
                    setActiveTab('home');
                    setAiAssistantTabActive(false);
                  }} 
                  className={`px-6 py-4 font-medium cursor-pointer transition-colors ${activeTab === 'home' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'}`}
                >
                  主页
                </div>
                <div 
                  onClick={() => {
                    setActiveTab('blogs');
                    setAiAssistantTabActive(false);
                  }} 
                  className={`px-6 py-4 font-medium cursor-pointer transition-colors ${activeTab === 'blogs' ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                >
                  博客
                </div>
                <div 
                  onClick={() => {
                    setActiveTab('tutorials');
                    setAiAssistantTabActive(false);
                  }} 
                  className={`px-6 py-4 font-medium cursor-pointer transition-colors ${activeTab === 'tutorials' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'}`}
                >
                  教程
                </div>
                <div 
                  onClick={() => {
                    setActiveTab('files');
                    setAiAssistantTabActive(false);
                  }} 
                  className={`px-6 py-4 font-medium cursor-pointer transition-colors ${activeTab === 'files' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'}`}
                >
                  文件
                </div>
                <div 
                  onClick={() => {
                    setActiveTab('services');
                    setAiAssistantTabActive(false);
                  }} 
                  className={`px-6 py-4 font-medium cursor-pointer transition-colors ${activeTab === 'services' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'}`}
                >
                  服务
                </div>
                <div 
                  onClick={() => {
                    setActiveTab('messages');
                    setAiAssistantTabActive(false);
                  }} 
                  className={`px-6 py-4 font-medium cursor-pointer transition-colors ${activeTab === 'messages' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'}`}
                >
                  留言板
                </div>

                <button 
                  onClick={() => {setAiAssistantTabActive(true);setActiveTab('');}}
                  className={`px-6 py-4 font-medium transition-colors ${aiAssistantTabActive ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'}`}
                >
                  AI助理
                </button>
              </div>
              
              {/* 博客分类子导航 - 仅在博客tab激活时显示 */}
              {activeTab === 'blogs' && (
                <div className="border-b border-border py-2">
                  <div className="flex flex-wrap gap-2">
                    {userData.blogCategories.map((category) => (
                      <div 
                        key={category.id}
                        onClick={() => setActiveBlogCategory(category.id)}
                        className={`px-4 py-1.5 font-medium text-sm cursor-pointer transition-colors rounded-md ${activeBlogCategory === category.id ? 'text-primary bg-primary/10 border border-primary/20' : 'text-secondary hover:text-primary hover:bg-gray-100'}`}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* 内容区域 - 根据选中的tab显示不同内容 */}
          {aiAssistantTabActive && (
            <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
              <div className="flex flex-col items-center justify-center py-12">
                <AIAssistantIcon 
                  onClick={() => router.push(`/${userData.username}/ai-assistant`)} 
                />
                <p className="mt-8 text-center text-secondary">
                  点击上方图标进入AI助理对话界面
                </p>
              </div>
            </div>
          )}
          
          {!aiAssistantTabActive && activeTab === 'home' && (
            <>
              {/* 精品博文 */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-foreground">精品博文</h2>
                  <Link href={`/${userData.username}/blogs`} className="text-primary hover:underline">
                    查看全部
                  </Link>
                </div>
                
                <div className="space-y-4">
                {userData.latestBlogs
                  .filter(blog => activeBlogCategory === 'all' || blog.category === activeBlogCategory)
                  .slice(0, 6)
                  .map((blog) => (
                    <div key={blog.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <Link href={`/${userData.username}/blog/${blog.id}`} className="block">
                        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2">
                          {blog.title}
                        </h3>
                        <div className="flex justify-between items-center text-sm text-secondary">
                          <span>{blog.date}</span>
                          <span>{blog.views} 浏览</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 精品教程 */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-foreground">精品教程</h2>
                  <Link href={`/${userData.username}/tutorials`} className="text-primary hover:underline">
                    查看全部
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {userData.latestTutorials.map((tutorial) => (
                    <div key={tutorial.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <Link href={`/${userData.username}/tutorial/${tutorial.id}`} className="block">
                        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2">
                          {tutorial.title}
                        </h3>
                        <div className="flex justify-between items-center text-sm text-secondary">
                          <span>{tutorial.lessons} 课时</span>
                          <span>👥 {tutorial.students} 学习</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 文件资源包 */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-foreground">文件资源包</h2>
                  <Link href={`/${userData.username}/files`} className="text-primary hover:underline">
                    查看全部
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* 模拟文件夹数据 - 与 files/page.tsx 保持一致 */}
                  {[
                    { id: 1, name: '技术文档', files: 23, size: '128MB', updatedAt: '2026-02-19', icon: '📁' },
                    { id: 2, name: '设计资源', files: 45, size: '256MB', updatedAt: '2026-02-18', icon: '🎨' },
                    { id: 3, name: '项目代码', files: 12, size: '512MB', updatedAt: '2026-02-17', icon: '💻' },
                    { id: 4, name: '学习资料', files: 34, size: '1GB', updatedAt: '2026-02-16', icon: '📚' },
                  ].map((folder) => (
                    <Link 
                    key={folder.id} 
                    href={`/${userData.username}/files/${folder.id}`}
                    className="block border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/50 transition-all"
                  >
                      <div className="text-4xl mb-4">{folder.icon}</div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{folder.name}</h3>
                      <div className="space-y-1 text-sm text-secondary">
                        <p>{folder.files} 个文件</p>
                        <p>{folder.size}</p>
                        <p>更新于 {folder.updatedAt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* 价值服务 */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-foreground">价值服务</h2>
                  <Link href={`/${userData.username}/services`} className="text-primary hover:underline">
                    查看全部
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userData.latestServices.map((service) => (
                    <Link 
                      key={service.id} 
                      href={`/${userData.username}/service/${service.id}`}
                      className="block border border-border rounded-lg p-6 hover:border-primary transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-4">{service.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-bold text-xl">{service.price}</span>
                        <button className="btn-primary">立即购买</button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              

            </>
          )}
          
          {!aiAssistantTabActive && activeTab === 'blogs' && (
            <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8 relative">
              <div className="absolute top-4 right-4">
                <Link href={`/${userData.username}/blogs`} className="text-primary hover:opacity-80 transition-opacity" title="前往博客专栏">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
              <div className="space-y-4 mt-5">
                {userData.latestBlogs
                  .filter(blog => activeBlogCategory === 'all' || blog.category === activeBlogCategory)
                  .map((blog) => (
                  <div key={blog.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <Link href={`/${userData.username}/blog/${blog.id}`} className="block">
                      <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2">
                        {blog.title}
                      </h3>
                      <div className="flex justify-between items-center text-sm text-secondary">
                        <span>{blog.date}</span>
                        <span>{blog.views} 浏览</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!aiAssistantTabActive && activeTab === 'tutorials' && (
            <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8 relative">
              <div className="absolute top-4 right-4">
                <Link href={`/${userData.username}/tutorials`} className="text-primary hover:opacity-80 transition-opacity" title="前往教程专栏">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
              <div className="space-y-4 mt-5">
                {userData.latestTutorials.map((tutorial) => (
                  <div key={tutorial.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <Link href={`/${userData.username}/tutorial/${tutorial.id}`} className="block">
                      <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2">
                        {tutorial.title}
                      </h3>
                      <div className="flex justify-between items-center text-sm text-secondary">
                        <span>{tutorial.lessons} 课时</span>
                        <span>👥 {tutorial.students} 学习</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!aiAssistantTabActive && activeTab === 'files' && (
            <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8 relative">
              <div className="absolute top-4 right-4">
                <Link href={`/${userData.username}/files`} className="text-primary hover:opacity-80 transition-opacity" title="前往文件专栏">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
                {/* 模拟文件夹数据 - 与 files/page.tsx 保持一致 */}
                {[
                  { id: 1, name: '技术文档', files: 23, size: '128MB', updatedAt: '2026-02-19', icon: '📁' },
                  { id: 2, name: '设计资源', files: 45, size: '256MB', updatedAt: '2026-02-18', icon: '🎨' },
                  { id: 3, name: '项目代码', files: 12, size: '512MB', updatedAt: '2026-02-17', icon: '💻' },
                  { id: 4, name: '学习资料', files: 34, size: '1GB', updatedAt: '2026-02-16', icon: '📚' },
                ].map((folder) => (
                  <Link 
                    key={folder.id} 
                    href={`/${userData.username}/files/${folder.id}`}
                    className="block border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/50 transition-all"
                  >
                    <div className="text-4xl mb-4">{folder.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{folder.name}</h3>
                    <div className="space-y-1 text-sm text-secondary">
                      <p>{folder.files} 个文件</p>
                      <p>{folder.size}</p>
                      <p>更新于 {folder.updatedAt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {!aiAssistantTabActive && activeTab === 'services' && (
            <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8 relative">
              <div className="absolute top-4 right-4">
                <Link href={`/${userData.username}/services`} className="text-primary hover:opacity-80 transition-opacity" title="前往服务专栏">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                {userData.latestServices.map((service) => (
                  <Link 
                    key={service.id} 
                    href={`/${userData.username}/service/${service.id}`}
                    className="block border border-border rounded-lg p-6 hover:border-primary transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-4">{service.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-bold text-xl">{service.price}</span>
                      <button className="btn-primary">立即购买</button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {!aiAssistantTabActive && activeTab === 'messages' && (
            <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">留言板</h2>
                <button 
                  className="btn-primary"
                  onClick={() => setShowMessageForm(true)}
                >
                  我要留言
                </button>
              </div>
              
              {/* 留言表单 */}
              {showMessageForm && (
                <div className="bg-gray-50 rounded-lg p-6 border border-border mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">发表留言</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitMessage()
                  }} className="space-y-4">
                    <textarea
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="请输入你的留言..."
                      rows={4}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowMessageForm(false)
                          setMessageContent('')
                        }}
                        disabled={isSubmitting}
                        className="btn-secondary disabled:opacity-50"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        disabled={!messageContent.trim() || isSubmitting}
                        className="btn-primary disabled:opacity-50"
                      >
                        {isSubmitting ? '提交中...' : '提交留言'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="space-y-6">
                {/* 模拟留言数据 */}
                {[
                  {
                    id: 1,
                    name: '访客1',
                    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly%20face&image_size=square',
                    content: '博主的文章写得非常好，很有深度，受益匪浅！',
                    date: '2026-02-20',
                    replies: [
                      {
                        id: 1,
                        name: username,
                        avatar: userData.avatar,
                        content: '感谢您的支持和认可，我会继续努力创作更多优质内容！',
                        date: '2026-02-20'
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: '访客2',
                    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly%20face%20female&image_size=square',
                    content: '请问博主对前端框架的选择有什么建议吗？',
                    date: '2026-02-19',
                    replies: [
                      {
                        id: 1,
                        name: username,
                        avatar: userData.avatar,
                        content: '前端框架的选择主要取决于项目需求和团队技术栈。React生态丰富，Vue易于上手，Angular适合大型项目。',
                        date: '2026-02-19'
                      }
                    ]
                  },
                  {
                    id: 3,
                    name: '访客3',
                    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly%20face%20male&image_size=square',
                    content: '期待博主分享更多关于AI方面的内容！',
                    date: '2026-02-18',
                    replies: []
                  }
                ].map((message) => (
                  <div key={message.id} className="border-b border-border pb-6">
                    <div className="flex gap-4">
                      <img src={message.avatar} alt={message.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-foreground">{message.name}</h3>
                          <span className="text-sm text-secondary">{message.date}</span>
                        </div>
                        <p className="text-foreground mb-4">{message.content}</p>
                        
                        {/* 回复列表 */}
                        {message.replies.length > 0 && (
                          <div className="ml-6 mt-4 space-y-4">
                            {message.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-3">
                                <img src={reply.avatar} alt={reply.name} className="w-8 h-8 rounded-full object-cover" />
                                <div className="flex-1">
                                  <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-medium text-foreground">{reply.name}</h4>
                                    <span className="text-xs text-secondary">{reply.date}</span>
                                  </div>
                                  <p className="text-foreground">{reply.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <button 
                          className="text-primary hover:underline text-sm mt-2"
                          onClick={() => {
                            setReplyTo(message.id)
                            setReplyContent('')
                          }}
                        >
                          回复
                        </button>
                        
                        {/* 回复表单 */}
                        {replyTo === message.id && (
                          <div className="mt-3 bg-gray-50 p-4 rounded-md border border-border">
                            <h4 className="text-sm font-medium text-foreground mb-2">回复 {message.name}</h4>
                            <form onSubmit={(e) => {
                              e.preventDefault()
                              handleSubmitReply(message.id)
                            }} className="space-y-3">
                              <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="请输入你的回复..."
                                rows={3}
                                disabled={isReplying}
                                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                              />
                              <div className="flex justify-end space-x-2">
                                <button
                                  type="button"
                                  onClick={handleCancelReply}
                                  disabled={isReplying}
                                  className="btn-secondary text-xs py-1 px-3"
                                >
                                  取消
                                </button>
                                <button
                                  type="submit"
                                  disabled={!replyContent.trim() || isReplying}
                                  className="btn-primary text-xs py-1 px-3"
                                >
                                  {isReplying ? '回复中...' : '回复'}
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 主页留言和回复模块 */}
          {!aiAssistantTabActive && activeTab === 'home' && (
            <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">留言和回复</h2>
                <button 
                  className="btn-primary"
                  onClick={() => setShowMessageForm(true)}
                >
                  我要留言
                </button>
              </div>
              
              {/* 留言表单 */}
              {showMessageForm && (
                <div className="bg-gray-50 rounded-lg p-6 border border-border mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">发表留言</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitMessage()
                  }} className="space-y-4">
                    <textarea
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="请输入你的留言..."
                      rows={4}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowMessageForm(false)
                          setMessageContent('')
                        }}
                        disabled={isSubmitting}
                        className="btn-secondary disabled:opacity-50"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        disabled={!messageContent.trim() || isSubmitting}
                        className="btn-primary disabled:opacity-50"
                      >
                        {isSubmitting ? '提交中...' : '提交留言'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="space-y-6">
                {/* 模拟留言数据 */}
                {[
                  {
                    id: 1,
                    name: '访客1',
                    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly%20face&image_size=square',
                    content: '博主的文章写得非常好，很有深度，受益匪浅！',
                    date: '2026-02-20',
                    replies: [
                      {
                        id: 1,
                        name: username,
                        avatar: userData.avatar,
                        content: '感谢您的支持和认可，我会继续努力创作更多优质内容！',
                        date: '2026-02-20'
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: '访客2',
                    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly%20face%20female&image_size=square',
                    content: '请问博主对前端框架的选择有什么建议吗？',
                    date: '2026-02-19',
                    replies: [
                      {
                        id: 1,
                        name: username,
                        avatar: userData.avatar,
                        content: '前端框架的选择主要取决于项目需求和团队技术栈。React生态丰富，Vue易于上手，Angular适合大型项目。',
                        date: '2026-02-19'
                      }
                    ]
                  }
                ].map((message) => (
                  <div key={message.id} className="border-b border-border pb-6">
                    <div className="flex gap-4">
                      <img src={message.avatar} alt={message.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-foreground">{message.name}</h3>
                          <span className="text-sm text-secondary">{message.date}</span>
                        </div>
                        <p className="text-foreground mb-4">{message.content}</p>
                        
                        {/* 回复列表 */}
                        {message.replies.length > 0 && (
                          <div className="ml-6 mt-4 space-y-4">
                            {message.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-3">
                                <img src={reply.avatar} alt={reply.name} className="w-8 h-8 rounded-full object-cover" />
                                <div className="flex-1">
                                  <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-medium text-foreground">{reply.name}</h4>
                                    <span className="text-xs text-secondary">{reply.date}</span>
                                  </div>
                                  <p className="text-foreground">{reply.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <button 
                          className="text-primary hover:underline text-sm mt-2"
                          onClick={() => {
                            setReplyTo(message.id)
                            setReplyContent('')
                          }}
                        >
                          回复
                        </button>
                        
                        {/* 回复表单 */}
                        {replyTo === message.id && (
                          <div className="mt-3 bg-gray-50 p-4 rounded-md border border-border">
                            <h4 className="text-sm font-medium text-foreground mb-2">回复 {message.name}</h4>
                            <form onSubmit={(e) => {
                              e.preventDefault()
                              handleSubmitReply(message.id)
                            }} className="space-y-3">
                              <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="请输入你的回复..."
                                rows={3}
                                disabled={isReplying}
                                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                              />
                              <div className="flex justify-end space-x-2">
                                <button
                                  type="button"
                                  onClick={handleCancelReply}
                                  disabled={isReplying}
                                  className="btn-secondary text-xs py-1 px-3"
                                >
                                  取消
                                </button>
                                <button
                                  type="submit"
                                  disabled={!replyContent.trim() || isReplying}
                                  className="btn-primary text-xs py-1 px-3"
                                >
                                  {isReplying ? '回复中...' : '回复'}
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* 添加内容模态框 */}
      {showAddContentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl border border-border w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">选择内容类型</h2>
              <button 
                onClick={() => setShowAddContentModal(false)}
                className="text-secondary hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <button 
                onClick={() => {
                  setShowAddContentModal(false);
                  // 跳转到创建博客的页面
                  router.push(`/${userData.username}/blogs/create`);
                }}
                className="w-full flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">创建博客</h3>
                  <p className="text-sm text-secondary">撰写新的博客文章</p>
                </div>
              </button>
              <button 
                onClick={() => {
                  setShowAddContentModal(false);
                  // 跳转到创建教程的页面
                  router.push(`/${userData.username}/tutorials/create`);
                }}
                className="w-full flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">创建教程</h3>
                  <p className="text-sm text-secondary">创建新的教程系列</p>
                </div>
              </button>
              <button 
                onClick={() => {
                  setShowAddContentModal(false);
                  // 跳转到上传文件的页面
                  router.push(`/${userData.username}/files/upload`);
                }}
                className="w-full flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">上传文件</h3>
                  <p className="text-sm text-secondary">上传新的文件资源</p>
                </div>
              </button>
              <button 
                onClick={() => {
                  setShowAddContentModal(false);
                  // 跳转到创建服务的页面
                  router.push(`/${userData.username}/services/create`);
                }}
                className="w-full flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">创建服务</h3>
                  <p className="text-sm text-secondary">添加新的价值服务</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 联系信息弹窗 */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">{contactInfo.type}</h3>
              <button 
                onClick={closeContactModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <p className="text-foreground font-medium">{contactInfo.value}</p>
            </div>
            <button 
              onClick={() => handleCopyToClipboard(contactInfo.value)}
              className="w-full py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copySuccess ? '已复制' : '复制到剪贴板'}
            </button>
          </div>
        </div>
      )}
      
      {/* 等级体系弹窗 */}
      {showLevelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh]">
            {/* 弹窗头部 */}
            <div className="p-6 border-b border-border flex justify-between items-center bg-white">
              <h2 className="text-xl font-bold text-foreground">创作等级体系</h2>
              <button 
                onClick={() => setShowLevelModal(false)} 
                className="text-secondary hover:text-foreground text-xl"
              >
                ×
              </button>
            </div>
            
            {/* 弹窗内容 */}
            <div className="p-6 space-y-6 max-h-[calc(80vh-120px)] overflow-y-auto">
              {/* 等级体系说明 */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">等级规则说明</h3>
                <p className="text-secondary mb-4">
                  创作等级是对用户在知否平台创作贡献的综合评价体系，共分为10个等级。用户通过创作内容和参与平台活动获得经验值，经验值达到一定数量后即可升级。每升一级，经验值会清零并开始积累下一级所需的经验值。
                </p>
                
                <h4 className="font-medium text-foreground mb-2">经验值获取方式</h4>
                <ul className="list-disc list-inside text-secondary space-y-2 mb-4">
                  <li>博客：每篇博客根据字数和质量获得10-50点经验值</li>
                  <li>教程：每篇教程根据内容深度和完整性获得50-200点经验值</li>
                  <li>文件：每上传一个文件获得5-20点经验值</li>
                  <li>服务：每发布一个服务获得20-100点经验值，服务成交后额外获得100-500点经验值</li>
                  <li>AI回答：每使用AI助手生成一个回答获得2-5点经验值</li>
                  <li>留言板回复：每条回复获得1-3点经验值</li>
                </ul>
              </div>
              
              {/* 等级表格 */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">等级经验值对照表</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-foreground">等级</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-foreground">等级名称</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-foreground">所需经验值</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-foreground">等级铭牌</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.levelBadges?.map((badge, index) => (
                        <tr key={badge.level} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-secondary">{badge.level}</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-secondary">{badge.name}</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-secondary">
                            {badge.level === 1 ? '0-500' : 
                             badge.level === 2 ? '500-1200' :
                             badge.level === 3 ? '1200-2500' :
                             badge.level === 4 ? '2500-4500' :
                             badge.level === 5 ? '4500-7500' :
                             badge.level === 6 ? '7500-12000' :
                             badge.level === 7 ? '12000-18000' :
                             badge.level === 8 ? '18000-28000' :
                             badge.level === 9 ? '28000-45000' :
                             '45000+'}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r ${badge.bgGradient} shadow-md border ${badge.borderColor}`}>
                              <span className={`text-sm font-bold ${badge.textColor}`}>{badge.level}</span>
                              <span className={`text-xs font-medium ${badge.textColor}`}>{badge.name}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* 经验值计算说明 */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">经验值计算规则</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">内容类型权重</h4>
                  <ul className="list-disc list-inside text-secondary space-y-1">
                    <li>服务成交：权重 10x</li>
                    <li>教程：权重 5x</li>
                    <li>博客：权重 2x</li>
                    <li>文件：权重 1x</li>
                    <li>AI回答：权重 0.5x</li>
                    <li>留言板回复：权重 0.2x</li>
                  </ul>
                  <p className="mt-4 text-sm text-secondary">
                    注：实际经验值会根据内容质量、互动量等因素进行动态调整，以上为基础计算规则。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
