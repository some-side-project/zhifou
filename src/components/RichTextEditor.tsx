'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

// HTML转Markdown辅助函数
const htmlToMarkdown = (html: string): string => {
  let md = html
    // 替换标题
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n###### $1\n')
    // 替换加粗
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    // 替换斜体
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    // 替换删除线
    .replace(/<del[^>]*>(.*?)<\/del>/gi, '~~$1~~')
    .replace(/<strike[^>]*>(.*?)<\/strike>/gi, '~~$1~~')
    // 替换下划线
    .replace(/<u[^>]*>(.*?)<\/u>/gi, '<u>$1</u>')
    // 替换链接
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    // 替换图片
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, '![$1]($2)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')
    // 替换代码块
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '\n```\n$1\n```\n')
    // 替换行内代码
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    // 替换无序列表
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    // 替换有序列表
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '1. $1\n')
    // 替换换行和段落
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n')
    // 移除其他HTML标签
    .replace(/<[^>]+>/g, '')
    // 解码HTML实体
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // 清理多余空行
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  
  return md
}

// Markdown转HTML辅助函数
const markdownToHtml = (md: string): string => {
  return md
    // 标题
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
    .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
    .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
    // 文本格式
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>')
    .replace(/\_(.*?)\_/g, '<em>$1</em>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
    // 链接
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
    // 图片
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full" />')
    // 代码块
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // 行内代码
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // 无序列表
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // 有序列表
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>')
    // 段落
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<h[1-6]>)(?!<p>)(?!<ul>)(?!<ol>)(?!<pre>)(.*$)/gm, '<p>$1</p>')
    // 音频和视频
    .replace(/<audio src="(.*?)" controls>.*?<\/audio>/g, '<audio src="$1" controls> ')
    .replace(/<video src="(.*?)" controls>.*?<\/video>/g, '<video src="$1" controls></video>')
}

