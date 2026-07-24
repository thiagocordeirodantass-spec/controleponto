import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, FileText } from "lucide-react";

export default function Reports() {
  return (
    <AppLayout>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Relatórios</p>
          <h1 className="mt-2 text-3xl font-bold">Resumo das horas</h1>
          <p className="mt-2 text-muted-foreground">Área preparada para relatórios semanais, mensais e exportação.</p>
        </div>
        <Button variant="outline"><Download className="mr-2" size={18} />Exportar CSV</Button>
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        <Metric title="Horas no mês" value="00h00" />
        <Metric title="Banco acumulado" value="00h00" />
        <Metric title="Dias registrados" value="0" />
      </section>
      <Card className="mt-6 p-10 text-center">
        <BarChart3 className="mx-auto mb-4 text-primary" size={44} />
        <h2 className="text-xl font-semibold">Gráficos em breve</h2>
        <p className="mt-2 text-muted-foreground">Esta aba substitui o 404 e será conectada ao histórico persistido para gerar relatórios reais.</p>
      </Card>
    </AppLayout>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <Card className="p-5 shadow-sm">
      <FileText className="mb-4 text-primary" size={24} />
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </Card>
  );
}
