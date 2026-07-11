"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import INDEX from "@/data/model-index.json";

type Entry = { m: string; b: string; h: string; i?: string };
const ALL = INDEX as Entry[];
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

type Row = { token: string; hit: Entry | null };

export default function BoqLookup() {
  const [text, setText] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);

  const lookup = useMemo(() => {
    const map = new Map<string, Entry>();
    for (const e of ALL) map.set(norm(e.m), e);
    return map;
  }, []);

  function run() {
    const tokens = [...new Set(
      text.split(/[\n,;\t]+/).map((t) => t.trim()).filter((t) => t.length >= 2 && /[a-zA-Z0-9]/.test(t))
    )].slice(0, 60);
    const out: Row[] = tokens.map((token) => {
      const key = norm(token);
      let hit = lookup.get(key) || null;
      if (!hit && key.length >= 4) {
        hit = ALL.find((e) => norm(e.m).includes(key) || key.includes(norm(e.m))) || null;
      }
      return { token, hit };
    });
    setRows(out);
  }

  const found = rows?.filter((r) => r.hit) ?? [];
  const waText = encodeURIComponent(
    `Hello! Quotation request from your BOQ lookup:\n` +
    found.map((r) => `• ${r.hit!.b} ${r.hit!.m}`).join("\n") +
    (rows && rows.length > found.length ? `\nNot matched on site: ${rows.filter((r) => !r.hit).map((r) => r.token).join(", ")}` : "") +
    `\nPlease send availability and pricing.`
  );

  return (
    <div>
      <label htmlFor="boq" className="text-sm font-semibold text-slate-700">
        Paste model numbers — one per line or comma-separated
      </label>
      <textarea
        id="boq"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder={"DSP5211\niShare X200\nNV20A-AI\nPAVA8500"}
        className="mt-2 w-full rounded-xl border border-slate-300 p-4 font-mono text-sm text-slate-800 focus:border-blue-400 focus:outline-none"
      />
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button onClick={run} className="rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
          Check availability
        </button>
        <p className="text-xs text-slate-500">Checks {ALL.length} models across DSPPA, InfoBit, Tenveo, Lampro & Focus</p>
      </div>

      {rows && (
        <div className="mt-8">
          <p className="text-sm font-semibold text-slate-900">
            {found.length} of {rows.length} items matched
          </p>
          <div className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-200">
            {rows.map((r) => (
              <div key={r.token} className="flex items-center gap-4 p-4">
                {r.hit?.i ? (
                  <div className="relative h-12 w-12 shrink-0">
                    <Image src={r.hit.i} alt={r.hit.m} fill className="object-contain" sizes="48px" />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-400">
                    {r.hit ? r.hit.b.charAt(0) : "?"}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{r.hit ? `${r.hit.b} ${r.hit.m}` : r.token}</p>
                  <p className="text-xs text-slate-500">
                    {r.hit ? "Available on request — genuine with manufacturer warranty" : "Not in our online catalog — we can still source it, include it in your request"}
                  </p>
                </div>
                {r.hit && (
                  <Link href={r.hit.h} className="shrink-0 text-sm font-medium text-blue-600 hover:underline">
                    View →
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/+9779762109538?text=${waText}`}
              className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Request quotation for all items
            </a>
            <Link href="/contact" className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-400">
              Or use the contact form
            </Link>
          </div>
          <p className="mt-3 text-xs text-slate-500">We reply with a formal quotation within 24 hours on working days.</p>
        </div>
      )}
    </div>
  );
}