export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = '开始编写内容...'
}: {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}) {
  const [mode, setMode] = useState<'traditional' | 'markdown'>('traditional')
  const [showPreview, setShowPreview] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [markdownInput, setMarkdownInput] = useState(value)
  const [lastSyncRef, setLastSyncRef] = useState<string>('')
  const editorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)
  const isSwitchingMode = useRef(false)

  // 聚焦编辑器
  const focusEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  // 初始化内容
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      if (editorRef.current && mode === 'traditional' && value) {
        editorRef.current.innerHTML = value
      }
    }
  }, [mode, value])

  // 外部value变化时同步到传统模式编辑器
  useEffect(() => {
    if (!isSwitchingMode.current && editorRef.current && mode === 'traditional') {
      const currentContent = editorRef.current.innerHTML
      if (value !== currentContent && value !== lastSyncRef) {
        editorRef.current.innerHTML = value
        setLastSyncRef(value)
      }
    }
  }, [value, mode, lastSyncRef])

  // 外部value变化时同步到Markdown模式
  useEffect(() => {
    if (!isSwitchingMode.current && mode === 'markdown' && value !== markdownInput) {
      setMarkdownInput(value)
    }
  }, [value, mode])

  // 处理全屏切换
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (isFullscreen) {
      container.style.position = 'fixed'
      container.style.top = '0'
      container.style.left = '0'
      container.style.right = '0'
      container.style.bottom = '0'
      container.style.zIndex = '9999'
      container.style.backgroundColor = 'white'
    } else {
      container.style.position = 'static'
      container.style.top = 'auto'
      container.style.left = 'auto'
      container.style.right = 'auto'
      container.style.bottom = 'auto'
      container.style.zIndex = 'auto'
      container.style.backgroundColor = 'transparent'
    }
  }, [isFullscreen])

  const handleModeChange = (newMode: 'traditional' | 'markdown') => {
    if (newMode === mode) return
    
    isSwitchingMode.current = true
    
    if (newMode === 'markdown' && editorRef.current && onChange) {
      // 从传统模式切换到Markdown模式 - 将HTML转换为Markdown
      const htmlContent = editorRef.current.innerHTML
      const mdContent = htmlToMarkdown(htmlContent)
      setMarkdownInput(mdContent)
      onChange(mdContent)
    } else if (newMode === 'traditional' && editorRef.current) {
      // 从Markdown模式切换到传统模式 - 将Markdown转换为HTML
      const mdContent = markdownInput
      const htmlContent = markdownToHtml(mdContent)
      editorRef.current.innerHTML = htmlContent
      if (onChange) {
        onChange(htmlContent)
      }
    }
    
    setMode(newMode)
    
    // 重置标志
    setTimeout(() => {
      isSwitchingMode.current = false
    }, 0)
  }

  const handleTraditionalEditorChange = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setMarkdownInput(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploading(true)
      // 模拟文件上传
      setTimeout(() => {
        setUploading(false)
        const fileUrl = `https://example.com/uploads/${file.name}`
        
        if (mode === 'traditional' && editorRef.current) {
          // 在传统模式下插入媒体
          const selection = window.getSelection()
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)
            
            if (file.type.startsWith('image/')) {
              const img = document.createElement('img')
              img.src = fileUrl
              img.alt = file.name
              img.className = 'max-w-full h-auto'
              range.insertNode(img)
            } else if (file.type.startsWith('audio/')) {
              const audio = document.createElement('audio')
              audio.src = fileUrl
              audio.controls = true
              range.insertNode(audio)
            } else if (file.type.startsWith('video/')) {
              const video = document.createElement('video')
              video.src = fileUrl
              video.controls = true
              video.className = 'max-w-full h-auto'
              range.insertNode(video)
            } else {
              const link = document.createElement('a')
              link.href = fileUrl
              link.target = '_blank'
              link.textContent = file.name
              range.insertNode(link)
            }
            
            // 更新内容
            handleTraditionalEditorChange()
          }
        } else if (mode === 'markdown' && onChange) {
          // 在Markdown模式下插入媒体链接
          let newContent = markdownInput || ''
          if (file.type.startsWith('image/')) {
            newContent += `![${file.name}](${fileUrl})\n`
          } else if (file.type.startsWith('audio/')) {
            newContent += `<audio src="${fileUrl}" controls></audio>\n`
          } else if (file.type.startsWith('video/')) {
            newContent += `<video src="${fileUrl}" controls></video>\n`
          } else {
            newContent += `[${file.name}](${fileUrl})\n`
          }
          setMarkdownInput(newContent)
          onChange(newContent)
        }
      }, 1000)
    }
  }

  const handleFormat = (formatType: string) => {
    if (mode === 'traditional') {
      // 先聚焦编辑器
      if (editorRef.current) {
        editorRef.current.focus()
      }
      
      // 传统模式下使用document.execCommand
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) {
        // 如果没有选区，尝试创建一个默认选区
        if (editorRef.current) {
          const range = document.createRange()
          range.selectNodeContents(editorRef.current)
          range.collapse(false)
          selection?.removeAllRanges()
          selection?.addRange(range)
        } else {
          return
        }
      }

      switch (formatType) {
        case 'bold':
          document.execCommand('bold', false, undefined)
          break
        case 'italic':
          document.execCommand('italic', false, undefined)
          break
        case 'underline':
          document.execCommand('underline', false, undefined)
          break
        case 'strikethrough':
          document.execCommand('strikeThrough', false, undefined)
          break
        case 'h1':
          document.execCommand('formatBlock', false, '<h1>')
          break
        case 'h2':
          document.execCommand('formatBlock', false, '<h2>')
          break
        case 'h3':
          document.execCommand('formatBlock', false, '<h3>')
          break
        case 'ul':
          document.execCommand('insertUnorderedList', false, undefined)
          break
        case 'ol':
          document.execCommand('insertOrderedList', false, undefined)
          break
        case 'link':
          const url = prompt('请输入链接地址:', 'https://example.com')
          if (url) {
            document.execCommand('createLink', false, url)
          }
          break
        case 'code':
          document.execCommand('formatBlock', false, '<pre>')
          break
        default:
          break
      }

      // 保持焦点在编辑器上
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus()
        }
      }, 10)
      
      // 更新内容
      handleTraditionalEditorChange()
    } else {
      // Markdown模式下添加相应的Markdown语法
      let newContent = markdownInput || ''
      
      switch (formatType) {
        case 'bold':
          newContent += '**加粗文本** '
          break
        case 'italic':
          newContent += '*斜体文本* '
          break
        case 'underline':
          newContent += '<u>下划线文本</u> '
          break
        case 'strikethrough':
          newContent += '~~删除线文本~~ '
          break
        case 'h1':
          newContent += '\n# 一级标题\n'
          break
        case 'h2':
          newContent += '\n## 二级标题\n'
          break
        case 'h3':
          newContent += '\n### 三级标题\n'
          break
        case 'ul':
          newContent += '\n- 列表项\n- 列表项\n'
          break
        case 'ol':
          newContent += '\n1. 列表项\n2. 列表项\n'
          break
        case 'link':
          newContent += '\n[链接文本](https://example.com)\n'
          break
        case 'code':
          newContent += '\n```\n代码块\n```\n'
          break
        default:
          break
      }

      setMarkdownInput(newContent)
      if (onChange) {
        onChange(newContent)
      }
    }
  }

  const renderMarkdown = (text: string) => {
    return {
      __html: text
        // 标题
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
        .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
        .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
        // 文本格式
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>')
        .replace(/\_(.*?)\_/g, '<em>$1</em>')
        .replace(/~~(.*?)~~/g, '<del>$1</del>')
        .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
        // 链接
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
        // 图片
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full" />')
        // 代码块
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // 行内代码
        .replace(/`(.*?)`/g, '<code>$1</code>')
        // 无序列表
        .replace(/^\- (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        // 有序列表
        .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>')
        // 段落
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<h[1-6]>)(?!<p>)(?!<ul>)(?!<ol>)(?!<pre>)(.*$)/gm, '<p>$1</p>')
        // 音频和视频
        .replace(/<audio src="(.*?)" controls>.*?<\/audio>/g, '<audio src="$1" controls> ')
        .replace(/<video src="(.*?)" controls>.*?<\/video>/g, '<video src="$1" controls></video>')
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div 
      ref={containerRef}
      className={`w-full ${isFullscreen ? 'h-screen' : ''}`}
    >
      {/* 非全屏模式 */}
      {!isFullscreen && (
        <>
          {/* 工具栏 */}
          <div className="bg-white border border-border rounded-t-lg p-3 flex flex-wrap items-center gap-2">
            {/* 模式切换 */}
            <div className="flex border border-border rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => handleModeChange('traditional')}
                className={`px-4 py-2 text-sm ${mode === 'traditional' ? 'bg-primary text-white' : 'text-foreground hover:bg-muted'}`}
              >
                传统模式
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('markdown')}
                className={`px-4 py-2 text-sm ${mode === 'markdown' ? 'bg-primary text-white' : 'text-foreground hover:bg-muted'}`}
              >
                Markdown模式
              </button>
            </div>

            {/* Markdown模式预览开关 */}
            {mode === 'markdown' && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-secondary">实时预览：</span>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className={`px-3 py-1 text-sm rounded-md ${showPreview ? 'bg-primary text-white' : 'text-foreground hover:bg-muted border border-border'}`}
                >
                  {showPreview ? '开启' : '关闭'}
                </button>
              </div>
            )}
            
            {/* 分隔线 */}
            <div className="w-px h-6 bg-border mx-2"></div>
            
            {/* 排版工具 */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleFormat('bold')}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                title="加粗"
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                onClick={() => handleFormat('italic')}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                title="斜体"
              >
                <em>I</em>
              </button>
              <button
                type="button"
                onClick={() => handleFormat('underline')}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                title="下划线"
              >
                <u>U</u>
              </button>
              <button
                type="button"
                onClick={() => handleFormat('strikethrough')}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                title="删除线"
              >
                <span style={{textDecoration: 'line-through'}}>S</span>
              </button>
              <div className="w-px h-6 bg-border mx-1"></div>
              <button
                type="button"
                onClick={() => handleFormat('h1')}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                title="一级标题"
              >
                H1
              </button>
              <button
                type="button"
                onClick={() => handleFormat('h2')}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                title="二级标题"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => handleFormat('h3')}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                title="三级标题"
              >
                H3
              </button>
              <div className="w-px h-6 bg-border mx-1"></div>
              <button
                type="button"
                onClick={() => handleFormat('ul')}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                title="无序列表"
              >
                • 列表
              </button>
              <button
                type="button"
                onClick={() => handleFormat('ol')}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                title="有序列表"
              >
                1. 列表
              </button>
              <button
                type="button"
                onClick={() => handleFormat('link')}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                title="插入链接"
              >
                🔗 链接
              </button>
              <button
                type="button"
                onClick={() => handleFormat('code')}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                title="代码块"
              >
                {} 代码
              </button>
            </div>
            
            {/* 分隔线 */}
            <div className="w-px h-6 bg-border mx-2"></div>
            
            {/* 媒体上传 */}
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm cursor-pointer hover:bg-muted transition-colors">
                📷 图片
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
              <label className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm cursor-pointer hover:bg-muted transition-colors">
                🎵 音频
                <input 
                  type="file" 
                  accept="audio/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
              <label className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm cursor-pointer hover:bg-muted transition-colors">
                📹 视频
                <input 
                  type="file" 
                  accept="video/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
              <label className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm cursor-pointer hover:bg-muted transition-colors">
                📎 附件
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            
            {/* 分隔线 */}
            <div className="w-px h-6 bg-border mx-2"></div>
            
            {/* 全屏按钮 */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
              title={isFullscreen ? '退出全屏' : '全屏'}
            >
              📱 全屏
            </button>
            
            {/* 上传状态 */}
            {uploading && (
              <div className="text-sm text-primary">上传中...</div>
            )}
          </div>
          
          {/* 编辑区域 */}
          <div className="border-x border-b border-border rounded-b-lg min-h-[400px]">
            {mode === 'traditional' && (
              <div className="h-[400px] overflow-auto">
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning={true}
                  onInput={handleTraditionalEditorChange}
                  data-placeholder={placeholder}
                  className="w-full h-full p-4 focus:outline-none"
                  style={{
                    outline: 'none',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    minHeight: '400px'
                  }}
                />
              </div>
            )}
            
            {mode === 'markdown' && (
              <div className={`h-[400px] ${showPreview ? 'flex' : ''}`}>
                <div className={`${showPreview ? 'w-1/2 border-r border-border' : 'w-full'}`}>
                  <textarea
                    value={markdownInput}
                    onChange={handleMarkdownChange}
                    placeholder="在此输入Markdown内容..."
                    className="w-full h-full p-4 border-none focus:outline-none font-mono text-sm"
                    style={{ resize: 'none' }}
                  />
                </div>
                {showPreview && (
                  <div className="w-1/2 p-4 overflow-auto">
                    <div className="prose max-w-none">
                      <style>{`
                        .preview-content h1 { font-size: 2rem; font-weight: bold; margin-bottom: 1rem; }
                        .preview-content h2 { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.875rem; }
                        .preview-content h3 { font-size: 1.25rem; font-weight: bold; margin-bottom: 0.75rem; }
                        .preview-content h4 { font-size: 1.125rem; font-weight: bold; margin-bottom: 0.625rem; }
                        .preview-content h5 { font-size: 1rem; font-weight: bold; margin-bottom: 0.5rem; }
                        .preview-content h6 { font-size: 0.875rem; font-weight: bold; margin-bottom: 0.5rem; }
                        .preview-content strong { font-weight: bold; }
                        .preview-content em { font-style: italic; }
                        .preview-content del { text-decoration: line-through; }
                        .preview-content ul, .preview-content ol { margin-bottom: 1rem; padding-left: 1.5rem; }
                        .preview-content li { margin-bottom: 0.5rem; }
                        .preview-content code { background-color: #f3f4f6; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
                        .preview-content pre { background-color: #f3f4f6; padding: 1rem; border-radius: 6px; overflow-x: auto; }
                        .preview-content pre code { background-color: transparent; padding: 0; }
                        .preview-content img { max-width: 100%; height: auto; border-radius: 4px; }
                        .preview-content a { color: #2563eb; text-decoration: underline; }
                        .preview-content p { margin-bottom: 1rem; }
                      `}</style>
                      <div className="preview-content" dangerouslySetInnerHTML={renderMarkdown(markdownInput)} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* 全屏模式 - 微信公众号风格 */}
      {isFullscreen && (
        <div className="h-full flex flex-col bg-white">
          {/* 顶部导航栏 */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>返回</span>
            </button>
            
            <div className="flex items-center gap-2">
              {/* 模式切换标签 */}
              <span className={`px-3 py-1 text-sm rounded-full ${mode === 'traditional' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                {mode === 'traditional' ? '富文本' : 'Markdown'}
              </span>
            </div>
            
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-colors"
            >
              <span>发布</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* 标题输入区域 */}
          <div className="px-6 py-4 border-b border-gray-100">
            <input
              type="text"
              placeholder="请输入标题..."
              className="w-full text-2xl font-bold border-none focus:outline-none focus:ring-0 placeholder-gray-300"
            />
          </div>

          {/* 主编辑区域 */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {mode === 'traditional' && (
              <div className="flex-1 overflow-auto">
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning={true}
                  onInput={handleTraditionalEditorChange}
                  data-placeholder={placeholder}
                  className="w-full min-h-full p-6 focus:outline-none"
                  style={{
                    outline: 'none',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    fontSize: '17px',
                    lineHeight: '1.8',
                    minHeight: 'calc(100vh - 280px)'
                  }}
                />
              </div>
            )}

            {mode === 'markdown' && (
              <div className="flex-1 flex">
                <div className={`flex-1 border-r border-gray-100 ${showPreview ? 'w-1/2' : 'w-full'}`}>
                  <textarea
                    value={markdownInput}
                    onChange={handleMarkdownChange}
                    placeholder="在此输入Markdown内容..."
                    className="w-full h-full p-6 border-none focus:outline-none font-mono text-sm"
                    style={{ 
                      resize: 'none',
                      minHeight: 'calc(100vh - 280px)',
                      lineHeight: '1.8'
                    }}
                  />
                </div>
                {showPreview && (
                  <div className="w-1/2 p-6 overflow-auto bg-gray-50">
                    <div className="prose max-w-none">
                      <style>{`
                        .fullscreen-preview h1 { font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem; color: #1a1a1a; }
                        .fullscreen-preview h2 { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.875rem; color: #1a1a1a; }
                        .fullscreen-preview h3 { font-size: 1.25rem; font-weight: bold; margin-bottom: 0.75rem; color: #1a1a1a; }
                        .fullscreen-preview strong { font-weight: bold; color: #1a1a1a; }
                        .fullscreen-preview em { font-style: italic; }
                        .fullscreen-preview del { text-decoration: line-through; }
                        .fullscreen-preview ul, .fullscreen-preview ol { margin-bottom: 1rem; padding-left: 1.5rem; }
                        .fullscreen-preview li { margin-bottom: 0.5rem; }
                        .fullscreen-preview code { background-color: #f3f4f6; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; font-size: 0.875em; }
                        .fullscreen-preview pre { background-color: #f3f4f6; padding: 1rem; border-radius: 6px; overflow-x: auto; margin-bottom: 1rem; }
                        .fullscreen-preview pre code { background-color: transparent; padding: 0; }
                        .fullscreen-preview img { max-width: 100%; height: auto; border-radius: 4px; margin: 0.5rem 0; }
                        .fullscreen-preview a { color: #1abc9c; text-decoration: none; }
                        .fullscreen-preview p { margin-bottom: 1rem; line-height: 1.8; color: #333; }
                      `}</style>
                      <div className="fullscreen-preview" dangerouslySetInnerHTML={renderMarkdown(markdownInput)} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 底部工具栏 - 微信公众号风格 */}
          <div className="bg-white border-t border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between">
              {/* 左侧工具栏 */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleFormat('bold')}
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
                  title="加粗"
                >
                  <strong className="text-base">B</strong>
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('italic')}
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
                  title="斜体"
                >
                  <em className="text-base">I</em>
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('underline')}
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
                  title="下划线"
                >
                  <u className="text-base">U</u>
                </button>
                
                <div className="w-px h-6 bg-gray-200 mx-2"></div>
                
                <button
                  type="button"
                  onClick={() => handleFormat('h1')}
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors text-sm font-bold"
                  title="一级标题"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('h2')}
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors text-sm font-bold"
                  title="二级标题"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('h3')}
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors text-sm font-bold"
                  title="三级标题"
                >
                  H3
                </button>
                
                <div className="w-px h-6 bg-gray-200 mx-2"></div>
                
                <button
                  type="button"
                  onClick={() => handleFormat('ul')}
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
                  title="无序列表"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('ol')}
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
                  title="有序列表"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('link')}
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
                  title="插入链接"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('code')}
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
                  title="代码块"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </button>
              </div>

              {/* 右侧功能区 */}
              <div className="flex items-center gap-2">
                {mode === 'markdown' && (
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${showPreview ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100 text-gray-600'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    预览
                  </button>
                )}
                
                <label className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>
                
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
                  title="退出全屏"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}