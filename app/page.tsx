import AppShell from "@/components/AppShell";
import PWARegister from "@/components/PWARegister";
import { schedule } from "@/lib/schedule";
export default function Page(){return <><PWARegister/><AppShell schedule={schedule}/></>;}
