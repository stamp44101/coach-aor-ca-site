/**
 * Thai labels + helper text for the editable content fields (used by /admin).
 * Keyed by a dotted path (e.g. "hero.title") or the bare field key; the form
 * falls back to the raw key when a label is missing.
 */
export const LABELS: Record<string, string> = {
  // groups
  hero: "ส่วนหัว",
  services: "บริการ",
  testimonials: "รีวิว",
  form: "ฟอร์มติดต่อ",
  nav: "เมนู",
  SOCIALS: "ลิงก์โซเชียล",
  // hero
  "hero.title": "หัวข้อใหญ่",
  "hero.with": "ข้อความรอง",
  "hero.quote": "คำโปรย",
  "hero.cta": "ปุ่มกดหลัก",
  "hero.tag": "แท็กไลน์",
  // about
  aboutQuote: "คำคม (ตัวใหญ่)",
  name: "ชื่อ",
  role: "ตำแหน่ง",
  bio: "ประวัติ",
  // section titles
  servicesTitle: "หัวข้อหมวดบริการ",
  cta2: "ข้อความปิดท้ายบริการ",
  testimonialsTitle: "หัวข้อหมวดรีวิว",
  bookingTitle: "หัวข้อหมวดจอง",
  bookingText: "ข้อความหมวดจอง",
  followTxt: "ข้อความเหนือไอคอนโซเชียล",
  // service / testimonial item fields
  title: "หัวข้อ",
  desc: "คำอธิบาย",
  meta: "ข้อความย่อย",
  bullets: "รายการย่อย",
  quote: "ข้อความรีวิว",
  // form field labels
  "form.name": "ป้ายช่องชื่อ",
  "form.email": "ป้ายช่องอีเมล",
  "form.message": "ป้ายช่องข้อความ",
  "form.send": "ปุ่มส่ง",
  "form.done": "ข้อความขอบคุณ",
};

/** Short helper text shown under a field's label. */
export const HELP: Record<string, string> = {
  "hero.title": "ข้อความใหญ่สุดบนหน้าแรก",
  "hero.with": "บรรทัดเล็กเหนือ/ใต้หัวข้อใหญ่",
  "hero.quote": "ประโยคโปรยสั้น ๆ",
  aboutQuote: "คำคมตัวใหญ่ในส่วนเกี่ยวกับ",
  bio: "ประวัติโค้ช (ย่อหน้าใต้ชื่อ)",
  cta2: "ข้อความเชิญชวนใต้การ์ดบริการ",
  bookingText: "ข้อความในส่วนจองคิว",
  followTxt: "ข้อความเหนือไอคอนโซเชียลท้ายเว็บ",
  meta: "เช่น ระยะเวลา/ราคา ที่มุมการ์ด",
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
