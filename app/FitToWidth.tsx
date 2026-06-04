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
      // Below 768px the real mobile layout is shown (clone hidden), so only
      // scale the desktop clone between 768px and the design width.
      (r.style as unknown as { zoom: string }).zoom = w >= 768 && w < base ? String(w / base) : '';
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
