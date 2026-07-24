import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl p-4 pt-20 sm:p-6 lg:pt-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
