'use client';
import { useState } from 'react';
import './mobile.css';
import { CONTENT, IMG, SOCIALS, type Lang } from './_mobileContent';

/**
 * A real responsive, accessibility-friendly mobile layout (single column,
 * readable type, large touch targets) shown on small screens in place of the
 * scaled-down desktop clone. Content mirrors the cloned page in EN and TH.
 */

export default function MobileSite({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const headFont = lang === 'th' ? "'Kanit', sans-serif" : "'Playfair Display', serif";
  // The hero headline is English on BOTH languages (matching the desktop clone),
  // so always render it in the elegant Playfair serif — not Kanit on /th.
  const heroFont = "'Playfair Display', serif";

  return (
    <div className="msite" lang={lang}>
      {/* header */}
      <header className="mhead">
        <a href="#top" aria-label="Coach Aor CA"><img className="mlogo" src={IMG.logo} alt="Coach Aor CA" /></a>
        <div className="mhead-right">
          <div className="mlang" role="group" aria-label="Language">
            <a href="/th" className={'mlang-btn' + (lang === 'th' ? ' is-active' : '')} aria-current={lang === 'th' ? 'true' : undefined}>TH</a>
            <a href="/" className={'mlang-btn' + (lang === 'en' ? ' is-active' : '')} aria-current={lang === 'en' ? 'true' : undefined}>EN</a>
          </div>
          <button className="mburger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* slide-in menu from the right + dimmed backdrop */}
      <div
        className={'mmenu-backdrop' + (menu ? ' is-open' : '')}
        onClick={() => setMenu(false)}
        aria-hidden={!menu}
      />
      <nav className={'mmenu' + (menu ? ' is-open' : '')} aria-hidden={!menu}>
        <button className="mmenu-close" aria-label="Close menu" onClick={() => setMenu(false)}>×</button>
        {t.nav.map(([label, href]: [string, string]) => (
          <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>
        ))}
      </nav>

      {/* hero */}
      <section id="top" className="mhero">
        <img className="mhero-bg" src={IMG.hero} alt="" aria-hidden="true" />
        <div className="mhero-inner">
          <h1 style={{ fontFamily: heroFont }}>{t.hero.title}</h1>
          <div className="mhero-with">{t.hero.with}</div>
          <p className="mquote">{t.hero.quote}</p>
          <a className="mbtn mbtn-blue" href="#m-booking">{t.hero.cta}</a>
          <p className="mtag">{t.hero.tag}</p>
        </div>
      </section>

      {/* about */}
      <section id="m-about" className="msec">
        <img className="mphoto" src={IMG.about} alt="Coach Aor" />
        <p className="mbig-quote" style={{ fontFamily: headFont }}>{t.aboutQuote}</p>
        <div className="mname">{t.name}</div>
        <div className="mrole">{t.role}</div>
        <p className="mbody">{t.bio}</p>
        <a className="mbtn mbtn-ghost" href="#m-booking">{t.hero.cta}</a>
      </section>

      {/* services */}
      <section id="m-services" className="msec msec-cream">
        <h2 className="mh2" style={{ fontFamily: headFont }}>{t.servicesTitle}</h2>
        <div className="mcards">
          {t.services.map((s: any, i: number) => (
            <article className="mcard" key={i}>
              <img className="mcard-img" src={IMG.s[i]} alt={s.title} loading="lazy" />
              <div className="mcard-body">
                <h3 className="mcard-title">{s.title}</h3>
                <p className="mcard-desc">{s.desc}</p>
                <ul className="mcard-list">
                  {s.bullets.map((bl: string, j: number) => <li key={j}>{bl}</li>)}
                </ul>
                <div className="mcard-meta">{s.meta}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mbanner">
        <p style={{ fontFamily: headFont }}>{t.cta2}</p>
        <a className="mbtn mbtn-blue" href="#m-booking">{t.hero.cta}</a>
      </section>

      {/* testimonials */}
      <section id="m-testimonials" className="msec">
        <h2 className="mh2" style={{ fontFamily: headFont }}>{t.testimonialsTitle}</h2>
        <div className="mtns">
          {t.testimonials.map((tn: any, i: number) => (
            <figure className="mtn" key={i}>
              <img src={IMG.t[i]} alt={tn.name} loading="lazy" />
              <figcaption>
                <div className="mtn-name">{tn.name}</div>
                <div className="mtn-role">{tn.role}</div>
                <blockquote>{tn.quote}</blockquote>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* booking */}
      <section id="m-booking" className="msec msec-cream">
        <h2 className="mh2" style={{ fontFamily: headFont }}>{t.bookingTitle}</h2>
        <p className="mbody mcenter">{t.bookingText}</p>
        <form className="mform" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <p className="mform-done">{t.form.done}</p>
          ) : (
            <>
              <label>{t.form.name}<input type="text" name="name" required /></label>
              <label>{t.form.email}<input type="email" name="email" required /></label>
              <label>{t.form.message}<textarea name="message" rows={4} /></label>
              <button className="mbtn mbtn-tan" type="submit">{t.form.send}</button>
            </>
          )}
        </form>
        <div className="mqr">
          <figure><img src={IMG.qrLine} alt="LINE QR" /><figcaption>LINE Official</figcaption></figure>
          <figure><img src={IMG.qrWhatsapp} alt="WhatsApp QR" /><figcaption>WhatsApp</figcaption></figure>
        </div>
        <a className="mline" href="https://lin.ee/ZVRHOhSu">LINE Official : @coachaorca</a>
      </section>

      {/* footer */}
      <footer className="mfoot">
        <img className="mfoot-logo" src={IMG.logo} alt="Coach Aor CA" />
        <div className="mfoot-name">Coach Aor CA</div>
        <div className="mfoot-follow">{t.followTxt}</div>
        <nav className="mfoot-social">
          {SOCIALS.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          ))}
        </nav>
        <div className="mfoot-mail"><a href="mailto:soulfulwomens@gmail.com">soulfulwomens@gmail.com</a></div>
      </footer>
    </div>
  );
}
