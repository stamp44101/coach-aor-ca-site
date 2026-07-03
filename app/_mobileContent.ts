// Content now lives in the editable JSON files (content/*.json) and is loaded
// through the typed, schema-validated loader in lib/content.ts — the
// self-hosted CMS content layer. This module keeps its original
// CONTENT / IMG / SOCIALS / Lang surface so every component that imports from
// "./_mobileContent" (mobile + v3 desktop) stays completely unchanged.
import { CONTENT as LOADED, GLOBAL } from "../lib/content";
import type { Lang } from "../lib/content";

export type { Lang };

export const CONTENT = LOADED;
export const IMG = GLOBAL.IMG;
export const SOCIALS: ReadonlyArray<readonly [string, string]> = GLOBAL.SOCIALS;
