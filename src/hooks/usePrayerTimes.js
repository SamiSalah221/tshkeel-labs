import { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

const PRAYER_NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const TIMEZONE = "America/Phoenix";

function parseIcsDate(dtstart) {
  const year = parseInt(dtstart.slice(0, 4));
  const month = parseInt(dtstart.slice(4, 6)) - 1;
  const day = parseInt(dtstart.slice(6, 8));
  const hour = parseInt(dtstart.slice(9, 11));
  const min = parseInt(dtstart.slice(11, 13));
  const sec = parseInt(dtstart.slice(13, 15));
  return new Date(Date.UTC(year, month, day, hour, min, sec));
}

function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    timeZone: TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function get24HourMinutes(time12) {
  // Parse "5:54 AM" or "12:15 PM" into total minutes since midnight
  const match = time12.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === "AM" && h === 12) h = 0;
  if (period === "PM" && h !== 12) h += 12;
  return h * 60 + m;
}

function getNextPrayer(timings) {
  const now = new Date();
  const localTime = new Date(
    now.toLocaleString("en-US", { timeZone: TIMEZONE })
  );
  const currentMinutes = localTime.getHours() * 60 + localTime.getMinutes();

  for (const prayer of PRAYER_NAMES) {
    if (!timings[prayer]) continue;
    const prayerMinutes = get24HourMinutes(timings[prayer]);
    if (prayerMinutes > currentMinutes) {
      return { name: prayer, time: timings[prayer] };
    }
  }

  return { name: "Fajr", time: timings.Fajr, tomorrow: true };
}

function getHijriDate() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    calendar: "islamic-umalqura",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIMEZONE,
  });
  const parts = formatter.formatToParts(now);
  const day = parts.find((p) => p.type === "day")?.value || "";
  const month = parts.find((p) => p.type === "month")?.value || "";
  const year = parts.find((p) => p.type === "year")?.value || "";
  return { day, month, year };
}

function parseIcsFeed(icsText) {
  // Get today's date in Phoenix timezone as YYYY-MM-DD
  const now = new Date();
  const todayStr = now.toLocaleDateString("en-CA", { timeZone: TIMEZONE });

  const timings = {};
  const events = icsText.split("BEGIN:VEVENT");

  for (let i = 1; i < events.length; i++) {
    const event = events[i];
    const summaryMatch = event.match(/SUMMARY:(.+)/);
    const dtstartMatch = event.match(/DTSTART:(\d{8}T\d{6}Z)/);

    if (!summaryMatch || !dtstartMatch) continue;

    const summary = summaryMatch[1].trim();
    const dtstart = dtstartMatch[1];

    // Match prayer name (case-insensitive, ignore emoji prefixes)
    const cleanSummary = summary.replace(/[^\w\s]/g, "").trim();
    const prayerName = PRAYER_NAMES.find(
      (p) => cleanSummary.toLowerCase() === p.toLowerCase()
    );
    if (!prayerName) continue;

    const eventDate = parseIcsDate(dtstart);

    // Convert to Phoenix local date for comparison
    // Maghrib/Isha UTC dates may be next day (e.g. 00:53 UTC = 5:53 PM Phoenix prev day)
    const eventLocalDateStr = eventDate.toLocaleDateString("en-CA", {
      timeZone: TIMEZONE,
    });

    if (eventLocalDateStr === todayStr) {
      timings[prayerName] = formatTime(eventDate);
    }
  }

  return timings;
}

// Try fetching through multiple CORS proxies
async function fetchIcsWithProxies(url) {
  const proxies = [
    (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
    (u) => u, // Direct attempt last (works if server has CORS headers)
  ];

  for (const makeUrl of proxies) {
    try {
      const proxyUrl = makeUrl(url);
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
      if (res.ok) {
        const text = await res.text();
        // Verify it's actually ICS data (not an error page)
        if (text.includes("BEGIN:VCALENDAR")) return text;
      }
    } catch {
      // Try next proxy
    }
  }

  throw new Error("All ICS fetch attempts failed");
}

async function fetchAlAdhanFallback() {
  const res = await fetch(
    `https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent("Tempe,Arizona")}&method=2`,
    { signal: AbortSignal.timeout(8000) }
  );
  const json = await res.json();
  if (json.code !== 200) throw new Error("AlAdhan API error");

  const timings = {};
  for (const name of PRAYER_NAMES) {
    if (json.data.timings[name]) {
      // Remove timezone annotation like " (MST)" and convert to 12hr
      const raw = json.data.timings[name].replace(/\s*\(.*\)/, "");
      const [h, m] = raw.split(":").map(Number);
      const period = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      timings[name] = `${h12}:${String(m).padStart(2, "0")} ${period}`;
    }
  }
  return timings;
}

export function usePrayerTimes() {
  const [prayerData, setPrayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        let timings = {};

        // Primary: ICS calendar feed (via CORS proxy)
        try {
          const icsText = await fetchIcsWithProxies(siteConfig.prayerTimesIcsUrl);
          timings = parseIcsFeed(icsText);
        } catch {
          // ICS failed entirely
        }

        // Fallback: AlAdhan API (only if ICS gave no results)
        if (Object.keys(timings).length === 0) {
          try {
            timings = await fetchAlAdhanFallback();
          } catch {
            // Both sources failed
          }
        }

        if (Object.keys(timings).length > 0) {
          const nextPrayer = getNextPrayer(timings);
          const hijriDate = getHijriDate();
          setPrayerData({ timings, hijriDate, nextPrayer });
        } else {
          setError("No prayer times available");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
    // Refresh every 30 minutes
    const interval = setInterval(fetchPrayerTimes, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { prayerData, loading, error };
}
