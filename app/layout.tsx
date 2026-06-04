import type { Metadata, Viewport } from 'next';
import './globals.css';
import FitToWidth from './FitToWidth';

export const metadata: Metadata = {
  title: "Copy of COACH AOR CA - Website Design (Laptop Version)",
  description: "",
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className="theme light EHoceA">
      <body className="">
        {children}
        {/* Scale the fixed 1440px design to fit narrower screens (mobile start). */}
        <FitToWidth base={1440} />
      </body>
    </html>
  );
}
