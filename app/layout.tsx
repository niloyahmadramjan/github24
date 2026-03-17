import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://github24.com"),
  title: {
    default: "GitHub24 — Real-time GitHub Activity Monitor",
    template: "%s | GitHub24",
  },
  description:
    "Monitor GitHub repos in real-time. Get instant Telegram notifications for stars, forks, issues, and PRs. Deep analytics and contributor outreach — all for free.",
  keywords: [
    "github dashboard", "github analytics", "github monitoring",
    "telegram github notifications", "github repo tracker",
    "github stars tracker", "open source analytics", "github24",
  ],
  authors: [{ name: "GitHub24", url: "https://github24.com" }],
  creator: "GitHub24",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github24.com",
    siteName: "GitHub24",
    title: "GitHub24 — Real-time GitHub Activity Monitor",
    description: "Monitor GitHub repos in real-time with Telegram alerts and deep analytics.",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "GitHub24" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub24 — Real-time GitHub Activity Monitor",
    description: "Monitor GitHub repos with Telegram alerts and deep analytics. Free forever.",
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: "https://github24.com" },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#080b0f" }],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}