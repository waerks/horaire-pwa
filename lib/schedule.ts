import raw from "@/data/schedule.json";
import type { Schedule, Session, Subject } from "./types";
export const schedule = raw as Schedule;
export const sessions = schedule.sessions;
export const subjects = schedule.subjects;
export function getSubject(code: string): Subject { return subjects[code]; }
export function getSessionsForDate(date: string): Session[] { return sessions.filter(s => s.date === date).sort((a,b)=>a.start.localeCompare(b.start)); }
export function getNextSession(now = new Date()): Session | undefined {
  const key = now.toLocaleDateString("en-CA", { timeZone:"Europe/Brussels" });
  const time = now.toLocaleTimeString("en-GB", { timeZone:"Europe/Brussels", hour:"2-digit", minute:"2-digit", hour12:false });
  return sessions.find(s => s.date > key || (s.date === key && s.end > time));
}
export const dateLabel = (date:string, options:Intl.DateTimeFormatOptions={}) =>
  new Intl.DateTimeFormat("fr-BE",{timeZone:"Europe/Brussels",...options}).format(new Date(`${date}T12:00:00+02:00`));
