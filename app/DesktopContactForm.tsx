'use client';

import { useEffect } from 'react';

/**
 * The desktop booking form lives inside the static Canva HTML (injected via
 * dangerouslySetInnerHTML), so it has no React handler. This client component
 * finds it on mount, adds a honeypot, and submits it to /api/contact via fetch.
 */
export default function DesktopContactForm() {
  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>('form[aria-label="Booking request"]');
    if (!form || form.dataset.wired) return;
    form.dataset.wired = '1';

    // honeypot — bots fill a hidden field, real users never see it
    const hp = document.createElement('input');
    hp.type = 'text';
    hp.name = 'company';
    hp.tabIndex = -1;
    hp.autocomplete = 'off';
    hp.setAttribute('aria-hidden', 'true');
    hp.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0';
    form.appendChild(hp);

    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = {
        name: String(fd.get('name') || ''),
        email: String(fd.get('email') || ''),
        message: String(fd.get('message') || ''),
        company: String(fd.get('company') || ''),
      };
      const label = btn?.textContent || 'Send';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = (await res.json().catch(() => ({ ok: false }))) as { ok?: boolean };
        if (!(res.ok && json.ok)) throw new Error('send failed');
        form.innerHTML =
          '<p style="text-align:center;padding:1.5rem 0;color:#5b4a3f">Thank you — we&rsquo;ll be in touch shortly. ✦</p>';
      } catch {
        if (btn) {
          btn.disabled = false;
          btn.textContent = label;
        }
        let err = form.querySelector<HTMLParagraphElement>('.contact-err');
        if (!err) {
          err = document.createElement('p');
          err.className = 'contact-err';
          err.style.cssText = 'color:#b4453b;font-size:13px;text-align:center;margin-top:8px';
          form.appendChild(err);
        }
        err.textContent = 'Sorry, something went wrong. Please try again, or reach us on LINE @coachaorca.';
      }
    });
  }, []);

  return null;
}
