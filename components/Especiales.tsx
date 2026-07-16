import Image from "next/image";
import SectionHead from "./SectionHead";
import DishRow from "./DishRow";
import Reveal from "./Reveal";
import { PROMOS, SPECIALS } from "@/lib/content";

/**
 * The temporary specials sheet. Lives outside the carta's tabs so it can be
 * removed wholesale when the promotion ends — drop this from app/page.tsx and
 * delete SPECIALS from lib/content.ts.
 */
export default function Especiales() {
  return (
    <section id="especiales" className="bg-bg pb-[110px]">
      <div className="wrap">
        <Reveal>
          <SectionHead
            num="02 — Recomendaciones"
            title={
              <>
                Fuera de{" "}
                <em className="font-semibold italic text-achiote">carta</em>
              </>
            }
            lead="Las recomendaciones del Chef Beto González y lo nuevo de la casa, por tiempo limitado."
          />
        </Reveal>

        <Reveal
          delay={90}
          className="rounded-sm border border-[rgba(185,139,62,.3)] bg-card px-6 py-10 sm:px-10 sm:py-12"
        >
          <span className="mb-10 inline-block rounded-[20px] border border-achiote px-3.5 py-1.5 font-mono text-[.66rem] uppercase tracking-[.14em] text-achiote">
            Por tiempo limitado
          </span>

          {SPECIALS.map((group, i) => (
            <div key={group.id} className={i > 0 ? "mt-14" : undefined}>
              <h3 className="mb-8 flex items-center gap-4 font-mono text-[.72rem] uppercase tracking-[.14em] text-oro">
                {group.label}
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-[rgba(241,232,217,.14)]"
                />
              </h3>
              {/* Balanced columns rather than a fixed half-and-half split:
                  the Frescos descriptions are long enough that slicing the
                  list in two leaves one column stranded. */}
              <ul className="gap-x-[70px] lg:columns-2">
                {group.dishes.map((dish) => (
                  <DishRow key={dish.name} dish={dish} groupId={group.id} />
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        {/* The flyers sit outside the card: they are their own artwork and the
            bordered panel would frame a frame. Each links to the full file,
            since the fine print does not survive a 350px column. */}
        <Reveal delay={150} className="mt-14">
          <h3 className="mb-8 flex items-center gap-4 font-mono text-[.72rem] uppercase tracking-[.14em] text-oro">
            Promociones
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-[rgba(241,232,217,.14)]"
            />
          </h3>

          <ul className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROMOS.map((promo) => (
              <li key={promo.src}>
                <figure>
                  <a
                    href={promo.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-sm border border-[rgba(185,139,62,.22)]"
                  >
                    <Image
                      src={promo.src}
                      alt={promo.alt}
                      width={promo.width}
                      height={promo.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-auto w-full transition-transform duration-[350ms] ease-out group-hover:scale-[1.03]"
                    />
                  </a>
                  <figcaption className="mt-2.5 font-mono text-[.66rem] uppercase tracking-[.06em] text-cal-dim">
                    {promo.terms}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
