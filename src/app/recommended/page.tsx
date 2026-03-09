"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RecommendedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  // 模拟数据
  const generateMockData = (pageNum: number) => {
    const newPosts: any[] = [];
    const startIndex = (pageNum - 1) * 10;

    // 博客类型数据
    for (let i = 0; i < 4; i++) {
      newPosts.push({
        id: `blog-${startIndex + i}`,
        type: "blog",
        title: `如何在${pageNum}天内掌握前端开发${i + 1}`,
        summary: `本文将详细介绍前端开发的学习路径，包括HTML、CSS、JavaScript、React等核心技术的学习方法和实践技巧。通过本教程，你将能够快速掌握前端开发的精髓，成为一名优秀的前端工程师。`,
        author: `作者${Math.floor(Math.random() * 100)}`,
        date: `2026-02-${Math.floor(Math.random() * 28) + 1}`,
        views: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 100),
        image: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=frontend%20development%20coding%20tutorial%20abstract%20concept&image_size=landscape_4_3`,
        category: ["前端开发", "React"][Math.floor(Math.random() * 2)],
      });
    }

    // 教程类型数据
    for (let i = 0; i < 2; i++) {
      newPosts.push({
        id: `tutorial-${startIndex + i}`,
        type: "tutorial",
        title: `TypeScript高级类型实践${i + 1}`,
        summary: `本教程将深入讲解TypeScript的高级类型系统，包括泛型、条件类型、映射类型等高级特性。通过大量实例和练习，帮助你掌握TypeScript的类型系统精髓。`,
        author: `教程作者${Math.floor(Math.random() * 100)}`,
        date: `2026-02-${Math.floor(Math.random() * 28) + 1}`,
        views: Math.floor(Math.random() * 10000),
        students: Math.floor(Math.random() * 5000),
        lessons: Math.floor(Math.random() * 30) + 5,
        image: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=typescript%20advanced%20types%20coding%20tutorial&image_size=landscape_4_3`,
        category: ["TypeScript", "前端开发"][Math.floor(Math.random() * 2)],
      });
    }

    // 服务类型数据
    for (let i = 0; i < 1; i++) {
      newPosts.push({
        id: `service-${startIndex + i}`,
        type: "service",
        title: `前端技术咨询服务${i + 1}`,
        summary: `提供专业的前端技术咨询服务，包括技术选型、架构设计、性能优化等方面的专业建议和解决方案。`,
        author: `服务提供者${Math.floor(Math.random() * 100)}`,
        date: `2026-02-${Math.floor(Math.random() * 28) + 1}`,
        price: `¥${Math.floor(Math.random() * 1000) + 200}/次`,
        rating: (Math.random() * 5).toFixed(1),
        reviews: Math.floor(Math.random() * 100),
        category: ["技术咨询", "前端服务"][Math.floor(Math.random() * 2)],
      });
    }

    // 文件类型数据
    for (let i = 0; i < 1; i++) {
      newPosts.push({
        id: `file-${startIndex + i}`,
        type: "file",
        title: `前端开发资源包${i + 1}`,
        summary: `包含前端开发常用的工具、模板、组件库等资源，帮助你提高开发效率。`,
        author: `资源提供者${Math.floor(Math.random() * 100)}`,
        date: `2026-02-${Math.floor(Math.random() * 28) + 1}`,
        files: Math.floor(Math.random() * 50) + 10,
        size: `${Math.floor(Math.random() * 1000) + 100}MB`,
        downloads: Math.floor(Math.random() * 1000),
        category: ["开发资源", "前端工具"][Math.floor(Math.random() * 2)],
      });
    }

    // 博主推荐类型数据
    for (let i = 0; i < 2; i++) {
      newPosts.push({
        id: `blogger-${startIndex + i}`,
        type: "blogger",
        title: `推荐博主：${Math.floor(Math.random() * 1000)}`,
        summary: `专注于前端开发领域，分享高质量的技术文章和实战经验，拥有丰富的行业经验和专业知识。`,
        author: `系统推荐`,
        date: `2026-02-${Math.floor(Math.random() * 28) + 1}`,
        followers: Math.floor(Math.random() * 10000) + 1000,
        articles: Math.floor(Math.random() * 100) + 10,
        avatar: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20developer%20avatar%20portrait&image_size=square`,
        category: ["前端专家", "技术博主"][Math.floor(Math.random() * 2)],
      });
    }

    return newPosts;
  };

  // 加载更多数据
  const loadMorePosts = () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // 模拟网络请求延迟
    setTimeout(() => {
      const newPosts = generateMockData(page + 1);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);

      // 模拟数据有限，当达到一定页数后停止加载
      if (page + 1 >= 5) {
        setHasMore(false);
      }
    }, 1000);
  };

  // 初始化数据
  useEffect(() => {
    setPosts(generateMockData(1));
  }, []);

  // 无限加载实现
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore]);

  // 模拟新博客自动插入到顶部
  useEffect(() => {
    const interval = setInterval(() => {
      const newBlog = {
        id: `blog-${Date.now()}`,
        type: "blog",
        title: `最新博客：${
          [
            "React 19 新特性",
            "TypeScript 5.0 技巧",
            "Python 异步编程",
            "Java 21 虚拟线程",
            "前端性能优化",
          ][Math.floor(Math.random() * 5)]
        }`,
        summary:
          "这是一篇刚刚发布的新博客，包含了最新的技术资讯和实用的开发技巧...",
        author: `作者${Math.floor(Math.random() * 100)}`,
        date: new Date().toISOString().split("T")[0],
        views: 0,
        likes: 0,
        comments: 0,
        image: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=latest%20technology%20blog%20abstract%20concept&image_size=landscape_4_3`,
        category: ["前端开发", "React", "TypeScript", "Python", "Java"][
          Math.floor(Math.random() * 5)
        ],
        isNew: true,
      };

      // 将新博客插入到顶部
      setPosts((prevPosts) => [
        newBlog,
        ...prevPosts.map((post) => ({ ...post, isNew: false })),
      ]);
    }, 10000); // 每10秒插入一篇新博客

    return () => clearInterval(interval);
  }, []);

  // 监听新博客插入，在动画结束后将 isNew 设置为 false
  useEffect(() => {
    const newPosts = posts.filter((post) => post.isNew);
    if (newPosts.length > 0) {
      // 动画持续时间为 500ms，所以在 600ms 后将 isNew 设置为 false
      setTimeout(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) => ({ ...post, isNew: false }))
        );
      }, 600);
    }
  }, [posts]);

  // 渲染不同类型的帖子
  const renderPost = (post: any) => {
    switch (post.type) {
      case "blog":
        return (
          <div className="flex flex-col md:flex-row gap-4 p-6 hover:bg-muted/50 transition-all duration-500">
            {post.image && (
              <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  博客
                </span>
                <span className="text-xs text-secondary ml-2">
                  {post.category}
                </span>
              </div>
              <Link href={`/${post.author}/blog/${post.id}`}>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary mb-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-secondary mb-4 line-clamp-2">{post.summary}</p>
              <div className="flex items-center justify-between text-sm text-secondary">
                <div className="flex items-center">
                  <Link href={`/${post.author}`} className="hover:text-primary">
                    {post.author}
                  </Link>
                  <span className="mx-2">·</span>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>👁 {post.views}</span>
                  <span>👍 {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "tutorial":
        return (
          <div className="flex flex-col md:flex-row gap-4 p-6 hover:bg-muted/50 transition-all duration-500">
            {post.image && (
              <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  教程
                </span>
                <span className="text-xs text-secondary ml-2">
                  {post.category}
                </span>
              </div>
              <Link href={`/${post.author}/tutorial/${post.id}`}>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary mb-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-secondary mb-4 line-clamp-2">{post.summary}</p>
              <div className="flex items-center justify-between text-sm text-secondary">
                <div className="flex items-center">
                  <Link href={`/${post.author}`} className="hover:text-primary">
                    {post.author}
                  </Link>
                  <span className="mx-2">·</span>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>👁 {post.views}</span>
                  <span>👥 {post.students}</span>
                  <span>📚 {post.lessons}课时</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "service":
        return (
          <div className="flex flex-col md:flex-row gap-4 p-6 hover:bg-muted/50 transition-all duration-500">
            <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20service%20icon%20business%20consulting%20abstract%20background&image_size=landscape_4_3"
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  服务
                </span>
                <span className="text-xs text-secondary ml-2">
                  {post.category}
                </span>
              </div>
              <Link href={`/${post.author}/service/${post.id}`}>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary mb-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-secondary mb-4 line-clamp-2">{post.summary}</p>
              <div className="flex items-center justify-between text-sm text-secondary">
                <div className="flex items-center">
                  <Link href={`/${post.author}`} className="hover:text-primary">
                    {post.author}
                  </Link>
                  <span className="mx-2">·</span>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-primary font-semibold">
                    {post.price}
                  </span>
                  <span>⭐ {post.rating}</span>
                  <span>💬 {post.reviews}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "file":
        return (
          <div className="flex flex-col md:flex-row gap-4 p-6 hover:bg-muted/50 transition-all duration-500">
            <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=file%20resources%20folder%20icon%20digital%20assets%20abstract%20background&image_size=landscape_4_3"
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  文件
                </span>
                <span className="text-xs text-secondary ml-2">
                  {post.category}
                </span>
              </div>
              <Link href={`/${post.author}/files/${post.id}`}>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary mb-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-secondary mb-4 line-clamp-2">{post.summary}</p>
              <div className="flex items-center justify-between text-sm text-secondary">
                <div className="flex items-center">
                  <Link href={`/${post.author}`} className="hover:text-primary">
                    {post.author}
                  </Link>
                  <span className="mx-2">·</span>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>📁 {post.files}文件</span>
                  <span>💾 {post.size}</span>
                  <span>⬇️ {post.downloads}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "blogger":
        return (
          <div className="flex flex-col md:flex-row gap-4 p-6 hover:bg-muted/50 transition-all duration-500">
            <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-muted">
              <Link href={`/${post.title.replace("推荐博主：", "")}`}>
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={post.avatar}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  博主
                </span>
                <span className="text-xs text-secondary ml-2">
                  {post.category}
                </span>
              </div>
              <Link href={`/${post.title.replace("推荐博主：", "")}`}>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary mb-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-secondary mb-4 line-clamp-2">{post.summary}</p>
              <div className="flex items-center justify-between text-sm text-secondary">
                <div className="flex items-center">
                  <span>{post.author}</span>
                  <span className="mx-2">·</span>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>👥 {post.followers}粉丝</span>
                  <span>📝 {post.articles}文章</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 面包屑导航 */}
          <div className="mb-6 text-sm text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">
              首页
            </Link>
            {" > "}
            <span className="text-foreground">推荐</span>
          </div>

          <div className="space-y-4 mb-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                style={{
                  opacity: post.isNew ? 0 : 1,
                  transform: post.isNew
                    ? "translateY(-20px) scale(0.95)"
                    : "translateY(0) scale(1)",
                  transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                }}
              >
                {renderPost(post)}
              </div>
            ))}

            {loading && (
              <div className="p-6 text-center bg-white rounded-xl shadow-md">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-secondary">加载中...</p>
              </div>
            )}

            {/* 加载触发元素 */}
            <div ref={observerRef} className="py-8 text-center">
              {!hasMore && !loading && (
                <span className="text-secondary">没有更多内容了</span>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
