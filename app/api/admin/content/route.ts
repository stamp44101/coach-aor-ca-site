import { NextResponse } from "next/server";
import { getContent, getGlobal } from "../../../../lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Current live content for the admin editor to populate its form. */
export async function GET() {
  return NextResponse.json({
    en: getContent("en"),
    th: getContent("th"),
    global: getGlobal(),
  });
}
