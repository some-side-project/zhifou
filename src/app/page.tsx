"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedNumber from "@/components/AnimatedNumber";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  popularBlogs,
  popularTutorials,
  popularFiles,
  qualityServices,
  smartBloggers,
} from "@/lib/mock-data";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 初始化时清除localStorage，确保每次刷新页面都是未登录状态
  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  }, []);

  // 监听storage事件，当Header组件中登录状态改变时更新
  useEffect(() => {
    const handleStorageChange = () => {
      const savedLoggedIn = localStorage.getItem("isLoggedIn");
      if (savedLoggedIn === "true") {
        setIsLoggedIn(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              再小的知识都有价值
            </h1>
            <p className="text-xl text-secondary mb-8">
              建造博客空间，沉淀数字资产
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {!isLoggedIn && (
                <>
                  <Link href="/login" className="btn-primary">
                    开始创建博客
                  </Link>
                  <Link href="/recommended" className="btn-secondary">
                    浏览推荐内容
                  </Link>
                </>
              )}
            </div>

            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link
                href="/recommended"
                className="text-center hover:opacity-90 transition-opacity"
              >
                <div className="text-3xl font-bold text-foreground mb-2">
                  <AnimatedNumber
                    initialMin={12000}
                    initialMax={12500}
                    increment={1}
                  />
                </div>
                <div className="text-secondary">当前博客数</div>
              </Link>
              <Link
                href="/recommended"
                className="text-center hover:opacity-90 transition-opacity"
              >
                <div className="text-3xl font-bold text-foreground mb-2">
                  <AnimatedNumber
                    initialMin={6500}
                    initialMax={7000}
                    increment={1}
                  />
                </div>
                <div className="text-secondary">当前注册用户</div>
              </Link>
              <Link
                href="/recommended"
                className="text-center hover:opacity-90 transition-opacity"
              >
                <div className="text-3xl font-bold text-foreground mb-2">
                  <AnimatedNumber
                    initialMin={1200}
                    initialMax={1300}
                    increment={1}
                  />
                </div>
                <div className="text-secondary">当前在线用户</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Blogs Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">精品博文</h2>
            <Link href="/blogs" className="text-primary hover:underline">
              探索全部
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 近期热门 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">近期热门</h3>
              <div className="bg-white rounded-lg shadow-sm">
                {popularBlogs.slice(0, 7).map((blog, index) => (
                  <div
                    key={blog.id}
                    className={`p-4 ${
                      index !== 6 ? "border-b border-border" : ""
                    } hover:bg-primary/5 transition-colors`}
                  >
                    <div className="flex justify-between">
                      <div className="flex-1 mr-4">
                        <Link
                          href={`/${blog.author.toLowerCase()}/blog/${blog.id}`}
                          className="text-lg font-semibold hover:text-primary transition-colors block mb-1"
                        >
                          {blog.title}
                        </Link>
                        <span className="text-sm text-secondary">
                          {blog.date}
                        </span>
                      </div>
                      <span className="text-sm text-secondary whitespace-nowrap flex items-start pt-1">
                        {blog.views} 浏览
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 猜你喜欢 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">猜你喜欢</h3>
              <div className="bg-white rounded-lg shadow-sm">
                {popularBlogs.slice(7, 14).map((blog, index) => (
                  <div
                    key={blog.id}
                    className={`p-4 ${
                      index !== 6 ? "border-b border-border" : ""
                    } hover:bg-primary/5 transition-colors`}
                  >
                    <div className="flex justify-between">
                      <div className="flex-1 mr-4">
                        <Link
                          href={`/${blog.author.toLowerCase()}/blog/${blog.id}`}
                          className="text-lg font-semibold hover:text-primary transition-colors block mb-1"
                        >
                          {blog.title}
                        </Link>
                        <span className="text-sm text-secondary">
                          {blog.date}
                        </span>
                      </div>
                      <span className="text-sm text-secondary whitespace-nowrap flex items-start pt-1">
                        {blog.views} 浏览
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tutorials Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">品质教程</h2>
            <Link href="/tutorials" className="text-primary hover:underline">
              探索全部
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTutorials.slice(0, 12).map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-secondary mb-4 line-clamp-3">
                  {tutorial.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-secondary mb-3">
                  <Link
                    href={`/${tutorial.author.toLowerCase()}`}
                    className="hover:text-primary transition-colors"
                  >
                    {tutorial.author}
                  </Link>
                  <span>{tutorial.lessons} 课时</span>
                </div>
                <div className="flex items-center text-sm text-secondary mb-4">
                  <span>👥 {tutorial.students} 学习</span>
                </div>
                <Link
                  href={`/${tutorial.author.toLowerCase()}/tutorial/${
                    tutorial.id
                  }`}
                  className="text-sm text-primary hover:underline inline-block"
                >
                  开始学习
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Files Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">热门文件</h2>
            <Link href="/files" className="text-primary hover:underline">
              探索全部
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularFiles.slice(0, 12).map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                  {file.title}
                </h3>
                <p className="text-sm text-secondary mb-4 line-clamp-3">
                  {file.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-secondary mb-3">
                  <Link
                    href={`/${file.author.toLowerCase()}`}
                    className="hover:text-primary transition-colors"
                  >
                    {file.author}
                  </Link>
                  <span>{file.size}</span>
                </div>
                <div className="flex items-center text-sm text-secondary mb-4">
                  <span>⬇️ {file.downloads} 下载</span>
                </div>
                <Link
                  href={`/${file.author.toLowerCase()}/file/${file.id}`}
                  className="text-sm text-primary hover:underline inline-block"
                >
                  下载文件
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Services Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">专业服务</h2>
            <Link href="/services" className="text-primary hover:underline">
              探索全部
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityServices.slice(0, 12).map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                  {service.title}
                </h3>
                <p className="text-sm text-secondary mb-4 line-clamp-3">
                  {service.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-secondary mb-3">
                  <Link
                    href={`/${service.provider.toLowerCase()}`}
                    className="hover:text-primary transition-colors"
                  >
                    {service.provider}
                  </Link>
                  <span>{service.price}</span>
                </div>
                <div className="flex items-center text-sm text-secondary mb-4">
                  <span>⭐ {service.rating} 评分</span>
                </div>
                <Link
                  href={`/${service.provider.toLowerCase()}/service/${
                    service.id
                  }`}
                  className="text-sm text-primary hover:underline inline-block"
                >
                  查看详情
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Bloggers Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">优秀博主</h2>
            <Link href="/bloggers" className="text-primary hover:underline">
              探索全部
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {smartBloggers.slice(0, 15).map((blogger) => (
              <div
                key={blogger.id}
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow text-center"
              >
                <div className="text-4xl mb-3">{blogger.avatar}</div>
                <h3 className="text-base font-semibold mb-2">{blogger.name}</h3>
                <p className="text-xs text-secondary mb-3 line-clamp-2">
                  {blogger.description}
                </p>
                <div className="flex justify-center space-x-3 text-xs text-secondary mb-3">
                  <span>👥 {blogger.followers} 粉丝</span>
                  <span>📝 {blogger.articles} 文章</span>
                </div>
                <Link
                  href={`/${blogger.name.toLowerCase()}`}
                  className="text-xs text-primary hover:underline inline-block"
                >
                  查看主页
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            加入知否，建造你的数字资产
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            在这里，再小的知识都有价值，每个人都可以拥有自己的个人博客空间，沉淀价值，连接世界。
          </p>
          <Link
            href="/login"
            className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-all inline-block"
          >
            立即登录
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
