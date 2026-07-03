import SiteDesktop from './SiteDesktop';

export const dynamic = 'force-dynamic';

// Preview of the rebuilt desktop (English). base="/v3" keeps the TH/EN toggle
// pointing at the preview routes; no `home` flag so it shows at all widths.
export default function V3Page() {
  return <SiteDesktop lang="en" base="/v3" />;
}
