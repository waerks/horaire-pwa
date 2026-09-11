import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Horaire 2026–2027 · Décorateur d'intérieur",
  description: "Horaire de cours IFAPME — Décorateur d'intérieur L15 1A",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="fr"><body>{children}<Analytics /></body></html>;
}
