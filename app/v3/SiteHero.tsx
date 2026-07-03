import { CONTENT, IMG } from '../_mobileContent';

export default function SiteHero({ lang = 'en' as const }: { lang?: 'en' | 'th' }) {
  const h = CONTENT[lang].hero;
  return (
    <section
      className="site-hero"
      id="top"
      style={{ '--hero-img': `url(${IMG.hero})` } as React.CSSProperties}
    >
      <div className="site-hero__bg" aria-hidden />
      <div className="site-hero__inner">
        <h1 className="site-hero__title">{h.title}</h1>
        <p className="site-hero__with">{h.with}</p>
        <p className="site-hero__quote">{h.quote}</p>
        <a className="site-btn site-btn--primary" href="#contact">{h.cta}</a>
        <p className="site-hero__tag">{h.tag}</p>
      </div>
    </section>
  );
}
