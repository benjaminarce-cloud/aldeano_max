import HoursTable from "./HoursTable";
import { RESTAURANT } from "@/lib/content";

export default function Info() {
  return (
    <section id="info" className="bg-bg-deep py-[110px]">
      <div className="wrap grid grid-cols-1 gap-11 lg:grid-cols-[.85fr_1.15fr] lg:gap-[70px]">
        <div>
          <span className="sec-num">04 — Horario</span>
          <h2 className="mb-6 font-serif text-[2rem] font-[340] leading-[1.05]">
            ¿Cuándo abrimos?
          </h2>

          <HoursTable />

          <address className="mt-[26px] text-[.92rem] not-italic text-cal-dim">
            {RESTAURANT.address}
            <br />
            <a
              href={`tel:${RESTAURANT.phoneTel}`}
              className="text-oro hover:underline"
            >
              {RESTAURANT.phoneDisplay}
            </a>
          </address>
        </div>

        <div>
          <span className="sec-num">Ubicación</span>
          <div className="h-full min-h-[320px] overflow-hidden rounded-sm border border-[rgba(241,232,217,.14)]">
            <iframe
              title={`Mapa de ${RESTAURANT.name}`}
              src={RESTAURANT.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[320px] w-full border-0 [filter:grayscale(.3)_contrast(1.05)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
