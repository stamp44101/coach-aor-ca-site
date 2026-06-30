export type Lang = 'en' | 'th';

const A = '/assets/';

export const IMG = {
  logo: A + '6a3b05c7f68885946c1acc9888638750.png',
  hero: A + '05e1b97cbad92d8c9accd67142277d86.jpg',
  about: A + '13531b2682173fa73aadddbf9af5444c.jpg',
  booking: A + '07dea294c8102a2a1d78f9b7cadf5c83.jpg',
  // The Canva-bundled QR pngs are 490×442 (WhatsApp) and 800×776 (LINE) —
  // not square. The mobile CSS forces both into a 116×116 box, which made
  // the WhatsApp QR look squished and noticeably smaller than LINE. Point
  // both at the brand-trimmed square 540×540 files in the same assets
  // folder so they render identically.
  qrWhatsapp: A + 'whatsapp-qr.jpg',
  qrLine: A + 'line-qr.png',
  s: [
    A + '99831c8bc1f4f5f71d11a29927ffacb9.jpg',
    A + 'ce973278bc7ab36150d5cf24b34b1c87.jpg',
    A + '426551c9a5703b5386c79f3799cae0ca.jpg',
    A + '5d20365a48ff83639cdff084d3188bb7.jpg',
    A + '783ccad14583f32848c90877a68c81f6.jpg',
  ],
  // Order matches the desktop L→R testimonial layout (Khun Sai, Khun Pear,
  // Khun Bam) so the mobile photo above each caption is the same person as on
  // desktop. Source array hashes (desktop x-coords measured 2026-06-16):
  //   7c654a @ x=112 → Khun Sai
  //   1d18e77 @ x=402 → Khun Pear
  //   355c91  @ x=1103 → Khun Bam
  t: [
    A + '7c654a1b432649cca1c46f51e9b7bc1e.jpg',
    A + '1d18e77e0429b1ad3732cd953aac352f.jpg',
    A + '355c91cbc9cdbe7f17f365cdc9896c9d.jpg',
  ],
};

