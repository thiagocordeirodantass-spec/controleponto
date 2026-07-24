import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDuration, formatHoursMinutes, useTimeClock } from "@/hooks/useTimeClock";
import { CheckCircle2, Clock3, Coffee, LogIn, LogOut, Play, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

const eventLabels = {
  entrada: "Entrada",
  pausa: "Início do intervalo",
  retorno: "Fim do intervalo",
  saida: "Saída",
};

const eventIcons = {
  entrada: LogIn,
  pausa: Coffee,
  retorno: RotateCcw,
  saida: LogOut,
};

export default function TimeClock() {
  const clock = useTimeClock();
  const isWorking = clock.status === "working";
  const isPaused = clock.status === "paused";
  const startEvent = clock.todayEvents.find(event => event.type === "entrada");
  const statusText = isWorking ? "Trabalhando agora" : isPaused ? "Em intervalo" : "Jornada não iniciada";
  const primaryLabel = isWorking ? "INICIAR INTERVALO" : isPaused ? "FINALIZAR INTERVALO" : "REGISTRAR ENTRADA";

  const handlePrimaryAction = () => {
    clock.primaryAction();
    toast.success(
      clock.status === "idle"
        ? "Entrada registrada"
        : clock.status === "paused"
          ? "Intervalo finalizado"
          : "Intervalo iniciado",
    );
  };

  const handleFinish = () => {
    clock.finishDay();
    toast.success("Saída registrada");
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Controle de Ponto</p>
        <h1 className="mt-2 text-3xl font-bold">Registre sua jornada</h1>
        <p className="mt-2 text-muted-foreground">Entrada, intervalo e saída com cronômetro em tempo real.</p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-0 bg-gradient-to-br from-primary to-indigo-700 p-8 text-white shadow-xl">
          <div className="flex items-center gap-2 text-sm font-medium text-white/80">
            <span className={`h-2.5 w-2.5 rounded-full ${isWorking ? "animate-pulse bg-emerald-300" : isPaused ? "bg-amber-300" : "bg-white/40"}`} />
            {statusText}
          </div>
          <p className="mt-5 font-mono text-6xl font-bold tracking-tight">{formatDuration(clock.totalTodaySeconds)}</p>
          <Progress value={clock.progress} className="mt-8 h-2 bg-white/20" />
          <div className="mt-3 flex justify-between text-xs text-white/70">
            <span>{Math.round(clock.progress)}% da meta diária</span>
            <span>Meta: 08h00</span>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button onClick={handlePrimaryAction} className="h-14 bg-white font-bold text-primary hover:bg-white/90">
              {isWorking ? <Coffee className="mr-2" /> : <Play className="mr-2 fill-current" />}
              {primaryLabel}
            </Button>
            <Button disabled={!isWorking} onClick={handleFinish} className="h-14 bg-destructive font-bold text-white hover:bg-destructive/90">
              <CheckCircle2 className="mr-2" size={18} />
              REGISTRAR SAÍDA
            </Button>
          </div>
        </Card>

        <Card className="p-6 shadow-sm">
          <h2 className="font-semibold">Resumo de hoje</h2>
          <div className="mt-5 space-y-4 text-sm">
            <SummaryRow label="Primeira entrada" value={startEvent ? new Date(startEvent.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "--:--"} />
            <SummaryRow label="Tempo trabalhado" value={formatHoursMinutes(clock.totalTodaySeconds)} />
            <SummaryRow label="Meta restante" value={formatHoursMinutes(Math.max(0, clock.dailyGoalSeconds - clock.totalTodaySeconds))} />
            <SummaryRow label="Banco de horas do dia" value={`${clock.totalTodaySeconds >= clock.dailyGoalSeconds ? "+" : "-"}${formatHoursMinutes(Math.abs(clock.totalTodaySeconds - clock.dailyGoalSeconds))}`} />
          </div>
        </Card>
      </section>

      <Card className="mt-6 p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Registros de hoje</h2>
            <p className="text-sm text-muted-foreground">Os registros ficam salvos neste navegador.</p>
          </div>
          <Clock3 className="text-primary" />
        </div>
        {clock.todayEvents.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <Clock3 className="mx-auto mb-3 text-muted-foreground" size={32} />
            <p className="font-medium">Nenhum ponto registrado hoje</p>
            <p className="mt-1 text-sm text-muted-foreground">Clique em “Registrar entrada” para iniciar sua jornada.</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {clock.todayEvents.map(event => {
              const Icon = eventIcons[event.type];
              return (
                <div key={event.id} className="group flex items-center justify-between rounded-xl bg-secondary p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-background p-2 text-primary"><Icon size={18} /></div>
                    <div>
                      <p className="text-sm font-semibold">{eventLabels[event.type]}</p>
                      <p className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold">{new Date(event.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
                    <Button variant="ghost" size="icon" aria-label="Excluir registro" onClick={() => clock.removeEvent(event.id)} className="opacity-50 hover:text-destructive group-hover:opacity-100">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </AppLayout>
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
