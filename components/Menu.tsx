"use client";

import { useRef, useState } from "react";
import SectionHead from "./SectionHead";
import DishRow from "./DishRow";
import { MENU, MENU_NOTE } from "@/lib/content";

export default function Menu() {
  const [active, setActive] = useState(MENU[0].id);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Roving arrow-key navigation across the tablist.
  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + MENU.length) % MENU.length;
    setActive(MENU[next].id);
    tabsRef.current[next]?.focus();
  }

  return (
    <section id="menu" className="bg-bg-deep py-[110px]">
      <div className="wrap">
        <SectionHead
          num="03 — El menú"
          title={
            <>
              La carta de{" "}
              <em className="font-semibold italic text-achiote">Aldeano</em>
            </>
          }
          lead="Una sola idea de la entrada a la barra: recetas de generaciones con la firma del Chef Beto González."
        />

        <div
          role="tablist"
          aria-label="Categorías del menú"
          className="mb-12 flex flex-wrap gap-2.5"
        >
          {MENU.map((cat, i) => {
            const selected = cat.id === active;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={selected}
                aria-controls={`panel-${cat.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(cat.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`rounded-[20px] border px-[18px] py-2.5 font-mono text-[.72rem] uppercase tracking-[.06em] transition-colors duration-200 ${
                  selected
                    ? "border-achiote bg-achiote text-cal"
                    : "border-[rgba(241,232,217,.22)] text-cal-dim hover:border-oro hover:text-cal"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Every panel stays in the DOM so the full carta is crawlable; only
            the active one is shown. */}
        {MENU.map((cat) => {
          const half = Math.ceil(cat.dishes.length / 2);
          const columns = [cat.dishes.slice(0, half), cat.dishes.slice(half)];
          const selected = cat.id === active;

          return (
            <div
              key={cat.id}
              role="tabpanel"
              id={`panel-${cat.id}`}
              aria-labelledby={`tab-${cat.id}`}
              hidden={!selected}
              className={
                selected
                  ? "grid animate-fadeIn grid-cols-1 gap-x-[70px] lg:grid-cols-2"
                  : undefined
              }
            >
              <h3 className="sr-only">{cat.label}</h3>
              {columns.map((col, i) => (
                <ul key={i}>
                  {col.map((dish) => (
                    <DishRow key={dish.name} dish={dish} />
                  ))}
                </ul>
              ))}
            </div>
          );
        })}

        <p className="mt-12 max-w-[760px] border-t border-[rgba(241,232,217,.14)] pt-6 text-[.72rem] font-light leading-relaxed text-cal-dim">
          {MENU_NOTE}
        </p>
      </div>
    </section>
  );
}
