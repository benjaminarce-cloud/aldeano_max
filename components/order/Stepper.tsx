"use client";

import { lineKey, useOrder } from "./OrderContext";
import type { Variant } from "@/lib/content";

const BTN =
  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[.85rem] leading-none transition-colors";

/**
 * Adds one priced row to the running total.
 *
 * Collapsed to a single + until it holds something: ninety always-on steppers
 * would drown the carta in chrome.
 */
export default function Stepper({
  groupId,
  dish,
  variant,
  variantIndex,
}: {
  groupId: string;
  dish: string;
  variant: Variant;
  variantIndex: number;
}) {
  const { qtyOf, add } = useOrder();

  const key = lineKey(groupId, dish, variantIndex);
  const qty = qtyOf(key);
  const line = {
    key,
    name: dish,
    variant: variant.label,
    amount: variant.amount,
  };
  // Screen readers get the serving, since "+" next to "Orden $330" is
  // meaningless without it.
  const label = variant.label ? `${dish}, ${variant.label}` : dish;

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => add(line, 1)}
        aria-label={`Agregar ${label} a la cuenta`}
        className={`${BTN} border-[rgba(241,232,217,.22)] text-cal-dim hover:border-oro hover:text-oro`}
      >
        +
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => add(line, -1)}
        aria-label={`Quitar un ${label}`}
        className={`${BTN} border-[rgba(241,232,217,.22)] text-cal-dim hover:border-achiote hover:text-achiote`}
      >
        −
      </button>
      <span className="min-w-[1.1rem] text-center font-mono text-[.85rem] text-cal">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => add(line, 1)}
        aria-label={`Agregar otro ${label}`}
        className={`${BTN} border-achiote bg-achiote text-cal hover:bg-oro hover:border-oro`}
      >
        +
      </button>
    </div>
  );
}
