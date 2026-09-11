"use client";
import { CalendarDays, Home, Search, Settings } from "lucide-react";
export default function Navigation({view,setView}:{view:string;setView:(v:string)=>void}) {
 const items=[["home","Accueil",Home],["calendar","Calendrier",CalendarDays],["search","Recherche",Search],["settings","Paramètres",Settings]] as const;
 return <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[.07] bg-white/95 backdrop-blur md:static md:border-0 md:bg-transparent">
  <div className="mx-auto flex max-w-6xl justify-around px-2 py-2 md:justify-start md:gap-1 md:px-0 md:py-0">{items.map(([id,label,Icon])=><button key={id} onClick={()=>setView(id)} className={`flex min-w-[70px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-[11px] font-medium md:flex-row md:gap-2 md:text-sm ${view===id?"bg-[#e8eee9] text-[#304438]":"text-gray-500 hover:bg-gray-100"}`}><Icon size={18}/>{label}</button>)}</div>
 </nav>
}
