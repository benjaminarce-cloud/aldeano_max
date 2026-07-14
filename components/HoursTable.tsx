"use client";

import { useEffect, useState } from "react";
import { HOURS_TABLE } from "@/lib/content";

export default function HoursTable() {
  // Resolved after mount: the visitor's weekday, not the server's.
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(new Date().getDay());
  }, []);

  return (
    <table className="w-full font-mono text-[.92rem]">
      <caption className="sr-only">Horario de Aldeano Restaurante</caption>
      <tbody>
        {HOURS_TABLE.map((row) => {
          const isClosed = row.day === 1;
          const isToday = row.day === today;
          const tone = isClosed
            ? "text-achiote"
            : isToday
              ? "text-oro"
              : undefined;

          return (
            <tr
              key={row.day}
              className="border-b border-[rgba(241,232,217,.12)]"
              aria-current={isToday ? "date" : undefined}
            >
              <td
                className={`py-[13px] text-[.82rem] uppercase tracking-[.04em] ${tone ?? "text-cal-dim"}`}
              >
                {row.label}
                {isToday ? <span className="sr-only"> (hoy)</span> : null}
              </td>
              <td className={`py-[13px] text-right ${tone ?? ""}`}>
                {row.value}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
