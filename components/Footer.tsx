import Logo from "./Logo";
import { RESTAURANT } from "@/lib/content";

const links = [
  { href: "#menu", label: "Menú" },
  { href: "#info", label: "Ubicación" },
  { href: `tel:${RESTAURANT.phoneTel}`, label: RESTAURANT.phoneDisplay },
  { href: "#reservar", label: "Reservar" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(241,232,217,.1)] bg-bg-deep pb-10 pt-14">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Logo className="text-[1.15rem]" />
          <nav
            aria-label="Enlaces del pie de página"
            className="flex flex-wrap gap-6 font-mono text-[.74rem] uppercase tracking-[.06em] text-cal-dim"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-achiote"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-[26px] font-mono text-[.7rem] text-cal-dim opacity-60">
          © 2026 Aldeano Restaurante · {RESTAURANT.address}
        </p>
      </div>
    </footer>
  );
}
