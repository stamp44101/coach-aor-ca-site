import en from "../content/en.json";
import th from "../content/th.json";
import global from "../content/global.json";
import {
  LocaleContentSchema,
  GlobalContentSchema,
  type LocaleContent,
  type GlobalContent,
  type Lang,
} from "../content/schema";

/**
 * Typed content loader. Validates the JSON against the schema at module load
 * (i.e. build time) — a malformed content file fails the BUILD loudly instead
 * of shipping a broken page. Because the last good deploy stays live on Vercel,
 * a bad save can never take the site down.
 */
const CONTENT: Record<Lang, LocaleContent> = {
  en: LocaleContentSchema.parse(en),
  th: LocaleContentSchema.parse(th),
};
const GLOBAL: GlobalContent = GlobalContentSchema.parse(global);

export function getContent(locale: Lang): LocaleContent {
  return CONTENT[locale];
}
export function getGlobal(): GlobalContent {
  return GLOBAL;
}

export { CONTENT, GLOBAL };
export type { LocaleContent, GlobalContent, Lang };
