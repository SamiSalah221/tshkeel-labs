import { useState, useMemo } from "react";

function getHijriInfo() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    calendar: "islamic-umalqura",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "America/Phoenix",
  });
  const parts = formatter.formatToParts(now);
  const month = parseInt(parts.find((p) => p.type === "month")?.value || "0");
  const day = parseInt(parts.find((p) => p.type === "day")?.value || "0");
  return { month, day };
}

function getSeasonalMessage(hijri) {
  // Ramadan is month 9
  if (hijri.month < 9) {
    // Rough estimate: (9 - month) * 30 - day days until Ramadan
    const daysLeft = (9 - hijri.month) * 30 - hijri.day;
    if (daysLeft <= 60) {
      return `Ramadan starts in ~${daysLeft} days — Order now for delivery in time!`;
    }
  }
  if (hijri.month === 9) {
    return "Ramadan Mubarak! New Eid Collection Dropping Soon — Be the first to order!";
  }
  // Eid al-Adha is month 12 day 10
  if (hijri.month === 11 || (hijri.month === 12 && hijri.day < 10)) {
    const daysLeft =
      hijri.month === 11
        ? (12 - hijri.month) * 30 + 10 - hijri.day
        : 10 - hijri.day;
    if (daysLeft > 0 && daysLeft <= 45) {
      return `Eid al-Adha in ~${daysLeft} days — Gift beautifully.`;
    }
  }
  return "Free US shipping on orders over $50";
}

export default function SeasonalBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem("bannerDismissed") === "true";
    } catch {
      return false;
    }
  });

  const message = useMemo(() => {
    const hijri = getHijriInfo();
    return getSeasonalMessage(hijri);
  }, []);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("bannerDismissed", "true");
    } catch {
      // sessionStorage not available
    }
  };

  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(90deg, #9B7E2E, #C9A84C, #E2C66D, #C9A84C, #9B7E2E)",
        padding: "10px 20px",
        marginTop: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        pointerEvents: "auto",
      }}
    >
      <p
        style={{
          color: "#102E50",
          fontSize: "14px",
          fontWeight: 600,
          textAlign: "center",
          margin: 0,
        }}
      >
        {message}
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss banner"
        style={{
          position: "absolute",
          right: 12,
          background: "none",
          border: "none",
          color: "#102E50",
          fontSize: "18px",
          cursor: "pointer",
          padding: "4px 8px",
          opacity: 0.7,
        }}
      >
        ✕
      </button>
    </div>
  );
}
