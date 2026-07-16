import Image from "next/image";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { GALLERY, type GalleryItem } from "@/lib/content";

function GalleryTile({
  item,
  priority,
}: {
  item: GalleryItem;
  priority: boolean;
}) {
  // Height only. The column span lives on the Reveal wrapper in the grid below,
  // since that is the actual grid item.
  const shape = item.portrait ? "aspect-[4/5]" : "h-[280px] sm:h-[380px]";

  // The scrim exists to keep a caption legible, so it only rides along with one.
  const scrim = item.caption
    ? "flex items-end p-4 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/55 after:to-transparent after:to-55% after:content-['']"
    : "";

  return (
    <figure
      className={`group relative overflow-hidden rounded-sm ${shape} ${scrim}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={
          item.portrait
            ? "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
            : "(max-width: 768px) 100vw, 50vw"
        }
        loading={priority ? "eager" : "lazy"}
        className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.04]"
      />
      {item.caption ? (
        <figcaption className="relative z-[2] font-mono text-[.7rem] uppercase tracking-[.06em] text-cal/85 transition-transform duration-[350ms] ease-out group-hover:-translate-y-0.5">
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

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
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
          {GALLERY.map((item, i) => (
            // Wide interior shots take two of the four columns; dish cards take
            // one, but go full width on phones — their names are lettered into
            // the photo, and at half of 375px that text is unreadable.
            // Stagger resets each row rather than growing forever.
            <Reveal
              key={item.src}
              delay={(i % 4) * 60}
              className={
                item.portrait ? "col-span-2 sm:col-span-1" : "col-span-2"
              }
            >
              <GalleryTile item={item} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
