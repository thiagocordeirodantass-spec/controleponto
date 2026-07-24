import { useEffect, useMemo, useState } from "react";

export type ClockEventType = "entrada" | "pausa" | "retorno" | "saida";

export type ClockEvent = {
  id: string;
  type: ClockEventType;
  timestamp: number;
};

const STORAGE_KEY = "punch-in-personal-records-v1";
const DAILY_GOAL_SECONDS = 8 * 60 * 60;

function getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function readStorage(): Record<string, ClockEvent[]> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function formatHoursMinutes(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  return `${String(hours).padStart(2, "0")}h${String(minutes).padStart(2, "0")}`;
}

function workedSeconds(events: ClockEvent[], now: number) {
  let total = 0;
  let activeStart: number | null = null;

  for (const event of [...events].sort((a, b) => a.timestamp - b.timestamp)) {
    if (event.type === "entrada" || event.type === "retorno") activeStart = event.timestamp;
    if ((event.type === "pausa" || event.type === "saida") && activeStart !== null) {
      total += Math.max(0, event.timestamp - activeStart) / 1000;
      activeStart = null;
    }
  }

  if (activeStart !== null) total += Math.max(0, now - activeStart) / 1000;
  return total;
}

export function useTimeClock() {
  const [records, setRecords] = useState<Record<string, ClockEvent[]>>(() => readStorage());
  const [now, setNow] = useState(Date.now());
  const todayKey = getDateKey();
  const todayEvents = records[todayKey] ?? [];
  const lastEvent = todayEvents.at(-1);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const status = useMemo(() => {
    if (!lastEvent || lastEvent.type === "saida") return "idle" as const;
    if (lastEvent.type === "pausa") return "paused" as const;
    return "working" as const;
  }, [lastEvent]);

  const totalTodaySeconds = workedSeconds(todayEvents, now);
  const progress = Math.min(100, (totalTodaySeconds / DAILY_GOAL_SECONDS) * 100);

  const addEvent = (type: ClockEventType) => {
    const event: ClockEvent = {
      id: crypto.randomUUID(),
      type,
      timestamp: Date.now(),
    };
    setRecords(current => ({
      ...current,
      [todayKey]: [...(current[todayKey] ?? []), event],
    }));
  };

  const primaryAction = () => {
    if (status === "idle") return addEvent("entrada");
    if (status === "paused") return addEvent("retorno");
    return addEvent("pausa");
  };

  const finishDay = () => {
    if (status === "working") addEvent("saida");
  };

  const removeEvent = (id: string) => {
    setRecords(current => ({
      ...current,
      [todayKey]: (current[todayKey] ?? []).filter(event => event.id !== id),
    }));
  };

  const weekSeconds = useMemo(() => {
    const today = new Date();
    const day = today.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    let total = 0;
    for (let offset = mondayOffset; offset <= 0; offset += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() + offset);
      const key = getDateKey(date);
      total += workedSeconds(records[key] ?? [], key === todayKey ? now : date.setHours(23, 59, 59, 999));
    }
    return total;
  }, [records, now, todayKey]);

  const monthSeconds = useMemo(() => {
    const today = new Date();
    return Object.entries(records).reduce((sum, [key, events]) => {
      const date = new Date(`${key}T12:00:00`);
      if (date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear()) return sum;
      return sum + workedSeconds(events, key === todayKey ? now : new Date(`${key}T23:59:59`).getTime());
    }, 0);
  }, [records, now, todayKey]);

  return {
    todayEvents,
    status,
    totalTodaySeconds,
    weekSeconds,
    monthSeconds,
    progress,
    dailyGoalSeconds: DAILY_GOAL_SECONDS,
    primaryAction,
    finishDay,
    removeEvent,
  };
}
