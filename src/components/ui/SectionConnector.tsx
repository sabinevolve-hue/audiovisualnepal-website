"use client";

import { motion } from "framer-motion";

export default function SectionConnector({ background = "#FFFFFF" }: { background?: string }) {
  return (
    <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", background, lineHeight: 0 }}>
      <svg width="10" height="72" viewBox="0 0 10 72">
        <motion.line
          x1="5" y1="2" x2="5" y2="60"
          stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.circle
          cx="5" cy="66" r="3.5" fill="#3B82F6"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.65, duration: 0.3 }}
        />
      </svg>
    </div>
  );
}
