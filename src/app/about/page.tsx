import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* 面包屑导航 */}
          <div className="mb-8 text-sm text-secondary">
            <a href="/" className="hover:text-primary transition-colors">首页</a>
            {' > '}
            <span className="text-foreground">关于我们</span>
          </div>
          
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">关于我们</h1>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>
          
          {/* 主体内容 */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* 工作室信息 */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6">工作室信息</h2>
              <div className="space-y-4">
                <p className="text-secondary">
                  <strong>名称：</strong>深圳市龙华区码上律动信息服务工作室
                </p>
                <p className="text-secondary">
                  <strong>使命：</strong>建造你的博客数字资产，为长内容创作者提供新的自留地
                </p>
                <p className="text-secondary">
                  <strong>愿景：</strong>成为AI时代最受欢迎的长内容创作平台，让知识得以系统化传承
                </p>
              </div>
            </div>
            
            {/* 长内容哲学 */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6">长内容哲学</h2>
              <div className="space-y-4 text-secondary">
                <p>
                  在这个信息爆炸的时代，我们每天被海量的短视频、推文和碎片化信息包围。这些快餐式内容虽然能够快速满足我们的好奇心，却难以构建系统化的知识体系。
                </p>
                <p>
                  我们坚信，<strong>长内容才是知识传承的最佳载体</strong>。只有通过深入、系统的思考和表达，才能真正传递有价值的信息，帮助读者建立完整的认知框架。
                </p>
                <p>
                  新浪博客等传统平台已经逐渐式微，界面陈旧，功能落后，无法满足现代创作者的需求。而那些依然坚持在上面发表长文的作者们，急需一个全新的、符合AI时代特征的博客平台。
                </p>
                <p>
                  我们创建「知否」，正是为了填补这个空白。这里是长内容爱好者的乐园，是厌倦了快餐文化的人们的精神家园，是热爱思考和表达的创作者的自留地。
                </p>
                <p>
                  在「知否」，你可以：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>享受极致优雅的长内容编辑体验，专注于创作本身</li>
                  <li>将博客打造成个人数字资产空间，撰写教程专辑、存储文件、提供服务</li>
                  <li>掌控数据安全，随时备份或迁移你的所有内容</li>
                  <li>借助AI智能能力，自动生成摘要、获取创作灵感、24小时处理用户咨询</li>
                </ul>
              </div>
            </div>
            
            {/* 我们的优势 */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6">我们的优势</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">极致优雅的长内容编辑体验</h3>
                  <p className="text-secondary">专为长文创作打造的博主自留地，提供流畅的编辑和管理能力，满足博客爱好者对编写体验的高要求</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">数字资产沉淀与管理</h3>
                  <p className="text-secondary">是博客，更是个人数字资产空间。可将博文撰写成教程专辑、可存储文件分享、可向粉丝提供线下交流服务</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">数据安全可控</h3>
                  <p className="text-secondary">我们保护您的数据，但不垄断您的数据。系统自带了定期备份功能，您可随时下载所有博客数据到本地电脑或迁移到其他系统</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">AI智能博客</h3>
                  <p className="text-secondary">AI时代，有先进的模型协助您自动生成博文摘要、AI协助您生成博文大纲和灵感、AI助理学习你所有知识并协助您24小时处理用户咨询</p>
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
