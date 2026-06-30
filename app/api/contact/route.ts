import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Sends the booking/contact form to Coach Aor's own mailbox via the site's
// own cPanel SMTP (no third-party service). All secrets come from env vars.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const required = (v: string | undefined) => (v ?? '').toString().trim();

export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string; company?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field; humans never see it.
  if (required(body.company)) {
    return NextResponse.json({ ok: true }); // silently accept + drop
  }

  const name = required(body.name);
  const email = required(body.email);
  const message = required(body.message);
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'missing fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || name.length > 120 || message.length > 5000) {
    return NextResponse.json({ ok: false, error: 'invalid input' }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || user;
  const from = process.env.CONTACT_FROM || user;
  if (!host || !user || !pass) {
    return NextResponse.json({ ok: false, error: 'server not configured' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: { user, pass },
  });

  const esc = (s: string) => s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]!));
  try {
    await transporter.sendMail({
      from: `"Coach Aor Website" <${from}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `New booking enquiry — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— sent from coachaorca.com booking form`,
      html: `<h2>New booking enquiry</h2>
<p><strong>Name:</strong> ${esc(name)}<br>
<strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
<p><strong>Message:</strong></p>
<p style="white-space:pre-wrap">${esc(message)}</p>
<hr><p style="color:#888;font-size:12px">Sent from the coachaorca.com booking form.</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('contact send failed:', e);
    return NextResponse.json({ ok: false, error: 'send failed' }, { status: 502 });
  }
}
