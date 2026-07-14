import { RESTAURANT } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end bg-bg-deep pb-[90px] pt-40"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(193,80,46,.13), transparent 60%)",
      }}
    >
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 w-full opacity-50"
      >
        <path
          d="M0,200 L0,120 L150,60 L280,110 L420,40 L600,100 L760,55 L900,115 L1050,70 L1200,120 L1200,200 Z"
          fill="#211913"
        />
        <path
          d="M0,200 L0,150 L200,110 L380,150 L560,90 L740,140 L920,100 L1100,150 L1200,130 L1200,200 Z"
          fill="#1a1310"
        />
      </svg>

      <div className="wrap relative">
        <p className="mb-[22px] flex items-center gap-3 font-mono text-xs uppercase tracking-[.18em] text-oro before:h-px before:w-[26px] before:bg-oro before:content-['']">
          {RESTAURANT.city}
        </p>
        <h1 className="max-w-[900px] font-serif text-[clamp(2.8rem,7.5vw,6.2rem)] font-[340] leading-[.95] tracking-[-.01em]">
          Somos la mezcla
          <br />
          de lo{" "}
          <em className="font-semibold italic text-achiote">rural</em>
          <br />y lo{" "}
          <em className="font-semibold italic text-achiote">urbano</em>.
        </h1>
        <p className="mt-[26px] max-w-[440px] text-[1.05rem] font-light text-cal-dim">
          Platos de fuego lento, ingredientes de temporada y las recetas que se
          cuentan de cocina en cocina. Bienvenido a la mesa del pueblo.
        </p>
        <div className="mt-11 flex flex-wrap gap-4">
          <a href="#reservar" className="btn btn-solid">
            Reservar mesa
          </a>
          <a href="#menu" className="btn btn-outline">
            Ver el menú
          </a>
        </div>
      </div>
    </section>
  );
}
