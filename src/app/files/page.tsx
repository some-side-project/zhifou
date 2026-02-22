import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function FilesPage() {
  // 模拟数据 - 文件分类
  const categories = [
    { id: 1, name: '技术文档', count: 789, color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700', icon: '📄' },
    { id: 2, name: '代码示例', count: 654, color: 'bg-green-50 border-green-200', textColor: 'text-green-700', icon: '💻' },
    { id: 3, name: '开发资源', count: 432, color: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700', icon: '📦' },
    { id: 4, name: '工具软件', count: 234, color: 'bg-amber-50 border-amber-200', textColor: 'text-amber-700', icon: '🔧' },
    { id: 5, name: '模板素材', count: 123, color: 'bg-red-50 border-red-200', textColor: 'text-red-700', icon: '🎨' },
    { id: 6, name: '教程资料', count: 98, color: 'bg-indigo-50 border-indigo-200', textColor: 'text-indigo-700', icon: '📚' },
  ]

  // 模拟数据 - 最新文件
  const latestFiles = [
    {
      id: 1,
      title: 'React 19 官方文档',
      author: '张三',
      date: '2026-02-21',
      size: '2.5MB',
      downloads: 1234,
      excerpt: 'React 19 官方文档的完整中文版，包含所有新特性和API参考...',
      category: '技术文档',
      type: '文档',
    },
    {
      id: 2,
      title: 'Python 异步编程示例代码',
      author: '李四',
      date: '2026-02-20',
      size: '1.8MB',
      downloads: 987,
      excerpt: 'Python 异步编程的实战示例代码，包含asyncio、aiohttp等库的使用...',
      category: '代码示例',
      type: '代码',
    },
    {
      id: 3,
      title: '前端开发最佳实践指南',
      author: '王五',
      date: '2026-02-19',
      size: '3.2MB',
      downloads: 876,
      excerpt: '前端开发的最佳实践指南，涵盖代码规范、性能优化、安全性等方面...',
      category: '技术文档',
      type: '文档',
    },
    {
      id: 4,
      title: 'Docker 容器化实战案例',
      author: '赵六',
      date: '2026-02-18',
      size: '4.5MB',
      downloads: 765,
      excerpt: 'Docker 容器化的实战案例代码，包含各种常见场景的容器化解决方案...',
      category: '代码示例',
      type: '代码',
    },
    {
      id: 5,
      title: '前端性能优化手册',
      author: '孙七',
      date: '2026-02-17',
      size: '2.8MB',
      downloads: 654,
      excerpt: '前端性能优化的详细手册，包含加载优化、渲染优化、资源优化等内容...',
      category: '技术文档',
      type: '文档',
    },
    {
      id: 6,
      title: 'Vue 3 组件库模板',
      author: '周八',
      date: '2026-02-16',
      size: '5.2MB',
      downloads: 543,
      excerpt: '基于Vue 3的组件库开发模板，包含完整的开发环境和示例组件...',
      category: '模板素材',
      type: '模板',
    },
  ]

  // 模拟数据 - 热门文件
  const popularFiles = [
    {
      id: 7,
      title: 'JavaScript 高级编程',
      author: '吴九',
      date: '2026-02-15',
      size: '5.8MB',
      downloads: 2345,
      excerpt: 'JavaScript 高级编程的电子书，包含ES6+新特性、设计模式等内容...',
      category: '技术文档',
      type: '文档',
    },
    {
      id: 8,
      title: 'Python 数据分析实战',
      author: '郑十',
      date: '2026-02-14',
      size: '6.2MB',
      downloads: 2109,
      excerpt: 'Python 数据分析实战的示例代码和数据集，包含Pandas、NumPy等库的使用...',
      category: '代码示例',
      type: '代码',
    },
    {
      id: 9,
      title: '机器学习算法实现',
      author: '王十一',
      date: '2026-02-13',
      size: '7.5MB',
      downloads: 1987,
      excerpt: '常见机器学习算法的Python实现，包含线性回归、决策树、神经网络等...',
      category: '代码示例',
      type: '代码',
    },
    {
      id: 10,
      title: '前端开发工具包',
      author: '赵十二',
      date: '2026-02-12',
      size: '10.5MB',
      downloads: 1876,
      excerpt: '前端开发常用工具包，包含各种实用的脚本、配置文件和工具脚本...',
      category: '工具软件',
      type: '工具',
    },
    {
      id: 11,
      title: 'React 项目模板',
      author: '钱十三',
      date: '2026-02-11',
      size: '8.2MB',
      downloads: 1765,
      excerpt: 'React 项目开发模板，包含完整的项目结构、配置文件和示例代码...',
      category: '模板素材',
      type: '模板',
    },
    {
      id: 12,
      title: 'Node.js 后端开发教程',
      author: '孙十四',
      date: '2026-02-10',
      size: '9.5MB',
      downloads: 1654,
      excerpt: 'Node.js 后端开发的详细教程，包含Express、MongoDB等技术的使用...',
      category: '教程资料',
      type: '教程',
    },
  ]

  // 模拟数据 - 资源合集
  const resourceCollections = [
    {
      id: 1,
      title: '前端开发资源合集',
      description: '包含前端开发相关的各种资源，从基础到高级',
      files: 24,
      size: '45MB',
      downloads: 5678,
      filesList: latestFiles.slice(0, 3),
    },
    {
      id: 2,
      title: 'Python 全栈开发资源',
      description: 'Python 后端和数据分析相关的完整资源集合',
      files: 18,
      size: '67MB',
      downloads: 4321,
      filesList: popularFiles.slice(1, 4),
    },
    {
      id: 3,
      title: '机器学习学习资料',
      description: '机器学习和人工智能相关的学习资源和代码示例',
      files: 32,
      size: '120MB',
      downloads: 3890,
      filesList: [...latestFiles, ...popularFiles].slice(2, 5),
    },
  ]

  // 模拟数据 - 实用工具（按领域分类）
  const utilityTools = [
    {
      id: 1,
      title: '技术文档',
      icon: '📄',
      files: [...latestFiles, ...popularFiles].filter(f => f.category === '技术文档').slice(0, 4)
    },
    {
      id: 2,
      title: '代码示例',
      icon: '💻',
      files: [...latestFiles, ...popularFiles].filter(f => f.category === '代码示例').slice(0, 4)
    },
    {
      id: 3,
      title: '开发资源',
      icon: '📦',
      files: [...latestFiles, ...popularFiles].filter(f => f.category === '开发资源' || f.category === '工具软件').slice(0, 4)
    },
    {
      id: 4,
      title: '模板素材',
      icon: '🎨',
      files: [...latestFiles, ...popularFiles].filter(f => f.category === '模板素材').slice(0, 4)
    },
    {
      id: 5,
      title: '教程资料',
      icon: '📚',
      files: [...latestFiles, ...popularFiles].filter(f => f.category === '教程资料').slice(0, 4)
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
            <span className="text-foreground">探索文件</span>
          </div>
          
          <div className="max-w-6xl mx-auto">


            {/* 推荐文件 */}
            <div className="space-y-16">
              {/* 资源合集 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-primary rounded-full"></span>
                  精选资源合集
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {resourceCollections.map((collection) => (
                    <div key={collection.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{collection.title}</h3>
                        <p className="text-secondary text-sm mb-4">{collection.description}</p>
                        <div className="flex justify-between items-center text-sm text-secondary mb-4">
                          <span>📚 {collection.files} 个文件</span>
                          <span>📦 {collection.size}</span>
                          <span>⬇️ {collection.downloads} 下载</span>
                        </div>
                        <div className="space-y-3">
                          {collection.filesList.map((file, idx) => (
                            <div key={file.id} className="bg-gray-50 p-3 rounded-md">
                              <Link href={`/${file.author.toLowerCase()}/file/${file.id}`} className="text-sm font-medium hover:text-primary transition-colors block mb-1">
                                {file.title}
                              </Link>
                              <div className="flex items-center gap-2 text-xs text-secondary">
                                <span>{file.size}</span>
                                <span>{file.downloads} 下载</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>



              {/* 最新文件 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-blue-500 rounded-full"></span>
                  最新上传
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {latestFiles.map((file) => (
                    <div key={file.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold flex-1 pr-2 line-clamp-2">
                            <Link href={`/${file.author.toLowerCase()}/file/${file.id}`} className="hover:text-primary transition-colors">
                              {file.title}
                            </Link>
                          </h3>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {file.type}
                          </span>
                        </div>
                        <p className="text-secondary text-xs mb-3 line-clamp-2">
                          {file.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-secondary mb-2">
                          <Link href={`/${file.author.toLowerCase()}`} className="hover:text-primary transition-colors">
                            {file.author}
                          </Link>
                          <span>{file.date}</span>
                          <span>📦 {file.size}</span>
                          <span>⬇️ {file.downloads} 下载</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 热门文件 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-orange-500 rounded-full"></span>
                  热门下载
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularFiles.map((file) => (
                    <div key={file.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold flex-1 pr-2 line-clamp-2">
                            <Link href={`/${file.author.toLowerCase()}/file/${file.id}`} className="hover:text-primary transition-colors">
                              {file.title}
                            </Link>
                          </h3>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {file.type}
                          </span>
                        </div>
                        <p className="text-secondary text-xs mb-3 line-clamp-2">
                          {file.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-secondary mb-2">
                          <Link href={`/${file.author.toLowerCase()}`} className="hover:text-primary transition-colors">
                            {file.author}
                          </Link>
                          <span>{file.date}</span>
                          <span>📦 {file.size}</span>
                          <span>⬇️ {file.downloads} 下载</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 实用工具 */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-8 bg-purple-500 rounded-full"></span>
                  实用工具专区
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {utilityTools.map((tool) => (
                    <div key={tool.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                      <div className="p-4 border-b border-border flex items-center gap-3">
                        <div className="text-2xl">{tool.icon}</div>
                        <h3 className="text-lg font-semibold">{tool.title}</h3>
                      </div>
                      <div className="divide-y divide-border">
                        {tool.files.map((file, idx) => (
                          <div key={file.id} className="p-3 hover:bg-gray-50 transition-colors">
                            <Link href={`/${file.author.toLowerCase()}/file/${file.id}`} className="text-sm font-medium hover:text-primary transition-colors block mb-1">
                              {file.title}
                            </Link>
                            <div className="flex items-center gap-2 text-xs text-secondary">
                              <span>{file.size}</span>
                              <span>⬇️ {file.downloads} 下载</span>
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
