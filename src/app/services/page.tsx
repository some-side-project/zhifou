import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ServicesPage() {
  // 模拟数据 - 服务分类
  const categories = [
    { id: 1, name: '技术咨询', count: 234, color: 'bg-primary/5 border-primary/20', textColor: 'text-primary', icon: '💡' },
    { id: 2, name: '开发外包', count: 123, color: 'bg-primary/5 border-primary/20', textColor: 'text-primary', icon: '📱' },
    { id: 3, name: '设计服务', count: 98, color: 'bg-primary/5 border-primary/20', textColor: 'text-primary', icon: '🎨' },
    { id: 4, name: '技术培训', count: 87, color: 'bg-primary/5 border-primary/20', textColor: 'text-primary', icon: '📚' },
    { id: 5, name: '数据分析', count: 65, color: 'bg-primary/5 border-primary/20', textColor: 'text-primary', icon: '📊' },
    { id: 6, name: 'DevOps', count: 43, color: 'bg-primary/5 border-primary/20', textColor: 'text-primary', icon: '🔄' },
  ]

  // 模拟数据 - 最新服务
  const latestServices = [
    {
      id: 1,
      title: '前端技术咨询',
      provider: '张三',
      date: '2026-02-21',
      price: '¥200/小时',
      rating: 4.9,
      excerpt: '提供专业的前端技术咨询服务，解决你的技术难题...',
      category: '技术咨询',
      experience: '5年',
    },
    {
      id: 2,
      title: '后端架构设计',
      provider: '李四',
      date: '2026-02-20',
      price: '¥300/小时',
      rating: 4.8,
      excerpt: '专业的后端架构设计服务，帮助你构建高性能、可扩展的系统...',
      category: '技术咨询',
      experience: '7年',
    },
    {
      id: 3,
      title: '移动应用开发',
      provider: '王五',
      date: '2026-02-19',
      price: '¥5000/款',
      rating: 4.7,
      excerpt: '提供iOS、Android等移动应用开发服务，打造高质量的移动应用...',
      category: '开发外包',
      experience: '4年',
    },
    {
      id: 4,
      title: 'UI/UX设计',
      provider: '赵六',
      date: '2026-02-18',
      price: '¥1000/页',
      rating: 4.9,
      excerpt: '专业的UI/UX设计服务，提升产品的用户体验和视觉效果...',
      category: '设计服务',
      experience: '6年',
    },
    {
      id: 5,
      title: '机器学习模型开发',
      provider: '孙七',
      date: '2026-02-17',
      price: '¥5000/模型',
      rating: 4.9,
      excerpt: '提供机器学习模型开发服务，包括数据预处理、特征工程、模型训练等...',
      category: '技术咨询',
      experience: '8年',
    },
    {
      id: 6,
      title: 'DevOps实施',
      provider: '周八',
      date: '2026-02-16',
      price: '¥3000/次',
      rating: 4.8,
      excerpt: '提供DevOps实施服务，包括CI/CD流程搭建、自动化测试、监控系统搭建等...',
      category: 'DevOps',
      experience: '6年',
    },
  ]

  // 模拟数据 - 热门服务
  const popularServices = [
    {
      id: 7,
      title: 'Web应用开发',
      provider: '吴九',
      date: '2026-02-15',
      price: '¥8000/款',
      rating: 4.7,
      excerpt: '提供响应式Web应用开发服务，包括前端、后端、数据库等完整解决方案...',
      category: '开发外包',
      experience: '5年',
    },
    {
      id: 8,
      title: '数据分析',
      provider: '郑十',
      date: '2026-02-14',
      price: '¥300/小时',
      rating: 4.9,
      excerpt: '提供数据分析服务，包括数据采集、数据清洗、数据分析、数据可视化等...',
      category: '数据分析',
      experience: '7年',
    },
    {
      id: 9,
      title: 'Python培训',
      provider: '王十一',
      date: '2026-02-13',
      price: '¥2000/课程',
      rating: 4.8,
      excerpt: 'Python编程语言的专业培训，从基础到高级，适合不同水平的学习者...',
      category: '技术培训',
      experience: '9年',
    },
    {
      id: 10,
      title: 'React开发',
      provider: '赵十二',
      date: '2026-02-12',
      price: '¥6000/项目',
      rating: 4.7,
      excerpt: '专业的React应用开发服务，包括组件开发、状态管理、性能优化等...',
      category: '开发外包',
      experience: '6年',
    },
    {
      id: 11,
      title: '产品设计',
      provider: '钱十三',
      date: '2026-02-11',
      price: '¥1500/次',
      rating: 4.9,
      excerpt: '产品设计服务，包括产品规划、用户研究、原型设计等...',
      category: '设计服务',
      experience: '8年',
    },
    {
      id: 12,
      title: 'Java后端开发',
      provider: '孙十四',
      date: '2026-02-10',
      price: '¥7000/项目',
      rating: 4.8,
      excerpt: '专业的Java后端开发服务，包括Spring Boot、微服务架构等...',
      category: '开发外包',
      experience: '10年',
    },
  ]

  // 模拟数据 - 服务套餐
  const servicePackages = [
    {
      id: 1,
      title: '初创企业技术套餐',
      description: '为初创企业提供全方位的技术支持服务',
      services: 5,
      price: '¥15000',
      rating: 4.9,
      servicesList: latestServices.slice(0, 3),
    },
    {
      id: 2,
      title: '企业数字化转型',
      description: '帮助传统企业实现数字化转型的完整服务',
      services: 8,
      price: '¥30000',
      rating: 4.8,
      servicesList: popularServices.slice(1, 4),
    },
    {
      id: 3,
      title: '个人开发者服务包',
      description: '为个人开发者提供的技术支持和开发服务',
      services: 3,
      price: '¥8000',
      rating: 4.7,
      servicesList: [...latestServices, ...popularServices].slice(2, 5),
    },
  ]

  // 模拟数据 - 专家服务
  const expertServices = [
    { id: 1, title: '技术咨询专家', services: popularServices.slice(0, 4) },
    { id: 2, title: '开发外包专家', services: latestServices.slice(0, 4) },
    { id: 3, title: '设计服务专家', services: [...latestServices, ...popularServices].slice(0, 4) },
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
            <span className="text-foreground">探索服务</span>
          </div>
          
          <div className="max-w-6xl mx-auto">


            {/* 推荐服务 */}
            <div className="space-y-16">
              {/* 服务套餐 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-primary rounded-full"></span>
                  精选服务套餐
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {servicePackages.map((packageItem) => (
                    <div key={packageItem.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{packageItem.title}</h3>
                        <p className="text-secondary text-sm mb-4">{packageItem.description}</p>
                        <div className="flex justify-between items-center text-sm text-secondary mb-4">
                          <span>📚 {packageItem.services} 项服务</span>
                          <span>⭐ {packageItem.rating} 评分</span>
                        </div>
                        <div className="text-2xl font-bold text-primary mb-4">{packageItem.price}</div>
                        <div className="space-y-3">
                          {packageItem.servicesList.map((service, idx) => (
                            <div key={service.id} className="bg-gray-50 p-3 rounded-md">
                              <Link href={`/${service.provider.toLowerCase()}/service/${service.id}`} className="text-sm font-medium hover:text-primary transition-colors block mb-1">
                                {service.title}
                              </Link>
                              <div className="flex items-center gap-2 text-xs text-secondary">
                                <span>{service.provider}</span>
                                <span>⭐ {service.rating}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 服务分类 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-green-500 rounded-full"></span>
                  服务分类导航
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {categories.map((category) => (
                    <Link 
                      key={category.id} 
                      href={`/services?category=${category.name}`} 
                      className="bg-white border border-border rounded-lg p-4 hover:shadow-md transition-all flex flex-col items-center text-center"
                    >
                      <span className="text-2xl mb-2">{category.icon}</span>
                      <h3 className="font-semibold mb-1 text-foreground">{category.name}</h3>
                      <span className="text-xs text-secondary">{category.count} 服务</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 最新服务 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-blue-500 rounded-full"></span>
                  最新服务
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {latestServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold flex-1 pr-2 line-clamp-2">
                            <Link href={`/${service.provider.toLowerCase()}/service/${service.id}`} className="hover:text-primary transition-colors">
                              {service.title}
                            </Link>
                          </h3>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-secondary text-xs mb-3 line-clamp-2">
                          {service.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-secondary mb-2">
                          <Link href={`/${service.provider.toLowerCase()}`} className="hover:text-primary transition-colors">
                            {service.provider}
                          </Link>
                          <span>经验: {service.experience}</span>
                          <span>{service.date}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-medium">
                          <span className="text-primary">{service.price}</span>
                          <span className="text-secondary">⭐ {service.rating} 评分</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 热门服务 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-orange-500 rounded-full"></span>
                  热门服务
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold flex-1 pr-2 line-clamp-2">
                            <Link href={`/${service.provider.toLowerCase()}/service/${service.id}`} className="hover:text-primary transition-colors">
                              {service.title}
                            </Link>
                          </h3>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-secondary text-xs mb-3 line-clamp-2">
                          {service.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-secondary mb-2">
                          <Link href={`/${service.provider.toLowerCase()}`} className="hover:text-primary transition-colors">
                            {service.provider}
                          </Link>
                          <span>经验: {service.experience}</span>
                          <span>{service.date}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-medium">
                          <span className="text-primary">{service.price}</span>
                          <span className="text-secondary">⭐ {service.rating} 评分</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 专家服务 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-purple-500 rounded-full"></span>
                  专家服务专区
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {expertServices.map((expert) => (
                    <div key={expert.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-4 border-b border-border">
                        <h3 className="text-lg font-semibold">{expert.title}</h3>
                      </div>
                      <div className="divide-y divide-border">
                        {expert.services.map((service, idx) => (
                          <div key={service.id} className="p-3 hover:bg-gray-50 transition-colors">
                            <Link href={`/${service.provider.toLowerCase()}/service/${service.id}`} className="text-sm font-medium hover:text-primary transition-colors block mb-1">
                              {service.title}
                            </Link>
                            <div className="flex justify-between items-center text-xs text-secondary">
                              <span>{service.provider}</span>
                              <span>{service.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
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
