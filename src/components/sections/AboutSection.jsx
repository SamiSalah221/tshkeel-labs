import RevealOnScroll from "../ui/RevealOnScroll";
import TiltCard from "../ui/TiltCard";

export default function AboutSection({ config }) {
  return (
    <section
      data-section="about"
      aria-label="Our Story"
      className="flex items-center justify-center px-5 md:px-12 py-4 md:py-6"
      style={{ pointerEvents: 'none' }}
    >
      <div className="w-full" style={{ maxWidth: "var(--max-w-content)", pointerEvents: 'auto' }}>
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Our Story
          </h2>

          <div className="verse-band mb-8">
            &#x2726; &#x066D; &#x2726;
          </div>
        </RevealOnScroll>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", alignItems: "stretch" }}>
          <RevealOnScroll delay={0} threshold={0.15} style={{ height: "100%" }}>
            <TiltCard className="bg-bg-card/85 backdrop-blur-sm border border-accent/30 rounded-2xl p-8" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-3">
                Our Mission
              </h3>
              <p className="text-text-muted leading-relaxed" style={{ flexGrow: 1 }}>{config.mission}</p>
            </TiltCard>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} threshold={0.15} style={{ height: "100%" }}>
            <TiltCard className="bg-bg-card/85 backdrop-blur-sm border border-accent/30 rounded-2xl p-8" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-3">
                Why Tshkeel Labs?
              </h3>
              <p className="text-text-muted leading-relaxed" style={{ flexGrow: 1 }}>
                We noticed a gap in the market for high-quality, faith-inspired 3D
                printed products. From home decor to functional everyday items, we
                craft pieces that reflect Islamic values and artistry, made with
                precision and care.
              </p>
            </TiltCard>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3} threshold={0.15} style={{ height: "100%" }}>
            <TiltCard className="bg-bg-card/85 backdrop-blur-sm border border-accent/30 rounded-2xl p-8" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              {/* Placeholder avatar */}
              <div className="w-20 h-20 rounded-full bg-accent/15 border-2 border-accent/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-1 text-center">
                The Founder
              </h3>
              <p className="text-text font-semibold text-center mb-3">
                {config.founderName}
              </p>
              <p className="text-text-muted leading-relaxed text-center">
                {config.founderBio}
              </p>
            </TiltCard>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
