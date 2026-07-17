import Image from "next/image";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import Carousel from "./Carousel";
import { GALLERY, INTERIORS } from "@/lib/content";

export default function Galeria() {
  return (
    <section id="galeria" className="bg-bg pb-[60px] pt-[110px]">
      <div className="wrap">
        <Reveal>
          <SectionHead
            num="04 — Galería"
            title={
              <>
                La mesa, la{" "}
                <em className="font-semibold italic text-achiote">brasa</em>, el
                pueblo
              </>
            }
          />
        </Reveal>

        <Reveal>
          <Carousel items={INTERIORS} />
        </Reveal>

        {/* Four dish photos in a grid: they divide evenly at every width. */}
        <div className="mt-14 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY.map((item, i) => (
            <Reveal key={item.src} delay={(i % 4) * 60}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.04]"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
