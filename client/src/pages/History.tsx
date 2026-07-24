import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock3 } from "lucide-react";

export default function History() {
  return (
    <AppLayout>
      <PageHeader title="Histórico" subtitle="Consulte os dias registrados e acompanhe sua evolução." />
      <section className="grid gap-4 md:grid-cols-3">
        <InfoCard title="Últimos registros" value="Hoje" description="Os pontos do dia aparecem no dashboard e no controle de ponto." />
        <InfoCard title="Filtro por período" value="Em breve" description="Semana, mês e período personalizado serão conectados aos dados persistidos." />
        <InfoCard title="Calendário" value="Planejado" description="Visão mensal para identificar dias completos, incompletos e sem registro." />
      </section>
      <Card className="mt-6 p-10 text-center">
        <CalendarDays className="mx-auto mb-4 text-primary" size={40} />
        <h2 className="text-xl font-semibold">Histórico em preparação</h2>
        <p className="mt-2 text-muted-foreground">Esta aba já está criada para substituir a tela 404 e será a base do calendário e filtros.</p>
      </Card>
    </AppLayout>
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Punch In</p>
      <h1 className="mt-2 text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function InfoCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <Card className="p-5 shadow-sm">
      <Clock3 className="mb-4 text-primary" size={24} />
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}
