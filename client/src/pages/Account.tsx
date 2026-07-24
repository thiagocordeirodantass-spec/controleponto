import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { UserRound } from "lucide-react";

export default function Account() {
  return (
    <AppLayout>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Minha conta</p>
        <h1 className="mt-2 text-3xl font-bold">Thiago Dantas</h1>
        <p className="mt-2 text-muted-foreground">Perfil pessoal do controle de ponto.</p>
      </div>
      <Card className="p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">TD</div>
          <div>
            <div className="flex items-center gap-2">
              <UserRound className="text-primary" size={20} />
              <h2 className="text-xl font-semibold">Thiago Dantas</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Conta pessoal para acompanhar entrada, intervalo, saída, histórico e banco de horas.</p>
          </div>
        </div>
      </Card>
    </AppLayout>
  );
}
