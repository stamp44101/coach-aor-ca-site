import { CONTENT, IMG, SOCIALS } from '../_mobileContent';

// Compact inline brand glyphs (24x24) so the footer needs no icon assets.
const ICONS: Record<string, React.ReactNode> = {
  LINE: <path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.07.7.2.8.5.1.2.07.6.03.9l-.13.8c-.04.25-.2 1 .9.55 1.1-.46 5.9-3.5 8-6C21.5 14 22 12.6 22 11c0-4.4-4.5-8-10-8Zm-3.4 10.6H6.5c-.3 0-.5-.2-.5-.5V9.9c0-.3.2-.5.5-.5s.5.2.5.5v2.7h1.6c.3 0 .5.2.5.5s-.2.5-.5.5Zm2-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V9.9c0-.3.2-.5.5-.5s.5.2.5.5v3.2Zm4.5 0c0 .2-.14.4-.35.48-.05.02-.1.02-.15.02-.16 0-.3-.07-.4-.2l-1.65-2.24v1.94c0 .3-.2.5-.5.5s-.5-.2-.5-.5V9.9c0-.2.14-.4.35-.48.2-.07.44 0 .55.18l1.65 2.24V9.9c0-.3.2-.5.5-.5s.5.2.5.5v3.2Zm3-2.1c.3 0 .5.2.5.5s-.2.5-.5.5h-1.1v.6h1.1c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6c-.3 0-.5-.2-.5-.5V9.9c0-.3.2-.5.5-.5h1.6c.3 0 .5.2.5.5s-.2.5-.5.5h-1.1v.6h1.1Z"/>,
  Facebook: <path d="M15.12 5.32H17V2.14A26 26 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.6H6.6v3.56h3.08V22h3.7v-9.14h3.06l.46-3.56h-3.52V7.05c0-1.03.28-1.73 1.74-1.73Z"/>,
  Instagram: <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77c-.55.55-1.11.89-1.77 1.15-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.55-.55 1.11-.89 1.77-1.15.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4Zm5.2-9.4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"/>,
  TikTok: <path d="M16.6 5.82a4.28 4.28 0 0 1-1.87-2.98V2.5h-3v11.9a2.45 2.45 0 1 1-2.45-2.45c.26 0 .5.04.75.11v-3.06a5.5 5.5 0 1 0 4.7 5.44V8.9a7.1 7.1 0 0 0 3.9 1.19V7.05a4.28 4.28 0 0 1-2.03-1.23Z"/>,
  YouTube: <path d="M23 12s0-3.4-.4-5c-.24-.9-.94-1.6-1.84-1.84C19.16 4.8 12 4.8 12 4.8s-7.16 0-8.76.36C2.34 5.4 1.64 6.1 1.4 7 .99 8.6 1 12 1 12s0 3.4.4 5c.24.9.94 1.6 1.84 1.84 1.6.36 8.76.36 8.76.36s7.16 0 8.76-.36c.9-.24 1.6-.94 1.84-1.84.4-1.6.4-5 .4-5Zm-13.5 3.2V8.8L15.5 12l-6 3.2Z"/>,
};

export default function SiteFooter({ lang = 'en' as const }: { lang?: 'en' | 'th' }) {
  const c = CONTENT[lang];
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <div className="site-footer__brand">
          <img src={IMG.logo} alt="Coach Aor CA" />
          <div>
            <div className="site-footer__brand-name">Coah Aor CA</div>
            <div className="site-footer__brand-url">www.coachaorca.com</div>
          </div>
        </div>
        <div className="site-footer__social">
          <div className="site-footer__icons">
            {SOCIALS.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>
              </a>
            ))}
          </div>
          <div className="site-footer__follow">{c.followTxt}</div>
        </div>
      </div>
    </footer>
  );
}
