"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import ReservationModal, { type ModalState } from "./ReservationModal";
import { createClient } from "@/lib/supabase/client";
import type { Reservation } from "@/lib/supabase/types";
import {
  DAY_NAMES,
  addDays,
  fromISO,
  isClosed,
  startOfWeek,
  toISO,
  trimTime,
} from "@/lib/dates";

type View = "day" | "week";

const STATUS_STYLES: Record<Reservation["estatus"], { bar: string; badge: string }> =
  {
    confirmada: {
      bar: "border-l-nopal",
      badge: "bg-nopal/25 text-nopal",
    },
    pendiente: {
      bar: "border-l-oro",
      badge: "bg-oro/20 text-oro",
    },
    cancelada: {
      bar: "border-l-achiote opacity-55",
      badge: "bg-achiote/20 text-achiote",
    },
  };

export default function Dashboard({
  initial,
  email,
}: {
  initial: Reservation[];
  email: string;
}) {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>(initial);
  const [view, setView] = useState<View>("day");
  const [cursor, setCursor] = useState(() => new Date());
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });
  const [liveError, setLiveError] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  const refetch = useCallback(async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true });
    if (error) {
      setLiveError(true);
      return;
    }
    setLiveError(false);
    setReservations(data as Reservation[]);
  }, [supabase]);

  // Realtime: any insert from the public form lands here without a refresh.
  // The 30s interval is a fallback in case the socket drops.
  useEffect(() => {
    const channel = supabase
      .channel("reservations-feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        () => void refetch(),
      )
      .subscribe();

    const poll = setInterval(() => void refetch(), 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(poll);
    };
  }, [supabase, refetch]);

  const stats = useMemo(() => {
    const todayISO = toISO(new Date());
    const active = reservations.filter((r) => r.estatus !== "cancelada");
    const todays = active.filter((r) => r.fecha === todayISO);

    const weekStart = startOfWeek(new Date());
    const weekEnd = addDays(weekStart, 6);
    const week = active.filter((r) => {
      const d = fromISO(r.fecha);
      return d >= weekStart && d <= weekEnd;
    });

    return {
      today: todays.length,
      covers: todays.reduce((sum, r) => sum + Number(r.personas || 0), 0),
      week: week.length,
    };
  }, [reservations]);

  const dateLabel = useMemo(() => {
    if (view === "day") {
      return cursor.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    }
    const start = startOfWeek(cursor);
    const end = addDays(start, 6);
    const fmt = (d: Date) =>
      d.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
    return `${fmt(start)} – ${fmt(end)}`;
  }, [view, cursor]);

  const byDay = useCallback(
    (iso: string) =>
      reservations
        .filter((r) => r.fecha === iso)
        .sort((a, b) => a.hora.localeCompare(b.hora)),
    [reservations],
  );

  async function saveReservation(
    values: Omit<Reservation, "id" | "created_at">,
    id?: string,
  ) {
    const { error } = id
      ? await supabase.from("reservations").update(values).eq("id", id)
      : await supabase.from("reservations").insert(values);
    if (error) return error.message;
    await refetch();
    return null;
  }

  async function deleteReservation(id: string) {
    const { error } = await supabase.from("reservations").delete().eq("id", id);
    if (error) return error.message;
    await refetch();
    return null;
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const shift = (dir: number) =>
    setCursor((c) => addDays(c, view === "week" ? 7 * dir : dir));

  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-20 pt-9 sm:px-7">
      <header className="mb-1.5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Logo className="text-2xl" />
          <p className="mt-0.5 font-mono text-[.65rem] uppercase tracking-[.1em] text-cal-dim">
            Panel de reservaciones
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="hidden font-mono text-[.68rem] text-cal-dim sm:inline">
            {email}
          </span>
          <button
            onClick={signOut}
            className="rounded-sm border border-[rgba(241,232,217,.25)] px-3 py-2 font-mono text-[.68rem] uppercase tracking-[.05em] text-cal-dim transition-colors hover:border-oro hover:text-cal"
          >
            Salir
          </button>
          <button
            onClick={() => setModal({ mode: "new", fecha: toISO(cursor) })}
            className="rounded-sm bg-achiote px-[22px] py-[13px] font-mono text-[.78rem] uppercase tracking-[.05em] text-cal transition-colors hover:bg-oro"
          >
            + Nueva reservación
          </button>
        </div>
      </header>

      {liveError ? (
        <p
          role="alert"
          className="mt-6 rounded-[3px] border border-dashed border-achiote/50 bg-bg-deep px-[18px] py-3.5 font-mono text-[.72rem] text-achiote"
        >
          No se pudieron cargar las reservaciones. Revisa tu conexión.
        </p>
      ) : null}

      <section aria-label="Resumen" className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { num: stats.today, label: "Reservaciones hoy" },
          { num: stats.covers, label: "Personas hoy" },
          { num: stats.week, label: "Reservaciones esta semana" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-[3px] border border-[rgba(185,139,62,.18)] bg-card px-[22px] py-5"
          >
            <div className="font-serif text-[2.1rem] font-semibold">{s.num}</div>
            <div className="mt-1 font-mono text-[.68rem] uppercase tracking-[.08em] text-cal-dim">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3.5">
        <div
          role="tablist"
          aria-label="Vista"
          className="flex gap-1.5 rounded-[20px] bg-bg-deep p-1"
        >
          {(["day", "week"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`rounded-2xl px-[18px] py-2.5 font-mono text-[.72rem] uppercase tracking-[.06em] transition-colors ${
                view === v ? "bg-achiote text-cal" : "text-cal-dim hover:text-cal"
              }`}
            >
              {v === "day" ? "Día" : "Semana"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          <button
            onClick={() => shift(-1)}
            aria-label={view === "day" ? "Día anterior" : "Semana anterior"}
            className="h-[34px] w-[34px] shrink-0 rounded-full border border-[rgba(241,232,217,.25)] text-cal transition-colors hover:border-oro"
          >
            ‹
          </button>
          <div
            aria-live="polite"
            className="min-w-[130px] text-center font-serif text-[1.05rem] first-letter:uppercase sm:min-w-[200px] sm:text-[1.2rem]"
          >
            {dateLabel}
          </div>
          <button
            onClick={() => shift(1)}
            aria-label={view === "day" ? "Día siguiente" : "Semana siguiente"}
            className="h-[34px] w-[34px] shrink-0 rounded-full border border-[rgba(241,232,217,.25)] text-cal transition-colors hover:border-oro"
          >
            ›
          </button>
          <button
            onClick={() => setCursor(new Date())}
            className="shrink-0 rounded-[14px] border border-oro px-3.5 py-[7px] font-mono text-[.68rem] uppercase text-oro transition-colors hover:bg-oro hover:text-bg-deep"
          >
            Hoy
          </button>
        </div>
      </div>

      {view === "day" ? (
        <DayView
          date={cursor}
          rows={byDay(toISO(cursor))}
          onEdit={(r) => setModal({ mode: "edit", reservation: r })}
        />
      ) : (
        <WeekView
          date={cursor}
          byDay={byDay}
          onEdit={(r) => setModal({ mode: "edit", reservation: r })}
          onAdd={(iso) => setModal({ mode: "new", fecha: iso })}
        />
      )}

      <ReservationModal
        state={modal}
        onClose={() => setModal({ mode: "closed" })}
        onSave={saveReservation}
        onDelete={deleteReservation}
      />
    </div>
  );
}

function DayView({
  date,
  rows,
  onEdit,
}: {
  date: Date;
  rows: Reservation[];
  onEdit: (r: Reservation) => void;
}) {
  if (isClosed(date)) {
    return (
      <p className="px-5 py-[70px] text-center font-mono text-[.85rem] text-cal-dim">
        Aldeano cierra los lunes. No hay servicio este día.
      </p>
    );
  }
  if (rows.length === 0) {
    return (
      <p className="px-5 py-[70px] text-center font-mono text-[.85rem] text-cal-dim">
        Sin reservaciones para este día todavía.
      </p>
    );
  }

  return (
    <ul>
      {rows.map((r) => {
        const s = STATUS_STYLES[r.estatus];
        return (
          <li
            key={r.id}
            className={`mb-3 grid grid-cols-1 items-center gap-[18px] rounded-[3px] border-l-[3px] bg-card px-[22px] py-[18px] sm:grid-cols-[90px_1fr_auto_auto] ${s.bar}`}
          >
            <div className="font-mono text-base text-oro">
              {trimTime(r.hora)}
            </div>
            <div>
              <div className="font-serif text-[1.15rem] font-medium">
                {r.nombre}
              </div>
              <div className="mt-1 font-mono text-[.75rem] text-cal-dim">
                <a href={`tel:${r.telefono}`} className="hover:text-oro">
                  {r.telefono}
                </a>{" "}
                · {r.personas} personas
              </div>
              {r.notas ? (
                <p className="mt-[5px] text-[.85rem] italic text-cal-dim">
                  {r.notas}
                </p>
              ) : null}
            </div>
            <span
              className={`justify-self-start whitespace-nowrap rounded-xl px-2.5 py-[5px] font-mono text-[.65rem] uppercase tracking-[.05em] ${s.badge}`}
            >
              {r.estatus}
            </span>
            <button
              onClick={() => onEdit(r)}
              aria-label={`Editar la reservación de ${r.nombre}`}
              className="h-8 w-8 justify-self-start rounded-full border border-[rgba(241,232,217,.2)] text-[.85rem] text-cal-dim transition-colors hover:border-oro hover:text-cal"
            >
              ✎
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function WeekView({
  date,
  byDay,
  onEdit,
  onAdd,
}: {
  date: Date;
  byDay: (iso: string) => Reservation[];
  onEdit: (r: Reservation) => void;
  onAdd: (iso: string) => void;
}) {
  const start = startOfWeek(date);
  const todayISO = toISO(new Date());

  return (
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 lg:grid-cols-7">
      {Array.from({ length: 7 }, (_, i) => addDays(start, i)).map((d) => {
        const iso = toISO(d);
        const closed = isClosed(d);
        const rows = byDay(iso);

        return (
          <div
            key={iso}
            className={`min-h-[200px] rounded-[3px] border bg-card px-3 py-3.5 ${
              iso === todayISO
                ? "border-oro"
                : "border-[rgba(185,139,62,.12)]"
            } ${closed ? "opacity-40" : ""}`}
          >
            <div className="font-mono text-[.68rem] uppercase tracking-[.05em] text-cal-dim">
              {DAY_NAMES[d.getDay()]}
            </div>
            <div className="mb-2.5 font-serif text-[1.3rem]">{d.getDate()}</div>

            {closed ? (
              <p className="font-mono text-[.68rem] text-achiote">Cerrado</p>
            ) : rows.length === 0 ? (
              <button
                onClick={() => onAdd(iso)}
                className="font-mono text-[.68rem] text-cal-dim hover:text-oro"
              >
                Sin reservas
              </button>
            ) : (
              rows.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onEdit(r)}
                  className={`mb-1.5 block w-full rounded-[3px] border-l-2 bg-nopal/20 px-2 py-[5px] text-left font-mono text-[.68rem] text-cal ${STATUS_STYLES[r.estatus].bar}`}
                >
                  {trimTime(r.hora)} · {r.nombre} ({r.personas})
                </button>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}
