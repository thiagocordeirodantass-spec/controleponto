import { BarChart3, Calendar, Clock, Cog, FileText, Home, UserRound } from "lucide-react";

export const appRoutes = {
  dashboard: "/",
  timeClock: "/ponto",
  history: "/historico",
  projects: "/projetos",
  reports: "/relatorios",
  settings: "/configuracoes",
  account: "/minha-conta",
  notFound: "/404",
} as const;

export const sidebarNavItems = [
  { icon: Home, label: "Dashboard", href: appRoutes.dashboard },
  { icon: Clock, label: "Controle de Ponto", href: appRoutes.timeClock },
  { icon: Calendar, label: "Histórico", href: appRoutes.history },
  { icon: BarChart3, label: "Projetos", href: appRoutes.projects },
  { icon: FileText, label: "Relatórios", href: appRoutes.reports },
  { icon: Cog, label: "Configurações", href: appRoutes.settings },
] as const;

export const accountNavItem = {
  icon: UserRound,
  initials: "TD",
  name: "Thiago Dantas",
  label: "Minha conta",
  href: appRoutes.account,
} as const;
