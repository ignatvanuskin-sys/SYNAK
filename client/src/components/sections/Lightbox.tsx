import { X } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface LightboxImage {
  src: string;
  alt: string;
  label: string;
}

interface LightboxProps {
  image: LightboxImage | null;
  onClose: () => void;
}

export function Lightbox({ image, onClose }: LightboxProps) {
  useBodyScrollLock(image !== null);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/95 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Фото: ${image.label}`}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center border border-white/20 text-paper"
        aria-label="Закрыть фото"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[88vh] max-w-full object-contain"
        onClick={(e) => e.stopPropagation()}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
        }}
      />
      <p className="absolute bottom-6 left-0 right-0 text-center text-[10px] uppercase tracking-[0.18em] text-paper/55">
        {image.label} · Реальное фото из карточки 2GIS
      </p>
    </div>
  );
}
