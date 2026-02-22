'use client'

import React, { useEffect, useRef } from 'react'

export default function AIAssistantIcon({ onClick }: { onClick?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Particle animation removed per user request

  return (
    <div 
      ref={containerRef}
      onClick={onClick}
      className="relative w-48 h-48 cursor-pointer group flex items-center justify-center"
    >
      {/* 中心核心 */}
      <div className="relative w-32 h-32">
        {/* 核心球体 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 animate-core-pulse"></div>
        
        {/* 内部发光 */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-blue-500/40 animate-inner-pulse"></div>
        
        {/* 中心亮点 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/60 rounded-full blur-sm"></div>
      </div>

      {/* 动态光环 */}
      <div className="absolute inset-0 rounded-full border-2 border-blue-400/60 animate-ring-expand"></div>
      <div className="absolute inset-4 rounded-full border border-blue-300/50 animate-ring-contract"></div>
      <div className="absolute inset-8 rounded-full border border-blue-200/40 animate-ring-pulse"></div>

      {/* 外部能量波 */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-400/10 to-transparent animate-energy-pulse"></div>
      </div>

      {/* 点击波纹效果 */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-blue-400/20 scale-0 group-active:scale-100 transition-transform duration-500 rounded-full"></div>
      </div>

      {/* CSS动画 */}
      <style jsx>{`


        @keyframes core-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(37, 99, 235, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(59, 130, 246, 1), 0 0 60px rgba(37, 99, 235, 0.6), 0 0 80px rgba(29, 78, 216, 0.4);
          }
        }

        @keyframes inner-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }

        @keyframes ring-expand {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes ring-contract {
          0% {
            transform: scale(1.2);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }

        @keyframes ring-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.7;
          }
        }

        @keyframes energy-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }

        .animate-core-pulse {
          animation: core-pulse 3s ease-in-out infinite;
        }

        .animate-inner-pulse {
          animation: inner-pulse 2s ease-in-out infinite;
        }

        .animate-ring-expand {
          animation: ring-expand 4s linear infinite;
        }

        .animate-ring-contract {
          animation: ring-contract 4s linear infinite;
        }

        .animate-ring-pulse {
          animation: ring-pulse 3s ease-in-out infinite;
        }

        .animate-energy-pulse {
          animation: energy-pulse 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
