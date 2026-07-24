import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cog, Moon, Save } from "lucide-react";

export default function Settings() {
  return (
    <AppLayout>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Configurações</p>
        <h1 className="mt-2 text-3xl font-bold">Preferências do sistema</h1>
        <p className="mt-2 text-muted-foreground">Dados pessoais, meta diária e preferências visuais do controle de ponto.</p>
      </div>
      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Cog className="text-primary" />
            <h2 className="font-semibold">Jornada padrão</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="daily-goal">Meta diária</Label>
              <Input id="daily-goal" value="08:00" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekly-goal">Meta semanal</Label>
              <Input id="weekly-goal" value="40:00" readOnly />
            </div>
          </div>
          <Button className="mt-6" disabled><Save className="mr-2" size={18} />Salvar em breve</Button>
        </Card>
        <Card className="p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Moon className="text-primary" />
            <h2 className="font-semibold">Aparência</h2>
          </div>
          <p className="text-sm text-muted-foreground">O tema claro/escuro já possui base técnica e será ativado no próximo ciclo de desenvolvimento.</p>
          <div className="mt-5 rounded-xl bg-secondary p-4 text-sm">Tema atual: claro</div>
        </Card>
      </section>
    </AppLayout>
  );
}
