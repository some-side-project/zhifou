import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AppsPage() {
  const apps = [
    {
      id: 'baby-name',
      name: '宝宝起名字',
      description: '为新生儿提供个性化的名字推荐，基于生辰八字和五行命理。',
      logo: 'https://picsum.photos/seed/baby/200/200',
      features: ['生辰八字分析', '五行命理匹配', '名字寓意解析', '多维度评分'],
      target: '准父母、新生儿家庭',
      rating: 4.9,
      users: '10,000+',
      color: 'from-pink-50 to-purple-50',
      icon: '👶'
    },
    {
      id: 'background-check',
      name: '个人求职背调',
      description: '提供专业的背景调查服务，帮助企业和个人了解求职者的真实情况。',
      logo: 'https://picsum.photos/seed/background/200/200',
      features: ['学历验证', '工作经历核实', '职业资格认证', '信用记录查询'],
      target: '企业HR、招聘机构、求职者',
      rating: 4.8,
      users: '5,000+',
      color: 'from-blue-50 to-cyan-50',
      icon: '🔍'
    },
    {
      id: 'multi-platform-publisher',
      name: '自媒体内容多平台发布工具',
      description: '一键将内容发布到多个自媒体平台，提高内容分发效率。',
      logo: 'https://picsum.photos/seed/publisher/200/200',
      features: ['多平台一键发布', '内容格式自动适配', '发布时间调度', '数据分析统计'],
      target: '自媒体创作者、内容运营人员',
      rating: 4.7,
      users: '8,000+',
      color: 'from-orange-50 to-amber-50',
      icon: '📱'
    },
    {
      id: 'blog-sync',
      name: '博客同步工具',
      description: '支持把其他平台的博客自动拉取同步到知否博客，保持内容一致性。',
      logo: 'https://picsum.photos/seed/sync/200/200',
      features: ['多平台数据同步', '自动更新机制', '内容格式转换', '同步历史记录'],
      target: '博主、内容创作者',
      rating: 4.6,
      users: '3,000+',
      color: 'from-green-50 to-emerald-50',
      icon: '🔄'
    },
    {
      id: 'legal-case-search',
      name: '法律类案检索',
      description: '提供法律案例检索服务，帮助律师和法律工作者快速找到相关案例。',
      logo: 'https://picsum.photos/seed/legal/200/200',
      features: ['智能案例检索', '法条关联分析', '案例相似度匹配', '专业法律数据库'],
      target: '律师、法律工作者、法学院学生',
      rating: 4.9,
      users: '2,000+',
      color: 'from-indigo-50 to-violet-50',
      icon: '⚖️'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              探索我们精心挑选的应用，为您的生活和工作提供更多便利与价值
            </p>
          </div>
          
          <div className="space-y-8">
            {apps.map((app) => (
              <div 
                key={app.id} 
                className={`bg-white rounded-xl shadow-sm border border-border overflow-hidden 
                  hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className={`bg-gradient-to-r ${app.color} p-8`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">{app.icon}</div>
                      <div>
                        <h2 className="text-2xl font-bold mb-1">{app.name}</h2>
                        <div className="flex items-center text-sm text-secondary">
                          <span className="flex items-center mr-4">
                            ⭐ {app.rating}
                          </span>
                          <span>
                            👥 {app.users} 用户
                          </span>
                        </div>
                      </div>
                    </div>
                    <img 
                      src={app.logo} 
                      alt={app.name} 
                      className="w-20 h-20 object-contain rounded-lg border border-white/20"
                    />
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-lg mb-6 text-secondary">{app.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center">
                        ✨ 核心功能
                      </h3>
                      <ul className="space-y-2">
                        {app.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-secondary">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center">
                        🎯 适用人群
                      </h3>
                      <p className="text-sm text-secondary">{app.target}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                      立即使用
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 p-8 bg-white rounded-xl shadow-sm border border-border">
            <h2 className="text-2xl font-bold mb-4">应用接入说明</h2>
            <p className="text-secondary mb-4">
              所有应用支持各个博主直接插入到自己的"服务"栏目中给用户使用，有些内部付费的应用在用户付费后对应博主就可以获得分成。
            </p>
            <p className="text-secondary mb-6">
              如有合作意向，请联系官方客服。
            </p>
            <button className="bg-primary/10 text-primary px-6 py-2 rounded-lg hover:bg-primary/20 transition-colors font-medium">
              了解更多合作详情
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}