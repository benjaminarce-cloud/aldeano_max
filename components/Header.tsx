import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/content";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between bg-gradient-to-b from-[rgba(33,25,19,.92)] to-transparent px-6 py-[22px] sm:px-8">
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
