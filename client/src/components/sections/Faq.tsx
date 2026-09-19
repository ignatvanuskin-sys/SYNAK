import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/data";

export function Faq() {
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <section className="bg-paper py-24 text-ink sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-8 lg:grid-cols-[.72fr_1fr] lg:gap-24 lg:px-12">
        <div className="reveal">
          <p className="section-kicker text-copper">
            <span className="mr-3 inline-block h-px w-8 bg-copper align-middle" /> 07 / FAQ
          </p>
          <h2 className="mt-8 max-w-lg font-display text-5xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-7xl">
            Перед визитом — всё ясно.
          </h2>
        </div>
        <div className="reveal border-t border-ink/20" style={{ animationDelay: "120ms" }}>
          {faqs.map((faq, index) => {
            const open = activeFaq === index;
            return (
              <div key={faq.question} className="border-b border-ink/20">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  onClick={() => setActiveFaq(open ? -1 : index)}
                  aria-expanded={open}
                >
                  <span className="font-display text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-copper transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ${
                    open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="min-h-0 max-w-2xl overflow-hidden text-sm leading-6 text-ink/60">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
