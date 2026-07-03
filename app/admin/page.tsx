"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { LABELS, HELP, TEXTAREA } from "../../content/labels";

type Lang = "th" | "en";
type Tab = Lang | "social" | "history";
type Data = { en: any; th: any; global: any };
type Commit = { sha: string; message: string; date: string; author: string };

// immutable deep-set by path
function setPath(obj: any, path: (string | number)[], val: any): any {
  if (path.length === 0) return val;
  const [head, ...rest] = path;
  const clone: any = Array.isArray(obj) ? [...obj] : { ...obj };
  clone[head as any] = setPath(obj[head as any], rest, val);
  return clone;
}

function blankLike(sample: any): any {
  if (typeof sample === "string") return "";
  if (Array.isArray(sample)) return sample.length ? [blankLike(sample[0])] : [];
  if (sample && typeof sample === "object") {
    const o: any = {};
    for (const k of Object.keys(sample)) o[k] = blankLike(sample[k]);
    return o;
  }
  return "";
}

// Friendly label for an owner edit-snapshot commit (history tab).
function editLabel(msg: string): string {
  if (msg.startsWith("cms: restore")) return "↩️ ย้อนกลับเวอร์ชัน";
  if (msg.includes("th.json")) return "แก้ไขเนื้อหา (ไทย)";
  if (msg.includes("en.json")) return "แก้ไขเนื้อหา (English)";
  if (msg.includes("global.json")) return "แก้ไขลิงก์โซเชียล";
  return "แก้ไขเนื้อหา";
}

// Which content fields belong to each friendly section (text tabs only —
// images are intentionally NOT surfaced here).
const SECTIONS: { title: string; desc?: string; keys: string[]; advanced?: boolean }[] = [
  { title: "🏠 ส่วนหัว (Hero)", desc: "ข้อความใหญ่บนสุดของหน้าแรก", keys: ["hero"] },
  { title: "👤 เกี่ยวกับโค้ช", keys: ["aboutQuote", "name", "role", "bio"] },
  { title: "⭐ บริการ", keys: ["servicesTitle", "services", "cta2"] },
  { title: "💬 รีวิวลูกค้า", keys: ["testimonialsTitle", "testimonials"] },
  { title: "📅 การจอง", keys: ["bookingTitle", "bookingText"] },
  { title: "🧭 เมนู & ท้ายเว็บ", keys: ["nav", "followTxt"] },
  { title: "✉️ ป้ายกำกับฟอร์มติดต่อ", desc: "ปกติไม่ต้องแก้", keys: ["form"], advanced: true },
];

const input =
  "w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none";

function TextInput({
  dotted,
  k,
  value,
  onChange,
}: {
  dotted: string;
  k: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const label = LABELS[dotted] || LABELS[k] || k;
  const help = HELP[dotted] || HELP[k];
  const ta = TEXTAREA.has(dotted) || TEXTAREA.has(k);
  return (
    <label className="block">
      <span className="mb-1 flex flex-wrap items-baseline gap-x-2">
        <span className="text-sm font-semibold text-stone-700">{label}</span>
        {help && <span className="text-xs text-stone-400">{help}</span>}
      </span>
      {ta ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={Math.min(8, Math.max(2, Math.ceil((value?.length || 0) / 60)))}
          className={input + " leading-relaxed"}
        />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={input} />
      )}
    </label>
  );
}

