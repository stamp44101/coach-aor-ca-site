import { CONTENT, IMG } from '../_mobileContent';

export default function SiteAbout({ lang = 'en' as const }: { lang?: 'en' | 'th' }) {
  const c = CONTENT[lang];
  return (
    <section className="site-about" id="about">
      <div className="site-container">
        <div className="site-about__inner">
          <img className="site-about__img" src={IMG.about} alt={c.name} />
          <div className="site-about__content">
            <blockquote className="site-about__quote">{c.aboutQuote}</blockquote>
            <div className="site-about__byline">
              <span className="site-about__name">{c.name},</span>
              <span className="site-about__role">{c.role}</span>
            </div>
            <p className="site-about__bio">{c.bio}</p>
            {/* pushed to the bottom of the text column so it lines up with the
                bottom edge of the photo (Stamp) */}
            <a className="site-about__cta site-btn site-btn--outline" href="#contact">{c.hero.cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
