// Shared helpers for templates. Team codes come from the editor: usl2, uslw, mwpl.
const TEAMS = {
  usl2: { label: "USL League Two", short: "Men", rkc: "RKC Men", filter: "men" },
  uslw: { label: "USL W League", short: "Women", rkc: "RKC Women", filter: "women" },
  mwpl: { label: "Midwest Premier League", short: "MWPL", rkc: "RKC MWPL", filter: "mwpl" },
  club: { label: "Club", short: "Club", rkc: "RKC Third Coast FC", filter: "club" },
};
export const teamLabel = (t) => TEAMS[t]?.label ?? t;
export const teamShort = (t) => TEAMS[t]?.short ?? t;
export const rkcName = (t) => TEAMS[t]?.rkc ?? "RKC";
export const teamCode = (t) => TEAMS[t]?.filter ?? t;

const TZ = "America/Chicago";
const FORMATS = {
  // Sat, May 29 · 7:00 PM
  kickoff: [{ weekday: "short", month: "short", day: "numeric" }, { hour: "numeric", minute: "2-digit" }],
  // Sun, May 23
  day: [{ weekday: "short", month: "short", day: "numeric" }],
  // May 23, 2027
  long: [{ month: "long", day: "numeric", year: "numeric" }],
  // 2027-05-23 (for <time datetime>)
  iso: null,
};

export function chicago(value, format = "kickoff") {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  if (format === "iso") return d.toISOString();
  const [datePart, timePart] = FORMATS[format] ?? FORMATS.kickoff;
  const date = new Intl.DateTimeFormat("en-US", { ...datePart, timeZone: TZ }).format(d);
  if (!timePart) return date;
  const time = new Intl.DateTimeFormat("en-US", { ...timePart, timeZone: TZ }).format(d);
  return `${date} · ${time}`;
}

// Upcoming = status upcoming or postponed, kickoff not yet passed at build time.
export function isUpcoming(m) {
  if (!m || m.status === "final") return false;
  const d = new Date(m.date);
  return Number.isNaN(d.getTime()) || d.getTime() >= Date.now() - 3 * 60 * 60 * 1000;
}
