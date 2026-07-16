"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // A reload partway down the page starts scrolled.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between bg-gradient-to-b from-[rgba(33,25,19,.92)] to-transparent px-6 py-[22px] sm:px-8">
      {/* A separate layer, cross-faded, because a gradient cannot transition
          into a flat colour — swapping the class would pop instead of fade.
          Negative z keeps it above the header's own gradient but behind the
          logo and nav. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 border-b border-[rgba(185,139,62,.18)] bg-bg-deep/95 backdrop-blur-sm transition-opacity duration-[350ms] ease-out ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <a href="#top">
        <Logo className="text-[1.35rem]" />
      </a>
      <nav aria-label="Principal" className="flex items-center gap-7">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hidden font-mono text-[.72rem] uppercase tracking-[.08em] text-cal-dim transition-colors duration-[250ms] hover:text-achiote md:inline"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#reservar"
          className="rounded-sm border border-achiote px-[18px] py-[9px] font-mono text-[.72rem] uppercase tracking-[.08em] text-achiote transition-colors hover:bg-achiote hover:text-cal"
        >
          Reservar
        </a>
      </nav>
    </header>
  );
}
