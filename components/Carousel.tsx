"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Interior } from "@/lib/content";

const INTERVAL_MS = 5000;

/**
 * Auto-advancing strip of interior photos.
 *
 * Built on native scroll snapping rather than a transformed track: swipe,
 * trackpad and keyboard scrolling all work on their own, and the strip stays
 * usable if the JS never runs. Advancing is only ever a nudge to scrollLeft.
 *
 * It stops moving whenever moving would be rude or pointless — pointer over it,
 * keyboard focus inside it, scrolled off screen, or the visitor asked for
 * reduced motion.
 */
export default function Carousel({ items }: { items: Interior[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goTo = useCallback(
    (target: number) => {
      const el = trackRef.current;
      if (!el) return;
      const n = items.length;
      const next = ((target % n) + n) % n; // wraps past either end
      const card = el.children[next] as HTMLElement | undefined;
      if (!card) return;
      // With several cards in view the last ones sit past the maximum scroll,
      // so asking for their offsetLeft would be clamped. Clamp deliberately.
      const max = el.scrollWidth - el.clientWidth;
      el.scrollTo({
        left: Math.min(card.offsetLeft, max),
        behavior: reduced ? "instant" : "smooth",
      });
      setIndex(next);
    },
    [items.length, reduced],
  );

  useEffect(() => {
    if (paused || reduced || !onScreen) return;
    const id = setInterval(() => goTo(index + 1), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, reduced, onScreen, index, goTo]);

  // A swipe moves the strip without going through goTo, so read the index back
  // off the scroll position instead of trusting state to be the only writer.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = [...el.children] as HTMLElement[];
        if (!cards.length) return;

        // Scrolled fully right means the last card is showing, whatever the
        // arithmetic says. Without this the trailing cards are unreachable:
        // their offsetLeft exceeds the maximum scroll, so nearest-card would
        // never name them, the last dot could never light, and autoplay would
        // sit at the end instead of wrapping.
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0 && el.scrollLeft >= max - 2) {
          setIndex(cards.length - 1);
          return;
        }

        let best = 0;
        let closest = Infinity;
        cards.forEach((card, i) => {
          const distance = Math.abs(card.offsetLeft - el.scrollLeft);
          if (distance < closest) {
            closest = distance;
            best = i;
          }
        });
        setIndex(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const arrow =
    "flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(241,232,217,.25)] text-cal-dim transition-colors hover:border-oro hover:text-cal";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        role="group"
        aria-label="Fotos del restaurante"
        className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <figure
            key={item.src}
            // Native 2:3 — these are photographs, so nothing is cropped.
            className="group relative aspect-[2/3] w-[82%] shrink-0 snap-start overflow-hidden rounded-sm sm:w-[48%] lg:w-[31.6%]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 32vw"
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent to-55%"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 font-mono text-[.7rem] uppercase tracking-[.06em] text-cal/85">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la foto ${i + 1}: ${item.caption}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-oro" : "w-1.5 bg-[rgba(241,232,217,.28)]"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Foto anterior"
            className={arrow}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Foto siguiente"
            className={arrow}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
