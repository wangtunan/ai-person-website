import type { Project } from "@/types/bookmark";

export const projects: Project[] = [
  {
    name: "ai-person-website",
    href: "https://github.com/wangtunam/ai-person-website",
    note: "个人导航页与 URL 收藏工作台",
    stack: "Next.js / Tailwind",
    status: "Building",
  },
  {
    name: "agent-lab",
    href: "https://github.com/wangtunam",
    note: "Agent 实验、工具调用和工作流草稿集合",
    stack: "Python / LLM",
    status: "Draft",
  },
  {
    name: "workflow-notes",
    href: "https://github.com/wangtunam",
    note: "自动化流程、触发器和部署笔记",
    stack: "n8n / Actions",
    status: "Collecting",
  },
];
