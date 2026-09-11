"use client";
import { CalendarDays, Clock3 } from "lucide-react";
import { useMemo, useState } from "react";
import type { Schedule } from "@/lib/types";
import Navigation from "./Navigation";
import CourseCard from "./CourseCard";
import Calendar from "./Calendar";
import SearchView from "./SearchView";
import SettingsView from "./SettingsView";
import ReminderManager from "./ReminderManager";
import { getSessionsForDate } from "@/lib/schedule";

function isoToday(){const d=new Date();return new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Brussels"}).format(d);}
function niceDate(iso:string){return new Intl.DateTimeFormat("fr-BE",{weekday:"long",day:"numeric",month:"long",timeZone:"Europe/Brussels"}).format(new Date(`${iso}T12:00:00+02:00`));}
export default function AppShell({schedule}:{schedule:Schedule}){
 const today=isoToday();
 const todaySessions=getSessionsForDate(today);
 const first=schedule.sessions[0]?.date??today,last=schedule.sessions.at(-1)?.date??today;
 const initialMonth=(()=>{const t=new Date(`${today}T12:00:00`), f=new Date(`${first}T12:00:00`), l=new Date(`${last}T12:00:00`);return t<f?f:t>l?l:t})();
 const [view,setView]=useState("home"),[month,setMonth]=useState(new Date(initialMonth.getFullYear(),initialMonth.getMonth(),1)),[selected,setSelected]=useState(today);
 const selectedSessions=getSessionsForDate(selected);
 const next=schedule.sessions.map(s=>({s,t:new Date(`${s.date}T${s.start}:00+02:00`)})).find(x=>x.t>new Date());
 const content= view==="calendar"?<div className="space-y-5"><Calendar month={month} setMonth={setMonth} selected={selected} setSelected={setSelected} sessions={schedule.sessions} subjects={schedule.subjects}/>{selectedSessions.length>0&&<section className="space-y-3"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-gray-400">Jour sélectionné</p><h2 className="mt-1 text-xl font-semibold capitalize">{niceDate(selected)}</h2></div>{selectedSessions.map(s=><CourseCard key={s.id} session={s} subject={schedule.subjects[s.code]}/>)}</section>}</div>
 : view==="search"?<SearchView sessions={schedule.sessions} subjects={schedule.subjects}/>:view==="settings"?<SettingsView schedule={schedule}/>:<Home today={today} todaySessions={todaySessions} next={next?.s} schedule={schedule}/>;
 return <><ReminderManager schedule={schedule}/><div className="mx-auto min-h-screen max-w-6xl px-4 pb-24 pt-5 sm:px-6 md:pb-8">
  <header className="mb-7 flex items-center justify-between"><div className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#263229] text-white"><CalendarDays size={19}/></div><span className="text-sm font-semibold">Horaire IFAPME</span></div><div className="hidden text-right sm:block"><p className="text-xs text-gray-400">{schedule.meta.center}</p><p className="text-xs text-gray-500">{schedule.meta.courseDay}</p></div></header>
  <main>{content}</main>
  <div className="mt-10 md:mt-12"><Navigation view={view} setView={setView}/></div>
 </div></>;
}
function Home({today,todaySessions,next,schedule}:{today:string;todaySessions:ReturnType<typeof getSessionsForDate>;next?:ReturnType<typeof getSessionsForDate>[number];schedule:Schedule}){
 return <div className="space-y-7">
  <section><p className="text-xs font-semibold uppercase tracking-[.18em] text-gray-400">Année scolaire 2026–2027</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Horaire 2026–2027</h1><p className="mt-2 text-gray-500">Décorateur d'intérieur — L15 1A</p></section>
  <section className="space-y-3"><div className="flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-gray-400">Aujourd'hui</p><h2 className="mt-1 text-xl font-semibold capitalize">{niceDate(today)}</h2></div><Clock3 className="text-gray-300" size={23}/></div>
   {todaySessions.length?<div className="space-y-3">{todaySessions.map(s=><CourseCard key={s.id} session={s} subject={schedule.subjects[s.code]}/>)}</div>:<div className="rounded-2xl border border-dashed border-black/10 bg-white p-6"><p className="font-medium">Aucun cours aujourd'hui</p><p className="mt-1 text-sm text-gray-500">Le prochain cours est affiché juste en dessous.</p></div>}
  </section>
  {next&&<section><p className="mb-3 text-xs font-semibold uppercase tracking-[.16em] text-gray-400">Prochain cours</p><div className="rounded-2xl bg-[#263229] p-5 text-white"><p className="text-sm text-white/60 capitalize">{niceDate(next.date)}</p><div className="mt-2 flex items-end justify-between gap-4"><div><h2 className="text-xl font-semibold">{schedule.subjects[next.code].name}</h2><p className="mt-1 text-sm text-white/65">{next.start} — {next.end} · {next.room}</p></div><span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold">{next.code}</span></div></div></section>}
 </div>
}
