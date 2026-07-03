"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { LABELS, TEXTAREA } from "../../content/labels";

type Scope = "th" | "en" | "global";
type Data = { en: any; th: any; global: any };

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

const labelFor = (path: (string | number)[], key: string) => {
  const dotted = path.filter((p) => typeof p === "string").join(".");
  return LABELS[dotted] || LABELS[key] || key;
};

function Node({
  value,
  path,
  onChange,
}: {
  value: any;
  path: (string | number)[];
  onChange: (path: (string | number)[], val: any) => void;
}) {
  const key = String(path[path.length - 1] ?? "");
  const dotted = path.filter((p) => typeof p === "string").join(".");
  const label = labelFor(path, key);
  const isImg = path.includes("IMG");

  // ── string ──────────────────────────────────────────────────────────
  if (typeof value === "string") {
    const isTA = TEXTAREA.has(dotted) || TEXTAREA.has(key);
    return (
      <label className="block">
        <span className="mb-1 block text-xs font-semibold text-stone-500">{label}</span>
        {isTA ? (
          <textarea
            value={value}
            onChange={(e) => onChange(path, e.target.value)}
            rows={Math.min(8, Math.max(2, Math.ceil(value.length / 60)))}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm leading-relaxed focus:border-stone-500 focus:outline-none"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(path, e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
          />
        )}
        {isImg && value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="mt-2 h-20 w-auto rounded border border-stone-200 object-cover" />
        ) : null}
      </label>
    );
  }

  // ── array ───────────────────────────────────────────────────────────
  if (Array.isArray(value)) {
    const first = value[0];
    const itemIsObject = first && typeof first === "object" && !Array.isArray(first);
    const itemIsTuple = Array.isArray(first);
    const add = () => onChange(path, [...value, blankLike(first ?? "")]);
    const remove = (i: number) => onChange(path, value.filter((_: any, idx: number) => idx !== i));

    return (
      <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-bold text-stone-700">{label}</span>
          <span className="text-xs text-stone-400">({value.length})</span>
          <button type="button" onClick={add} className="ml-auto rounded bg-stone-800 px-2.5 py-1 text-xs font-semibold text-white hover:bg-stone-700">+ เพิ่ม</button>
        </div>
        <div className="flex flex-col gap-3">
          {value.map((item: any, i: number) => (
            <div key={i} className="rounded-lg border border-stone-200 bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-400">#{i + 1}</span>
                <button type="button" onClick={() => remove(i)} className="rounded px-2 py-0.5 text-xs text-rose-600 hover:bg-rose-50">ลบ</button>
              </div>
              {itemIsObject ? (
                <div className="flex flex-col gap-2.5">
                  {Object.keys(item).map((k) => (
                    <Node key={k} value={item[k]} path={[...path, i, k]} onChange={onChange} />
                  ))}
                </div>
              ) : itemIsTuple ? (
                <div className="flex gap-2">
                  {(item as any[]).map((v, j) => (
                    <input
                      key={j}
                      value={v}
                      onChange={(e) => onChange([...path, i, j], e.target.value)}
                      placeholder={j === 0 ? "ชื่อ/ป้าย" : "ลิงก์/ค่า"}
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    value={item}
                    onChange={(e) => onChange([...path, i], e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
                  />
                  {isImg && item ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item} alt="" className="h-12 w-12 shrink-0 rounded border border-stone-200 object-cover" />
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── object ──────────────────────────────────────────────────────────
  return (
    <fieldset className="rounded-xl border border-stone-200 p-4">
      <legend className="px-2 text-sm font-bold text-stone-700">{label}</legend>
      <div className="flex flex-col gap-3">
        {Object.keys(value).map((k) => (
          <Node key={k} value={value[k]} path={[...path, k]} onChange={onChange} />
        ))}
      </div>
    </fieldset>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pw, setPw] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [data, setData] = useState<Data | null>(null);
  const [orig, setOrig] = useState("");
  const [tab, setTab] = useState<Scope>("th");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

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

  const update = (scope: Scope) => (path: (string | number)[], val: any) =>
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
      setMsg(j.persisted ? "บันทึกแล้ว ✓ — ขึ้นเว็บใน ~1 นาที" : "ตรวจผ่าน ✓ (การบันทึกจริงจะต่อใน Phase 4)");
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
            className="mb-3 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
          />
          {loginErr && <p className="mb-3 text-xs text-rose-600">{loginErr}</p>}
          <button className="w-full rounded-lg bg-stone-800 py-2 text-sm font-bold text-white hover:bg-stone-700">เข้าสู่ระบบ</button>
        </form>
      </div>
    );
  }

  const scopeData = data![tab];
  const TABS: [Scope, string][] = [["th", "ไทย"], ["en", "English"], ["global", "รูป/โซเชียล (ใช้ร่วม)"]];

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-stone-100 px-4 py-6">
      <header className="sticky top-0 z-10 -mx-4 mb-5 flex flex-wrap items-center gap-2 border-b border-stone-200 bg-stone-100/95 px-4 py-3 backdrop-blur">
        <h1 className="text-base font-bold text-stone-800">จัดการเนื้อหา Coach Aor</h1>
        {dirty && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">มีการแก้ที่ยังไม่บันทึก</span>}
        <div className="ml-auto flex items-center gap-2">
          {msg && <span className="text-xs text-stone-500">{msg}</span>}
          <button onClick={save} disabled={saving || !dirty} className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-40">{saving ? "กำลังบันทึก…" : "บันทึก"}</button>
          <button onClick={logout} className="rounded-lg bg-white px-3 py-1.5 text-sm text-stone-500 hover:bg-stone-50">ออก</button>
        </div>
      </header>

      <nav className="mb-5 flex gap-1 rounded-xl bg-white p-1 text-sm shadow-sm">
        {TABS.map(([k, lbl]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`flex-1 rounded-lg px-3 py-2 font-semibold transition ${tab === k ? "bg-stone-800 text-white" : "text-stone-500 hover:bg-stone-100"}`}
          >
            {lbl}
          </button>
        ))}
      </nav>

      <div className="flex flex-col gap-4 pb-24">
        {Object.keys(scopeData).map((k) => (
          <Node key={k} value={scopeData[k]} path={[k]} onChange={update(tab)} />
        ))}
      </div>
    </div>
  );
}
