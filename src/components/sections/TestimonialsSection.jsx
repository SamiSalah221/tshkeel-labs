import RevealOnScroll from "../ui/RevealOnScroll";

const TESTIMONIALS = [
  {
    quote: "The Quran stand is absolutely beautiful. The geometric patterns are so detailed \u2014 you can tell it was made with real care and love for the craft.",
    name: "Mohammed R.",
    location: "Phoenix, AZ",
  },
  {
    quote: "I ordered a custom mosque miniature as a gift and it exceeded all expectations. Sami was so easy to work with through WhatsApp.",
    name: "Ahmed K.",
    location: "Tempe, AZ",
  },
  {
    quote: "The crescent moon lamp looks amazing in our living room during Ramadan. We get compliments from every guest. Will be ordering more!",
    name: "Zaid S.",
    location: "Chandler, AZ",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      data-section="testimonials"
      aria-label="Customer Testimonials"
      className="px-5 md:px-12 py-4 md:py-6"
      style={{ pointerEvents: "none" }}
    >
      <div style={{ pointerEvents: "auto" }}>
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            What Our Customers Say
          </h2>
          <div className="verse-band mb-8">
            &#x2726; &#x066D; &#x2726;
          </div>
        </RevealOnScroll>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          style={{ maxWidth: "var(--max-w-content)", margin: "0 auto" }}
        >
          {TESTIMONIALS.map((t, i) => (
            <RevealOnScroll key={i} delay={i * 0.12} threshold={0.15}>
              <div className="dark-panel" style={{ padding: "24px" }}>
                <div className="text-accent text-3xl leading-none mb-2" aria-hidden="true">&ldquo;</div>
                <blockquote className="text-text-on-dark text-sm leading-relaxed italic mb-4">
                  {t.quote}&rdquo;
                </blockquote>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-3" />
                <cite className="text-accent-light font-semibold text-sm not-italic block">
                  {t.name}
                </cite>
                <p className="text-text-on-dark text-xs">
                  {t.location}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
