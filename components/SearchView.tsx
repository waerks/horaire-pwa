"use client";
import { Search as SearchIcon } from "lucide-react";
import type { Session, Subject } from "@/lib/types";
import CourseCard from "./CourseCard";
export default function SearchView({sessions,subjects}:{sessions:Session[];subjects:Record<string,Subject>}) {
 const [q,setQ]=React.useState("");
 const results=q.trim()?sessions.filter(s=>{const x=subjects[s.code];const hay=`${x.name} ${x.code} ${x.teacher}`.toLowerCase();return hay.includes(q.toLowerCase())}):[];
 return <div className="space-y-5"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-gray-400">Recherche</p><h1 className="mt-1 text-2xl font-semibold">Cours & formateurs</h1></div>
 <div className="relative"><SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={19}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Expression graphique, EXG, Meeus…" className="w-full rounded-2xl border border-black/[.08] bg-white py-3.5 pl-11 pr-4 outline-none ring-[#71897a] focus:ring-2"/></div>
 {!q?<p className="text-sm text-gray-500">Recherchez une matière par son nom ou son code, ou un formateur par son nom.</p>:results.length?<div className="space-y-3">{results.map(s=><CourseCard key={s.id} session={s} subject={subjects[s.code]}/>)}</div>:<div className="rounded-2xl border border-dashed border-black/10 bg-white p-8 text-center text-sm text-gray-500">Aucun résultat pour « {q} ».</div>}</div>
}
import React from "react";
