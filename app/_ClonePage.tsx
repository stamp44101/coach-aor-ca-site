import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import './clone.css';
import './overrides.css';
import MobileSite from './MobileSite';

type Lang = 'en' | 'th';

const FILE: Record<Lang, string> = {
  en: 'clone.html',
  th: 'clone.th.html',
};

export function ClonePage({ lang }: { lang: Lang }) {
  const bodyHtml = readFileSync(join(process.cwd(), 'app', FILE[lang]), 'utf8');
  return (
    <>
      <div className="clone-desktop" lang={lang} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <MobileSite lang={lang} />
    </>
  );
}
