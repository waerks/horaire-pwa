"use client";
import { Bell, BellOff, Info } from "lucide-react";
import { useEffect, useState } from "react";
import type { Schedule } from "@/lib/types";
export default function SettingsView({schedule}:{schedule:Schedule}) {
 const [enabled,setEnabled]=useState(false); const [status,setStatus]=useState("");
 useEffect(()=>setEnabled(localStorage.getItem("notifications-enabled")==="true"),[]);
 async function toggle(){
  if(enabled){setEnabled(false);localStorage.setItem("notifications-enabled","false");setStatus("Rappels désactivés.");return;}
  if(!("Notification" in window)){setStatus("Les notifications ne sont pas disponibles sur ce navigateur.");return;}
  const permission=Notification.permission==="granted"? "granted":await Notification.requestPermission();
  if(permission!=="granted"){setStatus("Permission de notification refusée.");return;}
  setEnabled(true);localStorage.setItem("notifications-enabled","true");setStatus("Rappels activés lorsque l’application est en mesure de les planifier.");
 }
 return <div className="space-y-5"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-gray-400">Paramètres</p><h1 className="mt-1 text-2xl font-semibold">Préférences</h1></div>
 <div className="rounded-2xl border border-black/[.07] bg-white p-4"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="rounded-xl bg-[#edf1ed] p-2">{enabled?<Bell size={19}/>:<BellOff size={19}/>}</div><div><p className="font-medium">Rappels de cours</p><p className="text-sm text-gray-500">15 minutes avant le début</p></div></div><button onClick={toggle} className={`rounded-full px-4 py-2 text-sm font-semibold ${enabled?"bg-[#304438] text-white":"bg-gray-100 text-gray-700"}`}>{enabled?"Activées":"Désactivées"}</button></div>{status&&<p className="mt-3 text-sm text-gray-500">{status}</p>}</div>
 <div className="rounded-2xl bg-[#eef2ee] p-4 text-sm text-gray-600"><Info size={17} className="mb-2"/><p>Les notifications PWA dépendent du navigateur et du système. Cette version planifie les rappels côté navigateur pendant que l’application peut exécuter son code ; elle ne promet donc pas un réveil fiable sur tous les appareils, notamment iOS.</p></div>
 <div className="rounded-2xl border border-black/[.07] bg-white p-4 text-sm text-gray-600"><p className="font-medium text-gray-800">{schedule.meta.center}</p><p className="mt-1">{schedule.meta.address}</p><p className="mt-3">Cours le vendredi · {schedule.meta.location}</p></div>
 </div>
}
