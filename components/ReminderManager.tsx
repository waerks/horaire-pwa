"use client";
import { useEffect } from "react";
import type { Schedule } from "@/lib/types";
export default function ReminderManager({schedule}:{schedule:Schedule}){
 useEffect(()=>{
  let timer:number|undefined;
  const plan=()=>{
    if(localStorage.getItem("notifications-enabled")!=="true" || !("Notification" in window) || Notification.permission!=="granted") return;
    const now=new Date();
    const next=schedule.sessions.map(s=>({s,t:new Date(`${s.date}T${s.start}:00`)})).find(x=>x.t.getTime()>now.getTime()+10*60*1000);
    if(!next) return;
    const delay=Math.max(1000,next.t.getTime()-now.getTime()-15*60*1000);
    timer=window.setTimeout(async()=>{
      const subject=schedule.subjects[next.s.code];
      const reg=await navigator.serviceWorker?.ready.catch(()=>null);
      if(reg) reg.showNotification(`Dans 15 minutes : ${subject.name}`,{body:`${next.s.start} — ${next.s.end} · ${next.s.room}`,icon:"/icon.svg",tag:`reminder-${next.s.id}`});
      else new Notification(`Dans 15 minutes : ${subject.name}`,{body:`${next.s.start} — ${next.s.end} · ${next.s.room}`});
      plan();
    },Math.min(delay,2147483647));
  };
  plan(); return()=>{if(timer)clearTimeout(timer)};
 },[schedule]);
 return null;
}
