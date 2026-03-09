"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const pathname = usePathname();
  const { isLoggedIn, username, login } = useAuth();

  const isBloggerPage = pathname === "/demo" || pathname.startsWith("/demo/");

  const isActive = (path: string) => {
    if (path === "/") {
      const explorationPaths = [
        "/blogs",
        "/tutorials",
        "/files",
        "/services",
        "/bloggers",
      ];
      const isExplorationPath = explorationPaths.some(
        (p) => pathname === p || pathname.startsWith(p + "/")
      );
      return pathname === "/" || isExplorationPath;
    }
    return pathname.startsWith(path);
  };

  const shouldHideNavigation = () => {
    const explorationPaths = [
      "/blogs",
      "/tutorials",
      "/files",
      "/services",
      "/bloggers",
      "/following",
      "/recommended",
      "/peripherals",
      "/apps",
    ];
    const isExplorationPath = explorationPaths.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    );
    const isUserPage = /^\/[^/]+(\/.*)?$/.test(pathname);
    return isUserPage && !isExplorationPath;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="container mx-auto px-4 py-4 grid grid-cols-3 items-center">
        <Link
          href="/"
          className="flex flex-col hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl font-bold text-primary">知否</span>
          <span className="text-xs text-secondary">zhifouzhifou.cn</span>
        </Link>

        <div className="flex justify-center">
          {!shouldHideNavigation() && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={`transition-colors ${
                  isActive("/")
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                首页
              </Link>
              <Link
                href="/recommended"
                className={`transition-colors ${
                  isActive("/recommended")
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                最新
              </Link>
              <Link
                href="/following"
                className={`transition-colors ${
                  isActive("/following")
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                关注
              </Link>
              <Link
                href="/peripherals"
                className={`transition-colors ${
                  isActive("/peripherals")
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                周边
              </Link>
              <Link
                href="/apps"
                className={`transition-colors ${
                  isActive("/apps")
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                应用
              </Link>
            </nav>
          )}
        </div>

        <div className="flex justify-end items-center space-x-4">
          {!isLoggedIn ? (
            <button
              onClick={() => {
                login("demo");
                if (!isBloggerPage) {
                  window.location.href = "/demo";
                }
              }}
              className="btn-primary"
            >
              登录
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href={`/${username}`}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
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
  );
}
