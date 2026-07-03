import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE } from "./lib/auth";

// Gate the admin API. The /admin PAGE renders freely and shows its own login
// form; the data endpoints below are what actually require a valid session.
export const config = {
  matcher: ["/api/admin/:path*"],
};

export async function middleware(req: NextRequest) {
  // The login endpoint must stay open so you can obtain a session.
  if (req.nextUrl.pathname === "/api/admin/login") {
    return NextResponse.next();
  }
  const ok = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  if (ok) return NextResponse.next();
  return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
}
