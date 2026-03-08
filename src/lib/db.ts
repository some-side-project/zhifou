import { Blog, Tutorial, File, Service, Blogger, Category } from '@/types'

let blogs: Blog[] = [
  { id: 1, title: '重启web2.0博客时代的思考', author: '张三', date: '2026-02-19', views: 1234 },
  { id: 2, title: '如何构建个人知识管理系统', author: '李四', date: '2026-02-18', views: 987 },
  { id: 3, title: 'AI时代的内容创作趋势', author: '王五', date: '2026-02-17', views: 2345 },
]

let files: File[] = [
  { id: 1, title: '前端开发面试题汇总', author: '张三', size: '2.5MB', downloads: 1234, excerpt: '包含HTML、CSS、JavaScript、React等前端技术的面试题和答案汇总。', date: '2026-02-21', type: '文档' },
  { id: 2, title: 'Python数据分析实战代码', author: '李四', size: '5.8MB', downloads: 987, excerpt: '《Python数据分析实战》一书的配套代码，包含所有章节的示例代码。', date: '2026-02-20', type: '代码' },
  { id: 3, title: 'UI设计资源包', author: '王五', size: '15.2MB', downloads: 2345, excerpt: '包含图标、字体、色彩方案等UI设计常用资源，适合设计师使用。', date: '2026-02-19', type: '素材' },
  { id: 4, title: '后端架构设计文档模板', author: '赵六', size: '1.2MB', downloads: 765, excerpt: '后端系统架构设计文档的模板，包含所有必要的章节和内容。', date: '2026-02-18', type: '文档' },
  { id: 5, title: 'Java核心技术笔记', author: '孙七', size: '3.5MB', downloads: 1123, excerpt: 'Java核心技术的详细笔记，包含语法、面向对象、集合框架等内容。', date: '2026-02-17', type: '文档' },
  { id: 6, title: 'React组件库', author: '周八', size: '8.7MB', downloads: 1567, excerpt: '常用的React组件库，包含按钮、表单、模态框等UI组件。', date: '2026-02-16', type: '代码' },
  { id: 7, title: '数据库设计最佳实践', author: '吴九', size: '2.1MB', downloads: 987, excerpt: '数据库设计的最佳实践指南，包含范式、索引、优化等内容。', date: '2026-02-15', type: '文档' },
  { id: 8, title: '前端性能优化指南', author: '郑十', size: '1.8MB', downloads: 1345, excerpt: '前端性能优化的详细指南，包含加载优化、渲染优化、资源优化等内容。', date: '2026-02-14', type: '文档' },
  { id: 9, title: '移动端UI设计规范', author: '王十一', size: '4.2MB', downloads: 1098, excerpt: '移动端UI设计的规范和最佳实践，包含iOS和Android平台的设计差异。', date: '2026-02-13', type: '素材' },
  { id: 10, title: 'API设计指南', author: '赵十二', size: '1.5MB', downloads: 876, excerpt: 'RESTful API设计的指南，包含命名规范、参数设计、错误处理等内容。', date: '2026-02-12', type: '文档' },
  { id: 11, title: 'Git命令速查手册', author: '张三', size: '0.8MB', downloads: 1678, excerpt: 'Git常用命令的速查手册，包含分支管理、提交、合并等操作。', date: '2026-02-11', type: '文档' },
  { id: 12, title: 'Linux命令行教程', author: '李四', size: '2.3MB', downloads: 1234, excerpt: 'Linux命令行的详细教程，包含文件操作、系统管理、网络配置等内容。', date: '2026-02-10', type: '教程' },
]

export const db = {
  blogs: {
    findAll: async (options?: { page?: number; limit?: number; category?: string }) => {
      const page = options?.page || 1
      const limit = options?.limit || 10
      let result = [...blogs]

      if (options?.category && options.category !== 'all') {
        result = result.filter(b => 
          b.title.toLowerCase().includes(options.category!.toLowerCase())
        )
      }

      const start = (page - 1) * limit
      const end = start + limit

      return {
        data: result.slice(start, end),
        pagination: {
          page,
          limit,
          total: result.length,
          totalPages: Math.ceil(result.length / limit)
        }
      }
    },

    findById: async (id: number) => {
      return blogs.find(b => b.id === id) || null
    },

    create: async (data: Partial<Blog>) => {
      const newBlog: Blog = {
        id: Math.max(...blogs.map(b => b.id)) + 1,
        title: data.title || '',
        author: data.author || '匿名用户',
        date: new Date().toISOString().split('T')[0],
        views: 0,
        excerpt: data.excerpt || ''
      }
      blogs.push(newBlog)
      return newBlog
    },

    update: async (id: number, data: Partial<Blog>) => {
      const index = blogs.findIndex(b => b.id === id)
      if (index === -1) return null
      blogs[index] = { ...blogs[index], ...data }
      return blogs[index]
    },

    delete: async (id: number) => {
      const index = blogs.findIndex(b => b.id === id)
      if (index === -1) return false
      blogs.splice(index, 1)
      return true
    }
  },

  files: {
    findAll: async (options?: { page?: number; limit?: number; type?: string; sort?: string }) => {
      const page = options?.page || 1
      const limit = options?.limit || 10
      let result = [...files]

      if (options?.type && options.type !== 'all') {
        result = result.filter(f => f.title.toLowerCase().includes(options.type!.toLowerCase()))
      }

      if (options?.sort === 'popular') {
        result.sort((a, b) => b.downloads - a.downloads)
      } else {
        result.sort((a, b) => b.id - a.id)
      }

      const start = (page - 1) * limit
      const end = start + limit

      return {
        data: result.slice(start, end),
        pagination: {
          page,
          limit,
          total: result.length,
          totalPages: Math.ceil(result.length / limit)
        }
      }
    },

    findById: async (id: number) => {
      return files.find(f => f.id === id) || null
    },

    create: async (data: Partial<File>) => {
      const newFile: File = {
        id: Math.max(...files.map(f => f.id)) + 1,
        title: data.title || '',
        author: data.author || '匿名用户',
        size: data.size || '0MB',
        downloads: 0,
        excerpt: data.excerpt || '',
        date: new Date().toISOString().split('T')[0],
        type: data.type || '文档'
      }
      files.push(newFile)
      return newFile
    },

    incrementDownloads: async (id: number) => {
      const index = files.findIndex(f => f.id === id)
      if (index === -1) return null
      files[index].downloads += 1
      return files[index]
    }
  }
}
