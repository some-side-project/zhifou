import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">知否</h3>
            <p className="text-gray-400">建造你的博客数字资产</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                关于我们
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                联系我们
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">产品</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">知否</Link></li>
              <li><Link href="/discover" className="text-gray-400 hover:text-white transition-colors">寻必得</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">资源</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">帮助中心</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">官方博客</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">种子用户群</Link></li>

              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">API文档</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">法律</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">隐私政策</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">服务条款</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">版权声明</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookie政策</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© 2026 知否 zhifouzhifou.cn. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}
