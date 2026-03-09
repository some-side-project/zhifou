import { useState, useEffect } from 'react'

interface AnimatedNumberProps {
  initialMin: number
  initialMax: number
  increment: number
}

export default function AnimatedNumber({ initialMin, initialMax, increment = 1 }: AnimatedNumberProps) {
  // 初始值设置为0，在客户端挂载后再生成随机值
  const [count, setCount] = useState(0)

  // 只在客户端生成随机初始值，避免服务器端和客户端渲染不匹配
  useEffect(() => {
    // 生成随机初始值
    const randomInitial = Math.floor(Math.random() * (initialMax - initialMin + 1)) + initialMin
    setCount(randomInitial)
  }, [initialMin, initialMax])

  useEffect(() => {
    const increaseCount = () => {
      setCount(prev => prev + increment)
      
      // 随机间隔时间，1-5秒
      const randomDelay = Math.floor(Math.random() * 4000) + 1000
      setTimeout(increaseCount, randomDelay)
    }

    // 初始延迟1秒开始
    const initialTimer = setTimeout(increaseCount, 1000)

    return () => clearTimeout(initialTimer)
  }, [increment])

  // 格式化数字，添加千位分隔符
  const formattedCount = count.toLocaleString()

  return <span>{formattedCount}</span>
}
