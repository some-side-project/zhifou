import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function TutorialsPage() {
  // 模拟数据 - 教程分类
  const categories = [
    { id: 1, name: '前端开发', count: 567, color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700', icon: '🖥️' },
    { id: 2, name: '后端开发', count: 432, color: 'bg-green-50 border-green-200', textColor: 'text-green-700', icon: '⚙️' },
    { id: 3, name: '移动开发', count: 345, color: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700', icon: '📱' },
    { id: 4, name: '人工智能', count: 456, color: 'bg-amber-50 border-amber-200', textColor: 'text-amber-700', icon: '🤖' },
    { id: 5, name: '数据分析', count: 234, color: 'bg-red-50 border-red-200', textColor: 'text-red-700', icon: '📊' },
    { id: 6, name: 'DevOps', count: 123, color: 'bg-indigo-50 border-indigo-200', textColor: 'text-indigo-700', icon: '🔄' },
  ]

  // 模拟数据 - 最新教程
  const latestTutorials = [
    {
      id: 1,
      title: 'React 19 从入门到精通',
      author: '张三',
      date: '2026-02-21',
      lessons: 24,
      students: 5678,
      excerpt: '本教程从React基础开始，逐步深入到高级特性，包括Hooks、Context API、Redux等...',
      category: '前端开发',
      level: '中级',
    },
    {
      id: 2,
      title: 'Python 数据分析实战',
      author: '李四',
      date: '2026-02-20',
      lessons: 30,
      students: 4321,
      excerpt: '通过实际项目案例，学习Python数据分析的核心库和技术，包括NumPy、Pandas、Matplotlib等...',
      category: '数据分析',
      level: '高级',
    },
    {
      id: 3,
      title: 'UI/UX设计原理',
      author: '王五',
      date: '2026-02-19',
      lessons: 18,
      students: 3456,
      excerpt: '了解UI/UX设计的基本原理和最佳实践，学习用户研究、原型设计、交互设计等技能...',
      category: '前端开发',
      level: '初级',
    },
    {
      id: 4,
      title: 'Node.js后端开发',
      author: '赵六',
      date: '2026-02-18',
      lessons: 26,
      students: 2890,
      excerpt: '学习Node.js核心概念和Express框架，构建RESTful API和全栈应用...',
      category: '后端开发',
      level: '中级',
    },
    {
      id: 5,
      title: '机器学习入门',
      author: '孙七',
      date: '2026-02-17',
      lessons: 32,
      students: 8765,
      excerpt: '从基础概念开始，学习机器学习的核心算法和应用，通过实际项目掌握机器学习技能...',
      category: '人工智能',
      level: '初级',
    },
    {
      id: 6,
      title: 'Docker容器化技术',
      author: '周八',
      date: '2026-02-16',
      lessons: 16,
      students: 6543,
      excerpt: '学习Docker的基本原理和使用方法，掌握容器化部署和微服务架构...',
      category: 'DevOps',
      level: '中级',
    },
  ]

  // 模拟数据 - 热门教程
  const popularTutorials = [
    {
      id: 7,
      title: 'Vue.js实战教程',
      author: '吴九',
      date: '2026-02-15',
      lessons: 22,
      students: 5432,
      excerpt: '从Vue.js基础到高级应用，学习组件化开发、状态管理、路由等核心概念...',
      category: '前端开发',
      level: '中级',
    },
    {
      id: 8,
      title: 'Java后端开发',
      author: '郑十',
      date: '2026-02-14',
      lessons: 35,
      students: 4321,
      excerpt: '学习Java核心技术、Spring Boot框架、数据库操作等，构建企业级后端应用...',
      category: '后端开发',
      level: '高级',
    },
    {
      id: 9,
      title: 'Flutter跨平台开发',
      author: '王十一',
      date: '2026-02-13',
      lessons: 28,
      students: 3987,
      excerpt: '学习Flutter框架，一次编写，多平台运行，构建高性能移动应用...',
      category: '移动开发',
      level: '中级',
    },
    {
      id: 10,
      title: '深度学习进阶',
      author: '赵十二',
      date: '2026-02-12',
      lessons: 36,
      students: 3765,
      excerpt: '深入学习深度学习的高级概念和算法，包括CNN、RNN、Transformer等...',
      category: '人工智能',
      level: '高级',
    },
    {
      id: 11,
      title: 'Kubernetes集群管理',
      author: '钱十三',
      date: '2026-02-11',
      lessons: 20,
      students: 3456,
      excerpt: '学习Kubernetes的核心概念和使用方法，掌握容器编排和集群管理...',
      category: 'DevOps',
      level: '高级',
    },
    {
      id: 12,
      title: 'React Native开发',
      author: '孙十四',
      date: '2026-02-10',
      lessons: 25,
      students: 3210,
      excerpt: '学习React Native框架，使用JavaScript构建原生移动应用...',
      category: '移动开发',
      level: '中级',
    },
  ]

  // 模拟数据 - 学习路径
  const learningPaths = [
    {
      id: 1,
      title: '前端工程师成长路径',
      description: '从HTML/CSS基础到高级前端架构师的完整学习路线',
      courses: 8,
      duration: '6个月',
      tutorials: latestTutorials.slice(0, 3),
    },
    {
      id: 2,
      title: '数据科学家之路',
      description: '从Python基础到机器学习专家的学习路径',
      courses: 10,
      duration: '8个月',
      tutorials: popularTutorials.slice(2, 5),
    },
    {
      id: 3,
      title: '全栈开发工程师',
      description: '前端+后端+DevOps的全栈开发技能学习路径',
      courses: 12,
      duration: '10个月',
      tutorials: [...latestTutorials, ...popularTutorials].slice(0, 3),
    },
  ]

  // 模拟数据 - 技能提升（按领域分类）
  const skillBoosters = [
    {
      id: 1,
      title: '前端开发',
      icon: '🖥️',
      tutorials: [...latestTutorials, ...popularTutorials].filter(t => t.category === '前端开发').slice(0, 4)
    },
    {
      id: 2,
      title: '后端开发',
      icon: '⚙️',
      tutorials: [...latestTutorials, ...popularTutorials].filter(t => t.category === '后端开发').slice(0, 4)
    },
    {
      id: 3,
      title: '移动开发',
      icon: '📱',
      tutorials: [...latestTutorials, ...popularTutorials].filter(t => t.category === '移动开发').slice(0, 4)
    },
    {
      id: 4,
      title: '人工智能',
      icon: '🤖',
      tutorials: [...latestTutorials, ...popularTutorials].filter(t => t.category === '人工智能').slice(0, 4)
    },
    {
      id: 5,
      title: '数据分析',
      icon: '📊',
      tutorials: [...latestTutorials, ...popularTutorials].filter(t => t.category === '数据分析').slice(0, 4)
    },
    {
      id: 6,
      title: 'DevOps',
      icon: '🔄',
      tutorials: [...latestTutorials, ...popularTutorials].filter(t => t.category === 'DevOps').slice(0, 4)
    }
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
            <span className="text-foreground">探索教程</span>
          </div>
          
          <div className="max-w-6xl mx-auto">


            {/* 推荐教程 */}
            <div className="space-y-16">
              {/* 学习路径 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-primary rounded-full"></span>
                  精选学习路径
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {learningPaths.map((path) => (
                    <div key={path.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                        <p className="text-secondary text-sm mb-4">{path.description}</p>
                        <div className="flex justify-between items-center text-sm text-secondary mb-4">
                          <span>📚 {path.courses} 门课程</span>
                          <span>⏱️ {path.duration}</span>
                        </div>
                        <div className="space-y-3">
                          {path.tutorials.map((tutorial, idx) => (
                            <div key={tutorial.id} className="bg-gray-50 p-3 rounded-md">
                              <Link href={`/${tutorial.author.toLowerCase()}/tutorial/${tutorial.id}`} className="text-sm font-medium hover:text-primary transition-colors block mb-1">
                                {tutorial.title}
                              </Link>
                              <div className="flex items-center gap-2 text-xs text-secondary">
                                <span>{tutorial.lessons} 课时</span>
                                <span>{tutorial.level}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>



              {/* 最新教程 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-blue-500 rounded-full"></span>
                  最新发布
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {latestTutorials.map((tutorial) => (
                    <div key={tutorial.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold flex-1 pr-2 line-clamp-2">
                            <Link href={`/${tutorial.author.toLowerCase()}/tutorial/${tutorial.id}`} className="hover:text-primary transition-colors">
                              {tutorial.title}
                            </Link>
                          </h3>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {tutorial.level}
                          </span>
                        </div>
                        <p className="text-secondary text-xs mb-3 line-clamp-2">
                          {tutorial.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-secondary mb-2">
                          <Link href={`/${tutorial.author.toLowerCase()}`} className="hover:text-primary transition-colors">
                            {tutorial.author}
                          </Link>
                          <span>{tutorial.date}</span>
                          <span>📚 {tutorial.lessons} 课时</span>
                          <span>👥 {tutorial.students} 学习</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 热门教程 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-orange-500 rounded-full"></span>
                  热门推荐
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularTutorials.map((tutorial) => (
                    <div key={tutorial.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold flex-1 pr-2 line-clamp-2">
                            <Link href={`/${tutorial.author.toLowerCase()}/tutorial/${tutorial.id}`} className="hover:text-primary transition-colors">
                              {tutorial.title}
                            </Link>
                          </h3>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {tutorial.level}
                          </span>
                        </div>
                        <p className="text-secondary text-xs mb-3 line-clamp-2">
                          {tutorial.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-secondary mb-2">
                          <Link href={`/${tutorial.author.toLowerCase()}`} className="hover:text-primary transition-colors">
                            {tutorial.author}
                          </Link>
                          <span>{tutorial.date}</span>
                          <span>📚 {tutorial.lessons} 课时</span>
                          <span>👥 {tutorial.students} 学习</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 技能提升 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-purple-500 rounded-full"></span>
                  技能提升专区
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skillBoosters.map((booster) => (
                    <div key={booster.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-4 border-b border-border flex items-center gap-3">
                        <div className="text-2xl">{booster.icon}</div>
                        <h3 className="text-lg font-semibold">{booster.title}</h3>
                      </div>
                      <div className="divide-y divide-border">
                        {booster.tutorials.map((tutorial, idx) => (
                          <div key={tutorial.id} className="p-3 hover:bg-gray-50 transition-colors">
                            <Link href={`/${tutorial.author.toLowerCase()}/tutorial/${tutorial.id}`} className="text-sm font-medium hover:text-primary transition-colors block mb-1">
                              {tutorial.title}
                            </Link>
                            <div className="flex items-center gap-2 text-xs text-secondary">
                              <span>{tutorial.lessons} 课时</span>
                              <span>{tutorial.level}</span>
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
