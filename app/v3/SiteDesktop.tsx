import './rebuild.css';
import SiteHeader from './SiteHeader';
import SiteHero from './SiteHero';
import SiteAbout from './SiteAbout';
import SiteServices from './SiteServices';
import SiteTestimonials from './SiteTestimonials';
import SiteBooking from './SiteBooking';
import SiteFooter from './SiteFooter';

/**
 * The rebuilt desktop site. Used two ways:
 *  - preview route /v3 + /v3/th  → base="/v3", home=false (shows at all widths)
 *  - live route    /   + /th     → base="",    home  (hidden < 768; MobileSite takes over)
 */
export default function SiteDesktop({
  lang = 'en' as const,
  base = '',
  home = false,
}: {
  lang?: 'en' | 'th';
  base?: string;
  home?: boolean;
}) {
  return (
    <div className={`site${home ? ' site-home' : ''}`} lang={lang === 'th' ? 'th' : undefined}>
      <SiteHeader lang={lang} base={base} />
      <main>
        <SiteHero lang={lang} />
        <SiteAbout lang={lang} />
        <SiteServices lang={lang} />
        <SiteTestimonials lang={lang} />
        <SiteBooking lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
