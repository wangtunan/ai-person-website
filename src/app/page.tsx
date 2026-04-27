const stackItems = ["Next.js 16", "React 19", "Tailwind CSS 4", "Vercel"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#181714]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between border-b border-[#181714]/15 pb-5">
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">
            AI Person
          </span>
          <a
            className="rounded-full border border-[#181714]/20 px-4 py-2 text-sm font-medium transition hover:border-[#181714] hover:bg-[#181714] hover:text-white"
            href="https://vercel.com"
            rel="noreferrer"
            target="_blank"
          >
            Vercel Ready
          </a>
        </header>

        <div className="grid gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#7b3f27]">
              Next.js 已添加
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-normal sm:text-7xl">
              一个面向 Vercel 的 Next.js 前端起点。
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#514d45]">
              项目已迁移到 App Router，保留 Tailwind CSS，并使用 Next.js 默认构建流程，后续可以继续扩展页面、路由和服务端能力。
            </p>
          </div>

          <div className="border-y border-[#181714]/15 py-6">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#514d45]">
              Stack
            </p>
            <ul className="grid grid-cols-2 gap-3">
              {stackItems.map((item) => (
                <li
                  className="border border-[#181714]/15 bg-white/55 px-4 py-4 text-sm font-semibold shadow-sm"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-[#181714]/15 pt-5 text-sm text-[#514d45] sm:flex-row sm:items-center sm:justify-between">
          <span>pnpm dev</span>
          <span>pnpm build</span>
        </footer>
      </section>
    </main>
  );
}
