'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')

    // 初始化时清除localStorage，确保每次刷新页面都是未登录状态
    useEffect(() => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('username')
        setIsLoggedIn(false)
        setUsername('')
    }, [])



    // 检查当前路径是否匹配导航项
   const isActive = (path: string) => {
     if (path === '/') {
       // 定义探索页面路径
       const explorationPaths = ['/blogs', '/tutorials', '/files', '/services', '/bloggers'];
       // 检查是否是探索页面
       const isExplorationPath = explorationPaths.some(p => pathname === p || pathname.startsWith(p + '/'));
       // 只在首页或真正的探索页面时，首页链接为活跃状态
       return pathname === '/' || isExplorationPath;
     }
     return pathname.startsWith(path)
   }

   // 检查是否需要隐藏导航菜单项的场景
   const shouldHideNavigation = () => {
     // 博主个人主页：/[username]
     // 博主个人的内容详情页：/[username]/blog/[id], /[username]/tutorial/[id], /[username]/service/[id] 等
     // 内容包详情页：/[username]/files/[id]
     // 内容包的具体内容详情页：更深层次的路径
     
     // 定义已知的探索页面路径
     const explorationPaths = ['/blogs', '/tutorials', '/files', '/services', '/bloggers', '/following', '/recommended'];
     
     // 检查当前路径是否是探索页面
     const isExplorationPath = explorationPaths.some(path => pathname === path || pathname.startsWith(path + '/'));
     
     // 检查当前路径是否是博主个人页面或其子页面
     const isUserPage = /^\/[^/]+(\/.*)?$/.test(pathname);
     
     // 只在非探索页面且是用户页面时隐藏导航
     return isUserPage && !isExplorationPath;
   }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="container mx-auto px-4 py-4 grid grid-cols-3 items-center">
        <div className="flex flex-col">
          <Link href="/" className="text-2xl font-bold text-primary">
            知否
          </Link>
          <span className="text-xs text-secondary">zhifouzhifou.cn</span>
        </div>
        
        <div className="flex justify-center">
          {!shouldHideNavigation() && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className={`transition-colors ${isActive('/') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                首页
              </Link>
              <Link 
                href="/recommended" 
                className={`transition-colors ${isActive('/recommended') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                推荐
              </Link>
              <Link 
                href="/following" 
                className={`transition-colors ${isActive('/following') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                关注
              </Link>
            </nav>
          )}
        </div>
        
        <div className="flex justify-end items-center space-x-4">
          {!isLoggedIn ? (
            <button 
              onClick={() => {
                // 模拟登录，设置默认用户名
                setIsLoggedIn(true)
                setUsername('demo')
                // 存储到localStorage用于组件间同步
                localStorage.setItem('isLoggedIn', 'true')
                localStorage.setItem('username', 'demo')
                // 触发storage事件，通知其他组件
                window.dispatchEvent(new Event('storage'))
              }} 
              className="btn-primary"
            >
              登录
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <Link href={`/${username}`} className="btn-primary">
                我的博客
              </Link>
              <Link href="/settings" className="btn-secondary">
                个人中心
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
