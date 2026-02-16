import { usePrayerTimes } from "../../hooks/usePrayerTimes";

export default function PrayerTimesWidget() {
  const { prayerData, loading, error } = usePrayerTimes();

  if (loading) {
    return <span className="text-text-on-dark text-xs animate-pulse">Loading...</span>;
  }

  if (error || !prayerData) return null;

  const { nextPrayer, hijriDate } = prayerData;

  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="text-text-on-dark">
        {hijriDate.day} {hijriDate.month} {hijriDate.year} AH
      </span>
      <span className="text-accent/40">|</span>
      <span className="text-accent-light">
        {nextPrayer.name}: {nextPrayer.time}
      </span>
    </div>
  );
}
