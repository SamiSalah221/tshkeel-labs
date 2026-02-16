import { useState } from "react";
import RevealOnScroll from "../ui/RevealOnScroll";

const FAQ_ITEMS = [
  {
    question: "What materials do you use?",
    answer: "We use high-quality PLA filament, which is eco-friendly and durable. It's available in a wide range of colors and finishes to suit your preferences.",
  },
  {
    question: "How long does shipping take?",
    answer: "Production takes 3\u20135 business days, and shipping is typically 3\u20137 days within the US. Local pickup in the Tempe/Phoenix area is available same or next day.",
  },
  {
    question: "Can I customize colors and sizes?",
    answer: "Absolutely! We offer full customization. Just message us on WhatsApp with your preferences and we\u2019ll make it happen.",
  },
  {
    question: "How durable are the prints?",
    answer: "Very durable! PLA prints are suitable for display and everyday use. They\u2019re not dishwasher-safe, but they hold up well in normal conditions.",
  },
  {
    question: "Do you offer local pickup?",
    answer: "Yes! You can pick up your order at ICC Tempe. We also deliver within about a one-hour drive of the area.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      data-section="faq"
      aria-label="Frequently Asked Questions"
      className="px-5 md:px-12 py-4 md:py-6"
      style={{ pointerEvents: "none" }}
    >
      <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", pointerEvents: "auto" }}>
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-accent text-center mb-4">
            Frequently Asked Questions
          </h2>
          <div className="verse-band mb-8">
            &#x2726; &#x066D; &#x2726;
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="frosted-card" style={{ overflow: "hidden" }}>
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid color-mix(in srgb, var(--color-accent) 15%, transparent)" : "none" }}>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    className="w-full flex items-center justify-between text-left px-4 md:px-6 py-3 md:py-4 min-h-[44px] cursor-pointer"
                    style={{ background: "none", border: "none" }}
                  >
                    <span className="text-accent font-semibold text-sm md:text-base pr-4">
                      {item.question}
                    </span>
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    aria-hidden={!isOpen}
                    style={{
                      maxHeight: isOpen ? 500 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    <p className="text-text-muted text-sm leading-relaxed px-4 md:px-6 pb-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
