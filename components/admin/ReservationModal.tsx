"use client";

import { useEffect, useRef, useState } from "react";
import { fromISO, isClosed, trimTime } from "@/lib/dates";
import type { Estatus, Reservation } from "@/lib/supabase/types";

export type ModalState =
  | { mode: "closed" }
  | { mode: "new"; fecha: string }
  | { mode: "edit"; reservation: Reservation };

export default function ReservationModal({
  state,
  onClose,
  onSave,
  onDelete,
}: {
  state: ModalState;
  onClose: () => void;
  onSave: (
    values: Omit<Reservation, "id" | "created_at">,
    id?: string,
  ) => Promise<string | null>;
  onDelete: (id: string) => Promise<string | null>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const open = state.mode !== "closed";
  const editing = state.mode === "edit" ? state.reservation : null;

  useEffect(() => {
    if (!open) return;
    setError(null);
    firstFieldRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fecha = String(data.get("fecha") ?? "");

    if (isClosed(fromISO(fecha))) {
      setError("Aldeano cierra los lunes — elige otra fecha.");
      return;
    }

    setPending(true);
    const err = await onSave(
      {
        nombre: String(data.get("nombre") ?? "").trim(),
        telefono: String(data.get("telefono") ?? "").trim(),
        personas: Number(data.get("personas")),
        fecha,
        hora: `${String(data.get("hora"))}:00`,
        estatus: String(data.get("estatus")) as Estatus,
        notas: String(data.get("notas") ?? "").trim() || null,
      },
      editing?.id,
    );
    setPending(false);

    if (err) setError(`No se pudo guardar: ${err}`);
    else onClose();
  }

  async function handleDelete() {
    if (!editing) return;
    if (!confirm(`¿Eliminar la reservación de ${editing.nombre}?`)) return;
    setPending(true);
    const err = await onDelete(editing.id);
    setPending(false);
    if (err) setError(`No se pudo eliminar: ${err}`);
    else onClose();
  }

  const fieldClass =
    "rounded-sm border border-[rgba(241,232,217,.15)] bg-bg-deep px-2.5 py-2.5 font-sans text-[.92rem] text-cal outline-none transition-colors focus:border-achiote [color-scheme:dark]";
  const labelClass =
    "font-mono text-[.65rem] uppercase tracking-[.06em] text-cal-dim";

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(20,15,10,.7)] p-5"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="max-h-[90vh] w-full max-w-[460px] overflow-y-auto rounded-[3px] border border-[rgba(185,139,62,.25)] bg-card p-9"
      >
        <h3 id="modal-title" className="mb-[22px] font-serif text-2xl">
          {editing ? "Editar reservación" : "Nueva reservación"}
        </h3>

        <form onSubmit={onSubmit}>
          <div className="mb-4 flex flex-col gap-[7px]">
            <label htmlFor="m-nombre" className={labelClass}>
              Nombre
            </label>
            <input
              ref={firstFieldRef}
              id="m-nombre"
              name="nombre"
              type="text"
              required
              defaultValue={editing?.nombre}
              className={fieldClass}
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="m-telefono" className={labelClass}>
                Teléfono
              </label>
              <input
                id="m-telefono"
                name="telefono"
                type="tel"
                required
                defaultValue={editing?.telefono}
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="m-personas" className={labelClass}>
                Personas
              </label>
              <input
                id="m-personas"
                name="personas"
                type="number"
                min={1}
                max={30}
                required
                defaultValue={editing?.personas}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="m-fecha" className={labelClass}>
                Fecha
              </label>
              <input
                id="m-fecha"
                name="fecha"
                type="date"
                required
                defaultValue={
                  editing?.fecha ??
                  (state.mode === "new" ? state.fecha : undefined)
                }
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="m-hora" className={labelClass}>
                Hora
              </label>
              <input
                id="m-hora"
                name="hora"
                type="time"
                required
                defaultValue={editing ? trimTime(editing.hora) : undefined}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-[7px]">
            <label htmlFor="m-estatus" className={labelClass}>
              Estatus
            </label>
            <select
              id="m-estatus"
              name="estatus"
              defaultValue={editing?.estatus ?? "confirmada"}
              className={`${fieldClass} [&>option]:bg-bg-deep`}
            >
              <option value="confirmada">Confirmada</option>
              <option value="pendiente">Pendiente</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>

          <div className="mb-4 flex flex-col gap-[7px]">
            <label htmlFor="m-notas" className={labelClass}>
              Notas (opcional)
            </label>
            <textarea
              id="m-notas"
              name="notas"
              defaultValue={editing?.notas ?? ""}
              className={`${fieldClass} min-h-[56px] resize-none`}
            />
          </div>

          <p
            role="status"
            aria-live="polite"
            className="min-h-4 font-mono text-[.72rem] text-achiote"
          >
            {error ?? ""}
          </p>

          <div className="mt-[22px] flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-sm border border-[rgba(241,232,217,.25)] p-3 font-mono text-[.75rem] uppercase text-cal transition-colors hover:border-cal"
            >
              Cancelar
            </button>
            {editing ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={pending}
                className="flex-1 rounded-sm border border-achiote p-3 font-mono text-[.75rem] uppercase text-achiote transition-colors hover:bg-achiote hover:text-cal disabled:opacity-50"
              >
                Eliminar
              </button>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="flex-1 rounded-sm bg-achiote p-3 font-mono text-[.75rem] uppercase text-cal transition-colors hover:bg-oro disabled:cursor-not-allowed disabled:bg-[#5a4a3d]"
            >
              {pending ? "..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
