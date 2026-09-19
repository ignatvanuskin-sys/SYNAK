import { useCallback, useEffect, useState } from "react";
import { BookingModal } from "@/components/sections/BookingModal";
import { Contacts } from "@/components/sections/Contacts";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Lightbox } from "@/components/sections/Lightbox";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Trust } from "@/components/sections/Trust";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { images } from "@/lib/data";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    (typeof images)[number] | null
  >(null);

  useScrollReveal();

  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);
  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  // Close modals on Escape
  useEffect(() => {
    if (!bookingOpen && !selectedImage) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBookingOpen(false);
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [bookingOpen, selectedImage]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink text-paper selection:bg-copper selection:text-ink">
      <Header onBookingOpen={openBooking} />

      <Hero onBookingOpen={openBooking} />

      <Intro />
      <Services />
      <Process />
      <Trust />
      <Gallery onSelectImage={setSelectedImage} />
      <Reviews />
      <Faq />
      <Contacts />
      <Footer />

      <BookingModal open={bookingOpen} onClose={closeBooking} />
      <Lightbox image={selectedImage} onClose={closeLightbox} />
    </main>
  );
}
