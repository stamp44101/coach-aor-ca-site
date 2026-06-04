'use client';
import { useState } from 'react';
import './mobile.css';

/**
 * A real responsive, accessibility-friendly mobile layout (single column,
 * readable type, large touch targets) shown on small screens in place of the
 * scaled-down desktop clone. Content mirrors the cloned page in EN and TH.
 */

const A = '/assets/';
const IMG = {
  logo: A + '6a3b05c7f68885946c1acc9888638750.png',
  hero: A + '05e1b97cbad92d8c9accd67142277d86.jpg',
  about: A + '13531b2682173fa73aadddbf9af5444c.jpg',
  booking: A + '07dea294c8102a2a1d78f9b7cadf5c83.jpg',
  qrWhatsapp: A + '344032e117c3c09b42d8ec2ea0be576a.png',
  qrLine: A + '1bd3dfbafa33e78594a72356b1ff3144.png',
  s: [
    A + '99831c8bc1f4f5f71d11a29927ffacb9.jpg',
    A + 'ce973278bc7ab36150d5cf24b34b1c87.jpg',
    A + '426551c9a5703b5386c79f3799cae0ca.jpg',
    A + '5d20365a48ff83639cdff084d3188bb7.jpg',
    A + '783ccad14583f32848c90877a68c81f6.jpg',
  ],
  t: [
    A + '1d18e77e0429b1ad3732cd953aac352f.jpg',
    A + '355c91cbc9cdbe7f17f365cdc9896c9d.jpg',
    A + '7c654a1b432649cca1c46f51e9b7bc1e.jpg',
  ],
};

type Lang = 'en' | 'th';

