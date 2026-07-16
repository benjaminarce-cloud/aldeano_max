"use client";

import { useEffect, useState } from "react";
import { useOrder } from "./OrderContext";
import { money } from "@/lib/content";

/**
 * Running total for the carta's steppers. Appears only once something is on it.
 *
 * This is a calculator, not a checkout: it estimates a bill, it does not place
 * an order, so it deliberately offers no way to send one.
 */
export default function OrderBar() {
  const { lines, total, count, add, clear } = useOrder();
  const [open, setOpen] = useState(false);

  // The bar is fixed, so without this it parks on top of the footer once the
  // page is scrolled to the end.
  useEffect(() => {
    if (count === 0) return;
    const previous = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "112px";
    return () => {
      document.body.style.paddingBottom = previous;
    };
  }, [count]);

  if (count === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] px-4 pb-4">
      <div className="pointer-events-auto mx-auto w-full max-w-[560px] overflow-hidden rounded-[6px] border border-[rgba(185,139,62,.4)] bg-card shadow-[0_8px_30px_rgba(0,0,0,.45)]">
        {open ? (
          <ul className="max-h-[45vh] overflow-y-auto border-b border-[rgba(241,232,217,.12)] px-4 py-3">
            {lines.map((l) => (
              <li
                key={l.key}
                className="flex items-center justify-between gap-3 py-1.5"
              >
                <span className="min-w-0 text-[.85rem] font-light text-cal-dim">
                  <span className="font-mono text-oro">{l.qty}×</span>{" "}
                  {l.name}
                  {l.variant ? (
                    <span className="text-cal-dim/70"> · {l.variant}</span>
                  ) : null}
                </span>
                <span className="flex shrink-0 items-center gap-2.5">
                  <span className="whitespace-nowrap font-mono text-[.8rem] text-cal">
                    {money(l.amount * l.qty)}
                  </span>
                  <button
                    type="button"
                    onClick={() => add(l, -l.qty)}
                    aria-label={`Quitar ${l.name} de la cuenta`}
                    className="font-mono text-[.8rem] text-cal-dim transition-colors hover:text-achiote"
                  >
                    ×
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div>
            <div className="font-serif text-[1.35rem] font-medium leading-none">
              {money(total)}
            </div>
            <div className="mt-1 font-mono text-[.62rem] uppercase tracking-[.08em] text-cal-dim">
              {count} {count === 1 ? "platillo" : "platillos"} · IVA incluido
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={clear}
              className="rounded-sm border border-[rgba(241,232,217,.22)] px-3 py-2 font-mono text-[.66rem] uppercase tracking-[.05em] text-cal-dim transition-colors hover:border-achiote hover:text-achiote"
            >
              Vaciar
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="rounded-sm border border-oro px-3 py-2 font-mono text-[.66rem] uppercase tracking-[.05em] text-oro transition-colors hover:bg-oro hover:text-bg-deep"
            >
              {open ? "Ocultar" : "Desglose"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
