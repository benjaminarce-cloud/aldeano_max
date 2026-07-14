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
  return (
    <figure className="relative flex h-[280px] items-end overflow-hidden rounded-sm p-4 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/55 after:to-transparent after:to-55% after:content-[''] sm:h-[380px]">
      <Image
        src={item.src}
        alt={item.caption}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        loading={priority ? "eager" : "lazy"}
        className="object-cover"
      />
      <figcaption className="relative z-[2] font-mono text-[.7rem] uppercase tracking-[.06em] text-cal/85">
        {item.caption}
      </figcaption>
    </figure>
  );
}

export default function Galeria() {
  return (
    <section id="galeria" className="bg-bg pb-[60px] pt-[110px]">
      <div className="wrap">
        <SectionHead
          num="03 — Galería"
          title={
            <>
              La mesa, la{" "}
              <em className="font-semibold italic text-achiote">brasa</em>, el
              pueblo
            </>
          }
        />
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {GALLERY.map((item, i) => (
            <GalleryTile key={item.src} item={item} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
