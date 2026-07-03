import { CONTENT } from '../_mobileContent';

type Service = { title: string; desc: string; bullets: string[]; meta: string };

// Figma service card photos, downloaded from the design (index = service order:
// Private / Hypnotherapy / Online Course / Workshops / Coach Training).
const SVC_IMG = [
  '/assets/svc0.jpg',
  '/assets/svc1.jpg',
  '/assets/svc2.jpg',
  '/assets/svc3.jpg',
  '/assets/svc4.jpg',
];

export default function SiteServices({ lang = 'en' as const }: { lang?: 'en' | 'th' }) {
  const c = CONTENT[lang];
  const services = c.services as Service[];
  const [featured, ...rest] = services;

  const Card = (s: Service, imgIdx: number, isFeatured = false) => (
    <article
      className={`svc-card${isFeatured ? ' svc-card--featured' : ''}`}
      key={s.title}
      style={{ backgroundImage: `url(${SVC_IMG[imgIdx % SVC_IMG.length]})` }}
    >
      <div className="svc-card__body">
        <div className="svc-card__head">
          <h3 className="svc-card__title">{s.title}</h3>
          <p className="svc-card__desc">{s.desc}</p>
        </div>
        <div className="svc-card__cols">
          <ul className="svc-card__bullets">
            {s.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="svc-card__aside">
            <p className="svc-card__meta">{s.meta}</p>
            <a className="site-btn site-btn--cream" href="#contact">{c.hero.cta}</a>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <section className="site-services" id="services">
      <div className="site-container">
        <h2 className="site-services__title">{c.servicesTitle}</h2>
        {Card(featured, 0, true)}
        <div className="site-services__grid">
          {rest.map((s, i) => Card(s, i + 1))}
        </div>
        <div className="site-services__cta">
          <p className="site-services__cta-text">{c.cta2}</p>
          <a className="site-services__arrow" href="#contact" aria-label="Book a session">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
