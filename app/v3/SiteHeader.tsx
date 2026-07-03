import { CONTENT, IMG } from '../_mobileContent';

// Map the mobile anchor targets to the new v3 section ids.
const HREF: Record<string, string> = {
  '#m-about': '#about',
  '#m-services': '#services',
  '#m-testimonials': '#testimonials',
  '#m-booking': '#contact',
};

export default function SiteHeader({
  lang = 'en' as const,
  base = '',
}: {
  lang?: 'en' | 'th';
  base?: string;
}) {
  const c = CONTENT[lang];
  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <a href="#top" aria-label="Coach Aor CA">
          <img className="site-header__logo" src={IMG.logo} alt="Coach Aor CA" />
        </a>
        <nav className="site-nav" aria-label="Primary">
          {c.nav.map(([label, href]: [string, string]) => (
            <a key={href} className="site-nav__link" href={HREF[href] ?? href}>
              {label}
            </a>
          ))}
          <span className="site-langtoggle" role="group" aria-label="Language">
            <a className="site-langtoggle__seg" href={`${base}/th`} aria-current={lang === 'th' ? 'true' : undefined}>TH</a>
            <a className="site-langtoggle__seg" href={base || '/'} aria-current={lang === 'en' ? 'true' : undefined}>EN</a>
          </span>
        </nav>
      </div>
    </header>
  );
}
