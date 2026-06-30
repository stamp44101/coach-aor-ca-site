import type { Metadata, Viewport } from 'next';
import { Kanit, Noto_Sans_Thai } from 'next/font/google';
import './globals.css';
import FitToWidth from './FitToWidth';

// Self-host Thai fonts via next/font so they ship from the same origin with
// proper preload hints. The CSS @import URL we had before sometimes failed to
// load on Samsung Browser / older Chromium Android, causing fallback to the
// system Thai face (which has the looped "หัว" letterform stamp doesn't want).
const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-kanit',
});
const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-noto-thai',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coachaorca.com"),
  title: "Coach Aor CA — Panida Thongsui | Transformational Coaching & Hypnotherapy",
  description:
    "Step into your fullest potential with Coach Aor (Panida Thongsui) — a transformational coach and hypnotherapist with 1,000+ coaching hours. Private coaching, hypnotherapy, trauma healing, courses, and workshops.",
  openGraph: {
    title: "Coach Aor CA — Transformational Coaching & Hypnotherapy",
    description:
      "Private coaching, hypnotherapy, trauma healing, courses, and workshops with Coach Aor (Panida Thongsui).",
    url: "https://coachaorca.com",
    siteName: "Coach Aor CA",
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`theme light EHoceA ${kanit.variable} ${notoSansThai.variable}`}>
      <body className="">
        {children}
        {/* Scale the fixed 1440px design to fit narrower screens (mobile start). */}
        <FitToWidth base={1440} />
      </body>
    </html>
  );
}
