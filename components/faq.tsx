"use client";

import { useState } from "react";
import { faqItems, company } from "@/lib/company-data";

/** FAQAccordion — раскрытие мышью и с клавиатуры, плавное раскрытие, aria */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title">
      <div className="py-16 md:py-24">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <p className="section-label">Вопросы и ответы</p>
            <h2 id="faq-title" className="section-title">
              Частые вопросы
            </h2>
          </div>

          <div className="reveal mx-auto mt-10 max-w-3xl lg:mt-12">
            <ul className="divide-y divide-line rounded-card border border-line bg-card">
              {faqItems.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <li key={item.question}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-button-${i}`}
                        className="flex min-h-[44px] w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                      >
                        <span className="text-[16px] font-semibold text-ink md:text-[17px]">
                          {item.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`shrink-0 text-accent transition-transform duration-300 ease-out ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink-soft md:px-6 md:text-[16px]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 text-center text-[14px] leading-relaxed text-ink-soft">
              Не нашли свой вопрос? Позвоните{" "}
              <a
                href={`tel:+${company.phone.raw}`}
                className="font-semibold text-accent-text transition-colors hover:text-ink"
              >
                {company.phone.display}
              </a>{" "}
              или{" "}
              <a
                href={company.links.whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-text underline underline-offset-2 transition-colors hover:text-ink"
              >
                напишите в WhatsApp
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
