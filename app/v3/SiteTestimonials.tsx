import { CONTENT } from '../_mobileContent';

type T = { name: string; role: string; quote: string };

// Figma testimonial photos (order = Sai / Prae / Bam, matching our content).
const TST_IMG = ['/assets/tst0.jpg', '/assets/tst1.jpg', '/assets/tst2.jpg'];

export default function SiteTestimonials({ lang = 'en' as const }: { lang?: 'en' | 'th' }) {
  const c = CONTENT[lang];
  return (
    <section className="site-testimonials" id="testimonials">
      <div className="site-container">
        <h2 className="site-testimonials__title">{c.testimonialsTitle}</h2>
        <div className="site-testi-row">
          {c.testimonials.map((t: T, i: number) => (
            <figure
              className="site-testi"
              key={t.name}
              style={{ backgroundImage: `url(${TST_IMG[i % TST_IMG.length]})` }}
            >
              <div className="site-testi__body">
                <blockquote className="site-testi__quote">{t.quote}</blockquote>
                <figcaption>
                  <div className="site-testi__name">{t.name},</div>
                  <div className="site-testi__role">{t.role}</div>
                </figcaption>
              </div>
            </figure>
          ))}
          <div className="site-testi-arrow" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
