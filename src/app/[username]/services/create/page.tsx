'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateServicePage() {
  const params = useParams()
  const router = useRouter()
  const username = decodeURIComponent(params.username as string)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [serviceType, setServiceType] = useState('manual') // manual: 人工服务, web: 网页应用服务
  const [appName, setAppName] = useState('')
  const [appUrl, setAppUrl] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('online')
  const [requirements, setRequirements] = useState('')
  const [autoDeliveryContent, setAutoDeliveryContent] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setSubmitting(false)
      // 重定向到服务列表
      router.push(`/${username}/services`)
    }, 1000)
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
            <Link href={`/${username}/services`} className="hover:text-primary transition-colors">服务</Link>
            {' > '}
            <span className="text-foreground">创建服务</span>
          </div>
          
          {/* 创建服务表单 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-6">创建服务</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 服务类型 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  服务类型
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: 'web', label: '网页应用服务' },
                    { value: 'manual', label: '人工服务' }
                  ].map((type) => (
                    <div key={type.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`service-${type.value}`}
                        name="serviceType"
                        value={type.value}
                        checked={serviceType === type.value}
                        onChange={(e) => {
                          setServiceType(e.target.value)
                          // 如果选择网页应用服务，默认设置交付方式为线上交付
                          if (e.target.value === 'web') {
                            setDeliveryMethod('online')
                          }
                        }}
                        className="w-4 h-4 text-primary focus:ring-primary/50 border-border"
                      />
                      <label htmlFor={`service-${type.value}`} className="ml-2 block text-sm text-foreground">
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 应用名称 - 仅网页应用服务显示 */}
              {serviceType === 'web' && (
                <div>
                  <label htmlFor="appName" className="block text-sm font-medium text-foreground mb-2">
                    应用名称
                  </label>
                  <input
                    type="text"
                    id="appName"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="请输入网页应用的名称"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              )}
              
              {/* 应用地址 - 仅网页应用服务显示 */}
              {serviceType === 'web' && (
                <div>
                  <label htmlFor="appUrl" className="block text-sm font-medium text-foreground mb-2">
                    应用地址
                  </label>
                  <input
                    type="url"
                    id="appUrl"
                    value={appUrl}
                    onChange={(e) => setAppUrl(e.target.value)}
                    placeholder="请输入网页应用的访问地址"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              )}
              
              {/* 服务标题 */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                  服务标题
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入服务标题"
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              
              {/* 服务描述 */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  服务描述
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请详细描述您的服务内容、流程和优势"
                  rows={5}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              
              {/* 价格 - 仅人工服务显示 */}
              {serviceType === 'manual' && (
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
                    价格 (元)
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="请输入服务价格"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              )}
              
              {/* 服务时长 - 仅人工服务显示 */}
              {serviceType === 'manual' && (
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-foreground mb-2">
                    服务时长
                  </label>
                  <input
                    type="text"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="例如：1小时、3天、1周"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              )}
              
              {/* 交付方式 - 仅人工服务显示 */}
              {serviceType === 'manual' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    交付方式
                  </label>
                  <div className="flex space-x-4">
                    {
                      [
                        { value: 'online', label: '线上交付' },
                        { value: 'offline', label: '线下交付' },
                        { value: 'hybrid', label: '混合交付' }
                      ].map((method) => (
                        <div key={method.value} className="flex items-center">
                          <input
                            type="radio"
                            id={`delivery-${method.value}`}
                            name="deliveryMethod"
                            value={method.value}
                            checked={deliveryMethod === method.value}
                            onChange={(e) => setDeliveryMethod(e.target.value)}
                            className="w-4 h-4 text-primary focus:ring-primary/50 border-border"
                          />
                          <label htmlFor={`delivery-${method.value}`} className="ml-2 block text-sm text-foreground">
                            {method.label}
                          </label>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
              
              {/* 客户需求 - 仅人工服务显示 */}
              {serviceType === 'manual' && (
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-foreground mb-2">
                    客户需提供的信息
                  </label>
                  <textarea
                    id="requirements"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="请列出客户需要提供的信息或材料"
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              )}
              
              {/* 自动发货内容 - 仅人工服务显示 */}
              {serviceType === 'manual' && (
                <div>
                  <label htmlFor="autoDeliveryContent" className="block text-sm font-medium text-foreground mb-2">
                    客户下单成功后的自动发货内容
                  </label>
                  <textarea
                    id="autoDeliveryContent"
                    value={autoDeliveryContent}
                    onChange={(e) => setAutoDeliveryContent(e.target.value)}
                    placeholder="客户下单成功后，这里的信息会自动显示到客户的订单中。您可以用来发送一些自己的联系方式或者微信号或者特定的网盘链接等"
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              )}
              
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
                  href={`/${username}/services`}
                  className="px-6 py-3 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                >
                  取消
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex-1"
                  disabled={submitting}
                >
                  {submitting ? '创建中...' : '创建服务'}
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
