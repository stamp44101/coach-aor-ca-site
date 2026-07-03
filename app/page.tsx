import SiteDesktop from './v3/SiteDesktop';
import MobileSite from './MobileSite';

export const dynamic = 'force-dynamic';

// Live home: rebuilt desktop (≥768) + existing mobile (<768). The 768 swap is
// handled in CSS (.site-home hidden <768, .msite hidden ≥768).
export default function Page() {
  return (
    <>
      <SiteDesktop lang="en" home />
      <MobileSite lang="en" />
    </>
  );
}
