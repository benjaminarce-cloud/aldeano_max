import Image from "next/image";
import SectionHead from "./SectionHead";
import { GALLERY, type GalleryItem } from "@/lib/content";

function GalleryTile({
  item,
  priority,
}: {
  item: GalleryItem;
  priority: boolean;
}) {
  // Wide interior shots take two of the four columns; the dish cards keep their
  // own 4:5 shape in one. The dish cards go full width on phones — their names
  // are lettered into the photo, and at half of 375px that text is unreadable.
  const shape = item.portrait
    ? "col-span-2 aspect-[4/5] sm:col-span-1"
    : "col-span-2 h-[280px] sm:h-[380px]";

  // The scrim exists to keep a caption legible, so it only rides along with one.
  const scrim = item.caption
    ? "flex items-end p-4 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/55 after:to-transparent after:to-55% after:content-['']"
    : "";

  return (
    <figure className={`relative overflow-hidden rounded-sm ${shape} ${scrim}`}>
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
        className="object-cover"
      />
      {item.caption ? (
        <figcaption className="relative z-[2] font-mono text-[.7rem] uppercase tracking-[.06em] text-cal/85">
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
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
          {GALLERY.map((item, i) => (
            <GalleryTile key={item.src} item={item} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
