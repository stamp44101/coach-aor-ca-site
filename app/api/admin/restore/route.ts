import { NextResponse } from "next/server";

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

async function fileAt(repo: string, ref: string, path: string) {
  const r = await fetch(`${GH}/repos/${repo}/contents/${path}?ref=${encodeURIComponent(ref)}`, {
    headers: ghHeaders(),
    cache: "no-store",
  });
  if (r.status === 404) return { sha: undefined as string | undefined, content: undefined as string | undefined };
  if (!r.ok) throw new Error(`GET ${path}@${ref} → ${r.status}`);
  const j = (await r.json()) as { sha: string; content: string };
  return { sha: j.sha, content: Buffer.from(j.content, "base64").toString("utf-8") };
}

async function putFile(repo: string, branch: string, path: string, text: string, sha: string | undefined, message: string) {
  const r = await fetch(`${GH}/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: ghHeaders(),
    body: JSON.stringify({ message, content: Buffer.from(text, "utf-8").toString("base64"), sha, branch }),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`PUT ${path} → ${r.status} ${t.slice(0, 160)}`);
  }
}

/**
 * Roll the content back to how it was at a given commit: read each content file
 * as it existed at {sha} and commit it forward as a NEW commit on the branch
 * (never rewrites history). Vercel rebuilds → live in ~90s.
 */
export async function POST(req: Request) {
  let body: { sha?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }
  const sha = typeof body.sha === "string" ? body.sha : "";
  if (!/^[0-9a-f]{7,40}$/.test(sha)) {
    return NextResponse.json({ ok: false, error: "invalid sha" }, { status: 400 });
  }
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!process.env.GITHUB_TOKEN || !repo) {
    return NextResponse.json({ ok: false, error: "not configured" }, { status: 500 });
  }

  try {
    const files = ["content/en.json", "content/th.json", "content/global.json"];
    const restored: string[] = [];
    for (const path of files) {
      const old = await fileAt(repo, sha, path);
      if (old.content === undefined) continue; // didn't exist at that commit
      const cur = await fileAt(repo, branch, path);
      if (cur.content === old.content) continue; // already identical
      await putFile(repo, branch, path, old.content, cur.sha, `cms: restore ${path.replace("content/", "")} to ${sha.slice(0, 7)}`);
      restored.push(path.replace("content/", ""));
    }
    return NextResponse.json({
      ok: true,
      restored,
      note: restored.length ? "ย้อนแล้ว — เว็บจะอัปเดตใน ~1 นาที" : "เวอร์ชันนี้เหมือนปัจจุบันอยู่แล้ว",
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 502 });
  }
}
