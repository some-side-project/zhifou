'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function EditProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [username, setUsername] = useState(params.username as string)
  
  const [profileForm, setProfileForm] = useState({
    nickname: '张三',
    bio: '知否创始人。建站技术爱好者，专注于Web开发和AI应用，博客时代的经历者，长内容践行者。',
    email: 'zhangsan@example.com',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20Chinese%20person%20with%20glasses%2C%20clean%20background%2C%20high%20quality&image_size=square',
    realName: '',
    province: '',
    city: '',
    occupation: '',
    company: '',
    education: {
      school: '',
      major: '',
      degree: ''
    },
    phone: '',
    wechat: '',
    weibo: '',
    zhihu: '',
    douyin: '',
    github: '',
    skills: '',
    gender: '',
    visibility: {
      nickname: true,
      bio: true,
      avatar: true,
      occupation: true,
      company: true,
      education: true,
      skills: true,
      gender: true,
      username: true,
      major: true,
      degree: true,
      email: true,
      phone: true,
      wechat: true,
      weibo: true,
      zhihu: true,
      douyin: true,
      github: true
    }
  })
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type, checked } = target
    const inputValue = type === 'checkbox' ? checked : value
    
    // Handle visibility fields
    if (name.startsWith('visibility.')) {
      const [, field] = name.split('.')
      setProfileForm(prev => ({
        ...prev,
        visibility: {
          ...prev.visibility,
          [field]: inputValue
        }
      }))
    } 
    // Handle nested fields like education.school
    else if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setProfileForm(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: inputValue
        }
      }))
    } else {
      setProfileForm(prev => ({ ...prev, [name]: inputValue }))
    }
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    // 模拟保存请求
    setTimeout(() => {
      setIsSaving(false)
      setSuccessMessage('个人信息保存成功！')
      setTimeout(() => {
        setSuccessMessage('')
        router.push(`/${username}`)
      }, 1500)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">编辑资料</h1>
              </div>
              
              <Link href={`/${username}`} className="btn-secondary mt-4 md:mt-0">
                返回主页
              </Link>
            </div>
          </div>
          
          {/* 编辑表单 */}
          <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
            <div className="p-8">
              {successMessage && (
                <div className="bg-green-100 text-green-600 p-3 rounded-md mb-6">
                  {successMessage}
                </div>
              )}
              
              <div className="space-y-6">
                {/* 头像设置 */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    头像
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border">
                      <img 
                        src={profileForm.avatar} 
                        alt={profileForm.nickname} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="btn-secondary">
                      更换头像
                    </button>
                  </div>
                </div>
                
                {/* 昵称 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="nickname" className="block text-sm font-medium text-foreground">
                      昵称
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="visibility.nickname"
                        checked={profileForm.visibility.nickname}
                        onChange={handleProfileChange}
                        className="sr-only"
                      />
                      <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.nickname ? 'bg-primary' : 'bg-gray-200'}`}>
                        <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.nickname ? 'translate-x-5' : ''}`}></div>
                      </div>
                      <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={profileForm.nickname}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                {/* 用户名 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-foreground">
                      用户名（又叫博客id，是你博客url中的后缀标识。即url中蓝色部分：https://zhifouzhifou.cn/u/<span className="text-primary font-semibold">{username}</span>）
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="visibility.username"
                        checked={profileForm.visibility.username}
                        onChange={handleProfileChange}
                        className="sr-only"
                      />
                      <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.username ? 'bg-primary' : 'bg-gray-200'}`}>
                        <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.username ? 'translate-x-5' : ''}`}></div>
                      </div>
                      <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* 真实姓名 */}
                <div>
                  <label htmlFor="realName" className="block text-sm font-medium text-foreground mb-2">
                    真实姓名
                  </label>
                  <input
                    type="text"
                    id="realName"
                    name="realName"
                    value={profileForm.realName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                {/* 性别 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="gender" className="block text-sm font-medium text-foreground">
                      性别
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="visibility.gender"
                        checked={profileForm.visibility.gender}
                        onChange={handleProfileChange}
                        className="sr-only"
                      />
                      <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.gender ? 'bg-primary' : 'bg-gray-200'}`}>
                        <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.gender ? 'translate-x-5' : ''}`}></div>
                      </div>
                      <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                    </label>
                  </div>
                  <select
                    id="gender"
                    name="gender"
                    value={profileForm.gender || ''}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">请选择</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
                
                {/* 省份和城市 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-foreground mb-2">
                      省份
                    </label>
                    <input
                      type="text"
                      id="province"
                      name="province"
                      value={profileForm.province}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                      城市
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={profileForm.city}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* 个人简介 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="bio" className="block text-sm font-medium text-foreground">
                      个人简介
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="visibility.bio"
                        checked={profileForm.visibility.bio}
                        onChange={handleProfileChange}
                        className="sr-only"
                      />
                      <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.bio ? 'bg-primary' : 'bg-gray-200'}`}>
                        <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.bio ? 'translate-x-5' : ''}`}></div>
                      </div>
                      <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                    </label>
                  </div>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
                
                {/* 擅长标签 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="skills" className="block text-sm font-medium text-foreground">
                      擅长标签
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="visibility.skills"
                        checked={profileForm.visibility.skills}
                        onChange={handleProfileChange}
                        className="sr-only"
                      />
                      <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.skills ? 'bg-primary' : 'bg-gray-200'}`}>
                        <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.skills ? 'translate-x-5' : ''}`}></div>
                      </div>
                      <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={profileForm.skills}
                    onChange={handleProfileChange}
                    placeholder="请输入擅长的技能标签，多个标签用逗号分隔"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                {/* 工作信息 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">工作信息</h3>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="occupation" className="block text-sm font-medium text-foreground">
                        职业
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="visibility.occupation"
                          checked={profileForm.visibility.occupation}
                          onChange={handleProfileChange}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.occupation ? 'bg-primary' : 'bg-gray-200'}`}>
                          <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.occupation ? 'translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={profileForm.occupation}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="company" className="block text-sm font-medium text-foreground">
                        公司
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="visibility.company"
                          checked={profileForm.visibility.company}
                          onChange={handleProfileChange}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.company ? 'bg-primary' : 'bg-gray-200'}`}>
                          <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.company ? 'translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={profileForm.company}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                

                
                {/* 教育信息 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">教育信息</h3>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="visibility.education"
                        checked={profileForm.visibility.education}
                        onChange={handleProfileChange}
                        className="sr-only"
                      />
                      <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.education ? 'bg-primary' : 'bg-gray-200'}`}>
                        <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.education ? 'translate-x-5' : ''}`}></div>
                      </div>
                      <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                    </label>
                  </div>
                  
                  <div>
                    <label htmlFor="education.school" className="block text-sm font-medium text-foreground mb-2">
                      毕业学校
                    </label>
                    <input
                      type="text"
                      id="education.school"
                      name="education.school"
                      value={profileForm.education.school}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="education.major" className="block text-sm font-medium text-foreground">
                        专业
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="visibility.major"
                          checked={profileForm.visibility.major}
                          onChange={handleProfileChange}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.major ? 'bg-primary' : 'bg-gray-200'}`}>
                          <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.major ? 'translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      id="education.major"
                      name="education.major"
                      value={profileForm.education.major}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="education.degree" className="block text-sm font-medium text-foreground">
                        最高学历
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="visibility.degree"
                          checked={profileForm.visibility.degree}
                          onChange={handleProfileChange}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.degree ? 'bg-primary' : 'bg-gray-200'}`}>
                          <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.degree ? 'translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      id="education.degree"
                      name="education.degree"
                      value={profileForm.education.degree}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* 联系方式 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">联系方式</h3>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="email" className="block text-sm font-medium text-foreground">
                        邮箱
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="visibility.email"
                          checked={profileForm.visibility.email}
                          onChange={handleProfileChange}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.email ? 'bg-primary' : 'bg-gray-200'}`}>
                          <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.email ? 'translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                      </label>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                        联系电话
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="visibility.phone"
                          checked={profileForm.visibility.phone}
                          onChange={handleProfileChange}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.phone ? 'bg-primary' : 'bg-gray-200'}`}>
                          <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.phone ? 'translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                      </label>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="wechat" className="block text-sm font-medium text-foreground">
                        微信号
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="visibility.wechat"
                          checked={profileForm.visibility.wechat}
                          onChange={handleProfileChange}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.wechat ? 'bg-primary' : 'bg-gray-200'}`}>
                          <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.wechat ? 'translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      id="wechat"
                      name="wechat"
                      value={profileForm.wechat}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* 社交链接 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">社交链接</h3>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="weibo" className="block text-sm font-medium text-foreground">
                        微博链接
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="visibility.weibo"
                          checked={profileForm.visibility.weibo}
                          onChange={handleProfileChange}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.weibo ? 'bg-primary' : 'bg-gray-200'}`}>
                          <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.weibo ? 'translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                      </label>
                    </div>
                    <input
                      type="url"
                      id="weibo"
                      name="weibo"
                      value={profileForm.weibo}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="zhihu" className="block text-sm font-medium text-foreground">
                        知乎链接
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="visibility.zhihu"
                          checked={profileForm.visibility.zhihu}
                          onChange={handleProfileChange}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.zhihu ? 'bg-primary' : 'bg-gray-200'}`}>
                          <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.zhihu ? 'translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                      </label>
                    </div>
                    <input
                      type="url"
                      id="zhihu"
                      name="zhihu"
                      value={profileForm.zhihu}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="douyin" className="block text-sm font-medium text-foreground">
                        抖音链接
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="visibility.douyin"
                          checked={profileForm.visibility.douyin}
                          onChange={handleProfileChange}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.douyin ? 'bg-primary' : 'bg-gray-200'}`}>
                          <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.douyin ? 'translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                      </label>
                    </div>
                    <input
                      type="url"
                      id="douyin"
                      name="douyin"
                      value={profileForm.douyin}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="github" className="block text-sm font-medium text-foreground">
                        GitHub链接
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="visibility.github"
                          checked={profileForm.visibility.github}
                          onChange={handleProfileChange}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${profileForm.visibility.github ? 'bg-primary' : 'bg-gray-200'}`}>
                          <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${profileForm.visibility.github ? 'translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary">在个人资料卡显示</span>
                      </label>
                    </div>
                    <input
                      type="url"
                      id="github"
                      name="github"
                      value={profileForm.github}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                

                

                
                {/* 保存按钮 */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => router.push(`/${username}`)}
                    className="btn-secondary"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="btn-primary"
                  >
                    {isSaving ? '保存中...' : '保存更改'}
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
