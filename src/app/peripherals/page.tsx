"use client";

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useEffect, useRef, useState } from 'react'

export default function PeripheralsPage() {
  const products = [
    {
      id: 'tshirt-short',
      name: '短袖T恤',
      price: 99,
      image: 'https://picsum.photos/seed/tshirt1/800/800',
      description: '舒适透气的短袖T恤，正面印有"知否"汉字，简约大方。',
      features: ['100%纯棉材质', '舒适透气', '简约设计', '文化内涵', '亲民价格'],
      highlights: '采用优质纯棉面料，柔软舒适，透气性好。简约的设计风格，正面印制"知否"汉字，彰显文化内涵。适合日常穿着，百搭时尚。'
    },
    {
      id: 'tshirt-long',
      name: '长袖T恤',
      price: 119,
      image: 'https://picsum.photos/seed/tshirt2/800/800',
      description: '保暖舒适的长袖T恤，正面印有"知否"汉字，适合春秋季节。',
      features: ['100%纯棉材质', '保暖舒适', '简约设计', '文化内涵', '适合春秋'],
      highlights: '采用优质纯棉面料，保暖舒适，适合春秋季节穿着。简约的设计风格，正面印制"知否"汉字，彰显文化内涵。百搭时尚，适合各种场合。'
    },
    {
      id: 'hoodie',
      name: '卫衣',
      price: 199,
      image: 'https://picsum.photos/seed/hoodie/800/800',
      description: '保暖舒适的卫衣，正面印有"知否"汉字，适合秋冬季节。',
      features: ['80%棉 20%聚酯纤维', '保暖舒适', '时尚设计', '文化内涵', '适合秋冬'],
      highlights: '采用优质混纺面料，保暖舒适，适合秋冬季节穿着。时尚的卫衣设计，正面印制"知否"汉字，彰显文化内涵。休闲百搭，潮流必备。'
    },
    {
      id: 'cap',
      name: '鸭舌帽',
      price: 89,
      image: 'https://picsum.photos/seed/cap/800/800',
      description: '时尚百搭的鸭舌帽，正面印有"知否"汉字，适合日常佩戴。',
      features: ['100%纯棉材质', '时尚百搭', '可调节尺寸', '文化内涵', '适合日常'],
      highlights: '采用优质纯棉面料，舒适透气。时尚的鸭舌帽设计，正面印制"知否"汉字，彰显文化内涵。可调节尺寸，适合各种头围。日常搭配必备单品。'
    }
  ]

  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({})
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.3 }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              文化内涵，品质生活
            </p>
          </div>
          
          {products.map((product, index) => (
            <div
              key={product.id}
              id={product.id}
              ref={(el) => (sectionRefs.current[product.id] = el)}
              className={`mb-24 flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
            >
              <div 
                className={`w-full md:w-1/2 transition-all duration-700 ease-out ${visibleSections[product.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
              
              <div 
                className={`w-full md:w-1/2 transition-all duration-700 ease-out delay-300 ${visibleSections[product.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <Link 
                  href={`/peripherals/${product.id}`}
                  className="block group"
                >
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{product.name}</h2>
                  <div className="text-2xl font-bold text-primary mb-6">¥{product.price}</div>
                  <p className="text-lg text-secondary mb-6">{product.description}</p>
                  <p className="text-base mb-8">{product.highlights}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {product.features.map((feature, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-primary font-semibold group-hover:underline">
                    <span>查看详情</span>
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
          
          {/* 周边定制服务 */}
          <div className="mt-24 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">周边定制</h2>
              <p className="text-lg text-secondary max-w-2xl mx-auto">
                想要独一无二的周边产品？发起众筹定制，我们帮你实现
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-3">设计定制</h3>
                <p className="text-secondary">
                  提交你的设计想法，我们的设计师会帮你实现，打造专属周边
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-3">众筹发起</h3>
                <p className="text-secondary">
                  发起众筹，达到目标数量后我们将统一生产和发售
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-3">统一发售</h3>
                <p className="text-secondary">
                  定制完成后，我们会统一生产并配送到你的手中
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link 
                href="#" 
                className="btn-primary inline-block px-8 py-3 text-lg font-semibold"
              >
                发起定制
              </Link>
              <p className="text-secondary mt-4">
                定制流程：提交设计 → 发起众筹 → 达到目标 → 生产发货
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}