import { siteConfig } from "../../config/siteConfig";
import RevealOnScroll from "../ui/RevealOnScroll";

export default function CustomOrderCTA() {
  const handleCustomQuote = () => {
    const message =
      "Assalamu Alaikum! I'd like to request a custom piece from Tshkeel Labs.";
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section data-section="customquote" aria-label="Custom Orders" className="px-5 md:px-12 py-4 md:py-6" style={{ pointerEvents: "none" }}>
      <RevealOnScroll>
        <div
          className="dark-panel"
          style={{
            maxWidth: "var(--max-w-narrow)",
            margin: "0 auto",
            pointerEvents: "auto",
            padding: "48px 40px",
            textAlign: "center",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-3">
            Have a Unique Idea?
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-4" />
          <p className="text-text-on-dark text-base leading-relaxed mb-6" style={{ maxWidth: "32rem", margin: "0 auto 24px" }}>
            We design and print custom Islamic pieces to your exact
            specifications. From personalized Quran stands to bespoke
            calligraphy art — bring your vision to life.
          </p>

          <div className="flex items-center justify-center gap-4 text-accent text-sm mb-2">
            <span>✦ Any Design</span>
            <span>✦ Any Size</span>
            <span>✦ Any Color</span>
          </div>
          <p className="text-accent/70 text-xs mb-6">
            Local to Phoenix/Tempe? Pick up your custom piece in person!
          </p>

          <button
            type="button"
            onClick={handleCustomQuote}
            className="btn btn-md btn-primary"
          >
            Request Custom Quote
          </button>
        </div>
      </RevealOnScroll>
    </section>
  );
}
