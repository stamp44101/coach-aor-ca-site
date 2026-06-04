import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import './clone.css';
import './overrides.css';
import MobileSite from './MobileSite';

// The cloned markup is rendered verbatim. Canva already computed the layout;
// we just replay it with the original CSS, fonts and assets served locally.
// On small screens the cloned desktop layout is hidden and a real responsive
// mobile layout is shown instead (see mobile.css media query).
export const dynamic = 'force-dynamic';

export default function Page() {
  const bodyHtml = readFileSync(join(process.cwd(), 'app', 'clone.html'), 'utf8');
  return (
    <>
      <div className="clone-desktop" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <MobileSite lang="en" />
    </>
  );
}