export const SOCIALS: ReadonlyArray<readonly [string, string]> = [
  ['LINE', 'https://lin.ee/ZVRHOhSu'],
  ['Facebook', 'https://www.facebook.com/coachaor.ca/'],
  ['Instagram', 'https://www.instagram.com/coachaor.ca/'],
  ['TikTok', 'https://www.tiktok.com/@coachaor.ca'],
  ['YouTube', 'https://www.youtube.com/@CoachAorCA'],
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CONTENT: Record<Lang, any> = {
  en: {
    nav: [
      ['About Me', '#m-about'],
      ['Service', '#m-services'],
      ['Testimonials', '#m-testimonials'],
      ['Contact', '#m-booking'],
    ],
    hero: {
      title: 'Step Into Your Feminine Power',
      with: 'WITH COACH AOR',
      quote: '“I believe that every woman can create the life she desires, once she truly knows herself and connect to the power within.”',
      cta: 'Book a Session',
      tag: 'Unleash your potential with professional coaching.',
    },
    aboutQuote: '“All power comes from reconnecting with your true self.”',
    name: 'Panida Thongsui — Coach Aor',
    role: '(Transformational Coach & Founder of Coach Aor CA)',
    bio: 'After overcoming chronic health issues, stress, and burnout at just 19, I embarked on a journey of holistic healing. By mastering the art of self-healing without medication, I transformed my life and dedicated myself to professional coaching and counseling at an international standard. With over 1,000 coaching hours, I believe true transformation must happen across Body, Mind, Energy, and the Subconscious. My approach integrates Professional Coaching, Hypnotherapy, Trauma Healing, Yin-Yang Balance, and Spiritual Energy Work — empowering women to reconnect with themselves and design a life aligned with their truest values.',
    servicesTitle: 'Our Services',
    services: [
      { title: 'Private Coaching', desc: 'Deep-dive coaching to identify and resolve root causes while designing a sustainable lifestyle.', bullets: ['Love & Relationships', 'Self-Worth & Confidence', 'Inner Child & Trauma Healing', 'Feminine Energy', 'Wealth & Success', 'Life Purpose & Values'], meta: '60–90 min / session' },
      { title: 'Coaching + Hypnotherapy', desc: 'A powerful blend of professional coaching and hypnotherapy to rewire the subconscious mind and release deep-seated blocks.', bullets: ['Fear of abandonment', 'Repeating relationship patterns', 'Low self-worth', 'Fear of success', 'Trauma & emotional blocks'], meta: '90–120 min / session' },
      { title: 'Online Course', desc: 'Transform from the comfort of your home. Focused on Feminine Energy, Self-Love, and Self-Worth.', bullets: ['Awaken Feminine Energy', 'High Value Woman'], meta: '3–5 hours / course' },
      { title: 'Workshops & Retreat', desc: 'In-person experiences designed as a safe space for deep listening and self-reconnection.', bullets: ["Women's Circle", 'Dream Board Workshop', 'Sound Healing', 'Self-love & Self-care'], meta: 'Chiang Mai · Bangkok · Phuket' },
      { title: 'Transformational Coach Training', desc: 'Get certified and master the art of coaching for professional and personal success.', bullets: ['Coaching Foundations', 'World-Class Coaching Tools', 'Case Studies', 'Building Client Trust', 'Growing a Coaching Business'], meta: 'Approx. 2 months' },
    ],
    cta2: 'Ready to start your transformation with Coach Aor?',
    testimonialsTitle: 'Testimonials',
    testimonials: [
      { name: 'Khun Sai', role: 'Psychotherapist & Business Owner', quote: '“I’m so grateful we met. I used to be paralyzed by the fear of building a business. Today I’ve found the courage to take action and turn my vision into reality. I now wake up every day excited to live my life to the fullest.”' },
      { name: 'Khun Pear', role: 'Business owner & Investor', quote: '“I want to thank you, Coach Aor, and thank myself for choosing to shift my inner energy. I spent so long chasing success until my body and mind broke down. Now I’ve found the courage to quit and build a new life for myself.”' },
      { name: 'Khun Bam', role: 'Investor', quote: '“Thank you for being my mirror and providing the guidance that helped me see myself so clearly. My mindset has shifted tremendously — even my friends have noticed the change. I only wish we had met sooner!”' },
    ],
    bookingTitle: 'Booking & Consultation',
    bookingText: 'Book a session with Coach Aor.',
    form: { name: 'Name', email: 'Email', message: 'Message', send: 'Send', done: 'Thank you — we’ll be in touch shortly. ✦' },
    followTxt: 'Follow Me On Social Media',
  },
  th: {
    nav: [
      ['เกี่ยวกับ', '#m-about'],
      ['บริการ', '#m-services'],
      ['รีวิว', '#m-testimonials'],
      ['ติดต่อ', '#m-booking'],
    ],
    hero: {
      title: 'Unleash Your Inner Power & Feminine Potential',
      with: 'WITH COACH AOR',
      quote: '“อ้อเชื่อว่าผู้หญิงทุกคนสามารถสร้างชีวิตที่ตนเองปรารถนาได้ ถ้าเธอรู้จักตัวเองอย่างลึกซึ้งและรู้วิธีใช้พลังอันมหาศาลภายในของตัวเอง”',
      cta: 'จองเซสชั่น',
      tag: 'เริ่มต้นการปลดปล่อยศักยภาพของคุณไปกับโค้ช',
    },
    aboutQuote: '“All power comes from reconnecting with your true self.”',
    name: 'โค้ชอ้อ ปนิดา ทองสุย',
    role: '(Transformational Coach และผู้ก่อตั้ง Coach Aor CA)',
    bio: 'เพราะเคยประสบปัญหาทางสุขภาพ ความเครียดและเบิร์นเอ้าท์ตั้งแต่อายุ 19 ทำให้หันมาสนใจศึกษาการดูแลสุขภาพแบบองค์รวมอย่างจริงจัง จนรักษาตัวเองหายขาดได้โดยไม่พึ่งยา นำไปสู่การพัฒนาทักษะการโค้ชและให้คำปรึกษาในระดับสากล อ้อเชื่อว่าการเปลี่ยนแปลงที่แท้จริงต้องเกิดทั้งระดับร่างกาย จิตใจ พลังงาน และจิตใต้สำนึก ด้วยประสบการณ์โค้ชกว่า 1,000 ชั่วโมง ผสานศาสตร์การโค้ช การสะกดจิตบำบัด การเยียวยาบาดแผลทางใจ สมดุลหยินหยาง และพลังงานบำบัด เพื่อช่วยให้ผู้หญิงกลับมาเข้าใจตัวเองและสร้างชีวิตใหม่ที่สอดคล้องกับคุณค่าที่แท้จริง',
    servicesTitle: 'บริการต่าง ๆ ของ Coach Aor CA',
    services: [
      { title: 'Private Coaching', desc: 'การโค้ชเชิงลึก เพื่อระบุและแก้ปัญหาที่ต้นตอ พร้อมออกแบบไลฟ์สไตล์เพื่อผลลัพธ์ที่ยั่งยืน', bullets: ['ความรักและความสัมพันธ์', 'คุณค่าและความมั่นใจในตัวเอง', 'เยียวยาปมวัยเด็กและบาดแผลในใจ', 'Feminine Energy', 'การเงินและความสำเร็จ', 'การค้นหาคุณค่าและเป้าหมายชีวิต'], meta: '60–90 นาที / เซสชั่น' },
      { title: 'Coaching + Hypnotherapy', desc: 'ผสานการโค้ชระดับสากลกับการสะกดจิตบำบัด เพื่อปรับจิตใต้สำนึกและปลดล็อกข้อจำกัดที่ฝังลึก', bullets: ['ความกลัวการถูกทิ้ง', 'ดึงดูดความสัมพันธ์เดิมซ้ำ ๆ', 'ขาดคุณค่าในตัวเอง', 'ความกลัวความสำเร็จ', 'Trauma / Emotional blocks'], meta: '90–120 นาที / เซสชั่น' },
      { title: 'Online Course', desc: 'เรียนรู้และพัฒนาตนเองจากที่บ้าน เน้น Feminine Energy การรักตัวเอง และความมั่นใจในคุณค่าของตัวเอง', bullets: ['Awaken Feminine Energy', 'High Value Woman'], meta: '3–5 ชั่วโมง / คอร์ส' },
      { title: 'Workshops & Retreat', desc: 'เวิร์กชอปและรีทรีทแบบเจอตัว บรรยากาศ Safe Space ฟังกันอย่างลึกซึ้ง และ reconnect กับตัวเอง', bullets: ["Women's Circle", 'Dream Board Workshop', 'Sound Healing', 'Self-love & Self-care'], meta: 'Chiang Mai · Bangkok · Phuket' },
      { title: 'Transformational Coach Training', desc: 'หลักสูตรพร้อมประกาศนียบัตรสำหรับผู้ที่อยากเป็นโค้ชหรือใช้ทักษะการโค้ชในงานและชีวิต', bullets: ['พื้นฐานการเป็นโค้ช', 'เครื่องมือการโค้ชระดับโลก', 'Case Studies', 'การสร้างความเชื่อใจลูกค้า', 'พัฒนาธุรกิจโค้ชชิ่ง'], meta: 'ประมาณ 2 เดือน' },
    ],
    cta2: 'พร้อมเริ่มต้นการเปลี่ยนแปลงของคุณไปกับโค้ชอ้อหรือยัง?',
    testimonialsTitle: 'รีวิวจากผู้รับการโค้ช',
    testimonials: [
      { name: 'คุณทราย', role: 'นักจิตบำบัด & เจ้าของกิจการ', quote: '“ขอบคุณโค้ชมาก ๆ ดีใจที่เราได้เจอกัน จากคนที่กลัวการสร้างธุรกิจ วันนี้กล้าลงมือทำ สร้างทุกอย่างในหัวให้เป็นจริง เป็นการทำที่อยากตื่นมาใช้ชีวิตในทุก ๆ วันค่ะ”' },
      { name: 'คุณแพร', role: 'นักลงทุน', quote: '“อยากขอบคุณคุณอ้อและขอบคุณตัวเอง ที่ตัดสินใจปรับพลังงานจากภายใน จากที่เคยไล่ล่าความสำเร็จจนป่วยหนัก ตอนนี้กล้าลาออกมาสร้างชีวิตใหม่ให้ตัวเองแล้วค่ะ”' },
      { name: 'คุณแบม', role: 'นักลงทุน', quote: '“ขอบคุณสำหรับการเป็นกระจกและคำแนะนำต่าง ๆ ที่ทำให้แบมเห็นตัวเองชัดขึ้น มายด์เซ็ตเปลี่ยนไปมากจนเพื่อน ๆ สังเกตได้ เราน่าจะเจอกันเร็วกว่านี้”' },
    ],
    bookingTitle: 'การจองคิวปรึกษา',
    bookingText: 'สนใจนัดหมายจองคิวเซสชั่นกับโค้ชอ้อ',
    form: { name: 'ชื่อ', email: 'อีเมล', message: 'ข้อความ', send: 'ส่ง', done: 'ขอบคุณค่ะ เราจะติดต่อกลับโดยเร็ว ✦' },
    followTxt: 'ติดตามได้ที่โซเชียลมีเดีย',
  },
};
