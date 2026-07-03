import { NextResponse } from "next/server";
import { LocaleContentSchema, GlobalContentSchema } from "../../../../content/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Save the edited content. Every payload is validated against the schema FIRST,
 * so a malformed edit is rejected here and can never reach the repo or the
 * build. (Phase 4 will commit the validated JSON to GitHub → Vercel rebuild.)
 */
export async function POST(req: Request) {
  let body: { en?: unknown; th?: unknown; global?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  const en = LocaleContentSchema.safeParse(body.en);
  const th = LocaleContentSchema.safeParse(body.th);
  const global = GlobalContentSchema.safeParse(body.global);
  const errs: string[] = [];
  if (!en.success) errs.push("en: " + (en.error.issues[0]?.message ?? "invalid"));
  if (!th.success) errs.push("th: " + (th.error.issues[0]?.message ?? "invalid"));
  if (!global.success) errs.push("global: " + (global.error.issues[0]?.message ?? "invalid"));
  if (errs.length) {
    return NextResponse.json({ ok: false, error: errs.join(" · ") }, { status: 400 });
  }

  // TODO Phase 4: commit content/{en,th,global}.json to GitHub (Contents API)
  // → Vercel rebuilds → live in ~90s. For now this validates only.
  return NextResponse.json({
    ok: true,
    persisted: false,
    note: "validated — persistence wired in Phase 4",
  });
}
