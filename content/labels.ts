/**
 * Thai labels for the editable content fields (used by the /admin form).
 * Keyed by the field KEY (last path segment) or a dotted path; the form falls
 * back to the raw key when a label is missing.
 */
export const LABELS: Record<string, string> = {
  // groups
  hero: "Hero (ส่วนหัว)",
  services: "บริการ (Services)",
  testimonials: "รีวิว (Testimonials)",
  form: "ฟอร์มติดต่อ",
  nav: "เมนู (Nav)",
  IMG: "รูปภาพ",
  SOCIALS: "โซเชียล",
  // hero
  "hero.title": "หัวข้อหลัก",
  "hero.with": "ข้อความ WITH",
  "hero.quote": "คำคม",
  "hero.cta": "ปุ่ม CTA",
  "hero.tag": "แท็กไลน์",
  // about
  aboutQuote: "About — คำคม (ฟ้าหม่น)",
  name: "ชื่อ",
  role: "ตำแหน่ง",
  bio: "ประวัติ (bio)",
  // section titles
  servicesTitle: "หัวข้อ Services",
  cta2: "Services — ข้อความปิดท้าย",
  testimonialsTitle: "หัวข้อ Testimonials",
  bookingTitle: "หัวข้อ Booking",
  bookingText: "Booking — ข้อความ",
  followTxt: "Footer — ข้อความ follow",
  // service / testimonial item fields
  title: "หัวข้อ",
  desc: "คำอธิบาย",
  meta: "ข้อมูลย่อย (meta)",
  bullets: "รายการย่อย (bullets)",
  quote: "คำรีวิว",
  // form labels
  "form.name": "ป้ายช่องชื่อ",
  "form.email": "ป้ายช่องอีเมล",
  "form.message": "ป้ายช่องข้อความ",
  "form.send": "ปุ่มส่ง",
  "form.done": "ข้อความขอบคุณ",
  // images
  logo: "โลโก้",
  about: "รูป About",
  booking: "รูป Booking (bg)",
  qrWhatsapp: "QR WhatsApp",
  qrLine: "QR LINE",
  s: "รูปการ์ดบริการ",
  t: "รูปรีวิว",
};

/** Fields that render as a multi-line textarea (long copy). */
export const TEXTAREA = new Set<string>([
  "hero.quote",
  "aboutQuote",
  "bio",
  "desc",
  "quote",
  "bookingText",
  "cta2",
]);

/** Fields that are image paths (render with a preview + path input). */
export const IMAGE_KEYS = new Set<string>([
  "logo",
  "hero",
  "about",
  "booking",
  "qrWhatsapp",
  "qrLine",
  "s",
  "t",
]);
