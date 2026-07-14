"use client";

import { useEffect, useMemo, useState } from "react";
import SectionHead from "./SectionHead";
import { createClient } from "@/lib/supabase/client";
import { DAY_NAMES, HOURS, HOURS_SUMMARY, RESTAURANT } from "@/lib/content";

type Slot = { value: string; label: string };

function toSlot(hour: number): Slot {
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return {
    value: `${String(hour).padStart(2, "0")}:00:00`,
    label: `${hour12}:00 ${period}`,
  };
}

/** Parse a yyyy-mm-dd value as a local date, not UTC. */
function parseLocalDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const PARTY_SIZES = ["1", "2", "3", "4", "5", "6", "7", "8+"];

export default function Reservaciones() {
  const [folio, setFolio] = useState("ALD-000000");
  const [minDate, setMinDate] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ text: string; tone: "err" | "ok" } | null>(
    null,
  );

  // Random folio + today's floor are client-only: computing them during render
  // would produce a server/client hydration mismatch.
  useEffect(() => {
    setFolio(`ALD-${Math.floor(100000 + Math.random() * 900000)}`);
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    setMinDate(local.toISOString().split("T")[0]);
  }, []);

  const range = useMemo(() => {
    if (!fecha) return undefined;
    return HOURS[parseLocalDate(fecha).getDay()];
  }, [fecha]);

  const isClosedDay = fecha !== "" && range === null;

  const slots = useMemo(() => {
    if (!range) return [];
    const out: Slot[] = [];
    for (let h = range.start; h <= range.end - 1; h++) out.push(toSlot(h));
    return out;
  }, [range]);

  function onDateChange(value: string) {
    setFecha(value);
    setHora("");
    const nextRange = value ? HOURS[parseLocalDate(value).getDay()] : undefined;
    setMsg(
      nextRange === null
        ? {
            text: "Aldeano está cerrado los lunes. Elige otra fecha.",
            tone: "err",
          }
        : null,
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;

    const data = new FormData(e.currentTarget);
    const nombre = String(data.get("nombre") ?? "").trim();
    const telefono = String(data.get("telefono") ?? "").trim();
    const personas = String(data.get("personas") ?? "");
    const notasInput = String(data.get("notas") ?? "").trim();

    if (!nombre || !telefono || !fecha || !hora || !personas) {
      setMsg({ text: "Completa todos los campos requeridos.", tone: "err" });
      return;
    }

    // Open the tab now, while we still have the click gesture — a popup opened
    // after the await would be blocked. We point it at the URL once the row lands.
    const tab = window.open("", "_blank", "noopener,noreferrer");

    setPending(true);
    setMsg({ text: "Enviando tu reservación...", tone: "ok" });

    // `personas` is an int column; "8+" is stored as 8 and the exact choice is
    // preserved in the notes so staff don't lose it.
    const esGrupoGrande = personas === "8+";
    const notas =
      [esGrupoGrande ? "Grupo de 8 o más personas" : "", notasInput]
        .filter(Boolean)
        .join(" · ") || null;

    const supabase = createClient();
    const { error } = await supabase.from("reservations").insert({
      nombre,
      telefono,
      fecha,
      hora,
      personas: esGrupoGrande ? 8 : Number(personas),
      notas,
      estatus: "pendiente",
    });

    setPending(false);

    if (error) {
      tab?.close();
      setMsg({
        text: "No pudimos guardar tu reservación. Llámanos al 686 842 9240.",
        tone: "err",
      });
      return;
    }

    const date = parseLocalDate(fecha);
    const legible = `${DAY_NAMES[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const horaLabel = slots.find((s) => s.value === hora)?.label ?? hora;

    const lines = [
      "Hola Aldeano, quiero reservar una mesa.",
      `Folio: ${folio}`,
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Fecha: ${legible}`,
      `Hora: ${horaLabel}`,
      `Personas: ${personas}`,
    ];
    if (notasInput) lines.push(`Notas: ${notasInput}`);

    const url = `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;

    setMsg({
      text: "¡Reservación recibida! Abriendo WhatsApp para confirmarla...",
      tone: "ok",
    });

    if (tab) tab.location.href = url;
    else window.open(url, "_blank", "noopener,noreferrer");
  }

  const fieldClass =
    "border-0 border-b border-[rgba(241,232,217,.3)] bg-transparent px-0.5 py-[9px] font-sans text-[.98rem] text-cal outline-none transition-colors focus:border-achiote";

  return (
    <section id="reservar" className="bg-bg pb-[130px] pt-[120px]">
      <div className="wrap">
        <SectionHead
          num="05 — Reservaciones"
          title={
            <>
              Aparta tu{" "}
              <em className="font-semibold italic text-achiote">mesa</em>
            </>
          }
        />

        <div className="grid grid-cols-1 overflow-hidden rounded-[3px] border border-[rgba(185,139,62,.25)] bg-card lg:grid-cols-[.9fr_1.1fr]">
          {/* Ticket stub */}
          <div
            className="flex flex-col justify-between border-b border-dashed border-[rgba(241,232,217,.2)] bg-bg-deep px-8 py-14 sm:px-11 lg:border-b-0 lg:border-r"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(193,80,46,.06) 0 2px, transparent 2px 14px)",
            }}
          >
            <div>
              <h3 className="mb-4 font-serif text-[1.9rem] font-[340]">
                Ticket de reservación
              </h3>
              <p className="text-[.92rem] font-light text-cal-dim">
                Completa el formulario y lo enviaremos directo a Aldeano por
                WhatsApp. Te confirmamos tu mesa en minutos.
              </p>
            </div>
            <div>
              <p className="mt-[18px] text-[.92rem] font-light text-cal-dim">
                {HOURS_SUMMARY}
              </p>
              <p className="mt-[30px] font-mono text-[.72rem] tracking-[.1em] text-oro">
                FOLIO — {folio}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} noValidate className="px-8 py-14 sm:px-12">
            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="nombre"
                  className="font-mono text-[.68rem] uppercase tracking-[.08em] text-cal-dim"
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="telefono"
                  className="font-mono text-[.68rem] uppercase tracking-[.08em] text-cal-dim"
                >
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  placeholder="686 000 0000"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fecha"
                  className="font-mono text-[.68rem] uppercase tracking-[.08em] text-cal-dim"
                >
                  Fecha
                </label>
                <input
                  id="fecha"
                  name="fecha"
                  type="date"
                  required
                  min={minDate}
                  value={fecha}
                  onChange={(e) => onDateChange(e.target.value)}
                  className={`${fieldClass} [color-scheme:dark]`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="hora"
                  className="font-mono text-[.68rem] uppercase tracking-[.08em] text-cal-dim"
                >
                  Hora
                </label>
                <select
                  id="hora"
                  name="hora"
                  required
                  value={hora}
                  disabled={!fecha || isClosedDay}
                  onChange={(e) => setHora(e.target.value)}
                  className={`${fieldClass} [&>option]:bg-bg-deep`}
                >
                  {!fecha ? (
                    <option value="">Elige una fecha primero</option>
                  ) : isClosedDay ? (
                    <option value="">Cerrado este día</option>
                  ) : (
                    <>
                      <option value="">Selecciona una hora</option>
                      {slots.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="personas"
                  className="font-mono text-[.68rem] uppercase tracking-[.08em] text-cal-dim"
                >
                  Personas
                </label>
                <select
                  id="personas"
                  name="personas"
                  required
                  defaultValue=""
                  className={`${fieldClass} [&>option]:bg-bg-deep`}
                >
                  <option value="">Selecciona</option>
                  {PARTY_SIZES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="notas"
                  className="font-mono text-[.68rem] uppercase tracking-[.08em] text-cal-dim"
                >
                  Notas (opcional)
                </label>
                <input
                  id="notas"
                  name="notas"
                  type="text"
                  placeholder="Alergias, ocasión especial..."
                  className={fieldClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isClosedDay || pending}
              className="mt-2 w-full rounded-sm bg-achiote p-4 font-mono text-[.8rem] uppercase tracking-[.08em] text-cal transition-colors hover:bg-oro disabled:cursor-not-allowed disabled:bg-[#5a4a3d]"
            >
              {pending ? "Enviando..." : "Confirmar por WhatsApp"}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`mt-2.5 min-h-[18px] font-mono text-[.78rem] ${
                msg?.tone === "err"
                  ? "text-achiote"
                  : msg?.tone === "ok"
                    ? "text-nopal"
                    : ""
              }`}
            >
              {msg?.text ?? ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
