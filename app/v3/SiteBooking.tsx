import { CONTENT, IMG } from '../_mobileContent';
import SiteBookingForm from './SiteBookingForm';

export default function SiteBooking({ lang = 'en' as const }: { lang?: 'en' | 'th' }) {
  const c = CONTENT[lang];
  return (
    <section className="site-booking" id="contact">
      <div className="site-container">
        <div className="site-booking__panel">
          <div className="site-booking__left">
            <h2 className="site-booking__title">{c.bookingTitle}</h2>
            <SiteBookingForm lang={lang} />
          </div>
          <div className="site-booking__qr">
            <p className="site-booking__qr-lead">{c.cta2}</p>
            <div className="site-qr-row">
              <div className="site-qr">
                <img src={IMG.qrWhatsapp} alt="WhatsApp QR" />
                <span>WhatsApp</span>
              </div>
              <div className="site-qr">
                <img src={IMG.qrLine} alt="LINE Official QR" />
                <span>LINE Official</span>
              </div>
            </div>
            <p className="site-booking__line">Line Official : @coachaorca</p>
          </div>
        </div>
      </div>
    </section>
  );
}
