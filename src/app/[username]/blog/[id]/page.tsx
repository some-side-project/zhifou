'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function BlogDetailPage() {
  const params = useParams()
  const username = decodeURIComponent(params.username as string)
  const blogId = params.id as string

  // 模拟博客详情数据
  const blogData = {
    id: blogId,
    title: 'React 18新特性详解',
    author: username,
    authorNickname: '张三',
    authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20Chinese%20person%20with%20glasses%2C%20clean%20background%2C%20high%20quality&image_size=square',
    date: '2026-02-19',
    views: 345,
    category: '技术',
    content: `
      <h2>React 18 带来了哪些新特性？</h2>
      
      <p className="mt-4">React 18 是 React 团队经过多年开发的重大版本，带来了许多激动人心的新特性和性能改进。本文将详细介绍这些新特性的使用方法和最佳实践。</p>
      
      <h3 className="mt-6">1. 并发渲染 (Concurrent Rendering)</h3>
      
      <p className="mt-2">并发渲染是 React 18 最核心的新特性，它允许 React 在渲染过程中中断并处理更高优先级的任务，从而提高应用的响应速度和用户体验。</p>
      
      <pre className="mt-4 bg-gray-100 p-4 rounded-md overflow-x-auto">
        <code>
          // 使用 startTransition API
          import { startTransition } from 'react';
          
          function SearchComponent() {
            const [query, setQuery] = useState('');
            const [results, setResults] = useState([]);
            
            function handleSearch(e) {
              const value = e.target.value;
              setQuery(value);
              
              // 将搜索结果更新标记为低优先级
              startTransition(() => {
                // 模拟搜索 API 调用
                fetchResults(value).then(setResults);
              });
            }
            
            return (
              <div>
                <input type="text" value={query} onChange={handleSearch} />
                <Results results={results} />
              </div>
            );
          }
        </code>
      </pre>
      
      <h3 className="mt-6">2. 自动批处理 (Automatic Batching)</h3>
      
      <p className="mt-2">React 18 扩展了批处理的范围，现在即使在异步回调中，React 也会自动批处理状态更新，减少不必要的渲染。</p>
      
      <h3 className="mt-6">3. Suspense 改进</h3>
      
      <p className="mt-2">React 18 对 Suspense 进行了重大改进，现在可以在服务器端渲染中使用 Suspense，并且支持流式渲染。</p>
      
      <h3 className="mt-6">4. 新的 Root API</h3>
      
      <p className="mt-2">React 18 引入了新的 createRoot API，替代了传统的 render API，支持并发渲染。</p>
      
      <pre className="mt-4 bg-gray-100 p-4 rounded-md overflow-x-auto">
        <code>
          // 旧的 API
          import ReactDOM from 'react-dom';
          import App from './App';
          
          ReactDOM.render(<App />, document.getElementById('root'));
          
          // 新的 API
          import ReactDOM from 'react-dom/client';
          import App from './App';
          
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<App />);
        </code>
      </pre>
      
      <h3 className="mt-6">5. 流式服务器端渲染</h3>
      
      <p className="mt-2">React 18 支持流式服务器端渲染，允许服务器逐步发送 HTML 到客户端，提高首屏加载速度。</p>
      
      <h2 className="mt-8">总结</h2>
      
      <p className="mt-4">React 18 带来的这些新特性，特别是并发渲染和 Suspense 改进，将大大提升 React 应用的性能和用户体验。作为开发者，我们应该积极学习和采用这些新特性，构建更加流畅、响应迅速的应用。</p>
    `,
    comments: [
      {
        id: 1,
        user: '李四',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20young%20Chinese%20woman%2C%20clean%20background%2C%20high%20quality&image_size=square',
        content: '写得非常详细，学习了！',
        date: '2026-02-19',
      },
      {
        id: 2,
        user: '王五',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20young%20Chinese%20man%20with%20beard%2C%20clean%20background%2C%20high%20quality&image_size=square',
        content: '并发渲染的概念解释得很清楚，谢谢分享！',
        date: '2026-02-20',
      },
    ],
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
            <Link href={`/${username}`} className="hover:text-primary transition-colors">{blogData.authorNickname}</Link>
            {' > '}
            <Link href={`/${username}/blogs`} className="hover:text-primary transition-colors">博客</Link>
            {' > '}
            <span className="text-foreground">{blogData.title}</span>
          </div>
          
          {/* 博客内容 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">{blogData.title}</h1>
            
            {/* 作者信息和元数据 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <Link href={`/${username}`} className="hover:opacity-80 transition-opacity">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={blogData.authorAvatar} 
                      alt={blogData.authorNickname} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div>
                  <Link href={`/${username}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                    {blogData.authorNickname}
                  </Link>
                  <p className="text-sm text-secondary">@{blogData.author}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mt-4 sm:mt-0 text-sm text-secondary">
                <span>📅 {blogData.date}</span>
                <span>👁️ {blogData.views} 浏览</span>
                <span>📁 技术</span>
              </div>
            </div>
            
            {/* 博客正文 */}
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
            </div>
            
            {/* 文章底部操作 */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors">
                  <span>👍</span>
                  <span>点赞 (45)</span>
                </button>
                <button className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors">
                  <span>💬</span>
                  <span>评论 (2)</span>
                </button>
                <button className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors">
                  <span>🔗</span>
                  <span>分享</span>
                </button>
              </div>
              
              <Link href={`/${username}/blogs`} className="btn-secondary">
                返回博客列表
              </Link>
            </div>
          </div>
          
          {/* 评论区 */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">评论 ({blogData.comments.length})</h2>
            
            {/* 评论列表 */}
            <div className="space-y-6 mb-8">
              {blogData.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={comment.avatar} 
                      alt={comment.user} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{comment.user}</span>
                      <span className="text-sm text-secondary">{comment.date}</span>
                    </div>
                    <p className="text-foreground">{comment.content}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-secondary">
                      <button className="hover:text-primary transition-colors">点赞</button>
                      <button className="hover:text-primary transition-colors">回复</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 发表评论 */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">发表评论</h3>
              <div className="space-y-4">
                <textarea
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                  placeholder="写下你的评论..."
                ></textarea>
                <div className="flex justify-end">
                  <button className="btn-primary">
                    发表评论
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
