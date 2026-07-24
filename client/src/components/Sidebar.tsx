import { BarChart3, Calendar, Clock, Cog, FileText, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Clock, label: "Controle de Ponto", href: "/ponto" },
    { icon: Calendar, label: "Histórico", href: "/historico" },
    { icon: BarChart3, label: "Projetos", href: "/projetos" },
    { icon: FileText, label: "Relatórios", href: "/relatorios" },
    { icon: Cog, label: "Configurações", href: "/configuracoes" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground
          transform transition-transform duration-300 z-40
          lg:translate-x-0 lg:relative lg:h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-sidebar-primary-foreground">
                Punch In
              </h1>
              <p className="text-xs text-sidebar-accent opacity-75">Web</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                  }
                `}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-sidebar-border p-4">
          <a href="/minha-conta" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-sidebar-accent/10">
            <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold">TD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Thiago Dantas</p>
              <p className="text-xs opacity-75 truncate">Minha conta</p>
            </div>
          </a>
        </div>
      </aside>
    </>
  );
}
