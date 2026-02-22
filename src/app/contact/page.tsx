import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* 面包屑导航 */}
          <div className="mb-8 text-sm text-secondary">
            <a href="/" className="hover:text-primary transition-colors">首页</a>
            {' > '}
            <span className="text-foreground">联系我们</span>
          </div>
          
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">联系我们</h1>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>
          
          {/* 主体内容 */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* 种子用户群 */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6">种子用户群</h2>
              <div className="flex flex-col items-center space-y-6">
                <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  {/* Mock二维码 */}
                  <img 
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=QR%20code%20for%20WeChat%20group%2C%20black%20and%20white%2C%20clean%20background%2C%20high%20quality&image_size=square" 
                    alt="种子用户群二维码" 
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <p className="text-center text-secondary">
                  扫描上方二维码加入我们的种子用户群，与其他创作者一起交流，获取平台最新动态和专属福利。
                </p>
                <div className="text-center text-sm text-secondary">
                  <p>群名称：知否创作者社区</p>
                  <p>进群暗号：长内容爱好者</p>
                </div>
              </div>
            </div>
            
            {/* 联系方式 */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6">联系方式</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">邮箱</h3>
                      <p className="text-secondary">contact@zhifouzhifou.cn</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary">💬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">社交媒体</h3>
                      <p className="text-secondary">微信公众号：知否博客</p>
                      <p className="text-secondary">微博：@知否博客平台</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary">📍</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">地址</h3>
                      <p className="text-secondary">深圳市龙华区</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary">⌚</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">工作时间</h3>
                      <p className="text-secondary">周一至周五：9:00 - 18:00</p>
                      <p className="text-secondary">周末：休息</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 留言反馈 */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6">留言反馈</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="您的姓名" 
                    className="px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input 
                    type="email" 
                    placeholder="您的邮箱" 
                    className="px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="留言主题" 
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <textarea 
                  placeholder="请输入您的留言内容..." 
                  rows={5} 
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
                <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                  提交留言
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
