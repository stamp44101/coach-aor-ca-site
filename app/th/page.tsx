import SiteDesktop from '../v3/SiteDesktop';
import MobileSite from '../MobileSite';

export const dynamic = 'force-dynamic';

// Live Thai home: rebuilt desktop (≥768) + existing mobile (<768).
export default function Page() {
  return (
    <>
      <SiteDesktop lang="th" home />
      <MobileSite lang="th" />
    </>
  );
}