function StringList({
  label,
  value,
  path,
  onChange,
}: {
  label: string;
  value: string[];
  path: (string | number)[];
  onChange: (path: (string | number)[], val: any) => void;
}) {
  return (
    <div>
      <span className="mb-1 block text-sm font-semibold text-stone-700">{label}</span>
      <div className="flex flex-col gap-2">
        {value.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <input value={s} onChange={(e) => onChange([...path, i], e.target.value)} className={input} />
            <button
              type="button"
              onClick={() => onChange(path, value.filter((_, idx) => idx !== i))}
              className="shrink-0 rounded px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange(path, [...value, ""])}
        className="mt-2 rounded-lg border border-stone-300 px-3 py-1 text-xs font-semibold text-stone-600 hover:bg-stone-50"
      >
        + เพิ่มรายการ
      </button>
    </div>
  );
}

function CardList({
  itemKey,
  value,
  path,
  onChange,
}: {
  itemKey: string;
  value: any[];
  path: (string | number)[];
  onChange: (path: (string | number)[], val: any) => void;
}) {
  const label = LABELS[itemKey] || itemKey;
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm font-bold text-stone-700">{label}</span>
        <span className="text-xs text-stone-400">({value.length})</span>
        <button
          type="button"
          onClick={() => onChange(path, [...value, blankLike(value[0])])}
          className="ml-auto rounded bg-stone-800 px-2.5 py-1 text-xs font-semibold text-white hover:bg-stone-700"
        >
          + เพิ่ม
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {value.map((item, i) => (
          <div key={i} className="rounded-xl border border-stone-200 bg-white p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400">#{i + 1}</span>
              <button
                type="button"
                onClick={() => onChange(path, value.filter((_, idx) => idx !== i))}
                className="rounded px-2 py-0.5 text-xs text-rose-600 hover:bg-rose-50"
              >
                ลบ
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {Object.keys(item).map((sub) =>
                Array.isArray(item[sub]) ? (
                  <StringList
                    key={sub}
                    label={LABELS[sub] || sub}
                    value={item[sub]}
                    path={[...path, i, sub]}
                    onChange={onChange}
                  />
                ) : (
                  <TextInput
                    key={sub}
                    dotted={sub}
                    k={sub}
                    value={item[sub]}
                    onChange={(v) => onChange([...path, i, sub], v)}
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Menu: edit the visible label only; the link target stays fixed so anchors
// never break, and items can't be added/removed.
function NavEditor({
  value,
  path,
  onChange,
}: {
  value: [string, string][];
  path: (string | number)[];
  onChange: (path: (string | number)[], val: any) => void;
}) {
  return (
    <div>
      <span className="mb-1 flex items-baseline gap-2">
        <span className="text-sm font-semibold text-stone-700">เมนู</span>
        <span className="text-xs text-stone-400">แก้เฉพาะข้อความที่แสดง</span>
      </span>
      <div className="flex flex-col gap-2">
        {value.map((item, i) => (
          <input
            key={i}
            value={item[0]}
            onChange={(e) => onChange([...path, i, 0], e.target.value)}
            className={input}
          />
        ))}
      </div>
    </div>
  );
}

function renderField(
  k: string,
  value: any,
  onChange: (path: (string | number)[], val: any) => void,
) {
  if (k === "nav") return <NavEditor value={value} path={[k]} onChange={onChange} />;
  if (k === "services" || k === "testimonials")
    return <CardList itemKey={k} value={value} path={[k]} onChange={onChange} />;
  if (value && typeof value === "object" && !Array.isArray(value)) {
    // object group (hero, form) → all-string sub-fields
    return (
      <div className="flex flex-col gap-3">
        {Object.keys(value).map((sub) => (
          <TextInput
            key={sub}
            dotted={`${k}.${sub}`}
            k={sub}
            value={value[sub]}
            onChange={(v) => onChange([k, sub], v)}
          />
        ))}
      </div>
    );
  }
  if (typeof value === "string")
    return <TextInput dotted={k} k={k} value={value} onChange={(v) => onChange([k], v)} />;
  return null;
}

function Section({
  title,
  desc,
  advanced,
  children,
}: {
  title: string;
  desc?: string;
  advanced?: boolean;
  children: React.ReactNode;
}) {
  const head = (
    <div>
      <div className="text-[15px] font-bold text-stone-800">{title}</div>
      {desc && <div className="text-xs text-stone-400">{desc}</div>}
    </div>
  );
  if (advanced) {
    return (
      <details className="rounded-2xl border border-stone-200 bg-white p-4">
        <summary className="cursor-pointer list-none">{head}</summary>
        <div className="mt-4 flex flex-col gap-4">{children}</div>
      </details>
    );
  }
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-4">
      <div className="mb-4 border-b border-stone-100 pb-3">{head}</div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pw, setPw] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [data, setData] = useState<Data | null>(null);
  const [orig, setOrig] = useState("");
  const [tab, setTab] = useState<Tab>("th");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState<Commit[]>([]);
  const [histLoading, setHistLoading] = useState(false);
  const [pendingSha, setPendingSha] = useState("");
  const [restoring, setRestoring] = useState(false);

  const loadHistory = async () => {
    setHistLoading(true);
    const r = await fetch("/api/admin/history", { cache: "no-store" });
    const j = await r.json().catch(() => ({ commits: [] }));
    setHistory(j.commits || []);
    setHistLoading(false);
  };
  useEffect(() => {
    if (tab === "history" && authed) void loadHistory();
  }, [tab, authed]);

  const doRestore = async (sha: string) => {
    setRestoring(true);
    setMsg("");
    const r = await fetch("/api/admin/restore", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sha }),
    });
    setRestoring(false);
    setPendingSha("");
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.ok) {
      setMsg(j.note || "ย้อนแล้ว ✓");
      await load();
      await loadHistory();
    } else {
      setMsg("ผิดพลาด: " + (j.error || r.statusText));
    }
  };

  const load = async () => {
    const r = await fetch("/api/admin/content", { cache: "no-store" });
    if (r.status === 401) { setAuthed(false); return; }
    const d = (await r.json()) as Data;
    setData(d);
    setOrig(JSON.stringify(d));
    setAuthed(true);
  };
  useEffect(() => { void load(); }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (r.ok) { setPw(""); await load(); }
    else { const j = await r.json().catch(() => ({})); setLoginErr(j.error || "เข้าสู่ระบบไม่สำเร็จ"); }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false); setData(null);
  };

  const dirty = useMemo(() => data != null && JSON.stringify(data) !== orig, [data, orig]);

  const update = (scope: "en" | "th" | "global") => (path: (string | number)[], val: any) =>
    setData((d) => (d ? { ...d, [scope]: setPath(d[scope], path, val) } : d));

  const save = async () => {
    if (!data) return;
    setSaving(true); setMsg("");
    const r = await fetch("/api/admin/save", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.ok) {
      setOrig(JSON.stringify(data));
      setMsg(j.persisted ? "บันทึกแล้ว ✓ — เว็บจะอัปเดตใน ~1 นาที" : "ตรวจผ่าน ✓ (โหมด dev — ยังไม่บันทึกจริง)");
    } else {
      setMsg("ผิดพลาด: " + (j.error || r.statusText));
    }
  };

  if (authed === null) {
    return <div className="grid min-h-screen place-items-center text-stone-400">กำลังโหลด…</div>;
  }

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-stone-100 px-4">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
          <h1 className="mb-1 text-lg font-bold text-stone-800">Coach Aor — จัดการเนื้อหา</h1>
          <p className="mb-4 text-xs text-stone-400">ใส่รหัสผ่านผู้ดูแล</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="รหัสผ่าน"
            className={input + " mb-3"}
          />
          {loginErr && <p className="mb-3 text-xs text-rose-600">{loginErr}</p>}
          <button className="w-full rounded-lg bg-stone-800 py-2 text-sm font-bold text-white hover:bg-stone-700">
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    );
  }

  const TABS: [Tab, string][] = [
    ["th", "🇹🇭 ไทย"],
    ["en", "🇬🇧 English"],
    ["social", "🔗 ลิงก์"],
    ["history", "🕘 ประวัติ"],
  ];

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-stone-100 px-4 py-6">
      <header className="sticky top-0 z-10 -mx-4 mb-5 flex flex-wrap items-center gap-2 border-b border-stone-200 bg-stone-100/95 px-4 py-3 backdrop-blur">
        <h1 className="text-base font-bold text-stone-800">จัดการเนื้อหา Coach Aor</h1>
        {dirty && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
            มีการแก้ที่ยังไม่บันทึก
          </span>
        )}
        <div className="ml-auto flex items-center gap-2">
          {msg && <span className="text-xs text-stone-500">{msg}</span>}
          <button
            onClick={save}
            disabled={saving || !dirty}
            className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-40"
          >
            {saving ? "กำลังบันทึก…" : "บันทึก"}
          </button>
          <button onClick={logout} className="rounded-lg bg-white px-3 py-1.5 text-sm text-stone-500 hover:bg-stone-50">
            ออก
          </button>
        </div>
      </header>

      <nav className="mb-5 flex gap-1 rounded-xl bg-white p-1 text-sm shadow-sm">
        {TABS.map(([k, lbl]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`flex-1 rounded-lg px-3 py-2 font-semibold transition ${
              tab === k ? "bg-stone-800 text-white" : "text-stone-500 hover:bg-stone-100"
            }`}
          >
            {lbl}
          </button>
        ))}
      </nav>

      <p className="mb-4 text-xs text-stone-400">
        {tab === "social"
          ? "ลิงก์โซเชียล (ใช้ร่วมทั้งสองภาษา) — แก้ชื่อและลิงก์ได้"
          : tab === "history"
          ? "ประวัติการแก้ไขเนื้อหา (เฉพาะที่คุณบันทึกเอง) — ถ้าแก้พลาด กด “ย้อนกลับ” เพื่อคืนเป็นเวอร์ชันนั้น (~1 นาที)"
          : "แก้ข้อความในแต่ละหมวดได้เลย เสร็จแล้วกด “บันทึก” มุมขวาบน · การจัดวาง/รูปภาพถูกล็อกไว้เพื่อกันหน้าเว็บเพี้ยน"}
      </p>

      <div className="flex flex-col gap-4 pb-24">
        {tab === "history" ? (
          <Section title="🕘 ประวัติการแก้ไข">
            {histLoading ? (
              <div className="py-6 text-center text-sm text-stone-400">กำลังโหลด…</div>
            ) : history.length === 0 ? (
              <div className="py-6 text-center text-sm text-stone-400">ยังไม่มีประวัติการแก้ไข</div>
            ) : (
              <div className="flex flex-col gap-2">
                {history.map((c, i) => (
                  <div
                    key={c.sha}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-stone-200 bg-white px-3 py-2.5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm text-stone-700">{editLabel(c.message)}</div>
                      <div className="text-xs text-stone-400">
                        {c.date ? new Date(c.date).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" }) : ""}
                        {i === 0 && " · เวอร์ชันปัจจุบัน"}
                      </div>
                    </div>
                    {i === 0 ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        ล่าสุด
                      </span>
                    ) : pendingSha === c.sha ? (
                      <span className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={restoring}
                          onClick={() => doRestore(c.sha)}
                          className="rounded-lg bg-rose-600 px-3 py-1 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-40"
                        >
                          {restoring ? "กำลังย้อน…" : "ยืนยันย้อนกลับ"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingSha("")}
                          className="rounded-lg px-2 py-1 text-xs text-stone-400 hover:bg-stone-100"
                        >
                          ยกเลิก
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPendingSha(c.sha)}
                        className="rounded-lg border border-stone-300 px-3 py-1 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                      >
                        ย้อนกลับ
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Section>
        ) : tab === "social" ? (
          <Section title="🔗 ลิงก์โซเชียล">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 px-1 text-xs font-semibold text-stone-400">
                <span className="w-32 shrink-0 sm:w-40">ชื่อ</span>
                <span className="flex-1">ลิงก์ URL</span>
              </div>
              {(data!.global.SOCIALS as [string, string][]).map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={item[0]}
                    onChange={(e) => update("global")(["SOCIALS", i, 0], e.target.value)}
                    className="w-32 shrink-0 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none sm:w-40"
                  />
                  <input
                    value={item[1]}
                    onChange={(e) => update("global")(["SOCIALS", i, 1], e.target.value)}
                    placeholder="https://..."
                    className="min-w-0 flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </Section>
        ) : (
          SECTIONS.map((sec) => {
            const scopeData = data![tab as Lang];
            return (
              <Section key={sec.title} title={sec.title} desc={sec.desc} advanced={sec.advanced}>
                {sec.keys.map((k) => (
                  <div key={k}>{renderField(k, scopeData[k], update(tab as Lang))}</div>
                ))}
              </Section>
            );
          })
        )}
      </div>
    </div>
  );
}
