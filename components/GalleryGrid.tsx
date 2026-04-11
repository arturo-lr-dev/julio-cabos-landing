import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { galleryImages } from "@/lib/data";

export default function GalleryGrid() {
  return (
    <SectionWrapper id="galeria">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className="group relative aspect-[4/5] overflow-hidden bg-surface"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
