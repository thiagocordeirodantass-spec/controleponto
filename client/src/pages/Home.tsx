import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDuration, formatHoursMinutes, useTimeClock } from "@/hooks/useTimeClock";
import { CheckCircle2, Clock3, Coffee, LogIn, LogOut, Play, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

const eventLabels = {
  entrada: "Entrada",
  pausa: "Início do intervalo",
  retorno: "Retorno do intervalo",
  saida: "Saída",
};

const eventIcons = {
  entrada: LogIn,
  pausa: Coffee,
  retorno: RotateCcw,
  saida: LogOut,
};

export default function Home() {
  const clock = useTimeClock();
  const isWorking = clock.status === "working";
  const isPaused = clock.status === "paused";

  const handlePrimaryAction = () => {
    clock.primaryAction();
    toast.success(
      clock.status === "idle"
        ? "Jornada iniciada"
        : clock.status === "paused"
          ? "Trabalho retomado"
          : "Intervalo iniciado",
    );
  };

  const handleFinish = () => {
    clock.finishDay();
    toast.success("Jornada finalizada");
  };

  const startEvent = clock.todayEvents.find(event => event.type === "entrada");
  const estimatedEnd = startEvent
    ? new Date(startEvent.timestamp + 9 * 60 * 60 * 1000).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  const statusText = isWorking ? "Trabalhando agora" : isPaused ? "Em intervalo" : "Jornada não iniciada";
  const primaryLabel = isWorking ? "INICIAR INTERVALO" : isPaused ? "RETOMAR TRABALHO" : "BATER PONTO";

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl p-4 pt-20 sm:p-6 lg:pt-6">
            <section className="mb-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
              <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary to-indigo-700 p-7 text-white shadow-xl">
                <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
                  <div>
                    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white/80">
                      <span className={`h-2.5 w-2.5 rounded-full ${isWorking ? "animate-pulse bg-emerald-300" : isPaused ? "bg-amber-300" : "bg-white/40"}`} />
                      {statusText}
                    </div>
                    <p className="font-mono text-5xl font-bold tracking-tight sm:text-6xl">
                      {formatDuration(clock.totalTodaySeconds)}
                    </p>
                    <p className="mt-3 text-sm text-white/70">Meta diária: 08h00</p>
                  </div>
                  <Button
                    onClick={handlePrimaryAction}
                    className="h-24 min-w-48 rounded-2xl bg-white px-8 text-base font-bold text-primary shadow-lg hover:bg-white/90"
                  >
                    {isWorking ? <Coffee className="mr-2" /> : <Play className="mr-2 fill-current" />}
                    {primaryLabel}
                  </Button>
                </div>
                <div className="mt-8">
                  <Progress value={clock.progress} className="h-2 bg-white/20" />
                  <div className="mt-3 flex justify-between text-xs text-white/70">
                    <span>{Math.round(clock.progress)}% da meta</span>
                    <span>Previsão de término: {estimatedEnd}</span>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <MetricCard title="Hoje" value={formatHoursMinutes(clock.totalTodaySeconds)} subtitle="Meta: 08h00" />
                <MetricCard title="Esta semana" value={formatHoursMinutes(clock.weekSeconds)} subtitle="Meta: 40h00" />
                <MetricCard title="Este mês" value={formatHoursMinutes(clock.monthSeconds)} subtitle="Acumulado no mês" />
                <MetricCard
                  title="Banco de horas"
                  value={`${clock.totalTodaySeconds >= clock.dailyGoalSeconds ? "+" : "-"}${formatHoursMinutes(Math.abs(clock.totalTodaySeconds - clock.dailyGoalSeconds))}`}
                  subtitle="Saldo de hoje"
                />
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
              <Card className="p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Registro de hoje</h3>
                    <p className="text-sm text-muted-foreground">Os registros ficam salvos neste navegador.</p>
                  </div>
                  <Clock3 className="text-primary" />
                </div>

                {clock.todayEvents.length === 0 ? (
                  <div className="rounded-xl border border-dashed p-10 text-center">
                    <Clock3 className="mx-auto mb-3 text-muted-foreground" size={32} />
                    <p className="font-medium">Nenhum ponto registrado hoje</p>
                    <p className="mt-1 text-sm text-muted-foreground">Clique em “Bater ponto” para iniciar sua jornada.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {clock.todayEvents.map(event => {
                      const Icon = eventIcons[event.type];
                      return (
                        <div key={event.id} className="group flex items-center justify-between rounded-xl bg-secondary p-4">
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-background p-2 text-primary"><Icon size={18} /></div>
                            <div>
                              <p className="text-sm font-semibold">{eventLabels[event.type]}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(event.timestamp).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold">
                              {new Date(event.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Excluir registro"
                              onClick={() => clock.removeEvent(event.id)}
                              className="opacity-50 hover:text-destructive group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>

              <Card className="flex flex-col justify-between p-6 shadow-sm">
                <div>
                  <h3 className="font-semibold">Resumo da jornada</h3>
                  <div className="mt-6 space-y-4 text-sm">
                    <SummaryRow label="Primeira entrada" value={startEvent ? new Date(startEvent.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "--:--"} />
                    <SummaryRow label="Tempo trabalhado" value={formatHoursMinutes(clock.totalTodaySeconds)} />
                    <SummaryRow label="Meta restante" value={formatHoursMinutes(Math.max(0, clock.dailyGoalSeconds - clock.totalTodaySeconds))} />
                    <SummaryRow label="Status" value={statusText} />
                  </div>
                </div>

                <Button
                  disabled={!isWorking}
                  onClick={handleFinish}
                  className="mt-8 h-12 w-full bg-destructive font-bold text-white hover:bg-destructive/90"
                >
                  <CheckCircle2 className="mr-2" size={18} />
                  FINALIZAR JORNADA
                </Button>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <Card className="p-5 shadow-sm transition-transform hover:-translate-y-0.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      <p className="mt-3 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
    </Card>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
