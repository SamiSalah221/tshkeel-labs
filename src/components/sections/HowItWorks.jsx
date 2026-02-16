import RevealOnScroll from "../ui/RevealOnScroll";
import TiltCard from "../ui/TiltCard";

const STEPS = [
  {
    number: "1",
    title: "Choose Your Piece",
    description: "Browse our collection or tell us your custom idea.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Message Us",
    description: "Tap 'Order Now' to reach us instantly on WhatsApp.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "We Print & Deliver",
    description: "We 3D print your piece with care and deliver it to your door. Local pickup available in the Tempe/Phoenix area.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      data-section="howitworks"
      aria-label="How It Works"
      className="px-5 md:px-12 py-4 md:py-6"
      style={{ pointerEvents: "none" }}
    >
      <div style={{ pointerEvents: "auto" }}>
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            How It Works
          </h2>
          <div className="verse-band mb-8">
            &#x2726; &#x066D; &#x2726;
          </div>
        </RevealOnScroll>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ maxWidth: "var(--max-w-content)", margin: "0 auto", position: "relative" }}
        >
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              top: 40,
              left: "20%",
              right: "20%",
              height: 2,
              borderTop: "2px dashed color-mix(in srgb, var(--color-accent) 30%, transparent)",
            }}
          />

          {STEPS.map((step, i) => (
            <RevealOnScroll key={i} delay={i * 0.15} threshold={0.15}>
              <div className="flex flex-col items-center text-center">
                {/* Step number */}
                <div
                  className="w-10 h-10 rounded-full bg-accent text-primary-dark font-bold text-lg flex items-center justify-center mb-4"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  {step.number}
                </div>

                {/* Card */}
                <TiltCard className="bg-bg-card/85 backdrop-blur-sm border border-accent/30 rounded-2xl p-6 w-full">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3 text-accent">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-accent mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </TiltCard>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
