"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OrderLine = {
  /** `${groupId}:${dish}:${variantIndex}` — unique across the whole carta. */
  key: string;
  name: string;
  /** Variant label, when the dish prices more than one serving. */
  variant?: string;
  amount: number;
  qty: number;
};

type OrderValue = {
  lines: OrderLine[];
  total: number;
  count: number;
  qtyOf: (key: string) => number;
  add: (line: Omit<OrderLine, "qty">, delta: number) => void;
  clear: () => void;
};

const Ctx = createContext<OrderValue | null>(null);

/** Builds the identity for one priced row. */
export function lineKey(groupId: string, dish: string, variantIndex: number) {
  return `${groupId}:${dish}:${variantIndex}`;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  // Keyed rather than an array so a stepper can look up its own count without
  // scanning, and so ordering stays insertion-stable for the breakdown.
  const [items, setItems] = useState<Record<string, OrderLine>>({});

  const add = useCallback((line: Omit<OrderLine, "qty">, delta: number) => {
    setItems((prev) => {
      const current = prev[line.key]?.qty ?? 0;
      const qty = Math.max(0, Math.min(99, current + delta));
      if (qty === 0) {
        // Drop the key entirely so `lines` never carries empty rows.
        const { [line.key]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [line.key]: { ...line, qty } };
    });
  }, []);

  const clear = useCallback(() => setItems({}), []);

  const value = useMemo<OrderValue>(() => {
    const lines = Object.values(items);
    return {
      lines,
      total: lines.reduce((sum, l) => sum + l.amount * l.qty, 0),
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      qtyOf: (key) => items[key]?.qty ?? 0,
      add,
      clear,
    };
  }, [items, add, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOrder() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}
