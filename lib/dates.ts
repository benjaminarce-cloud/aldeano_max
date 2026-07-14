/** Monday — Aldeano is closed. Matches JS getDay(). */
export const CLOSED_DAY = 1;

export const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

/** Local yyyy-mm-dd — never use toISOString(), which shifts to UTC. */
export function toISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Parse yyyy-mm-dd as a local date. */
export function fromISO(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** "14:00:00" -> "14:00" */
export function trimTime(t: string) {
  return t ? t.slice(0, 5) : t;
}

/** Week starts Sunday, matching the prototype. */
export function startOfWeek(d: Date) {
  const nd = new Date(d);
  nd.setDate(nd.getDate() - nd.getDay());
  nd.setHours(0, 0, 0, 0);
  return nd;
}

export function addDays(d: Date, days: number) {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + days);
  return nd;
}

export function isClosed(d: Date) {
  return d.getDay() === CLOSED_DAY;
}
