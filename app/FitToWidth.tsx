'use client';
import { useEffect } from 'react';

// Scales the fixed-width design (#root) to fit narrower viewports. Runs in an
// effect (after hydration) so it never mutates the server-rendered DOM during
// hydration, which would cause a mismatch.
// Don't scale the design larger than the Figma reference frame. Past this the
// old code kept zooming (zoom = w/1440) so on wide monitors every element grew
// beyond the Figma spec and read as oversized. Capping here locks the design at
// its 1920 size on wider screens (extra width shows the cream page canvas).
const MAX_DESIGN_WIDTH = 1920;

export default function FitToWidth({ base = 1440 }: { base?: number }) {
  useEffect(() => {
    const fit = () => {
      const r = document.getElementById('root');
      if (!r) return;
      const w = document.documentElement.clientWidth;
      // Below 768px the real mobile layout is shown (clone hidden). At >=768px
      // scale the fixed 1440 design DOWN on narrow screens and UP on desktop,
      // but never beyond MAX_DESIGN_WIDTH so it matches the Figma 1920 spec and
      // stops inflating on wide monitors.
      (r.style as unknown as { zoom: string }).zoom =
        w >= 768 ? String(Math.min(w, MAX_DESIGN_WIDTH) / base) : '';
    };
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('orientationchange', fit);
    return () => {
      window.removeEventListener('resize', fit);
      window.removeEventListener('orientationchange', fit);
    };
  }, [base]);
  return null;
}
