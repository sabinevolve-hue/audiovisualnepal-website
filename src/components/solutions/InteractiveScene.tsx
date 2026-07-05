"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Hotspot = {
  id: string;
  x: number;
  y: number;
  color: string;
  product: {
    name: string;
    brand: string;
    desc: string;
    href: string;
  };
};

export type FlowSegment = {
  id: string;
  path: string;
  color: string;
  label: string;
  dur: number;
};

export type SceneConfig = {
  viewBox: string;
  ariaLabel: string;
  art: ReactNode;
  hotspots: Hotspot[];
  flow: FlowSegment[];
};

type SmilAnimate = SVGElement & { beginElement: () => void };

export default function InteractiveScene({ config }: { config: SceneConfig }) {
  const [active, setActive] = useState<Hotspot | null>(null);
  const [flowLabel, setFlowLabel] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  function playFlow() {
    if (playing) return;
    setPlaying(true);
    let t = 0;
    for (const seg of config.flow) {
      const start = t;
      setTimeout(() => {
        setFlowLabel(seg.label);
        const dot = svgRef.current?.querySelector<SVGCircleElement>(`#dot-${seg.id}`);
        const anim = svgRef.current?.querySelector<SmilAnimate>(`#anim-${seg.id}`);
        if (dot && anim) {
          dot.setAttribute("opacity", "1");
          anim.beginElement();
          setTimeout(() => dot.setAttribute("opacity", "0"), seg.dur);
        }
      }, start);
      t += seg.dur;
    }
    setTimeout(() => {
      setPlaying(false);
      setFlowLabel(null);
    }, t + 400);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
      <svg
        ref={svgRef}
        viewBox={config.viewBox}
        role="img"
        aria-label={config.ariaLabel}
        className="w-full h-auto select-none"
      >
        {config.art}

        {config.flow.map((seg) => (
          <path
            key={`guide-${seg.id}`}
            d={seg.path}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth={1}
            strokeDasharray="3 5"
          />
        ))}

        {config.hotspots.map((h) => (
          <g
            key={h.id}
            onClick={() => setActive(active?.id === h.id ? null : h)}
            className="cursor-pointer"
            role="button"
            aria-label={h.product.name}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActive(h)}
          >
            <motion.circle
              cx={h.x}
              cy={h.y}
              r={9}
              fill="none"
              stroke={h.color}
              strokeWidth={2}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <circle
              cx={h.x}
              cy={h.y}
              r={7}
              fill={active?.id === h.id ? "#0F172A" : h.color}
            />
          </g>
        ))}

        {config.flow.map((seg) => (
          <circle key={`dot-${seg.id}`} id={`dot-${seg.id}`} r={5} fill={seg.color} opacity={0}>
            <animateMotion
              id={`anim-${seg.id}`}
              dur={`${seg.dur}ms`}
              begin="indefinite"
              fill="freeze"
              path={seg.path}
            />
          </circle>
        ))}
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={playFlow}
          disabled={playing}
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          {playing ? "Playing…" : "▶ Play signal flow"}
        </button>
        <p className="text-sm text-slate-500" aria-live="polite">
          {flowLabel ?? "Click any pulse point to see the recommended product"}
        </p>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-4 rounded-xl border border-slate-200 bg-white p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {active.product.brand}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{active.product.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{active.product.desc}</p>
            <div className="mt-3 flex gap-4">
              <a href={active.product.href} className="text-sm font-medium text-blue-600 hover:underline">
                View product →
              </a>
              <a href="/contact" className="text-sm font-medium text-slate-500 hover:underline">
                Get a quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
