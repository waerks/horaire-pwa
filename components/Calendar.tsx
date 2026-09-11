"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Session, Subject } from "@/lib/types";
import { useMemo } from "react";
import { subjectStyle } from "@/lib/colors";

const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function iso(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function Calendar({
  month,
  setMonth,
  selected,
  setSelected,
  sessions,
  subjects,
}: {
  month: Date;
  setMonth: (d: Date) => void;
  selected: string;
  setSelected: (d: string) => void;
  sessions: Session[];
  subjects: Record<string, Subject>;
}) {
  const y = month.getFullYear();
  const m = month.getMonth();
  const first = new Date(y, m, 1);
  const days = new Date(y, m + 1, 0).getDate();
  const offset = (first.getDay() + 6) % 7;
  const cells = Array.from(
    { length: Math.ceil((offset + days) / 7) * 7 },
    (_, i) => i - offset + 1,
  );

  const byDate = useMemo(() => {
    const map: Record<string, Session[]> = {};
    sessions.forEach((s) => (map[s.date] ??= []).push(s));
    return map;
  }, [sessions]);

  const label = new Intl.DateTimeFormat("fr-BE", {
    month: "long",
    year: "numeric",
  }).format(month);

  const go = (n: number) => setMonth(new Date(y, m + n, 1));

  return (
    <section className="overflow-hidden rounded-3xl border border-black/[.07] bg-white">
      <header className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-gray-400">
            Calendrier
          </p>
          <h2 className="mt-1 text-xl font-semibold capitalize">{label}</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => go(-1)}
            className="rounded-full p-2 hover:bg-gray-100"
            aria-label="Mois précédent"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setMonth(new Date())}
            className="rounded-full px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Aujourd'hui
          </button>
          <button
            onClick={() => go(1)}
            className="rounded-full p-2 hover:bg-gray-100"
            aria-label="Mois suivant"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 border-b text-center text-[10px] font-semibold uppercase tracking-wide text-gray-400 sm:text-[11px]">
        {weekdays.map((d) => (
          <div key={d} className="px-1 py-3">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          const valid = day > 0 && day <= days;
          const d = valid ? iso(y, m, day) : "";
          const list = byDate[d] ?? [];
          const today = new Date();
          const isToday =
            valid &&
            today.getFullYear() === y &&
            today.getMonth() === m &&
            today.getDate() === day;

          return (
            <button
              key={i}
              disabled={!valid}
              onClick={() => valid && setSelected(d)}
              className={`min-h-[96px] border-b border-r p-1.5 text-left align-top sm:min-h-[108px] sm:p-2 ${
                !valid ? "bg-gray-50/60" : "hover:bg-gray-50"
              } ${selected === d ? "ring-2 ring-inset ring-[#6f8876]" : ""}`}
            >
              {valid && (
                <>
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                      isToday ? "bg-[#263229] font-semibold text-white" : ""
                    }`}
                  >
                    {day}
                  </span>

                  <div className="mt-2 space-y-1">
                    {list.slice(0, 3).map((s) => {
                      const style = subjectStyle(s.code);
                      return (
                        <div
                          key={s.id}
                          style={style}
                          className="overflow-hidden rounded-md border-l-[3px] bg-[var(--subject-soft)] px-1.5 py-1 text-[10px] font-semibold leading-tight text-[var(--subject-dark)] sm:text-xs"
                        >
                          <span className="sm:hidden">{subjects[s.code]?.code}</span>
                          <span className="hidden sm:inline">
                            {s.start} · {subjects[s.code]?.code}
                          </span>
                        </div>
                      );
                    })}
                    {list.length > 3 && (
                      <div className="px-1 text-[10px] text-gray-400">
                        +{list.length - 3}
                      </div>
                    )}
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
