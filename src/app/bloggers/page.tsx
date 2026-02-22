import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function BloggersPage() {
  // 模拟数据 - 最新博主
  const latestBloggers = [
    {
      id: 1,
      name: '张三',
      avatar: '👨‍💻',
      followers: 1234,
      articles: 56,
      description: '前端技术专家，专注于React、Vue等前端框架的研究和分享。',
      joinDate: '2026-02-21',
      category: '前端开发者',
      location: '北京',
      expertise: '高级',
    },
    {
      id: 2,
      name: '李四',
      avatar: '👩‍💻',
      followers: 987,
      articles: 45,
      description: '数据科学家，专注于机器学习、数据分析等领域的技术分享。',
      joinDate: '2026-02-20',
      category: '数据分析师',
      location: '上海',
      expertise: '高级',
    },
    {
      id: 3,
      name: '王五',
      avatar: '👨‍🎨',
      followers: 765,
      articles: 34,
      description: 'UI/UX设计师，分享设计理念、工具使用技巧等内容。',
      joinDate: '2026-02-19',
      category: 'UI/UX设计师',
      location: '广州',
      expertise: '中级',
    },
    {
      id: 4,
      name: '赵六',
      avatar: '👩‍🚀',
      followers: 876,
      articles: 67,
      description: '全栈开发者，分享后端、前端、DevOps等全栈技术内容。',
      joinDate: '2026-02-18',
      category: '后端开发者',
      location: '深圳',
      expertise: '高级',
    },
    {
      id: 5,
      name: '孙七',
      avatar: '👨‍🔬',
      followers: 567,
      articles: 23,
      description: '人工智能研究员，专注于深度学习和计算机视觉领域。',
      joinDate: '2026-02-17',
      category: '人工智能专家',
      location: '杭州',
      expertise: '中级',
    },
  ]

  // 模拟数据 - 热门博主
  const popularBloggers = [
    {
      id: 6,
      name: '周八',
      avatar: '👨‍🔬',
      followers: 5678,
      articles: 123,
      description: '人工智能专家，专注于机器学习、深度学习等领域的研究和分享。',
      joinDate: '2026-02-15',
      category: '人工智能专家',
      location: '北京',
      expertise: '专家',
    },
    {
      id: 7,
      name: '吴九',
      avatar: '👩‍💼',
      followers: 4567,
      articles: 98,
      description: '产品经理，分享产品设计、用户研究、项目管理等内容。',
      joinDate: '2026-02-14',
      category: '产品经理',
      location: '上海',
      expertise: '高级',
    },
    {
      id: 8,
      name: '郑十',
      avatar: '👨‍🏫',
      followers: 3456,
      articles: 87,
      description: '技术讲师，专注于编程教育、技术培训等内容的分享。',
      joinDate: '2026-02-13',
      category: '前端开发者',
      location: '广州',
      expertise: '高级',
    },
    {
      id: 9,
      name: '王十一',
      avatar: '👩‍🎓',
      followers: 2345,
      articles: 76,
      description: '计算机科学博士，分享算法、数据结构、系统设计等内容。',
      joinDate: '2026-02-12',
      category: '后端开发者',
      location: '深圳',
      expertise: '专家',
    },
    {
      id: 10,
      name: '赵十二',
      avatar: '👨‍💻',
      followers: 1890,
      articles: 65,
      description: '移动开发专家，专注于iOS和Android应用开发技术分享。',
      joinDate: '2026-02-11',
      category: '移动开发者',
      location: '杭州',
      expertise: '高级',
    },
  ]

  // 模拟数据 - 领域专家
  const domainExperts = [
    {
      category: '前端开发',
      icon: '💻',
      experts: [
        {
          id: 11,
          name: '钱十三',
          avatar: '👨‍💻',
          followers: 3456,
          articles: 89,
          description: '前端架构师，专注于大型应用架构和性能优化。',
        },
        {
          id: 12,
          name: '孙十四',
          avatar: '👩‍💻',
          followers: 2890,
          articles: 76,
          description: 'React专家，分享React生态系统和最佳实践。',
        },
        {
          id: 13,
          name: '周十五',
          avatar: '👨‍💻',
          followers: 2345,
          articles: 67,
          description: 'Vue.js核心贡献者，分享Vue相关技术和原理。',
        },
      ],
    },
    {
      category: '人工智能',
      icon: '🤖',
      experts: [
        {
          id: 14,
          name: '吴十六',
          avatar: '👨‍🔬',
          followers: 4567,
          articles: 102,
          description: '机器学习专家，专注于自然语言处理和推荐系统。',
        },
        {
          id: 15,
          name: '郑十七',
          avatar: '👩‍🔬',
          followers: 3890,
          articles: 87,
          description: '深度学习研究员，分享神经网络和计算机视觉技术。',
        },
        {
          id: 16,
          name: '王十八',
          avatar: '👨‍🔬',
          followers: 3210,
          articles: 78,
          description: 'AI伦理专家，关注人工智能的社会影响和伦理问题。',
        },
      ],
    },
  ]

  // 模拟数据 - 地区博主
  const regionalBloggers = [
    {
      location: '北京',
      description: '首都技术精英聚集地',
      bloggers: latestBloggers.filter(b => b.location === '北京'),
    },
    {
      location: '上海',
      description: '国际化大都市的技术脉动',
      bloggers: latestBloggers.filter(b => b.location === '上海'),
    },
    {
      location: '广州',
      description: '南国 tech 精英的分享',
      bloggers: latestBloggers.filter(b => b.location === '广州'),
    },
    {
      location: '深圳',
      description: '科技创新之城的开发者',
      bloggers: latestBloggers.filter(b => b.location === '深圳'),
    },
  ]

  // 模拟数据 - 新星博主
  const risingStars = [
    {
      id: 17,
      name: '赵十九',
      avatar: '👨‍💻',
      followers: 456,
      articles: 12,
      description: '前端新人，分享学习心得和实践经验。',
      joinDate: '2026-02-20',
      growthRate: '200%',
    },
    {
      id: 18,
      name: '钱二十',
      avatar: '👩‍💻',
      followers: 345,
      articles: 9,
      description: '后端开发者，分享Java和Spring Boot相关技术。',
      joinDate: '2026-02-19',
      growthRate: '180%',
    },
    {
      id: 19,
      name: '孙二十一',
      avatar: '👨‍🎨',
      followers: 289,
      articles: 7,
      description: 'UI设计师，分享设计工具和设计理念。',
      joinDate: '2026-02-18',
      growthRate: '150%',
    },
    {
      id: 20,
      name: '周二十二',
      avatar: '👩‍🔬',
      followers: 234,
      articles: 5,
      description: '数据分析师，分享数据分析工具和方法。',
      joinDate: '2026-02-17',
      growthRate: '120%',
    },
  ]

  // 模拟数据 - 内容质量博主
  const qualityBloggers = [
    {
      id: 21,
      name: '吴二十三',
      avatar: '👨‍🎓',
      followers: 2345,
      articles: 67,
      description: '技术作家，专注于高质量技术教程和深度解析。',
      interactionRate: '8.9%',
      featured: true,
    },
    {
      id: 22,
      name: '郑二十四',
      avatar: '👩‍💼',
      followers: 1890,
      articles: 54,
      description: '产品专家，分享产品设计和用户体验的深度思考。',
      interactionRate: '7.6%',
      featured: true,
    },
    {
      id: 23,
      name: '王二十五',
      avatar: '👨‍🔬',
      followers: 3456,
      articles: 89,
      description: 'AI研究专家，发布高质量的学术解读和技术分析。',
      interactionRate: '9.2%',
      featured: true,
    },
    {
      id: 24,
      name: '赵二十六',
      avatar: '👩‍🎨',
      followers: 1567,
      articles: 43,
      description: '设计专家，分享创意设计理念和实用设计技巧。',
      interactionRate: '6.8%',
      featured: false,
    },
    {
      id: 25,
      name: '钱二十七',
      avatar: '👨‍💻',
      followers: 2134,
      articles: 56,
      description: '全栈开发者，分享系统架构和性能优化的实战经验。',
      interactionRate: '7.3%',
      featured: false,
    },
  ]

  // 模拟数据 - 活跃博主
  const activeBloggers = [
    {
      id: 26,
      name: '孙二十八',
      avatar: '👨‍💻',
      followers: 1234,
      articles: 78,
      description: '前端开发者，每周更新技术博客和教程。',
      lastPost: '2小时前',
      activityScore: 95,
    },
    {
      id: 27,
      name: '周二十九',
      avatar: '👩‍💻',
      followers: 987,
      articles: 65,
      description: 'Python专家，频繁分享编程技巧和项目实战。',
      lastPost: '5小时前',
      activityScore: 92,
    },
    {
      id: 28,
      name: '吴三十',
      avatar: '👨‍🎨',
      followers: 765,
      articles: 54,
      description: 'UI设计师，每日分享设计灵感和工具使用技巧。',
      lastPost: '1天前',
      activityScore: 89,
    },
    {
      id: 29,
      name: '郑三十一',
      avatar: '👩‍🔬',
      followers: 876,
      articles: 67,
      description: '数据科学家，定期分享数据分析案例和工具教程。',
      lastPost: '1天前',
      activityScore: 87,
    },
  ]

  // 模拟数据 - 技术栈博主
  const techStackBloggers = [
    {
      stack: '前端技术',
      icon: '🖥️',
      bloggers: [
        {
          id: 30,
          name: '王三十二',
          avatar: '👨‍💻',
          followers: 2345,
          articles: 89,
          description: '前端架构师，专注于React和Vue技术栈。',
        },
        {
          id: 31,
          name: '赵三十三',
          avatar: '👩‍💻',
          followers: 1890,
          articles: 76,
          description: '前端工程师，分享前端性能优化和工程化实践。',
        },
      ],
    },
    {
      stack: '后端技术',
      icon: '⚙️',
      bloggers: [
        {
          id: 32,
          name: '钱三十四',
          avatar: '👨‍💻',
          followers: 2134,
          articles: 67,
          description: '后端架构师，专注于Java和微服务技术。',
        },
        {
          id: 33,
          name: '孙三十五',
          avatar: '👩‍💻',
          followers: 1567,
          articles: 54,
          description: 'Go语言专家，分享Go编程技巧和最佳实践。',
        },
      ],
    },
    {
      stack: '移动开发',
      icon: '📱',
      bloggers: [
        {
          id: 34,
          name: '周三十六',
          avatar: '👨‍💻',
          followers: 1890,
          articles: 65,
          description: 'iOS开发专家，分享Swift和iOS开发技巧。',
        },
        {
          id: 35,
          name: '吴三十七',
          avatar: '👩‍💻',
          followers: 1456,
          articles: 53,
          description: 'Android开发工程师，分享Kotlin和Android最佳实践。',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="py-12 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">


            {/* 推荐博主 */}
            <div className="space-y-16">
              {/* 热门博主 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-primary rounded-full"></span>
                    热门博主
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {popularBloggers.map((blogger) => (
                    <div key={blogger.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all flex flex-col">
                      <div className="p-6 text-center flex-1">
                        <div className="text-4xl mb-3">{blogger.avatar}</div>
                        <h3 className="text-lg font-semibold mb-2">
                          <Link href={`/${blogger.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                            {blogger.name}
                          </Link>
                        </h3>
                        <p className="text-secondary text-xs mb-4 line-clamp-2">
                          {blogger.description}
                        </p>
                        <div className="flex justify-center space-x-3 text-xs text-secondary mb-3">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {blogger.followers} 粉丝
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {blogger.articles} 文章
                          </span>
                        </div>
                        <div className="text-xs text-secondary">
                          {blogger.category} · {blogger.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 最新加入 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-green-500 rounded-full"></span>
                    最新加入
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {latestBloggers.map((blogger) => (
                    <div key={blogger.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all flex flex-col">
                      <div className="p-6 text-center flex-1">
                        <div className="text-4xl mb-3">{blogger.avatar}</div>
                        <h3 className="text-lg font-semibold mb-2">
                          <Link href={`/${blogger.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                            {blogger.name}
                          </Link>
                        </h3>
                        <p className="text-secondary text-xs mb-4 line-clamp-2">
                          {blogger.description}
                        </p>
                        <div className="flex justify-center space-x-3 text-xs text-secondary mb-3">
                          <span>👥 {blogger.followers} 粉丝</span>
                          <span>📝 {blogger.articles} 文章</span>
                        </div>
                        <div className="text-xs text-primary font-medium">
                          刚刚加入
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 内容质量博主 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-blue-500 rounded-full"></span>
                    优质内容博主
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {qualityBloggers.map((blogger) => (
                    <div key={blogger.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all flex flex-col">
                      <div className="p-6 text-center flex-1">
                        <div className="text-4xl mb-3">{blogger.avatar}</div>
                        <h3 className="text-lg font-semibold mb-2">
                          <Link href={`/${blogger.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                            {blogger.name}
                          </Link>
                        </h3>
                        <p className="text-secondary text-xs mb-4 line-clamp-2">
                          {blogger.description}
                        </p>
                        <div className="flex justify-center space-x-3 text-xs text-secondary mb-3">
                          <span>👥 {blogger.followers} 粉丝</span>
                          <span>📝 {blogger.articles} 文章</span>
                        </div>
                        <div className="flex justify-center items-center gap-2 text-xs">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            互动率 {blogger.interactionRate}
                          </span>
                          {blogger.featured && (
                            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              推荐
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 活跃博主 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-red-500 rounded-full"></span>
                    活跃博主
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {activeBloggers.map((blogger) => (
                    <div key={blogger.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl flex-shrink-0">{blogger.avatar}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">
                              <Link href={`/${blogger.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                                {blogger.name}
                              </Link>
                            </h3>
                            <p className="text-xs text-secondary mb-3 line-clamp-2">
                              {blogger.description}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex flex-col items-start gap-1">
                                <div className="flex items-center gap-2 text-secondary">
                                  <span>{blogger.followers} 粉丝</span>
                                  <span>{blogger.articles} 文章</span>
                                </div>
                                <span className="text-primary">
                                  最近更新: {blogger.lastPost}
                                </span>
                              </div>
                              <div className="text-right">
                                <div className="text-secondary">活跃度</div>
                                <div className="font-semibold text-primary">{blogger.activityScore}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 领域专家 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-purple-500 rounded-full"></span>
                    领域专家
                  </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {domainExperts.map((domain) => (
                    <div key={domain.category} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                      <div className="p-4 border-b border-border flex items-center gap-3">
                        <div className="text-2xl">{domain.icon}</div>
                        <h3 className="text-lg font-semibold">{domain.category}</h3>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {domain.experts.map((expert) => (
                            <div key={expert.id} className="bg-white rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-all">
                              <div className="flex items-start gap-3">
                                <div className="text-3xl flex-shrink-0">{expert.avatar}</div>
                                <div className="flex-1">
                                  <h4 className="font-semibold mb-1">
                                    <Link href={`/${expert.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                                      {expert.name}
                                    </Link>
                                  </h4>
                                  <p className="text-xs text-secondary mb-2 line-clamp-2">
                                    {expert.description}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-secondary">
                                    <span>{expert.followers} 粉丝</span>
                                    <span>{expert.articles} 文章</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 技术栈博主 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-indigo-500 rounded-full"></span>
                    技术栈专家
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {techStackBloggers.map((stack) => (
                    <div key={stack.stack} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                      <div className="p-4 border-b border-border flex items-center gap-3">
                        <div className="text-2xl">{stack.icon}</div>
                        <h3 className="text-lg font-semibold">{stack.stack}</h3>
                      </div>
                      <div className="p-4">
                        {stack.bloggers.map((blogger) => (
                          <div key={blogger.id} className="flex items-center gap-3 mb-4 last:mb-0 p-3 hover:bg-gray-50 rounded-md transition-colors">
                            <div className="text-3xl flex-shrink-0">{blogger.avatar}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold">
                                <Link href={`/${blogger.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                                  {blogger.name}
                                </Link>
                              </h4>
                              <p className="text-xs text-secondary mb-1 line-clamp-1">
                                {blogger.description}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-secondary">
                                <span>{blogger.followers} 粉丝</span>
                                <span>{blogger.articles} 文章</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 地区博主 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-orange-500 rounded-full"></span>
                    地区博主
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {regionalBloggers.map((item) => (
                    <div key={item.location} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                      <div className="p-4 border-b border-border">
                        <h3 className="text-lg font-semibold mb-1">{item.location}</h3>
                        <p className="text-sm text-secondary">{item.description}</p>
                      </div>
                      <div className="p-4">
                        {item.bloggers.map((blogger) => (
                          <div key={blogger.id} className="flex items-center gap-3 mb-4 last:mb-0 p-3 hover:bg-gray-50 rounded-md transition-colors">
                            <div className="text-3xl flex-shrink-0">{blogger.avatar}</div>
                            <div>
                              <h4 className="font-semibold">
                                <Link href={`/${blogger.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                                  {blogger.name}
                                </Link>
                              </h4>
                              <p className="text-xs text-secondary">{blogger.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 新星博主 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="inline-block w-2 h-8 bg-yellow-500 rounded-full"></span>
                    新星博主
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {risingStars.map((blogger) => (
                    <div key={blogger.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl flex-shrink-0">{blogger.avatar}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">
                              <Link href={`/${blogger.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                                {blogger.name}
                              </Link>
                            </h3>
                            <p className="text-xs text-secondary mb-3 line-clamp-2">
                              {blogger.description}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2 text-secondary">
                                <span>{blogger.followers} 粉丝</span>
                                <span>{blogger.articles} 文章</span>
                              </div>
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                增长 {blogger.growthRate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
