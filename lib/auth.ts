import { SignJWT, jwtVerify } from "jose";

/**
 * Minimal single-owner admin auth: a signed HttpOnly JWT cookie. Adequate for
 * one editor (the site owner). `ADMIN_PASSWORD` + `AUTH_SECRET` come from env
 * (Vercel project settings in prod; .env.local in dev — never committed).
 */
export const SESSION_COOKIE = "cms_session";
export const SESSION_MAX_AGE = 60 * 60 * 24; // 24h

function secretKey(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(s);
}

export async function createSession(): Promise<string> {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secretKey());
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, secretKey());
    return true;
  } catch {
    return false;
  }
}
