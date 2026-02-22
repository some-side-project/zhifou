'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UploadFilePage() {
  const params = useParams()
  const router = useRouter()
  const username = decodeURIComponent(params.username as string)

  const [selectedFolder, setSelectedFolder] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<number[]>([])
  const [price, setPrice] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [uploading, setUploading] = useState(false)

  // 模拟文件夹数据
  const folders = [
    { id: '1', name: '默认文件夹' },
    { id: '2', name: '技术文档' },
    { id: '3', name: '设计资源' },
    { id: '4', name: '个人资料' },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    setFiles(newFiles)
    setUploadProgress(new Array(newFiles.length).fill(0))
  }

  const handleUpload = () => {
    if (files.length === 0 || !selectedFolder) return

    setUploading(true)

    // 模拟上传进度
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev.map(p => Math.min(p + 10, 100))
        if (newProgress.every(p => p === 100)) {
          clearInterval(interval)
          setTimeout(() => {
            setUploading(false)
            // 重定向到文件列表
            router.push(`/${username}/files`)
          }, 500)
        }
        return newProgress
      })
    }, 300)
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
            <Link href={`/${username}/files`} className="hover:text-primary transition-colors">文件</Link>
            {' > '}
            <span className="text-foreground">上传文件</span>
          </div>
          
          {/* 文件上传表单 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-6">上传文件</h1>
            
            <div className="space-y-6">
              {/* 选择文件夹 */}
              <div>
                <label htmlFor="folder" className="block text-sm font-medium text-foreground mb-2">
                  选择文件夹
                </label>
                <select
                  id="folder"
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">请选择文件夹</option>
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* 上传文件 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  选择文件
                </label>
                <div className="flex flex-col space-y-4">
                  <label className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📁</div>
                      <span className="text-sm text-secondary">点击或拖拽文件到此处上传</span>
                      <p className="text-xs text-secondary mt-1">支持图片、音频、视频、文档等多种类型</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  
                  {/* 已选择文件列表 */}
                  {files.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-foreground">已选择的文件</h3>
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-md">
                          <div className="flex items-center space-x-3">
                            <div className="text-xl">
                              {file.type.startsWith('image/') && '🖼️'}
                              {file.type.startsWith('audio/') && '🎵'}
                              {file.type.startsWith('video/') && '🎬'}
                              {file.type.includes('pdf') && '📄'}
                              {file.type.includes('word') && '📝'}
                              {file.type.includes('excel') && '📊'}
                              {!file.type && '📄'}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground truncate max-w-xs">
                                {file.name}
                              </div>
                              <div className="text-xs text-secondary">
                                {Math.round(file.size / 1024)} KB
                              </div>
                            </div>
                          </div>
                          {uploading && (
                            <div className="w-32">
                              <div className="h-2 bg-muted rounded-full">
                                <div 
                                  className="h-2 bg-primary rounded-full" 
                                  style={{ width: `${uploadProgress[index]}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-secondary text-right mt-1">
                                {uploadProgress[index]}%
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* 价格设置 */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
                  价格 (可选)
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="设置为付费文件（元），留空为免费"
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  min="0"
                  step="0.01"
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
                  href={`/${username}/files`}
                  className="px-6 py-3 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                >
                  取消
                </Link>
                <button
                  onClick={handleUpload}
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex-1"
                  disabled={uploading || files.length === 0 || !selectedFolder}
                >
                  {uploading ? '上传中...' : '上传文件'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
