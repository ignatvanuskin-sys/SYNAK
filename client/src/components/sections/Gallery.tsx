import { ArrowUpRight } from "lucide-react";
import { images } from "@/lib/data";

interface GalleryProps {
  onSelectImage: (image: (typeof images)[number]) => void;
}

export function Gallery({ onSelectImage }: GalleryProps) {
  return (
    <section id="works" className="bg-paper py-24 text-ink sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:mb-20 lg:flex-row lg:items-end">
          <div className="reveal">
            <p className="section-kicker text-copper">
              <span className="mr-3 inline-block h-px w-8 bg-copper align-middle" /> 05 / Из мастерской
            </p>
            <h2 className="mt-7 max-w-2xl font-display text-5xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-7xl">
              Смотрите,
              <br />
              <span className="text-ink/40">как есть.</span>
            </h2>
          </div>
          <div
            className="reveal flex max-w-sm items-start gap-3 text-sm leading-6 text-ink/60"
            style={{ animationDelay: "120ms" }}
          >
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-copper" />
            <span>
              Реальные фотографии боксов и деталей из галереи 2GIS — кликните для
              увеличения.
            </span>
          </div>
        </div>
        <div className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] sm:grid-cols-4 lg:auto-rows-[300px]">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`group reveal relative overflow-hidden bg-ink text-left ${image.className}`}
              style={{ animationDelay: `${index * 70}ms` }}
              onClick={() => onSelectImage(image)}
              aria-label={`Открыть фото: ${image.label}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[.15] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.16em] text-paper/80">
                {image.label}
              </span>
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center border border-white/30 text-paper opacity-0 transition group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
