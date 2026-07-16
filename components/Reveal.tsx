"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades its children up as they scroll into view, once.
 *
 * The children are always in the markup — only their opacity and transform
 * change — so the text stays crawlable and selectable. Two safety nets cover
 * the cases where the reveal must not swallow content: a <noscript> rule in the
 * layout keeps [data-reveal] visible when JS never runs, and the global
 * prefers-reduced-motion block collapses the transition so it snaps in.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** ms. For staggering siblings; keep the total under ~250ms. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (or an old browser) should not mean no content.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      // Trigger a little before the element is fully in view, so the motion
      // finishes about when it reaches a comfortable reading position.
      { rootMargin: "0px 0px -12% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform] duration-[350ms] ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
