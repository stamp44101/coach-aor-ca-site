import { NextResponse } from "next/server";
import { LocaleContentSchema, GlobalContentSchema } from "../../../../content/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GH = "https://api.github.com";

function ghHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

/** Current file sha + decoded text, or {sha:undefined} if the file is new. */
async function getFile(repo: string, branch: string, path: string) {
  const r = await fetch(
    `${GH}/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`,
    { headers: ghHeaders(), cache: "no-store" },
  );
  if (r.status === 404) return { sha: undefined as string | undefined, content: undefined as string | undefined };
  if (!r.ok) throw new Error(`GET ${path} → ${r.status}`);
  const j = (await r.json()) as { sha: string; content: string };
  return { sha: j.sha, content: Buffer.from(j.content, "base64").toString("utf-8") };
}

async function putFile(
  repo: string,
  branch: string,
  path: string,
  text: string,
  sha: string | undefined,
  message: string,
) {
  const r = await fetch(`${GH}/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: ghHeaders(),
    body: JSON.stringify({
      message,
      content: Buffer.from(text, "utf-8").toString("base64"),
      sha,
      branch,
    }),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`PUT ${path} → ${r.status} ${t.slice(0, 160)}`);
  }
}

/**
 * Save the edited content: validate against the schema, then commit the changed
 * content/*.json to GitHub via the Contents API. Vercel's Git integration picks
 * up the commit and rebuilds → live in ~90s. A malformed edit is rejected before
 * any commit, and a bad build leaves the previous deploy live — the site can't
 * be taken down by a save.
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

  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!process.env.GITHUB_TOKEN || !repo) {
    // Content is valid but the commit target isn't configured (e.g. local dev).
    return NextResponse.json({
      ok: true,
      persisted: false,
      note: "valid — but GITHUB_TOKEN/GITHUB_REPO not set (dev)",
    });
  }

  const files: [string, unknown][] = [
    ["content/en.json", en.data],
    ["content/th.json", th.data],
    ["content/global.json", global.data],
  ];

  try {
    const changed: string[] = [];
    for (const [path, data] of files) {
      const next = JSON.stringify(data, null, 2) + "\n";
      const cur = await getFile(repo, branch, path);
      if (cur.content === next) continue; // unchanged — skip (no empty commit)
      await putFile(repo, branch, path, next, cur.sha, `cms: update ${path.replace("content/", "")}`);
      changed.push(path.replace("content/", ""));
    }
    return NextResponse.json({
      ok: true,
      persisted: changed.length > 0,
      changed,
      note: changed.length ? "บันทึกแล้ว — ขึ้นเว็บใน ~1 นาที" : "ไม่มีอะไรเปลี่ยน",
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 502 });
  }
}
