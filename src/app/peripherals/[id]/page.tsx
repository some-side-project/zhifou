"use client";

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string }

  const products = [
    {
      id: 'tshirt-short',
      name: '短袖T恤',
      price: 99,
      image: 'https://picsum.photos/seed/tshirt1/800/800',
      description: '舒适透气的短袖T恤，正面印有"知否"汉字，简约大方。',
      details: '材质：100%棉\n尺码：S、M、L、XL、XXL\n颜色：白色、黑色、灰色\n洗涤说明：建议手洗或机洗轻柔模式'
    },
    {
      id: 'tshirt-long',
      name: '长袖T恤',
      price: 119,
      image: 'https://picsum.photos/seed/tshirt2/800/800',
      description: '保暖舒适的长袖T恤，正面印有"知否"汉字，适合春秋季节。',
      details: '材质：100%棉\n尺码：S、M、L、XL、XXL\n颜色：白色、黑色、灰色\n洗涤说明：建议手洗或机洗轻柔模式'
    },
    {
      id: 'hoodie',
      name: '卫衣',
      price: 199,
      image: 'https://picsum.photos/seed/hoodie/800/800',
      description: '保暖舒适的卫衣，正面印有"知否"汉字，适合秋冬季节。',
      details: '材质：80%棉 20% polyester\n尺码：S、M、L、XL、XXL\n颜色：白色、黑色、灰色\n洗涤说明：建议手洗或机洗轻柔模式'
    },
    {
      id: 'cap',
      name: '鸭舌帽',
      price: 89,
      image: 'https://picsum.photos/seed/cap/800/800',
      description: '时尚百搭的鸭舌帽，正面印有"知否"汉字，适合日常佩戴。',
      details: '材质：100%棉\n尺寸：可调节\n颜色：黑色、藏青色、灰色\n洗涤说明：建议手洗'
    }
  ]

  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">产品不存在</h1>
          <Link href="/peripherals" className="btn-primary">返回周边页面</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* 面包屑导航 */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/">首页</Link>
            <span>/</span>
            <Link href="/peripherals">周边</Link>
            <span>/</span>
            <span className="text-gray-500">{product.name}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl font-bold text-primary mb-6">¥{product.price}</p>
              <p className="text-secondary mb-6">{product.description}</p>
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">产品详情</h2>
                <pre className="text-sm text-secondary whitespace-pre-line">{product.details}</pre>
              </div>
              <button className="btn-primary w-full py-3 text-lg">立即购买</button>
            </div>
          </div>
          
          {/* 商品详细介绍 */}
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-2xl font-bold mb-6">商品详情</h2>
            
            {/* 商品图片展示 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">商品展示</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img 
                  src={product.image} 
                  alt={`${product.name} 展示图1`} 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <img 
                  src={`https://picsum.photos/seed/${product.id}1/800/800`} 
                  alt={`${product.name} 展示图2`} 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <img 
                  src={`https://picsum.photos/seed/${product.id}2/800/800`} 
                  alt={`${product.name} 展示图3`} 
                  className="w-full h-64 object-cover rounded-lg md:col-span-3"
                />
              </div>
            </div>
            
            {/* 商品参数 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">商品参数</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">材质</p>
                  <p className="font-medium">{product.details.split('\n')[0].split('：')[1]}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">尺码</p>
                  <p className="font-medium">{product.details.split('\n')[1].split('：')[1]}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">颜色</p>
                  <p className="font-medium">{product.details.split('\n')[2].split('：')[1]}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">洗涤说明</p>
                  <p className="font-medium">{product.details.split('\n')[3].split('：')[1]}</p>
                </div>
              </div>
            </div>
            
            {/* 商品描述 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">商品描述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{product.description}</p>
                <p className="mb-4">
                  这款{product.name}采用优质面料制作，舒适透气，适合日常穿着。正面印制"知否"汉字，简约大方，彰显文化内涵。
                </p>
                <p className="mb-4">
                  设计上注重细节，剪裁合体，穿着舒适。多种颜色和尺码选择，满足不同人群的需求。
                </p>
                <p>
                  无论是日常休闲还是户外活动，这款{product.name}都是您的理想选择。品质保证，价格亲民，值得拥有。
                </p>
              </div>
            </div>
            
            {/* 品牌故事 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">品牌故事</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  知否品牌致力于将传统文化与现代设计相结合，打造具有文化内涵的高品质周边产品。
                </p>
                <p className="mb-4">
                  我们相信，再小的知识都有价值，每个人都可以通过我们的产品表达对文化的热爱和追求。
                </p>
                <p>
                  所有产品均采用优质材料制作，经过严格的质量控制，确保给您带来最好的使用体验。
                </p>
              </div>
            </div>
            
            {/* 顾客评价 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">顾客评价</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">张三</span>
                    <span className="text-gray-500 text-sm">2024-01-15</span>
                  </div>
                  <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
                  <p className="text-gray-700">质量很好，面料舒适，印花清晰，非常喜欢！</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">李四</span>
                    <span className="text-gray-500 text-sm">2024-01-10</span>
                  </div>
                  <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
                  <p className="text-gray-700">尺码合适，颜色正，物流很快，满意的购物体验。</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">王五</span>
                    <span className="text-gray-500 text-sm">2024-01-05</span>
                  </div>
                  <div className="text-yellow-400 mb-2">⭐⭐⭐⭐</div>
                  <p className="text-gray-700">整体不错，面料舒适，就是价格稍微贵了一点。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}