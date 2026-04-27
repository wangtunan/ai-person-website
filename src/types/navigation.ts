export type View = "site" | "agent" | "workflow" | "github";

export type NavItem = {
  label: string;
  href: string;
};

export type ViewMeta = {
  eyebrow: string;
  title: string;
  description: string;
  category?: string;
};

export type BookmarkDashboardProps = {
  view?: View;
};
