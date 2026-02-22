'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 模拟登录即注册请求
      const response = await fetch('https://api.finded.net/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('登录失败，请检查邮箱和密码')
      }

      const data = await response.json()
      // 保存token等操作
      console.log('登录成功:', data)
      // 跳转到首页
      window.location.href = '/'
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <p className="text-secondary">现在，建造你的博客空间，沉淀个人数字资产</p>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 border border-border relative">
            <div id="email-login-switch" className="hidden absolute" style={{ top: '0', right: '0' }}>
              <button
                type="button"
                className="text-sm text-primary hover:underline bg-gray-100 px-3 py-1 rounded-bl-md"
                onClick={() => {
                  document.getElementById('wechat-qr-container')?.classList.add('hidden');
                  document.getElementById('form-container')?.classList.remove('hidden');
                  document.getElementById('email-login-switch')?.classList.add('hidden');
                }}
                title="切换到邮箱/手机号登录"
              >
                切换到邮箱/手机号登录
              </button>
            </div>
            
            <div id="form-container">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">登录知否</h1>
                <p className="text-sm text-secondary mt-2">未注册用户将自动创建账号</p>
              </div>
              
              {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-md mb-6">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    邮箱/手机号
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="请输入邮箱地址或手机号"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    密码或临时验证码
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="请输入密码或临时验证码"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary">
                      记住我
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-primary hover:text-primary/80">
                      忘记密码？
                    </Link>
                  </div>
                </div>
                
                <div className="mb-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        登录中...
                      </>
                    ) : (
                      '登录 / 注册'
                    )}
                  </button>
                </div>
                
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-secondary">其它登录方式</span>
                  </div>
                </div>
                
                <div className="flex justify-center mb-6">
                  <button
                    type="button"
                    className="p-3 rounded-full border border-border hover:bg-background/50 transition-colors"
                    onClick={() => {
                      document.getElementById('form-container')?.classList.add('hidden');
                      document.getElementById('wechat-qr-container')?.classList.remove('hidden');
                      document.getElementById('email-login-switch')?.classList.remove('hidden');
                    }}
                    title="微信登录"
                  >
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5zm2 4c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="text-center text-sm text-secondary">
                  <p>登录即表示您同意我们的</p>
                  <div className="flex justify-center space-x-2 mt-1">
                    <Link href="#" className="text-primary hover:underline">服务条款</Link>
                    <span>和</span>
                    <Link href="#" className="text-primary hover:underline">隐私政策</Link>
                  </div>
                </div>
              </form>
            </div>
            
            <div id="wechat-qr-container" className="hidden">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">登录知否</h1>
                <p className="text-sm text-secondary mt-2">未注册用户将自动创建账号</p>
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-white border border-border rounded-lg">
                  <img 
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=WeChat%20QR%20code%20for%20login%2C%20black%20and%20white%2C%20simple%20design&image_size=square" 
                    alt="微信登录二维码" 
                    className="w-48 h-48"
                  />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-sm text-secondary">请使用微信扫描二维码登录</p>
                <p className="text-xs text-secondary mt-2">扫码后请在手机上确认登录</p>
              </div>
              

              
              <div className="text-center text-sm text-secondary">
                <p>登录即表示您同意我们的</p>
                <div className="flex justify-center space-x-2 mt-1">
                  <Link href="#" className="text-primary hover:underline">服务条款</Link>
                  <span>和</span>
                  <Link href="#" className="text-primary hover:underline">隐私政策</Link>
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
