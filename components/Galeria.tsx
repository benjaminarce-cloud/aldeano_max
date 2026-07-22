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

        {/* Dish photos stacked in masonry columns, each keeping its native
            aspect ratio rather than being cropped to a uniform card. */}
        <div className="mt-14 columns-2 gap-3.5 sm:columns-3 lg:columns-4">
          {GALLERY.map((item, i) => (
            <Reveal
              key={item.src}
              delay={(i % 4) * 60}
              className="mb-3.5 break-inside-avoid"
            >
              <figure className="group relative overflow-hidden rounded-sm">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.04]"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
