import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { TopNav } from "@/components/marketing/TopNav";
import { Footer } from "@/components/marketing/Footer";
import { StickyChips } from "@/components/marketing/StickyChips";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s — Viom Global",
    default: "Viom Global — AI automation for the enterprise",
  },
  description:
    "Viom builds AI automation, LLM copilots, and virtual AI teams for enterprise B2B. Book a strategy call — average response under 2 hours.",
  metadataBase: new URL("https://viom.global"),
  openGraph: {
    title: "Viom Global — AI automation for the enterprise",
    description:
      "Automate workflows, deploy copilots, and stand up virtual AI teams. Built for skeptical enterprise buyers.",
    type: "website",
    siteName: "Viom Global",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  appleWebApp: {
    capable: true,
    title: "Viom Global",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#0A1614",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:border focus:border-accent focus:bg-ink focus:px-4 focus:py-2 focus:text-accent"
        >
          Skip to content
        </a>
        <TopNav />
        <main id="main">{children}</main>
        <Footer />
        <StickyChips />
      </body>
    </html>
  );
}
