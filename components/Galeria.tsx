import Image from "next/image";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { GALLERY, type GalleryItem } from "@/lib/content";

/**
 * How wide a tile sits in the grid.
 *
 * Nine tiles only divide evenly across three columns, which is why the feature
 * gives up its double width there: two columns would otherwise strand a tile
 * alone on the last row.
 */
function span(item: GalleryItem) {
  if (item.feature) return "col-span-2 lg:col-span-1";
  // A lettered photo needs the full width of a phone to stay readable.
  if (item.lettered) return "col-span-2 sm:col-span-1";
  return "";
}

function GalleryTile({
  item,
  priority,
}: {
  item: GalleryItem;
  priority: boolean;
}) {
  // The scrim exists to keep a caption legible, so it only rides along with one.
  const scrim = item.caption
    ? "flex items-end p-4 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/55 after:to-transparent after:to-55% after:content-['']"
    : "";

  return (
    <figure
      className={`group relative aspect-[4/5] overflow-hidden rounded-sm ${scrim}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <Reveal
              key={item.src}
              // Stagger resets each row rather than growing forever.
              delay={(i % 3) * 60}
              className={span(item)}
            >
              <GalleryTile item={item} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
