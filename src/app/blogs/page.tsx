import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function BlogsPage() {
  // 模拟数据 - 最新博客
  const latestBlogs = [
    {
      id: 1,
      title: 'React 19 新特性详解',
      author: '张三',
      date: '2026-02-21',
      views: 1234,
      excerpt: 'React 19 带来了许多令人兴奋的新特性，包括...',
    },
    {
      id: 2,
      title: 'TypeScript 5.0 高级类型技巧',
      author: '李四',
      date: '2026-02-20',
      views: 987,
      excerpt: '掌握 TypeScript 高级类型技巧，让你的代码更加类型安全...',
    },
    {
      id: 3,
      title: 'Python 异步编程实战',
      author: '王五',
      date: '2026-02-19',
      views: 876,
      excerpt: '本教程将带你深入了解 Python 异步编程的核心概念和实践技巧...',
    },
    {
      id: 4,
      title: 'Java 21 虚拟线程详解',
      author: '赵六',
      date: '2026-02-18',
      views: 765,
      excerpt: 'Java 21 引入的虚拟线程将彻底改变并发编程的方式...',
    },
  ]

  // 模拟数据 - 热门博客
  const popularBlogs = [
    {
      id: 5,
      title: 'Docker 容器化最佳实践',
      author: '孙七',
      date: '2026-02-15',
      views: 2345,
      excerpt: '掌握 Docker 容器化的最佳实践，提高部署效率...',
    },
    {
      id: 6,
      title: 'Kubernetes 集群管理指南',
      author: '周八',
      date: '2026-02-14',
      views: 2109,
      excerpt: '深入了解 Kubernetes 集群管理的核心概念和实践技巧...',
    },
    {
      id: 7,
      title: '前端性能优化实战',
      author: '吴九',
      date: '2026-02-13',
      views: 1987,
      excerpt: '通过实际案例学习前端性能优化的各种技巧和方法...',
    },
    {
      id: 8,
      title: '机器学习入门教程',
      author: '郑十',
      date: '2026-02-12',
      views: 1876,
      excerpt: '从零开始学习机器学习的核心概念和算法...',
    },
  ]

  // 模拟数据 - 地区特色博客
  const regionalBlogs = [
    {
      region: '北京',
      description: '首都开发者的技术视角',
      blogs: latestBlogs.slice(0, 2),
      color: 'bg-white border-border',
      textColor: 'text-foreground',
    },
    {
      region: '上海',
      description: '国际化大都市的技术脉动',
      blogs: latestBlogs.slice(2, 4),
      color: 'bg-white border-border',
      textColor: 'text-foreground',
    },
    {
      region: '广州',
      description: '南国 tech 精英的分享',
      blogs: popularBlogs.slice(0, 2),
      color: 'bg-white border-border',
      textColor: 'text-foreground',
    },
  ]

  // 模拟数据 - 行业洞察博客
  const industryBlogs = [
    {
      industry: '互联网',
      description: '前沿科技与创新思维',
      blogs: popularBlogs.slice(0, 2),
      icon: '💻',
    },
    {
      industry: '金融',
      description: '金融科技与数字化转型',
      blogs: popularBlogs.slice(2, 4),
      icon: '💰',
    },
    {
      industry: '教育',
      description: '教育科技与学习创新',
      blogs: latestBlogs.slice(0, 2),
      icon: '🎓',
    },
  ]

  // 模拟数据 - 编辑推荐博客
  const featuredBlogs = [
    {
      id: 9,
      title: '2026 年前端开发趋势预测',
      author: '张三',
      date: '2026-02-20',
      views: 3456,
      excerpt: '展望 2026 年前端开发的发展趋势，把握技术脉搏...',
      badge: '编辑精选',
    },
    {
      id: 10,
      title: '全栈开发工程师的成长路径',
      author: '李四',
      date: '2026-02-19',
      views: 2789,
      excerpt: '从前端到后端，全栈开发工程师的完整成长指南...',
      badge: '热门推荐',
    },
    {
      id: 11,
      title: '人工智能在前端开发中的应用',
      author: '王五',
      date: '2026-02-18',
      views: 4123,
      excerpt: '探索 AI 如何改变前端开发流程，提升开发效率...',
      badge: '编辑精选',
    },
    {
      id: 12,
      title: '微前端架构实战指南',
      author: '赵六',
      date: '2026-02-17',
      views: 3876,
      excerpt: '从理论到实践，微前端架构的完整落地方案...',
      badge: '热门推荐',
    },
    {
      id: 13,
      title: 'TypeScript 高级类型技巧',
      author: '孙七',
      date: '2026-02-16',
      views: 3542,
      excerpt: '掌握 TypeScript 高级类型，编写更安全的代码...',
      badge: '编辑精选',
    },
    {
      id: 14,
      title: '性能优化：从理论到实战',
      author: '周八',
      date: '2026-02-15',
      views: 4219,
      excerpt: '前端性能优化的全面指南，让你的应用飞起来...',
      badge: '热门推荐',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 面包屑导航 */}
          <div className="mb-6 text-sm text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">首页</Link>
            {' > '}
            <span className="text-foreground">探索博客</span>
          </div>
          
          <div className="max-w-6xl mx-auto">


            {/* 推荐博客 */}
            <div className="space-y-16">
              {/* 编辑精选 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-primary rounded-full"></span>
                    编辑精选
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredBlogs.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold mb-2 flex-1">
                            <Link href={`/${blog.author.toLowerCase()}/blog/${blog.id}`} className="hover:text-primary transition-colors">
                              {blog.title}
                            </Link>
                          </h3>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                            {blog.badge}
                          </span>
                        </div>
                        <p className="text-secondary mb-4 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-secondary">
                          <div className="flex items-center space-x-4">
                            <Link href={`/${blog.author.toLowerCase()}`} className="hover:text-primary transition-colors font-medium">
                              {blog.author}
                            </Link>
                            <span>{blog.date}</span>
                          </div>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {blog.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 最新发布 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-green-500 rounded-full"></span>
                    最新发布
                  </h2>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                  {latestBlogs.map((blog, index) => (
                    <div key={blog.id} className={`p-5 ${index !== latestBlogs.length - 1 ? 'border-b border-border' : ''} hover:bg-gray-50 transition-colors`}>
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">
                            <Link href={`/${blog.author.toLowerCase()}/blog/${blog.id}`} className="hover:text-primary transition-colors">
                              {blog.title}
                            </Link>
                          </h3>
                          <p className="text-secondary text-sm mb-3 line-clamp-2">
                            {blog.excerpt}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-secondary">
                            <Link href={`/${blog.author.toLowerCase()}`} className="hover:text-primary transition-colors font-medium">
                              {blog.author}
                            </Link>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {blog.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {blog.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 热门趋势 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-orange-500 rounded-full"></span>
                    热门趋势
                  </h2>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                  {popularBlogs.map((blog, index) => (
                    <div key={blog.id} className={`p-5 ${index !== popularBlogs.length - 1 ? 'border-b border-border' : ''} hover:bg-gray-50 transition-colors`}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">
                            <Link href={`/${blog.author.toLowerCase()}/blog/${blog.id}`} className="hover:text-primary transition-colors">
                              {blog.title}
                            </Link>
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-secondary">
                            <Link href={`/${blog.author.toLowerCase()}`} className="hover:text-primary transition-colors font-medium">
                              {blog.author}
                            </Link>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {blog.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 地区特色 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-purple-500 rounded-full"></span>
                    地区特色
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {regionalBlogs.map((item) => (
                    <div key={item.region} className={`rounded-lg shadow-sm border ${item.color} overflow-hidden hover:shadow-md transition-all`}>
                      <div className="p-4 border-b border-border">
                        <h3 className={`text-lg font-semibold mb-1 ${item.textColor}`}>{item.region}</h3>
                        <p className="text-sm text-secondary">{item.description}</p>
                      </div>
                      {item.blogs.map((blog, idx) => (
                        <div key={blog.id} className={`p-4 ${idx !== item.blogs.length - 1 ? 'border-b border-border' : ''} hover:bg-white transition-colors`}>
                          <h4 className="font-medium mb-2">
                            <Link href={`/${blog.author.toLowerCase()}/blog/${blog.id}`} className="hover:text-primary transition-colors">
                              {blog.title}
                            </Link>
                          </h4>
                          <div className="flex items-center space-x-3 text-xs text-secondary">
                            <Link href={`/${blog.author.toLowerCase()}`} className="hover:text-primary transition-colors">
                              {blog.author}
                            </Link>
                            <span>{blog.views} 浏览</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* 行业洞察 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-yellow-500 rounded-full"></span>
                    行业洞察
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {industryBlogs.map((item) => (
                    <div key={item.industry} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-4 border-b border-border flex items-center gap-3">
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                          <h3 className="text-lg font-semibold">{item.industry}</h3>
                          <p className="text-sm text-secondary">{item.description}</p>
                        </div>
                      </div>
                      {item.blogs.map((blog, idx) => (
                        <div key={blog.id} className={`p-4 ${idx !== item.blogs.length - 1 ? 'border-b border-border' : ''} hover:bg-gray-50 transition-colors`}>
                          <h4 className="font-medium mb-2">
                            <Link href={`/${blog.author.toLowerCase()}/blog/${blog.id}`} className="hover:text-primary transition-colors">
                              {blog.title}
                            </Link>
                          </h4>
                          <div className="flex items-center space-x-3 text-xs text-secondary">
                            <Link href={`/${blog.author.toLowerCase()}`} className="hover:text-primary transition-colors">
                              {blog.author}
                            </Link>
                            <span>{blog.views} 浏览</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
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
