'use client';
import { useEffect } from 'react';

// Scales the fixed-width design (#root) to fit narrower viewports. Runs in an
// effect (after hydration) so it never mutates the server-rendered DOM during
// hydration, which would cause a mismatch.
export default function FitToWidth({ base = 1440 }: { base?: number }) {
  useEffect(() => {
    const fit = () => {
      const r = document.getElementById('root');
      if (!r) return;
      const w = document.documentElement.clientWidth;
      // Below 768px the real mobile layout is shown (clone hidden). At >=768px
      // scale the fixed 1440 design to the viewport width — both DOWN (tablet) and
      // UP (wide desktop) — so it always fills edge-to-edge with no side gaps
      // (cream strips beside the nav/hero, slate strip beside the footer, etc.).
      (r.style as unknown as { zoom: string }).zoom = w >= 768 ? String(w / base) : '';
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
