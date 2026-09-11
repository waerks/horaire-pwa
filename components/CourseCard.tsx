"use client";
import { useState } from "react";
import { ChevronDown, MapPin, UserRound } from "lucide-react";
import type { Session, Subject } from "@/lib/types";
import { subjectStyle } from "@/lib/colors";
export default function CourseCard({session, subject}:{session:Session; subject:Subject}) {
  const [open,setOpen]=useState(false);
  return <article style={subjectStyle(subject.code)} className="rounded-2xl border border-black/[.07] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,.03)]">
    <div className="flex gap-4">
      <div className="w-[92px] shrink-0"><div className="text-sm font-semibold tabular-nums">{session.start} —</div><div className="text-sm font-semibold tabular-nums">{session.end}</div></div>
      <div className="min-w-0 flex-1 border-l pl-4" style={{borderColor:"var(--subject)"}}>
        <div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold leading-snug">{subject.name}</h3><span className="mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold" style={{background:"var(--subject-soft)",color:"var(--subject-dark)"}}>{subject.code}</span></div>
        <button onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Afficher les détails" className="rounded-full p-2 text-gray-500 hover:bg-gray-100"><ChevronDown size={18} className={open?"rotate-180 transition-transform":"transition-transform"}/></button></div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500"><span className="inline-flex items-center gap-1"><MapPin size={15}/> {session.room}</span><span className="inline-flex items-center gap-1"><UserRound size={15}/> {subject.teacher}</span></div>
      </div>
    </div>
    {open && <div className="mt-4 border-t pt-4 text-sm text-gray-600"><dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <div><dt className="text-xs uppercase tracking-wide text-gray-400">Date</dt><dd>{session.date}</dd></div><div><dt className="text-xs uppercase tracking-wide text-gray-400">Classe</dt><dd>FCE - L15 1A - Décorateur d'intérieur</dd></div>
      <div><dt className="text-xs uppercase tracking-wide text-gray-400">Matière</dt><dd>{subject.name} ({subject.code})</dd></div><div><dt className="text-xs uppercase tracking-wide text-gray-400">Volume</dt><dd>{subject.hours} h</dd></div>
      <div><dt className="text-xs uppercase tracking-wide text-gray-400">Début matière</dt><dd>{subject.startDate}</dd></div><div><dt className="text-xs uppercase tracking-wide text-gray-400">Fin matière</dt><dd>{subject.endDate}</dd></div>
    </dl></div>}
  </article>;
}
