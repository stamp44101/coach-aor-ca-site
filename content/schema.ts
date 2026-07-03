import { z } from "zod";

/**
 * Content schema — the SINGLE SOURCE OF TRUTH for the editable content.
 * Drives (a) the render-time TypeScript types, (b) build-time validation in
 * lib/content.ts, and (c) the /admin form generation. Layout/structure stays
 * in code — only these fields are editable, so the admin can't break the design.
 */

// nav item = [label, href]  (href points at an in-page anchor, editable label)
const NavItem = z.tuple([z.string(), z.string()]);

const Hero = z.object({
  title: z.string(),
  with: z.string(),
  quote: z.string(),
  cta: z.string(),
  tag: z.string(),
});

const Service = z.object({
  title: z.string(),
  desc: z.string(),
  bullets: z.array(z.string()),
  meta: z.string(),
});

const Testimonial = z.object({
  name: z.string(),
  role: z.string(),
  quote: z.string(),
});

const Form = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
  send: z.string(),
  done: z.string(),
});

/** Per-language editable content (content/en.json, content/th.json). */
export const LocaleContentSchema = z.object({
  nav: z.array(NavItem),
  hero: Hero,
  aboutQuote: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  servicesTitle: z.string(),
  services: z.array(Service),
  cta2: z.string(),
  testimonialsTitle: z.string(),
  testimonials: z.array(Testimonial),
  bookingTitle: z.string(),
  bookingText: z.string(),
  form: Form,
  followTxt: z.string(),
});
export type LocaleContent = z.infer<typeof LocaleContentSchema>;

const Img = z.object({
  logo: z.string(),
  hero: z.string(),
  about: z.string(),
  booking: z.string(),
  qrWhatsapp: z.string(),
  qrLine: z.string(),
  s: z.array(z.string()), // service card photos
  t: z.array(z.string()), // testimonial photos
});

/** Language-shared content (content/global.json): images + social links. */
export const GlobalContentSchema = z.object({
  IMG: Img,
  SOCIALS: z.array(z.tuple([z.string(), z.string()])), // [label, url]
});
export type GlobalContent = z.infer<typeof GlobalContentSchema>;

export type Lang = "en" | "th";
