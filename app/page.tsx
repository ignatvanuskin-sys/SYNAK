import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { Services, ProblemList } from "@/components/services";
import { Benefits, Process } from "@/components/blocks";
import { PricingClarification } from "@/components/pricing";
import { Gallery } from "@/components/gallery";
import { Reviews } from "@/components/reviews";
import { FAQ } from "@/components/faq";
import { Contacts } from "@/components/contacts";
import { Footer } from "@/components/footer";
import { MobileCTA } from "@/components/mobile-cta";
import { RevealObserver } from "@/components/reveal-observer";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <Services />
        <ProblemList />
        <Benefits />
        <Process />
        <PricingClarification />
        <Gallery />
        <Reviews />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
