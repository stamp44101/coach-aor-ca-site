'use client';

import { useState } from 'react';
import { CONTENT } from '../_mobileContent';

// Native React booking form → posts to the existing /api/contact endpoint
// (nodemailer → cPanel SMTP). Honeypot field `company` blocks bots.
export default function SiteBookingForm({ lang = 'en' as const }: { lang?: 'en' | 'th' }) {
  const f = CONTENT[lang].form;
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('company')) return; // honeypot tripped
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: String(fd.get('name') || ''),
          email: String(fd.get('email') || ''),
          message: String(fd.get('message') || ''),
          company: '',
        }),
      });
      const json = (await res.json().catch(() => ({ ok: false }))) as { ok?: boolean };
      if (!(res.ok && json.ok)) throw new Error('send failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="site-form">
        <p className="site-form__note" style={{ textAlign: 'center', padding: '1.5rem 0' }}>{f.done}</p>
      </div>
    );
  }

  return (
    <form className="site-form" onSubmit={onSubmit} aria-label="Booking request">
      <div className="site-field">
        <label htmlFor="bk-name">{f.name}</label>
        <input id="bk-name" name="name" required />
      </div>
      <div className="site-field">
        <label htmlFor="bk-email">{f.email}</label>
        <input id="bk-email" name="email" type="email" required />
      </div>
      <div className="site-field">
        <label htmlFor="bk-msg">{f.message}</label>
        <textarea id="bk-msg" name="message" />
      </div>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <button className="site-form__send" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : f.send}
      </button>
      {status === 'error' && (
        <p className="site-form__note" style={{ color: '#b4453b' }}>
          Sorry, something went wrong — please try again, or reach us on LINE @coachaorca.
        </p>
      )}
    </form>
  );
}
