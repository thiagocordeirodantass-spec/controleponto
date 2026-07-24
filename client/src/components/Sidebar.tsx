import { Button } from "@/components/ui/button";
import { accountNavItem, sidebarNavItems } from "@/lib/navigation";
import { Clock, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (href: string) => location === href;

  return (
    <>
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-64 transform bg-sidebar text-sidebar-foreground
          transition-transform duration-300 lg:relative lg:h-screen lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-20 items-center justify-center border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <Clock size={24} className="text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-primary-foreground">Punch In</h1>
              <p className="text-xs text-sidebar-accent opacity-75">Web</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-8">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200
                  ${
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                  }
                `}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <Link
            href={accountNavItem.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-sidebar-accent/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary">
              <span className="font-bold text-sidebar-primary-foreground">{accountNavItem.initials}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{accountNavItem.name}</p>
              <p className="truncate text-xs opacity-75">{accountNavItem.label}</p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
