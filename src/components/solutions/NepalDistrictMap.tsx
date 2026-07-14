"use client";

import { useState } from "react";
import Link from "next/link";
import mapData from "@/data/nepal-districts.json";

type District = { name: string; d: string; cx: number; cy: number };
const DATA = mapData as { viewBox: string; districts: District[] };

// Real projects grouped by district (source: verified installations).
const PROJECTS: Record<string, { title: string; sector: string; place: string; href?: string }[]> = {
  Kathmandu: [
    { title: "Siddhartha Bank Head Office", sector: "Banking", place: "Naxal", href: "/projects/siddhartha-bank-head-office" },
    { title: "FCube Cinemas", sector: "Entertainment", place: "Boudha", href: "/projects/fcube-cinemas" },
    { title: "Dibya Ratna Consultant", sector: "Corporate", place: "Battisputali" },
    { title: "Awarded International Education", sector: "Education", place: "Putalisadak" },
    { title: "Auranex Restaurant", sector: "Hospitality", place: "Townplanning" },
    { title: "Inland Multi Cuisine & Stay", sector: "Hospitality", place: "Budhanilkantha" },
  ],
  Lalitpur: [
    { title: "Anong Store", sector: "Retail", place: "Jawalakhel" },
    { title: "Shree Shiva Enterprises", sector: "Commercial", place: "Siddhipur" },
  ],
  Banke: [
    { title: "Jeevan Jyoti School — 266 sq ft LED", sector: "Education", place: "Kohalpur", href: "/projects/jeevan-jyoti-school" },
  ],
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
const projectDistricts = new Set(Object.keys(PROJECTS).map(norm));

export default function NepalDistrictMap() {
  const [active, setActive] = useState<string>("Kathmandu");
  const activeProjects = PROJECTS[active] || [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div>
          <svg viewBox={DATA.viewBox} role="img" aria-label="Map of Nepal — districts with AudioVisual Nepal projects are highlighted and clickable" className="h-auto w-full">
            {DATA.districts.map((dist) => {
              const has = projectDistricts.has(norm(dist.name));
              const isActive = norm(dist.name) === norm(active);
              return (
                <path
                  key={dist.name}
                  d={dist.d}
                  fill={isActive ? "#2563EB" : has ? "#93C5FD" : "#E2E8F0"}
                  stroke={has ? "#2563EB" : "#CBD5E1"}
                  strokeWidth={has ? 1 : 0.5}
                  className={has ? "cursor-pointer transition" : ""}
                  onClick={has ? () => setActive(dist.name) : undefined}
                  onKeyDown={has ? (e) => e.key === "Enter" && setActive(dist.name) : undefined}
                  tabIndex={has ? 0 : -1}
                  role={has ? "button" : undefined}
                  aria-label={has ? `${dist.name} — ${PROJECTS[dist.name]?.length} projects` : undefined}
                >
                  <title>{dist.name}{has ? ` — ${PROJECTS[dist.name]?.length} project(s)` : ""}</title>
                </path>
              );
            })}
            {DATA.districts.filter((d) => projectDistricts.has(norm(d.name))).map((d) => (
              <g key={"pin-" + d.name} onClick={() => setActive(d.name)} className="cursor-pointer">
                <circle cx={d.cx} cy={d.cy} r={norm(d.name) === norm(active) ? 6 : 4.5} fill="#1D4ED8" stroke="#fff" strokeWidth={1.5} />
                <text x={d.cx} y={d.cy - 10} textAnchor="middle" fontSize={13} fontWeight={600} fill="#1E3A8A">{d.name}</text>
              </g>
            ))}
          </svg>
          <p className="mt-2 text-center text-xs text-slate-400">
            Highlighted districts have completed installations — click any to see its projects. We deliver and service across Nepal.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">{active} district</p>
          <p className="mt-1 text-sm text-slate-500">{activeProjects.length} completed {activeProjects.length === 1 ? "project" : "projects"}</p>
          <ul className="mt-3 divide-y divide-slate-100">
            {activeProjects.map((p) => (
              <li key={p.title} className="py-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    {p.href ? (
                      <Link href={p.href} className="text-sm font-medium text-slate-800 hover:text-blue-600 hover:underline">{p.title}</Link>
                    ) : (
                      <span className="text-sm font-medium text-slate-800">{p.title}</span>
                    )}
                    <p className="text-xs text-slate-400">{p.place}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">{p.sector}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.keys(PROJECTS).map((dn) => (
              <button key={dn} onClick={() => setActive(dn)} className={norm(dn) === norm(active) ? "rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white" : "rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:border-blue-400"}>
                {dn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
