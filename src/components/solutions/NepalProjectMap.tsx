"use client";

import { useState } from "react";

type City = {
  id: string;
  name: string;
  x: number;
  y: number;
  projects: { title: string; sector: string }[];
};

const CITIES: City[] = [
  {
    id: "ktm", name: "Kathmandu Valley", x: 500, y: 168,
    projects: [
      { title: "Federal Parliament Complex", sector: "Government" },
      { title: "NIC Asia Bank HQ Boardroom", sector: "Corporate" },
      { title: "Grande International Hospital", sector: "Healthcare" },
      { title: "Central Mosque, Kathmandu", sector: "Religious" },
      { title: "Tribhuvan International Airport", sector: "Transportation" },
      { title: "Smart Meeting Rooms — Leapfrog HQ", sector: "Corporate" },
      { title: "Tribhuvan University Campus", sector: "Education" },
      { title: "Lalitpur Metropolitan City Hall", sector: "Government" },
    ],
  },
  {
    id: "dhk", name: "Dhulikhel", x: 545, y: 175,
    projects: [{ title: "Kathmandu University", sector: "Education" }],
  },
  {
    id: "pkr", name: "Pokhara", x: 355, y: 150,
    projects: [
      { title: "Pokhara Regional Airport", sector: "Transportation" },
      { title: "Tiger Mountain Lodge", sector: "Hospitality" },
    ],
  },
  {
    id: "brt", name: "Biratnagar", x: 672, y: 238,
    projects: [{ title: "Province 1 Chief Minister Office", sector: "Government" }],
  },
];

const NEPAL_PATH =
  "M46,196 L74,168 L108,158 L134,138 L168,132 L196,116 L232,112 L262,96 L300,92 L330,78 L368,74 L402,60 L444,58 L478,46 L516,48 L552,38 L590,44 L622,58 L648,78 L672,104 L700,128 L726,158 L748,186 L756,210 L740,228 L712,238 L688,256 L658,262 L628,252 L596,258 L566,248 L534,252 L502,242 L470,246 L438,236 L406,238 L374,228 L342,230 L310,220 L278,222 L246,212 L214,216 L182,206 L150,210 L118,200 L86,204 L58,208 Z";

export default function NepalProjectMap() {
  const [active, setActive] = useState<City>(CITIES[0]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <svg viewBox="0 0 800 320" role="img" aria-label="Map of Nepal showing cities where AudioVisual Nepal has delivered projects" className="h-auto w-full">
          <path d={NEPAL_PATH} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1.5} />
          <text x={400} y={305} textAnchor="middle" fontSize={12} fill="#94A3B8">
            Projects delivered in all 77 districts — flagship sites shown
          </text>
          {CITIES.map((c) => (
            <g key={c.id} onClick={() => setActive(c)} className="cursor-pointer" role="button" aria-label={c.name} tabIndex={0}
               onKeyDown={(e) => e.key === "Enter" && setActive(c)}>
              <circle cx={c.x} cy={c.y} r={16} fill={active.id === c.id ? "#3B82F620" : "transparent"} />
              <circle cx={c.x} cy={c.y} r={7} fill={active.id === c.id ? "#2563EB" : "#64748B"} stroke="#fff" strokeWidth={2} />
              <text x={c.x} y={c.y - 14} textAnchor="middle" fontSize={12} fontWeight={600}
                    fill={active.id === c.id ? "#1D4ED8" : "#475569"}>
                {c.name}
              </text>
              <text x={c.x} y={c.y + 24} textAnchor="middle" fontSize={10} fill="#94A3B8">
                {c.projects.length} {c.projects.length === 1 ? "project" : "projects"}
              </text>
            </g>
          ))}
        </svg>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">{active.name}</p>
          <ul className="mt-3 divide-y divide-slate-100">
            {active.projects.map((p) => (
              <li key={p.title} className="flex items-start justify-between gap-3 py-2.5">
                <span className="text-sm font-medium text-slate-800">{p.title}</span>
                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">{p.sector}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
