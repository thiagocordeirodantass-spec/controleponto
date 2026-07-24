import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { BarChart3, FolderKanban } from "lucide-react";

const projects = [
  { name: "Pessoal", description: "Jornada principal do controle de ponto pessoal.", status: "Ativo" },
  { name: "Estudos", description: "Espaço reservado para separar horas de estudo, caso queira usar futuramente.", status: "Opcional" },
  { name: "Projetos livres", description: "Categoria simulada para organizar horas sem gestão de funcionários.", status: "Planejado" },
];

export default function Projects() {
  return (
    <AppLayout>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Projetos</p>
        <h1 className="mt-2 text-3xl font-bold">Categorias de horas</h1>
        <p className="mt-2 text-muted-foreground">Aba criada para organizar horas pessoais por categoria, sem gestão de funcionários.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map(project => (
          <Card key={project.name} className="p-6 shadow-sm">
            <FolderKanban className="mb-4 text-primary" size={28} />
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">{project.name}</h2>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{project.status}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-6 p-6">
        <div className="flex items-start gap-4">
          <BarChart3 className="text-primary" />
          <div>
            <h2 className="font-semibold">Próximo passo</h2>
            <p className="mt-1 text-sm text-muted-foreground">Conectar cada registro de ponto a uma categoria opcional e gerar relatórios por projeto.</p>
          </div>
        </div>
      </Card>
    </AppLayout>
  );
}
