import { Bell, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const today = new Date();
  const dayName = today.toLocaleDateString("pt-BR", { weekday: "long" });
  const dateStr = today.toLocaleDateString("pt-BR");
  const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-20">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Olá, Thiago! 👋
          </h2>
          <p className="text-sm text-muted-foreground">
            {capitalizedDay}, {dateStr}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Sun size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}
