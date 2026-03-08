import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { Providers } from "./providers";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "建造你的数字资产空间",
  description: "每个人的个人数字资产沉淀和变现平台",
  keywords: ["博客", "教程", "文件", "服务", "AI助理"],
  authors: [{ name: "知否团队" }],
  viewport: "width=device-width, initial-scale=1",
  icons: [
    {
      url: "/favicon.ico",
      sizes: "any",
      type: "image/x-icon",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "https://hm.baidu.com/hm.js?912b75d4543bfb1e5f33baa520411ae5"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();',
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
