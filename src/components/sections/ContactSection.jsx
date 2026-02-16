import { useState } from "react";
import WhatsAppButton from "../ui/WhatsAppButton";
import RevealOnScroll from "../ui/RevealOnScroll";

export default function ContactSection({ config }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const showToast = (message, isError = false) => {
    const toast = document.createElement('div');
    toast.textContent = message;
    Object.assign(toast.style, {
      position: 'fixed', top: '20px', right: '20px', zIndex: '9999',
      background: isError ? '#ef4444' : '#22c55e', color: 'white', padding: '16px 24px',
      borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      fontWeight: 'bold', fontSize: '16px', fontFamily: 'sans-serif',
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      // TODO: Replace YOUR_FORM_ID with your Formspree form ID from https://formspree.io
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Form submission failed");
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      showToast('\u2709\uFE0F Message sent! We\u2019ll get back to you soon, In Sha Allah.');
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      showToast('Failed to send. Please try WhatsApp instead.', true);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      data-section="contact"
      aria-label="Contact"
      className="px-5 md:px-12 py-4 md:py-6"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="dark-panel"
        style={{
          maxWidth: "var(--max-w-narrow)",
          margin: '0 auto',
          pointerEvents: 'auto',
          padding: '40px 24px',
        }}
      >
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-accent text-center mb-2">
            Get in Touch
          </h2>

          <p className="text-text-on-dark/70 text-sm text-center mb-4">
            Send us an email and we'll get back to you within 24 hours.
          </p>

          <div className="verse-band mb-8">
            &#x2726; &#x066D; &#x2726;
          </div>

          <p className="text-text-on-dark text-center mb-6 text-base">
            Interested in a custom piece or have questions? Reach out to us.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4" style={{ maxWidth: '36rem', margin: '0 auto' }}>
            <div>
              <label htmlFor="contact-name" className="text-text-on-dark text-sm font-medium mb-1 block">Your Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-bg-card/90 border border-accent/20 rounded-xl px-5 py-3 text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-text-on-dark text-sm font-medium mb-1 block">Your Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-bg-card/90 border border-accent/20 rounded-xl px-5 py-3 text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="text-text-on-dark text-sm font-medium mb-1 block">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-bg-card/90 border border-accent/20 rounded-xl px-5 py-3 text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="btn btn-md btn-primary btn-block"
            >
              {submitted ? "Message sent! We'll get back to you soon, In Sha Allah." : sending ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* OR divider */}
          <div className="flex items-center gap-4" style={{ maxWidth: '36rem', margin: '24px auto' }}>
            <div className="flex-1 h-px bg-accent/20"></div>
            <span className="text-text-on-dark/50 text-sm uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-accent/20"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/10 backdrop-blur-sm border border-accent/15 rounded-2xl p-5" style={{ maxWidth: '36rem', margin: '0 auto' }}>
            <p className="text-text-on-dark text-sm text-center sm:text-left">
              Prefer to chat directly?
            </p>
            <WhatsAppButton config={config} />
          </div>

          <p className="text-text-on-dark text-sm text-center" style={{ opacity: 0.8 }}>Pickup available at ICC Tempe — Delivery within ~1 hour drive of the area. Outside that range? No problem if you can arrange pickup!</p>
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
