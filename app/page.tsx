import AppShell from "@/components/AppShell";
import PWARegister from "@/components/PWARegister";
import { schedule } from "@/lib/schedule";
import { Analytics } from '@vercel/analytics/next';
export default function Page(){return <><PWARegister/><AppShell schedule={schedule}/><Analytics /></>;}
