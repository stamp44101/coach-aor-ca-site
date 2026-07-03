import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GH = "https://api.github.com";

/** Recent commits that touched content/ — the versions you can roll back to. */
export async function GET() {
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!process.env.GITHUB_TOKEN || !repo) {
    return NextResponse.json({ commits: [], note: "not configured (dev)" });
  }
  const r = await fetch(
    `${GH}/repos/${repo}/commits?sha=${encodeURIComponent(branch)}&path=content&per_page=15`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );
  if (!r.ok) {
    return NextResponse.json({ commits: [], error: `history ${r.status}` }, { status: 502 });
  }
  const j = (await r.json()) as any[];
  const commits = j.map((c) => ({
    sha: c.sha as string,
    message: (c.commit?.message ?? "").split("\n")[0] as string,
    date: c.commit?.author?.date as string,
    author: c.commit?.author?.name as string,
  }));
  return NextResponse.json({ commits });
}
