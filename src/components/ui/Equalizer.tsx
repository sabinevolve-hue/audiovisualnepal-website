"use client";

import { motion } from "framer-motion";

export default function Equalizer({ color = "#3B82F6", height = 16 }: { color?: string; height?: number }) {
  const bars = [0.5, 0.95, 0.65, 1, 0.75];
  return (
    <span aria-hidden="true" style={{ display: "inline-flex", gap: 2, alignItems: "flex-end", height }}>
      {bars.map((b, i) => (
        <motion.span
          key={i}
          style={{ width: 3, borderRadius: 2, background: color, height: height * b, transformOrigin: "bottom" }}
          animate={{ scaleY: [0.35, 1, 0.5, 0.85, 0.35] }}
          transition={{ duration: 1.1 + i * 0.14, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}