const C: Record<Lang, any> = {
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
      quote: '“I believe that every woman can create the life she desires, once she truly knows herself and unlocks her power within.”',
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
      { name: 'Khun Sine', role: 'Psychotherapist & Business Owner', quote: '“I’m so grateful we met. I used to be paralyzed by the fear of building a business. Today I’ve found the courage to take action and turn my vision into reality. I now wake up every day excited to live my life to the fullest.”' },
      { name: 'Khun Pear', role: 'Investor', quote: '“I want to thank you, Coach Aor, and thank myself for choosing to shift my inner energy. I spent so long chasing success until my body and mind broke down. Now I’ve found the courage to quit and build a new life for myself.”' },
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

const SOCIALS = [
  ['LINE', 'https://lin.ee/ZVRHOhSu'],
  ['Facebook', 'https://www.facebook.com/coachaor.ca/'],
  ['Instagram', 'https://www.instagram.com/coachaor.ca/'],
  ['TikTok', 'https://www.tiktok.com/@coachaor.ca'],
  ['YouTube', 'https://www.youtube.com/@CoachAorCA'],
];

export default function MobileSite({ lang }: { lang: Lang }) {
  const t = C[lang];
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const headFont = lang === 'th' ? "'Kanit', sans-serif" : "'Playfair Display', serif";

  return (
    <div className="msite" lang={lang}>
      {/* header */}
      <header className="mhead">
        <a href="#top" aria-label="Coach Aor CA"><img className="mlogo" src={IMG.logo} alt="Coach Aor CA" /></a>
        <div className="mhead-right">
          <div className="mlang" role="group" aria-label="Language">
            <a href="/th" className={'mlang-btn' + (lang === 'th' ? ' is-active' : '')} aria-current={lang === 'th' ? 'true' : undefined}>TH</a>
            <a href="/" className={'mlang-btn' + (lang === 'en' ? ' is-active' : '')} aria-current={lang === 'en' ? 'true' : undefined}>EN</a>
          </div>
          <button className="mburger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* slide-in menu from the right + dimmed backdrop */}
      <div
        className={'mmenu-backdrop' + (menu ? ' is-open' : '')}
        onClick={() => setMenu(false)}
        aria-hidden={!menu}
      />
      <nav className={'mmenu' + (menu ? ' is-open' : '')} aria-hidden={!menu}>
        <button className="mmenu-close" aria-label="Close menu" onClick={() => setMenu(false)}>×</button>
        {t.nav.map(([label, href]: [string, string]) => (
          <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>
        ))}
      </nav>

      {/* hero */}
      <section id="top" className="mhero">
        <img className="mhero-bg" src={IMG.hero} alt="" aria-hidden="true" />
        <div className="mhero-inner">
          <h1 style={{ fontFamily: headFont }}>{t.hero.title}</h1>
          <div className="mhero-with">{t.hero.with}</div>
          <p className="mquote">{t.hero.quote}</p>
          <a className="mbtn mbtn-blue" href="#m-booking">{t.hero.cta}</a>
          <p className="mtag">{t.hero.tag}</p>
        </div>
      </section>

      {/* about */}
      <section id="m-about" className="msec">
        <img className="mphoto" src={IMG.about} alt="Coach Aor" />
        <p className="mbig-quote" style={{ fontFamily: headFont }}>{t.aboutQuote}</p>
        <div className="mname">{t.name}</div>
        <div className="mrole">{t.role}</div>
        <p className="mbody">{t.bio}</p>
        <a className="mbtn mbtn-ghost" href="#m-booking">{t.hero.cta}</a>
      </section>

      {/* services */}
      <section id="m-services" className="msec msec-cream">
        <h2 className="mh2" style={{ fontFamily: headFont }}>{t.servicesTitle}</h2>
        <div className="mcards">
          {t.services.map((s: any, i: number) => (
            <article className="mcard" key={i}>
              <img className="mcard-img" src={IMG.s[i]} alt={s.title} loading="lazy" />
              <div className="mcard-body">
                <h3 className="mcard-title">{s.title}</h3>
                <p className="mcard-desc">{s.desc}</p>
                <ul className="mcard-list">
                  {s.bullets.map((bl: string, j: number) => <li key={j}>{bl}</li>)}
                </ul>
                <div className="mcard-meta">{s.meta}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mbanner">
        <p style={{ fontFamily: headFont }}>{t.cta2}</p>
        <a className="mbtn mbtn-blue" href="#m-booking">{t.hero.cta}</a>
      </section>

      {/* testimonials */}
      <section id="m-testimonials" className="msec">
        <h2 className="mh2" style={{ fontFamily: headFont }}>{t.testimonialsTitle}</h2>
        <div className="mtns">
          {t.testimonials.map((tn: any, i: number) => (
            <figure className="mtn" key={i}>
              <img src={IMG.t[i]} alt={tn.name} loading="lazy" />
              <figcaption>
                <div className="mtn-name">{tn.name}</div>
                <div className="mtn-role">{tn.role}</div>
                <blockquote>{tn.quote}</blockquote>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* booking */}
      <section id="m-booking" className="msec msec-cream">
        <h2 className="mh2" style={{ fontFamily: headFont }}>{t.bookingTitle}</h2>
        <p className="mbody mcenter">{t.bookingText}</p>
        <form className="mform" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <p className="mform-done">{t.form.done}</p>
          ) : (
            <>
              <label>{t.form.name}<input type="text" name="name" required /></label>
              <label>{t.form.email}<input type="email" name="email" required /></label>
              <label>{t.form.message}<textarea name="message" rows={4} /></label>
              <button className="mbtn mbtn-tan" type="submit">{t.form.send}</button>
            </>
          )}
        </form>
        <div className="mqr">
          <figure><img src={IMG.qrLine} alt="LINE QR" /><figcaption>LINE Official</figcaption></figure>
          <figure><img src={IMG.qrWhatsapp} alt="WhatsApp QR" /><figcaption>WhatsApp</figcaption></figure>
        </div>
        <a className="mline" href="https://lin.ee/ZVRHOhSu">LINE Official : @coachaorca</a>
      </section>

      {/* footer */}
      <footer className="mfoot">
        <img className="mfoot-logo" src={IMG.logo} alt="Coach Aor CA" />
        <div className="mfoot-name">Coach Aor CA</div>
        <div className="mfoot-follow">{t.followTxt}</div>
        <nav className="mfoot-social">
          {SOCIALS.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          ))}
        </nav>
        <div className="mfoot-mail"><a href="mailto:soulfulwomens@gmail.com">soulfulwomens@gmail.com</a></div>
      </footer>
    </div>
  );
}
