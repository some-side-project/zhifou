'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

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
  const editorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 当外部value变化时，同步到markdownInput
  useEffect(() => {
    setMarkdownInput(value)
    // 更新传统模式编辑器的内容
    if (editorRef.current && mode === 'traditional') {
      editorRef.current.innerHTML = value || ''
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
    setMode(newMode)
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
      // 传统模式下使用document.execCommand
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return

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
      {/* 工具栏 */}
      <div className="bg-white border border-border rounded-t-lg p-3 flex flex-wrap items-center gap-2">
        {/* 模式切换 */}
        <div className="flex border border-border rounded-md overflow-hidden">
          <button
            onClick={() => handleModeChange('traditional')}
            className={`px-4 py-2 text-sm ${mode === 'traditional' ? 'bg-primary text-white' : 'text-foreground hover:bg-muted'}`}
          >
            传统模式
          </button>
          <button
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
            onClick={() => handleFormat('bold')}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
            title="加粗"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => handleFormat('italic')}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
            title="斜体"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => handleFormat('underline')}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
            title="下划线"
          >
            <u>U</u>
          </button>
          <button
            onClick={() => handleFormat('strikethrough')}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
            title="删除线"
          >
            <span style={{textDecoration: 'line-through'}}>S</span>
          </button>
          <div className="w-px h-6 bg-border mx-1"></div>
          <button
            onClick={() => handleFormat('h1')}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
            title="一级标题"
          >
            H1
          </button>
          <button
            onClick={() => handleFormat('h2')}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
            title="二级标题"
          >
            H2
          </button>
          <button
            onClick={() => handleFormat('h3')}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
            title="三级标题"
          >
            H3
          </button>
          <div className="w-px h-6 bg-border mx-1"></div>
          <button
            onClick={() => handleFormat('ul')}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
            title="无序列表"
          >
            • 列表
          </button>
          <button
            onClick={() => handleFormat('ol')}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
            title="有序列表"
          >
            1. 列表
          </button>
          <button
            onClick={() => handleFormat('link')}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
            title="插入链接"
          >
            🔗 链接
          </button>
          <button
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
          onClick={toggleFullscreen}
          className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
          title={isFullscreen ? '退出全屏' : '全屏'}
        >
          {isFullscreen ? '📱 退出全屏' : '📱 全屏'}
        </button>
        
        {/* 上传状态 */}
        {uploading && (
          <div className="text-sm text-primary">上传中...</div>
        )}
      </div>
      
      {/* 编辑区域 */}
      <div className="border-x border-b border-border rounded-b-lg min-h-[400px]">
        {/* 传统模式 */}
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
        
        {/* Markdown模式 */}
        {mode === 'markdown' && (
          <div className={`h-[400px] ${showPreview ? 'flex' : ''}`}>
            {/* Markdown输入 */}
            <div className={`${showPreview ? 'w-1/2 border-r border-border' : 'w-full'}`}>
              <textarea
                value={markdownInput}
                onChange={handleMarkdownChange}
                placeholder="在此输入Markdown内容..."
                className="w-full h-full p-4 border-none focus:outline-none font-mono text-sm"
                style={{ resize: 'none' }}
              />
            </div>
            {/* 预览 */}
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
    </div>
  )
}