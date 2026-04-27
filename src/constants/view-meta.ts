import type { View, ViewMeta } from "@/types/navigation";

export const viewMeta: Record<View, ViewMeta> = {
  site: {
    eyebrow: "Site Navigation",
    title: "收藏入口，一屏归档。",
    description: "把常用站点按知识域收纳起来，进入、筛选和回看都更轻。",
  },
  agent: {
    eyebrow: "Agent Desk",
    title: "Agent 资源工作台。",
    description: "集中放置 Agent 框架、IDE 与多智能体实验入口。",
    category: "Agent",
  },
  workflow: {
    eyebrow: "Workflow Board",
    title: "流程与自动化入口。",
    description: "管理编排平台、CI/CD 与自动化工作流相关资源。",
    category: "Workflow",
  },
  github: {
    eyebrow: "GitHub Projects",
    title: "个人项目陈列台。",
    description: "展示想长期维护和整理的个人 GitHub 项目列表。",
  },
};
