"use client";

import { bookmarks } from "@/constants/bookmarks";
import { githubHome, navItems } from "@/constants/navigation";
import { projects } from "@/constants/projects";
import { viewMeta } from "@/constants/view-meta";
import { useAccentTheme } from "@/hooks/useAccentTheme";
import type { BookmarkDashboardProps } from "@/types/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import SvgIcon from "@/components/SvgIcon";

function getHost(url: string) {
  return new URL(url).hostname.replace("www.", "");
}

export default function BookmarkDashboard({
  view = "site",
}: BookmarkDashboardProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const { accent, cycleTheme } = useAccentTheme();
  const meta = viewMeta[view];
  const isProjectView = view === "github";

  const visibleBookmarks = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const baseItems = meta.category
      ? bookmarks.filter((bookmark) => bookmark.category === meta.category)
      : bookmarks;

    return baseItems.filter((bookmark) => {
      if (!keyword) {
        return true;
      }

      return [bookmark.name, bookmark.note, bookmark.category, bookmark.tone]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });
  }, [meta.category, query]);

  const visibleProjects = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return projects.filter((project) => {
      if (!keyword) {
        return true;
      }

      return [project.name, project.note, project.stack, project.status]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });
  }, [query]);

  return (
    <main
      className="min-h-screen overflow-hidden bg-[#0f1110] text-[#f4efe3]"
      style={
        {
          "--accent": accent.value,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_14%_8%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_38%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-60" />

      <section className="relative flex min-h-screen w-full flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 -mx-4 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="grid gap-3 bg-[#0f1110]/82 px-1 py-2 md:grid-cols-[auto_1fr_auto] md:items-center">
            <Link
              className="group flex items-center gap-3 px-2 py-1.5"
              href="/"
              aria-label="回到站点导航"
            >
              <span className="grid h-10 w-10 place-items-center rounded-md bg-[color-mix(in_srgb,var(--accent)_15%,#171a17)] text-[color:var(--accent)]">
                <SvgIcon className="h-7 w-7" name="logo" />
              </span>
              <span>
                <span className="block text-sm font-black tracking-normal text-[#fff8e9]">
                  Personal Atlas
                </span>
                <span className="block text-xs text-[#8d8778]">
                  URL Collection
                </span>
              </span>
            </Link>

            <nav
              className="flex flex-wrap items-center gap-2 md:justify-center"
              aria-label="一级导航"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    className={`rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] ${
                      isActive
                        ? "bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-white"
                        : "text-[#cfc7b4] hover:bg-white/[0.055] hover:text-white"
                    }`}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 md:justify-end">
              <button
                aria-label={`切换主题色，当前为 ${accent.label}`}
                className="grid h-10 w-10 place-items-center rounded-md bg-white/[0.055] text-[color:var(--accent)] transition hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                onClick={cycleTheme}
                title={`Theme: ${accent.label}`}
                type="button"
              >
                <SvgIcon className="h-5 w-5" name="palette" />
              </button>
              <a
                aria-label="打开我的 GitHub 首页"
                className="grid h-10 w-10 place-items-center rounded-md bg-white/[0.055] text-[#f4efe3] transition hover:bg-white/[0.09] hover:text-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                href={githubHome}
                rel="noreferrer"
                target="_blank"
                title="GitHub"
              >
                <SvgIcon className="h-5 w-5" name="github" />
              </a>
            </div>
          </div>
        </header>

        <div className="grid flex-1 gap-7 pt-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="flex flex-col p-2 lg:border-r lg:border-white/[0.07] lg:pr-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
              {meta.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-none tracking-normal text-[#fff8e9] lg:text-5xl">
              {meta.title}
            </h1>
            <p className="mt-5 text-sm leading-7 text-[#b8b09f]">
              {meta.description}
            </p>

            <label className="sr-only" htmlFor="bookmark-search">
              搜索当前页面
            </label>
            <input
              className="mt-7 w-full rounded-md bg-white/[0.055] px-4 py-3 text-sm text-[#f4efe3] outline-none transition placeholder:text-[#8d8778] focus:bg-white/[0.08] focus:ring-2 focus:ring-[color:var(--accent)]"
              id="bookmark-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isProjectView ? "搜索项目" : "搜索名称、类型或备注"}
              type="search"
              value={query}
            />

            <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
              <div className="rounded-md bg-white/[0.045] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8d8778]">
                  Total
                </p>
                <p className="mt-2 text-3xl font-black">
                  {isProjectView ? projects.length : visibleBookmarks.length}
                </p>
              </div>
              <div className="rounded-md bg-white/[0.045] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8d8778]">
                  Theme
                </p>
                <p className="mt-2 text-lg font-black text-[color:var(--accent)]">
                  {accent.label}
                </p>
              </div>
            </div>
          </aside>

          <section className="min-h-[calc(100vh-6.5rem)]">
            {isProjectView ? (
              <div className="grid h-full gap-3 md:grid-cols-2 xl:grid-cols-3">
                {visibleProjects.map((project) => (
                  <a
                    className="group flex min-h-64 flex-col justify-between rounded-md bg-white/[0.045] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.075]"
                    href={project.href}
                    key={project.name}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div>
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <span className="rounded bg-[color-mix(in_srgb,var(--accent)_13%,transparent)] px-2.5 py-1 text-xs font-semibold text-[color:var(--accent)]">
                          {project.status}
                        </span>
                        <SvgIcon className="h-5 w-5" name="github" />
                      </div>
                      <h2 className="text-2xl font-black tracking-normal text-[#fff8e9]">
                        {project.name}
                      </h2>
                      <p className="mt-4 text-sm leading-6 text-[#b8b09f]">
                        {project.note}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4 pt-4 text-xs text-[#8d8778]">
                      <span>{project.stack}</span>
                      <span className="text-[color:var(--accent)]">VIEW</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="grid h-full gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {visibleBookmarks.map((bookmark) => (
                  <a
                    className="group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-md bg-white/[0.045] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.075]"
                    href={bookmark.href}
                    key={bookmark.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] opacity-70 transition group-hover:opacity-100" />
                    <div>
                      <div className="mb-5 flex items-center gap-2">
                        <span className="rounded bg-[color-mix(in_srgb,var(--accent)_13%,transparent)] px-2.5 py-1 text-xs font-semibold text-[color:var(--accent)]">
                          {bookmark.category}
                        </span>
                        <span className="text-xs text-[#8d8778]">
                          {bookmark.tone}
                        </span>
                      </div>
                      <h2 className="text-2xl font-black tracking-normal text-[#fff8e9]">
                        {bookmark.name}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-[#b8b09f]">
                        {bookmark.note}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4 pt-4 text-xs text-[#8d8778]">
                      <span className="truncate">{getHost(bookmark.href)}</span>
                      <span className="text-[color:var(--accent)]">OPEN</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
